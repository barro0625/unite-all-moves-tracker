const { app, BrowserWindow, shell, dialog } = require('electron');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// app.getAppPath() points to the project root in development and app.asar
// in the packaged application. Electron's fs APIs can read files inside asar.
const projectRoot = app.getAppPath();
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function verifyBundledCatalogue() {
  const cataloguePath = path.join(projectRoot, 'pokemon.json');
  if (!fs.existsSync(cataloguePath)) {
    throw new Error(`找不到內建資料檔：${cataloguePath}`);
  }
  const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf8'));
  if (!Array.isArray(catalogue.pokemon) || !catalogue.movesets) {
    throw new Error('內建 pokemon.json 格式不正確。');
  }
  const missing = catalogue.pokemon.filter(name => !catalogue.movesets[name]);
  if (missing.length) {
    throw new Error(`內建資料有角色缺少技能設定：${missing.join('、')}`);
  }
  return catalogue.pokemon.length;
}

function startLocalServer(preferredPort = null) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let pathname;
      try {
        pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
      } catch {
        res.writeHead(400).end('Bad request');
        return;
      }

      if (pathname === '/') pathname = '/index.html';
      const relativePath = pathname.replace(/^\/+/, '');
      const filePath = path.resolve(projectRoot, relativePath);
      const relative = path.relative(projectRoot, filePath);
      if (relative.startsWith('..') || path.isAbsolute(relative)) {
        res.writeHead(403).end('Forbidden');
        return;
      }

      fs.readFile(filePath, (error, contents) => {
        if (error) {
          console.error('Local file request failed:', pathname, error);
          res.writeHead(error.code === 'ENOENT' ? 404 : 500, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store'
          }).end(error.code === 'ENOENT' ? 'Not found' : 'Unable to read local file');
          return;
        }

        res.writeHead(200, {
          'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff'
        });
        res.end(contents);
      });
    });

    server.once('error', reject);
    server.listen(preferredPort || 0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port, url: `http://127.0.0.1:${server.address().port}/` });
    });
  });
}

let localServer;
let mainWindow;

async function getPersistentPort() {
  const settingsPath = path.join(app.getPath('userData'), 'local-server-port.json');
  try {
    const saved = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    if (Number.isInteger(saved.port) && saved.port > 0 && saved.port <= 65535) return saved.port;
  } catch {}
  return null;
}

async function savePersistentPort(port) {
  const settingsPath = path.join(app.getPath('userData'), 'local-server-port.json');
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify({ port }), 'utf8');
}

async function createWindow() {
  if (!localServer) {
    try {
      const count = verifyBundledCatalogue();
      console.info(`Bundled Pokémon catalogue verified: ${count} Pokémon.`);
    } catch (error) {
      await dialog.showMessageBox({
        type: 'error',
        title: '內建寶可夢資料無法讀取',
        message: '桌面程式的 pokemon.json 缺失或格式不完整。',
        detail: error.message,
        buttons: ['確定']
      });
      app.quit();
      return;
    }

    const savedPort = await getPersistentPort();
    try {
      localServer = await startLocalServer(savedPort);
    } catch (error) {
      if (savedPort && error.code === 'EADDRINUSE') {
        await dialog.showMessageBox({
          type: 'error',
          title: '無法啟動全技能組一勝挑戰',
          message: '桌面程式使用的本機連接埠目前被其他程式占用。',
          detail: '請關閉可能占用該連接埠的程式後，再重新開啟本程式。為了保護挑戰紀錄，程式不會自動改用新的連接埠。',
          buttons: ['確定']
        });
        app.quit();
        return;
      }
      throw error;
    }
    await savePersistentPort(localServer.port);
  }

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 900,
    minHeight: 650,
    title: '全技能組一勝挑戰',
    backgroundColor: '#101827',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('did-fail-load', (_event, code, description, validatedURL) => {
    console.error('Application page failed to load:', code, description, validatedURL);
  });

  await mainWindow.loadURL(localServer.url);
}

app.whenReady().then(createWindow).catch(async error => {
  console.error('Application startup failed:', error);
  await dialog.showMessageBox({
    type: 'error',
    title: '全技能組一勝挑戰啟動失敗',
    message: '桌面程式無法正常啟動。',
    detail: error.message,
    buttons: ['確定']
  });
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (localServer?.server) localServer.server.close();
});
