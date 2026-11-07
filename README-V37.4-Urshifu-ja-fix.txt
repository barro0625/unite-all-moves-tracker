Pokémon UNITE Tracker V37.4 修正補丁

修正內容：
- 補齊武道熊師四個獨立技能名稱的日文對照：
  - 暗冥強擊 → あんこくきょうだ
  - 地獄突刺 → じごくづき
  - 水流連打 → すいりゅうれんだ
  - 流水裂破 → アクアブレイク
- 修正原因：武道熊師在 pokemon.json 中使用固定流派顯示，app.js 會將每套技能拆成個別技能名稱查詢 moveNames。原本只有整組名稱的對照，缺少四個獨立名稱，因此日文介面無法替換。
- 僅修改 pokemon.json 的 moveNames 日文欄位與版本註記。
- 不修改 app.js、i18n.js、技能組 ID、勝利紀錄、本機儲存鍵、英文及繁體中文名稱。

套用方式：
1. 先備份目前專案的 pokemon.json。
2. 將本次提供的 pokemon.json 覆蓋 GitHub Repository 根目錄的 pokemon.json。
3. Commit changes，等待 GitHub Pages 部署完成。
4. 網站以 Ctrl + F5 強制重新整理，並切換至日本語確認武道熊師技能名稱。
