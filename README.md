# Pokémon UNITE 全技能組一勝挑戰 V11

## V11 新增功能
- 角色搜尋：可搜尋繁體中文名稱或英文名稱。
- 角色篩選：全部、進行中、已完成、尚未開始／未設定、待設定。
- 隨機挑戰：從所有已設定且尚未取得勝利的技能組中隨機抽出一組，並開啟對應角色紀錄。
- 雲端同步：可連接自己的 Supabase 專案，將紀錄上傳或從雲端載入到其他裝置。
- 本機備份：保留 JSON 匯出／匯入功能，備份格式升級為 V11。
- 第一次開啟 V11 時會讀取 V10 或 V9 的瀏覽器紀錄，保留仍然有效的技能組勝利紀錄。

## GitHub Pages 更新
將 `index.html`、`style.css`、`app.js`、`pokemon.json`、`README.md` 五個檔案上傳到 Repository 根目錄並覆蓋。Commit changes 後等待 GitHub Pages 更新，再使用 Ctrl+F5 強制重新整理。

## 雲端同步設定（Supabase）
GitHub Pages 是靜態網站，無法自行保存跨裝置資料，因此 V11 提供選擇性 Supabase 同步。若只使用同一個瀏覽器，本機自動儲存與 JSON 備份仍可正常使用。

1. 到 Supabase 建立免費專案。
2. 在 Supabase 的 SQL Editor 執行以下 SQL：

```sql
create table if not exists public.unite_sync (
  sync_id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.unite_sync enable row level security;
create policy "sync by secret code" on public.unite_sync
for all to anon using (true) with check (true);
```

3. 在 Project Settings / API 找到 Project URL 與 anon / publishable key。
4. 開啟網站的「雲端同步」，填入 Project URL、anon / publishable key，以及自訂至少 12 個字元的同步代碼，按「儲存連線設定」。
5. 在原本有進度的裝置按「上傳目前紀錄」。其他裝置填入完全相同的三項設定後，按「從雲端載入」。

注意：同步代碼相當於這份紀錄的存取密鑰，請使用難猜的長代碼且不要分享。這是個人挑戰紀錄用途的簡易同步設計，不適合存放敏感資料。上傳會以目前瀏覽器資料覆蓋該同步代碼的雲端資料；載入會覆蓋目前瀏覽器資料。操作前建議先匯出 JSON 備份。Supabase 的 anon / publishable key 是前端公開金鑰，不要使用 service_role key。

## 保留的遊戲規則
- 保留 V10 `pokemon.json` 中的 102 隻角色、技能名稱、技能組模式、頭像與特殊規則。
- 保留大竺葵與阿羅拉雷丘頭像／名稱修正。
- 自動組合、單一勝利、固定流派三種計算模式維持不變。
- 隨機挑戰只會抽選已設定且尚未取得勝利的技能組；待設定角色不會被抽中。
