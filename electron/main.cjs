
const { app, BrowserWindow, shell, dialog } = require('electron');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.join(__dirname, '..');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function startLocalServer(preferredPort = null) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let pathname;

      try {
        pathname = decodeURIComponent(
          new URL(req.url, 'http://127.0.0.1').pathname
        );
      } catch {
        res.writeHead(400).end('Bad request');
        return;
      }

      if (pathname === '/') pathname = '/index.html';

      const filePath = path.resolve(projectRoot, '.' + pathname);

      if (!filePath.startsWith(projectRoot + path.sep)) {
        res.writeHead(403).end('Forbidden');
        return;
      }

      fs.readFile(filePath, (error, contents) => {
        if (error) {
          res.writeHead(404).end('Not found');
          return;
        }

        res.writeHead(200, {
          'Content-Type':
            mimeTypes[path.extname(filePath).toLowerCase()] ||
            'application/octet-stream',
          'X-Content-Type-Options': 'nosniff'
        });

        res.end(contents);
      });
    });

    server.once('error', reject);

    server.listen(preferredPort || 0, '127.0.0.1', () => {
      resolve({
        server,
        port: server.address().port,
        url: `http://127.0.0.1:${server.address().port}/`
      });
    });
  });
}

let localServer;
let mainWindow;

// 記住連接埠，確保每次開啟都使用相同的資料來源。
async function getPersistentPort() {
  const settingsPath = path.join(
    app.getPath('userData'),
    'local-server-port.json'
  );

  try {
    const saved = JSON.parse(
      fs.readFileSync(settingsPath, 'utf8')
    );

    if (
      Number.isInteger(saved.port) &&
      saved.port > 0 &&
      saved.port <= 65535
    ) {
      return saved.port;
    }
  } catch {}

  return null;
}

async function savePersistentPort(port) {
  const settingsPath = path.join(
    app.getPath('userData'),
    'local-server-port.json'
  );

  fs.mkdirSync(path.dirname(settingsPath), {
    recursive: true
  });

  fs.writeFileSync(
    settingsPath,
    JSON.stringify({ port }),
    'utf8'
  );
}

async function createWindow() {
  if (!localServer) {
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
    if (url.startsWith('https://') || url.startsWith('http://')) {
      shell.openExternal(url);
    }

    return { action: 'deny' };
  });

  await mainWindow.loadURL(localServer.url);
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (localServer?.server) {
    localServer.server.close();
  }
});

