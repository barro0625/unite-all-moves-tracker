# V37 多語言技能名稱資料庫（第一階段）

本版以 V36 為基礎，採增量更新。

## 本次更新
- 新增 `pokemon.json` 的 `moveNames` 獨立技能名稱登錄表，共收錄目前資料中的 251 個不重複繁體中文技能名稱。
- 新增 `V37-move-name-review.csv`，供逐項核對官方英文與日文技能名稱。
- 技能名稱顯示邏輯改為：繁體中文顯示原文；英文優先顯示既有英文圖示對照；日文在尚未核實前保留繁體中文。
- 只有 `status: "verified"` 且存在對應語言欄位時，才會將核實後名稱顯示為已確認的名稱。
- `package.json` 版本更新為 1.0.2。

## 重要說明
目前 V36 原始資料中只有部分角色具有英文技能圖示對照。這些既有英文對照尚未逐項與官方遊戲資料核實，因此標記為 `legacy-unverified`，不宣稱為官方譯名。日文技能名稱尚未核實，故保留繁體中文。官方英文名稱可由 Pokémon UNITE 官方網站／遊戲內資料確認；官方日文名稱則需以日文遊戲內資料確認。未確認前不自行猜譯。

官方參考入口：
- Pokémon UNITE 官方英文寶可夢名單：https://unite.pokemon.com/en-us/pokemon/
- Pokémon UNITE 官方日文／亞洲網站：https://www.pokemonunite.jp/
- Unite-DB 是社群資料庫，可作交叉參考，但不是官方來源：https://unite-db.com/

## 相容性與保留項目
- 不更動既有 `movesets` 內技能原文。
- 不更動 localStorage key、技能組 ID、勝場紀錄、收藏、偏好設定及備份格式。
- 不覆寫 V36 的 `.github/workflows/build-windows.yml` 或 `electron/main.cjs`。
- 桌面版版本號升為 1.0.2，需重新執行 GitHub Actions 建置。

## 測試範圍
已執行 JavaScript 語法檢查、JSON 解析、名單與技能資料完整性檢查、ZIP 完整性檢查。尚未在實際瀏覽器及 Windows 安裝環境進行人工 UI 測試。
