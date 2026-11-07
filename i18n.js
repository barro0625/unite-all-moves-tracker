/* V35 multilingual layer. UI translations are maintained separately from challenge data. */
(() => {
  const LANG_KEY = 'unite-tracker-language-v1';
  const translations = {
    en: {
      '全技能組一勝挑戰':'All Moveset Wins Challenge','功能選單':'Menu','挑戰工具':'Challenge Tools','隨機抽選與挑戰安排':'Random selection and challenge planning','智慧隨機挑戰 2.0':'Smart Random Challenge 2.0','管理與顯示':'Management & Display','設定、備份及 OBS':'Settings, backups & OBS','個人化設定':'Preferences','⚙ 開啟個人化設定':'⚙ Open Preferences','備份與還原':'Backup & Restore','匯出備份（自訂檔名）':'Export Backup (Custom Name)','快速備份（自動命名）':'Quick Backup (Auto Name)','匯入備份':'Import Backup','實況擷取':'Stream Overlay','OBS 實況模式':'OBS Overlay','下載 Windows 桌面版':'Download Windows Desktop App','查看更新日誌':'View Changelog','常用篩選功能仍保留在主畫面。':'Filters remain available on the main screen.','每一種技能組，':'Every moveset, ','都拿下一勝。':'one win each.','記錄每隻寶可夢的技能搭配，逐一完成勝利。':'Track each Pokémon moveset and complete every win.','已完成技能組':'Movesets Won','總技能組':'Total Movesets','剩餘技能組':'Movesets Remaining','已完成寶可夢':'Pokémon Completed','依各角色設定計算':'Based on each Pokémon setup','尚待取得勝利':'Wins still needed','全角色挑戰總覽':'Challenge Overview','所有已設定技能組的完成進度與定位分布。':'Progress across configured movesets and roles.','尚未完成的技能組':'Unfinished Movesets','點選項目即可開啟角色紀錄，快速找到下一個目標。':'Select an item to open its Pokémon record.','搜尋寶可夢名稱…':'Search Pokémon…','全部定位':'All Roles','攻擊型':'Attacker','防禦型':'Defender','敏捷型':'Speedster','平衡型':'All-Rounder','輔助型':'Supporter','全部進度':'All Progress','進行中':'In Progress','已全數完成':'Completed','尚未開始／未設定':'Not Started / Unconfigured','待設定':'Needs Setup','全部角色':'All Pokémon','★ 我的最愛':'★ Favorites','▣ 我的收藏':'▣ Collection','原始順序':'Default Order','名稱排序':'Name','完成度由高至低':'Progress: High to Low','完成度由低至高':'Progress: Low to High','最愛優先':'Favorites First','寶可夢列表':'Pokémon','紀錄儲存在目前瀏覽器；建議定期使用 JSON 匯出備份。':'Records are stored in this browser. Export JSON backups regularly.','非官方粉絲工具，與 Nintendo、The Pokémon Company 或 TiMi Studio Group 無關。':'Unofficial fan-made tool. Not affiliated with Nintendo, The Pokémon Company, or TiMi Studio Group.','角色名稱':'Pokémon','關閉':'Close','先確認該角色的技能機制，再選擇計算方式。尚未確認的角色不會被計入總組數，避免錯誤統計。每行輸入一個技能選項。':'Confirm the Pokémon’s move mechanics before choosing a tracking method. Unverified Pokémon are excluded from totals. Enter one move option per line.','勝利計算方式':'Win Tracking Method','尚未設定（暫不計入統計）':'Not Configured (Excluded from Stats)','自動組合（每種搭配各一勝）':'Combinations (one win per combination)','單一勝利（所有技能視為同一組）':'Single Win (all moves count as one)','固定流派（每個流派各一勝，不交叉混搭）':'Fixed Builds (one win per build)','技能一選項':'Move 1 Options','技能二選項':'Move 2 Options','每行一個選項':'One option per line','技能組勝利紀錄':'Moveset Win Records','重置此角色':'Reset Pokémon','取消':'Cancel','儲存設定':'Save Settings','智慧隨機挑戰':'Smart Random Challenge','從尚未完成的角色中抽選目標。每次最多抽出五隻不同寶可夢，每隻提供一組尚未完成的技能組。':'Pick targets from unfinished Pokémon. Select up to five different Pokémon, each with one unfinished moveset.','挑戰職業':'Role','全部職業':'All Roles','抽選數量':'Number to Pick','抽選策略':'Selection Strategy','完全隨機':'Fully Random','優先完成度較低的角色':'Prioritize lower completion','優先剩餘技能組較多的角色':'Prioritize more remaining movesets','排除角色（以逗號或頓號分隔）':'Exclude Pokémon (comma-separated)','排除已加入「我的最愛」的角色':'Exclude Favorites','🎲 開始抽選':'🎲 Pick Targets','介面主題':'Theme','深色主題':'Dark','淺色主題':'Light','角色卡片密度':'Card Density','舒適':'Comfortable','精簡':'Compact','加入最愛':'Add to Favorites','取消最愛':'Remove from Favorites','加入收藏':'Add to Collection','移出收藏':'Remove from Collection','已完成':'Completed','未開始':'Not Started','未分類':'Unclassified','技能資料尚未設定':'Move data not configured','找不到符合條件的寶可夢。':'No Pokémon match your filters.','技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。':'Move data is not configured. Confirm the in-game moves before choosing a tracking method.','請先填入技能名稱，每行一個選項。':'Enter move names, one option per line.','已取得勝利':'Wins','剩餘技能組':'Movesets Remaining','完成角色':'Pokémon Completed','上次匯出：尚未匯出':'Last export: None','上次匯出：':'Last export: ','語言':'Language','繁體中文':'繁體中文','English':'English','日本語':'日本語','英文及日文內容可能包含機器翻譯，或有翻譯錯誤；寶可夢與技能名稱以官方遊戲資料為準。':'English and Japanese text may include machine translation and may contain errors. Official game data takes priority for Pokémon and move names.'
    },
    ja: {
      '全技能組一勝挑戰':'全わざセット1勝チャレンジ','功能選單':'メニュー','挑戰工具':'チャレンジツール','隨機抽選與挑戰安排':'ランダム選択とチャレンジ設定','智慧隨機挑戰 2.0':'スマートランダムチャレンジ 2.0','管理與顯示':'管理・表示','設定、備份及 OBS':'設定・バックアップ・OBS','個人化設定':'個人設定','⚙ 開啟個人化設定':'⚙ 個人設定を開く','備份與還原':'バックアップと復元','匯出備份（自訂檔名）':'バックアップを書き出す（名前を指定）','快速備份（自動命名）':'クイックバックアップ（自動命名）','匯入備份':'バックアップを読み込む','實況擷取':'配信用オーバーレイ','OBS 實況模式':'OBS配信モード','下載 Windows 桌面版':'Windowsデスクトップ版をダウンロード','查看更新日誌':'更新履歴を見る','常用篩選功能仍保留在主畫面。':'よく使う絞り込み機能はメイン画面にあります。','每一種技能組，':'すべてのわざセットで、','都拿下一勝。':'1勝を目指そう。','記錄每隻寶可夢的技能搭配，逐一完成勝利。':'ポケモンごとのわざの組み合わせを記録して、勝利を達成しよう。','已完成技能組':'勝利したわざセット','總技能組':'わざセット合計','剩餘技能組':'残りのわざセット','已完成寶可夢':'達成したポケモン','依各角色設定計算':'各ポケモンの設定に基づく','尚待取得勝利':'勝利待ち','全角色挑戰總覽':'全ポケモンチャレンジ概要','所有已設定技能組的完成進度與定位分布。':'設定済みわざセットの進捗とバトルスタイル別の分布。','尚未完成的技能組':'未達成のわざセット','點選項目即可開啟角色紀錄，快速找到下一個目標。':'項目を選択するとポケモンの記録を開きます。','搜尋寶可夢名稱…':'ポケモンを検索…','全部定位':'すべてのバトルスタイル','攻擊型':'アタック型','防禦型':'ディフェンス型','敏捷型':'スピード型','平衡型':'バランス型','輔助型':'サポート型','全部進度':'すべての進捗','進行中':'進行中','已全數完成':'すべて達成','尚未開始／未設定':'未開始／未設定','待設定':'未設定','全部角色':'すべてのポケモン','★ 我的最愛':'★ お気に入り','▣ 我的收藏':'▣ コレクション','原始順序':'初期順','名稱排序':'名前順','完成度由高至低':'達成率の高い順','完成度由低至高':'達成率の低い順','最愛優先':'お気に入り優先','寶可夢列表':'ポケモン一覧','紀錄儲存在目前瀏覽器；建議定期使用 JSON 匯出備份。':'記録はこのブラウザーに保存されます。定期的にJSONでバックアップしてください。','非官方粉絲工具，與 Nintendo、The Pokémon Company 或 TiMi Studio Group 無關。':'非公式ファンツールです。任天堂、株式会社ポケモン、TiMi Studio Groupとは関係ありません。','角色名稱':'ポケモン名','關閉':'閉じる','先確認該角色的技能機制，再選擇計算方式。尚未確認的角色不會被計入總組數，避免錯誤統計。每行輸入一個技能選項。':'わざの仕様を確認してから記録方法を選択してください。未確認のポケモンは合計に含まれません。1行に1つのわざを入力してください。','勝利計算方式':'勝利の記録方法','尚未設定（暫不計入統計）':'未設定（統計対象外）','自動組合（每種搭配各一勝）':'組み合わせ（各組み合わせで1勝）','單一勝利（所有技能視為同一組）':'1勝のみ（すべてのわざを1組として扱う）','固定流派（每個流派各一勝，不交叉混搭）':'固定ビルド（各ビルドで1勝）','技能一選項':'わざ1の候補','技能二選項':'わざ2の候補','每行一個選項':'1行に1つ入力','技能組勝利紀錄':'わざセットの勝利記録','重置此角色':'このポケモンをリセット','取消':'キャンセル','儲存設定':'設定を保存','智慧隨機挑戰':'スマートランダムチャレンジ','從尚未完成的角色中抽選目標。每次最多抽出五隻不同寶可夢，每隻提供一組尚未完成的技能組。':'未達成のポケモンから目標を選びます。最大5匹まで選択でき、各ポケモンから未達成のわざセットを1つ選びます。','挑戰職業':'バトルスタイル','全部職業':'すべて','抽選數量':'選択数','抽選策略':'選択方法','完全隨機':'完全ランダム','優先完成度較低的角色':'達成率の低いポケモンを優先','優先剩餘技能組較多的角色':'残りのわざセットが多いポケモンを優先','排除角色（以逗號或頓號分隔）':'除外するポケモン（カンマ区切り）','排除已加入「我的最愛」的角色':'お気に入りを除外','🎲 開始抽選':'🎲 選択開始','介面主題':'テーマ','深色主題':'ダーク','淺色主題':'ライト','角色卡片密度':'カード表示密度','舒適':'標準','精簡':'コンパクト','加入最愛':'お気に入りに追加','取消最愛':'お気に入り解除','加入收藏':'コレクションに追加','移出收藏':'コレクションから削除','已完成':'達成済み','未開始':'未開始','未分類':'未分類','技能資料尚未設定':'わざデータ未設定','找不到符合條件的寶可夢。':'条件に一致するポケモンがいません。','技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。':'わざデータが未設定です。ゲーム内のわざを確認してから記録方法を選んでください。','請先填入技能名稱，每行一個選項。':'わざの名前を1行に1つ入力してください。','已取得勝利':'勝利数','剩餘技能組':'残りのわざセット','完成角色':'達成ポケモン','上次匯出：尚未匯出':'前回の書き出し：なし','上次匯出：':'前回の書き出し：','語言':'言語','繁體中文':'繁體中文','English':'English','日本語':'日本語','英文及日文內容可能包含機器翻譯，或有翻譯錯誤；寶可夢與技能名稱以官方遊戲資料為準。':'英語・日本語の文章には機械翻訳が含まれ、誤訳がある場合があります。ポケモン名やわざ名は公式ゲーム内の表記を優先します。'
    }
  };
  // V36: additional dynamic interface strings used by cards, dialogs, statistics and OBS.
  Object.assign(translations.en, {
    '共':'Total ','隻角色':' Pokémon','已設定':'Configured ','隻':' Pokémon','% 完成':'% complete','角色完成':'Pokémon completed','組勝利':' moveset wins','組':' sets','勝':' wins','種組合':' combinations','尚未設定，不計入統計':'Not configured; excluded from statistics','此角色的技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。':'Move data is not configured. Confirm the in-game moves before choosing a tracking method.','請先填入技能名稱，每行一個選項。':'Enter move names, one option per line.','✓ 已取得勝利':'✓ Win recorded','＋ 記錄一勝':'＋ Record a win','已儲存 ':'Saved ',' 的設定':' settings','已將 ':'Added ',' 加入最愛':' to Favorites','已取消 ':'Removed ',' 的最愛':' from Favorites',' 加入收藏':' to Collection',' 移出收藏':' from Collection','挑戰目標：':'Challenge target: ','抽選結果':'Selection Results',' 個目標':' targets','沒有符合條件的未完成角色，請調整篩選條件。':'No unfinished Pokémon match these conditions. Adjust your filters.','符合條件的角色只有 ':'Only ',' 隻，已全部列出。':' Pokémon match; all are shown.','上次匯出：尚未匯出':'Last export: Not yet exported','上次匯出：':'Last export: ','日期資料無法辨識':'Date could not be read','所有已設定的技能組都完成了！':'All configured movesets are complete!',
    '備份檔最外層必須是 JSON 物件。':'The backup file must be a JSON object.',
    '找不到有效的 state 挑戰紀錄資料。':'No valid challenge record data was found in the state field.',
    '角色名稱格式不正確。':'The Pokémon name has an invalid format.',
    '個人化資料格式不正確。':'Personalization data has an invalid format.',
    '個人化設定必須是 JSON 物件。':'Preferences must be a JSON object.','找不到符合條件的寶可夢。':'No Pokémon match your filters.','技能資料尚未設定':'Move data not configured','已完成':'Completed','未開始':'Not Started','進行中':'In Progress','待設定':'Needs Setup','未分類':'Unclassified','未開始／未設定':'Not Started / Unconfigured','抽選結果':'Selection Results','開啟':'Open','角色':'Pokémon','技能':'Move','固定流派（每行一套完整技能搭配）':'Fixed Builds (one complete moveset per line)','技能名稱（僅供參考）':'Move Names (reference only)','技能一選項':'Move 1 Options','例如：一擊流：技能A＋技能B':'Example: Single-Strike Style: Move A + Move B','每行一個技能名稱':'One move name per line','每行一個技能選項':'One move option per line','自動組合模式下，技能一與技能二都至少需要一個選項。':'In Combination mode, enter at least one option for both Move 1 and Move 2.','固定流派模式至少需要填寫一套完整技能搭配。':'Enter at least one complete moveset in Fixed Builds mode.','單一勝利模式至少需要填寫一個技能名稱。':'Enter at least one move name in Single Win mode.','最多可填 8 個技能選項或固定流派。':'You can enter up to 8 move options or fixed builds.','個人化設定已儲存':'Preferences saved','設定儲存失敗，原本設定仍會保留。':'Could not save preferences. Your previous settings were kept.','無法儲存收藏設定，請檢查瀏覽器網站儲存空間。':'Could not save favorites. Check this browser’s site storage.','已儲存':'Saved','匯出備份':'Export Backup','匯入備份':'Import Backup','語言':'Language'
  });
  Object.assign(translations.ja, {
    '共':'合計 ','隻角色':'匹','已設定':'設定済み ','隻':'匹','% 完成':'%達成','角色完成':'ポケモン達成','組勝利':'セット勝利','組':'セット','勝':'勝','種組合':'種類の組み合わせ','尚未設定，不計入統計':'未設定（統計対象外）','此角色的技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。':'このポケモンのわざデータは未設定です。ゲーム内のわざを確認してから記録方法を選択してください。','請先填入技能名稱，每行一個選項。':'わざの名前を1行に1つ入力してください。','✓ 已取得勝利':'✓ 勝利を記録済み','＋ 記錄一勝':'＋ 1勝を記録','已儲存 ':'保存しました：',' 的設定':'の設定','已將 ':'追加しました：',' 加入最愛':'をお気に入りに追加','已取消 ':'解除しました：',' 的最愛':'のお気に入り',' 加入收藏':'をコレクションに追加',' 移出收藏':'をコレクションから削除','挑戰目標：':'チャレンジ目標：','抽選結果':'選択結果',' 個目標':'件','沒有符合條件的未完成角色，請調整篩選條件。':'条件に一致する未達成のポケモンがいません。絞り込み条件を変更してください。','符合條件的角色只有 ':'条件に一致するポケモンは',' 隻，已全部列出。':'匹です。すべて表示しました。','上次匯出：尚未匯出':'前回の書き出し：まだありません','上次匯出：':'前回の書き出し：','日期資料無法辨識':'日付を読み取れません','所有已設定的技能組都完成了！':'設定済みのわざセットをすべて達成しました！','找不到符合條件的寶可夢。':'条件に一致するポケモンがいません。','技能資料尚未設定':'わざデータ未設定','已完成':'達成済み','未開始':'未開始','進行中':'進行中','待設定':'未設定','未分類':'未分類','未開始／未設定':'未開始／未設定','開啟':'開く','角色':'ポケモン','技能':'わざ','固定流派（每行一套完整技能搭配）':'固定ビルド（1行に1つの完全なわざセット）','技能名稱（僅供參考）':'わざ名（参考）','技能一選項':'わざ1の候補','例如：一擊流：技能A＋技能B':'例：いちげきスタイル：わざA＋わざB','每行一個技能名稱':'1行にわざ名を1つ入力','每行一個技能選項':'1行にわざを1つ入力','自動組合模式下，技能一與技能二都至少需要一個選項。':'組み合わせモードでは、わざ1とわざ2にそれぞれ1つ以上入力してください。','固定流派模式至少需要填寫一套完整技能搭配。':'固定ビルドモードでは、完全なわざセットを1つ以上入力してください。','單一勝利模式至少需要填寫一個技能名稱。':'1勝モードでは、わざ名を1つ以上入力してください。','最多可填 8 個技能選項或固定流派。':'わざ候補または固定ビルドは最大8件まで入力できます。','個人化設定已儲存':'個人設定を保存しました','設定儲存失敗，原本設定仍會保留。':'設定を保存できませんでした。以前の設定は保持されています。','無法儲存收藏設定，請檢查瀏覽器網站儲存空間。':'お気に入りを保存できません。ブラウザーの保存領域を確認してください。','已儲存':'保存しました','匯出備份':'バックアップを書き出す','匯入備份':'バックアップを読み込む','語言':'言語'
  });
  // V37.4: translate the in-app Quick Guide and full Changelog in English and Japanese.
  Object.assign(translations.en, {
    '功能說明':'Help Guide',
    '功能使用說明':'How to Use',
    '開啟功能說明':'Open Help Guide',
    '關閉說明':'Close Help',
    '這裡整理各區塊的用途，第一次使用時可以從上往下看。':'This guide explains each section of the app. If this is your first time, read from top to bottom.',
    '☰ 功能選單':'☰ Menu',
    '集中放置較少使用的操作，點擊左上角三條線展開，點選遮罩、右上角 × 或再次點擊即可收起。':'Less frequently used tools are grouped here. Click the three lines in the upper-left corner to open the menu. Click the backdrop, the × button, or the menu button again to close it.',
    '🎲 智慧隨機挑戰':'🎲 Smart Random Challenge',
    '從尚未完成的技能組中抽選目標，可設定角色定位、抽選數量、抽選策略與排除條件。':'Pick targets from unfinished movesets. You can set Pokémon roles, the number of picks, the selection strategy, and exclusion rules.',
    '⚙ 個人化設定':'⚙ Preferences',
    '調整深淺色主題、角色卡片密度、預設排序與篩選條件，以及 OBS 數字大小和顯示選項。':'Adjust the light or dark theme, Pokémon card density, default sorting and filters, as well as OBS number sizes and display options.',
    '💾 備份與還原':'💾 Backup & Restore',
    '匯出備份可保存目前挑戰紀錄；快速備份會自動命名。匯入備份可還原 JSON 檔案，匯入前會先保護現有資料。':'Export a backup to save your current challenge records. Quick Backup creates a filename automatically. Import a JSON backup to restore records. Your current data is protected before importing.',
    '📺 OBS 實況模式':'📺 OBS Stream Overlay',
    '開啟精簡統計畫面，可用於直播擷取，顯示勝利數、剩餘技能組與已完成寶可夢等進度。':'Open the compact statistics view for livestream capture. It displays progress such as wins, remaining movesets, and completed Pokémon.',
    '🔎 搜尋與篩選':'🔎 Search & Filters',
    '主畫面上的搜尋、定位、進度、收藏和排序可以快速縮小寶可夢列表，不需要打開功能選單。':'Use Search, Role, Progress, Favorites, and Sort on the main screen to narrow down the Pokémon list. You do not need to open the menu.',
    '📊 挑戰總覽與未完成清單':'📊 Challenge Overview & Unfinished List',
    '點擊各區塊標題即可展開或收起。未完成清單中的項目可直接跳到對應角色紀錄。':'Click a section heading to expand or collapse it. Select an item in the unfinished list to jump directly to that Pokémon’s record.',
    '🃏 寶可夢卡片':'🃏 Pokémon Cards',
    '點擊卡片可設定技能選項並記錄各技能組勝利；星號與收藏按鈕可標記常用或想追蹤的角色。':'Click a card to configure move options and record wins for each moveset. Use the star and collection buttons to mark Pokémon you use often or want to track.',
    '重新觀看新手導覽':'Replay the Welcome Tour',
    '知道了':'Got it',
    '網站更新日誌':'Website Changelog',
    '關閉更新日誌':'Close Changelog',
    '整理每次版本的重要調整。最新版本會顯示在最上方。':'A summary of the key changes in each release. The latest version appears at the top.',
    '目前版本':'Current Version',
    '多語言技能名稱整合':'Multilingual Move Names Integrated',
    '將技能英文與日文名稱整合至寶可夢資料，切換語言時同步顯示對應技能名稱。':'Integrated English and Japanese move names into the Pokémon data. Move names now change with the selected interface language.',
    '保留繁體中文原始名稱、寶可夢與技能組識別碼、勝場紀錄及既有備份格式。':'Preserved the original Traditional Chinese names, Pokémon and moveset IDs, win records, and existing backup format.',
    '暫時無法可靠對應的名稱會回退顯示繁體中文，不自行拼造譯名。':'Names without a reliable match fall back to Traditional Chinese instead of using invented translations.',
    '英文及日文名稱採暫用對照，尚未逐項由遊戲現行版本核實；請以遊戲內名稱為準。':'English and Japanese names are provisional and have not all been checked against the current game version. Please use the in-game names as the final reference.',
    '技能名稱翻譯試行':'Move Name Translation Pilot',
    '以噴火龍作為中、英、日技能名稱對照試填範例。':'Used Charizard as a pilot example for matching Traditional Chinese, English, and Japanese move names.',
    '確認一般招式與集結招式需要分別核對，未確認項目保留待確認狀態。':'Confirmed that regular moves and Unite Moves should be checked separately. Unverified entries remain marked for review.',
    '多語言介面第二階段':'Multilingual Interface: Phase 2',
    '擴充英文與日文動態介面翻譯，涵蓋統計、角色定位、技能組紀錄、挑戰結果、狀態與提示訊息。':'Expanded dynamic English and Japanese interface translations for statistics, Pokémon roles, moveset records, challenge results, statuses, and messages.',
    'OBS 獨立畫面切換語言時同步更新統計標籤。':'Updated statistics labels in the OBS standalone view when the interface language changes.',
    '角色卡片、未完成清單、隨機挑戰與編輯視窗延續多語言顯示。':'Extended multilingual display to Pokémon cards, the unfinished list, random challenges, and editing dialogs.',
    '保留原有資料結構、儲存鍵、技能組 ID、備份格式及桌面版設定。':'Preserved the existing data structure, storage keys, moveset IDs, backup format, and desktop app settings.',
    '繁中、英文、日文介面':'Traditional Chinese, English, and Japanese Interface',
    '新增繁體中文、英文及日文切換，並記住上次選擇的語言。':'Added Traditional Chinese, English, and Japanese language options, and remembers your last selection.',
    '以獨立 i18n.js 管理介面翻譯，語言切換不改動挑戰紀錄及備份格式。':'Managed interface translations in a separate i18n.js file. Switching languages does not change challenge records or the backup format.',
    '英文及日文技能名稱尚未完整，未有可靠對照的項目保留繁體中文。':'English and Japanese move names were not yet complete. Entries without a reliable match remained in Traditional Chinese.',
    'Windows 桌面版資料載入與備份修正':'Windows Desktop App: Data Loading and Backup Fixes',
    '修正 Electron 桌面版讀取內建 pokemon.json 的路徑問題。':'Fixed the file path used by the Electron desktop app to read the bundled pokemon.json.',
    '匯入備份時以內建完整角色與技能組資料為基礎合併勝利紀錄，避免部分備份造成角色或技能組資料缺漏。':'When importing a backup, win records are merged into the complete bundled Pokémon and moveset data to prevent missing Pokémon or movesets from partial backups.',
    '保留收藏與個人化設定；桌面版版本號更新至 1.0.1。':'Preserved favorites and preferences. Updated the desktop app version to 1.0.1.',
    '完成程式語法、JSON、資料數量及匯入合併檢查；Windows 安裝後的實機測試需另行確認。':'Completed code syntax, JSON, data-count, and import-merge checks. Testing after installing on Windows must be verified separately.',
    'Windows Electron 桌面版':'Windows Electron Desktop App',
    '加入 Electron 桌面程式架構，可將既有網站包裝成 Windows x64 應用程式。':'Added an Electron desktop app structure to package the existing website as a Windows x64 application.',
    '沿用網站的挑戰介面與 JSON 備份匯入／匯出，支援網站與桌面版之間手動搬移紀錄。':'Reused the website challenge interface and JSON backup import/export, allowing records to be moved manually between the website and desktop app.',
    '新增 GitHub Actions Windows 安裝檔建置流程及 GitHub Releases 發布入口。':'Added a GitHub Actions workflow to build the Windows installer and a GitHub Releases distribution entry.',
    '網站與桌面版的本機儲存空間彼此獨立，不會自動同步。':'The website and desktop app use separate local storage and do not sync automatically.',
    '首次進站新手導覽':'First-Visit Welcome Tour',
    '首次進入網站時自動顯示五步驟導覽，介紹挑戰目標、進度總覽、搜尋篩選、智慧隨機挑戰及設定／備份／OBS。':'A five-step tour appears automatically on the first visit, introducing the challenge goal, progress overview, search and filters, Smart Random Challenge, and Settings / Backup / OBS.',
    '每一步可使用上一步、下一步或跳過；完成或跳過後不再自動出現。':'Use Previous, Next, or Skip at each step. The tour will not appear automatically again after it is completed or skipped.',
    '可從功能說明重新觀看，導覽狀態獨立儲存，不會修改挑戰紀錄。':'Replay the tour from the Help Guide. Tour status is stored separately and does not modify challenge records.',
    '功能入口按鈕文字化':'Text-Based Feature Buttons',
    '功能說明改為一般文字按鈕，不再使用問號符號。':'Changed the Help Guide entry to a regular text button instead of a question-mark icon.',
    '更新日誌入口移除裝飾圖示，統一使用文字按鈕。':'Removed the decorative icon from the Changelog entry and standardized it as a text button.',
    '保留功能說明固定在畫面右下角，以及網站內更新日誌視窗。':'Kept the Help Guide fixed at the lower-right corner and retained the in-app Changelog window.',
    '功能說明與更新日誌入口調整':'Help Guide and Changelog Entry Adjustments',
    '功能說明改為固定在畫面右下角，捲動畫面時仍可開啟。':'Fixed the Help Guide button to the lower-right corner so it remains available while scrolling.',
    '新增網站內更新日誌視窗，集中查看版本調整。':'Added an in-app Changelog window to view version updates in one place.',
    '漢堡選單與功能說明':'Menu and Help Guide',
    '使用左上角三條線集中管理挑戰工具、個人化設定、備份還原與 OBS 模式。':'Grouped Challenge Tools, Preferences, Backup & Restore, and OBS mode under the three-line menu in the upper-left corner.',
    '新增功能說明視窗，集中介紹各區塊用途。':'Added a Help Guide dialog explaining the purpose of each section.',
    '可收合的工具列':'Collapsible Toolbar',
    '將較少使用的操作分組收合，減少主畫面工具按鈕的擁擠感。':'Grouped less frequently used actions into collapsible sections to reduce clutter on the main screen.',
    '保留搜尋、職業、進度、收藏與排序等常用篩選。':'Kept frequently used filters such as search, role, progress, favorites, and sorting available.',
    '挑戰工具與資料保護調整':'Challenge Tools and Data Protection Updates',
    '加入智慧隨機挑戰、最愛標記與個人化顯示設定。':'Added Smart Random Challenge, favorite markers, and personalized display settings.',
    '加強備份匯出與匯入檢查，匯入前先保護現有紀錄。':'Improved backup export and import checks. Existing records are protected before an import.',
    'OBS 統計簡化為勝利數、剩餘技能組與已完成寶可夢。':'Simplified OBS statistics to show wins, remaining movesets, and completed Pokémon.',
    'V37.4':'V37.4',
    '更新日誌與功能說明多語言化':'Changelog and Help Guide in Multiple Languages',
    '功能使用說明新增英文與日文完整內容，會隨介面語言切換。':'Added complete English and Japanese content to the Help Guide. The content changes with the selected interface language.',
    '網站更新日誌 V27～V37.4 新增英文與日文翻譯。':'Added English and Japanese translations for the website changelog entries from V27 through V37.4.',
    '保留原有繁體中文內容、功能入口、視窗操作及新手導覽。':'Preserved the original Traditional Chinese content, feature buttons, dialog behavior, and welcome tour.',
    'V37.3':'V37.3',
    '技能名稱補齊':'Move Name Completion',
    '依使用者提供的 UTF-8 CSV 補齊原先以繁體中文代替的英文及日文技能名稱。':'Used the user-provided UTF-8 CSV to fill English and Japanese move names that previously displayed in Traditional Chinese.',
    '保留使用者已修改的名稱；無法可靠對應的項目標記待核對。':'Preserved names edited by the user. Entries without a reliable match are marked for review.'
  });
  Object.assign(translations.ja, {
    '功能說明':'機能ガイド',
    '功能使用說明':'機能の使い方',
    '開啟功能說明':'機能ガイドを開く',
    '關閉說明':'ガイドを閉じる',
    '這裡整理各區塊的用途，第一次使用時可以從上往下看。':'各セクションの機能をまとめています。初めて利用する場合は、上から順にご覧ください。',
    '☰ 功能選單':'☰ メニュー',
    '集中放置較少使用的操作，點擊左上角三條線展開，點選遮罩、右上角 × 或再次點擊即可收起。':'使用頻度の低い操作をまとめています。左上の三本線をクリックして開きます。背景、右上の×、またはメニューボタンを再度クリックすると閉じます。',
    '🎲 智慧隨機挑戰':'🎲 スマートランダムチャレンジ',
    '從尚未完成的技能組中抽選目標，可設定角色定位、抽選數量、抽選策略與排除條件。':'未達成のわざセットから目標を選びます。ポケモンのバトルスタイル、選択数、選択方法、除外条件を設定できます。',
    '⚙ 個人化設定':'⚙ 個人設定',
    '調整深淺色主題、角色卡片密度、預設排序與篩選條件，以及 OBS 數字大小和顯示選項。':'ライト／ダークテーマ、ポケモンカードの表示密度、初期の並び順や絞り込み条件、OBSの数値サイズと表示項目を調整できます。',
    '💾 備份與還原':'💾 バックアップと復元',
    '匯出備份可保存目前挑戰紀錄；快速備份會自動命名。匯入備份可還原 JSON 檔案，匯入前會先保護現有資料。':'バックアップを書き出すと、現在のチャレンジ記録を保存できます。クイックバックアップではファイル名が自動設定されます。JSONバックアップを読み込んで記録を復元できます。読み込み前に現在のデータを保護します。',
    '📺 OBS 實況模式':'📺 OBS配信モード',
    '開啟精簡統計畫面，可用於直播擷取，顯示勝利數、剩餘技能組與已完成寶可夢等進度。':'配信画面に取り込むための簡易統計画面を開きます。勝利数、残りのわざセット、達成したポケモンなどの進捗を表示します。',
    '🔎 搜尋與篩選':'🔎 検索と絞り込み',
    '主畫面上的搜尋、定位、進度、收藏和排序可以快速縮小寶可夢列表，不需要打開功能選單。':'メイン画面の検索、バトルスタイル、進捗、お気に入り、並び替えを使ってポケモン一覧を絞り込めます。メニューを開く必要はありません。',
    '📊 挑戰總覽與未完成清單':'📊 チャレンジ概要と未達成リスト',
    '點擊各區塊標題即可展開或收起。未完成清單中的項目可直接跳到對應角色紀錄。':'各セクションの見出しをクリックすると展開／折りたたみできます。未達成リストの項目を選ぶと、該当するポケモンの記録へ直接移動します。',
    '🃏 寶可夢卡片':'🃏 ポケモンカード',
    '點擊卡片可設定技能選項並記錄各技能組勝利；星號與收藏按鈕可標記常用或想追蹤的角色。':'カードをクリックしてわざの候補を設定し、各わざセットの勝利を記録します。星印とコレクションボタンで、よく使うポケモンや追跡したいポケモンを登録できます。',
    '重新觀看新手導覽':'初回ガイドをもう一度見る',
    '知道了':'閉じる',
    '網站更新日誌':'更新履歴',
    '關閉更新日誌':'更新履歴を閉じる',
    '整理每次版本的重要調整。最新版本會顯示在最上方。':'各バージョンの主な変更点をまとめています。最新バージョンが一番上に表示されます。',
    '目前版本':'最新バージョン',
    '多語言技能名稱整合':'わざ名の多言語対応',
    '將技能英文與日文名稱整合至寶可夢資料，切換語言時同步顯示對應技能名稱。':'ポケモンデータに英語・日本語のわざ名を追加しました。表示言語を切り替えると、対応するわざ名も切り替わります。',
    '保留繁體中文原始名稱、寶可夢與技能組識別碼、勝場紀錄及既有備份格式。':'繁体字中国語の元の名称、ポケモンとわざセットのID、勝利記録、既存のバックアップ形式を維持しました。',
    '暫時無法可靠對應的名稱會回退顯示繁體中文，不自行拼造譯名。':'確実に対応付けられない名称は、独自の訳語を作らず繁体字中国語で表示します。',
    '英文及日文名稱採暫用對照，尚未逐項由遊戲現行版本核實；請以遊戲內名稱為準。':'英語・日本語名は暫定対応です。現行ゲーム内の表記と全項目を照合したものではありません。ゲーム内の名称を優先してください。',
    '技能名稱翻譯試行':'わざ名翻訳の試験導入',
    '以噴火龍作為中、英、日技能名稱對照試填範例。':'リザードンを例に、中国語・英語・日本語のわざ名の対応を試しました。',
    '確認一般招式與集結招式需要分別核對，未確認項目保留待確認狀態。':'通常わざとユナイトわざは分けて確認する必要があることを整理しました。未確認の項目は確認待ちとして残します。',
    '多語言介面第二階段':'多言語インターフェース 第2段階',
    '擴充英文與日文動態介面翻譯，涵蓋統計、角色定位、技能組紀錄、挑戰結果、狀態與提示訊息。':'統計、ポケモンのバトルスタイル、わざセットの記録、チャレンジ結果、状態表示、メッセージなど、英語・日本語の動的な画面翻訳を拡張しました。',
    'OBS 獨立畫面切換語言時同步更新統計標籤。':'OBS専用画面で言語を切り替えると、統計ラベルも連動して更新されます。',
    '角色卡片、未完成清單、隨機挑戰與編輯視窗延續多語言顯示。':'ポケモンカード、未達成リスト、ランダムチャレンジ、編集ダイアログも多言語表示に対応しました。',
    '保留原有資料結構、儲存鍵、技能組 ID、備份格式及桌面版設定。':'既存のデータ構造、保存キー、わざセットID、バックアップ形式、デスクトップ版の設定を維持しました。',
    '繁中、英文、日文介面':'繁体字中国語・英語・日本語のインターフェース',
    '新增繁體中文、英文及日文切換，並記住上次選擇的語言。':'繁体字中国語・英語・日本語の切り替え機能を追加し、前回選択した言語を保存するようにしました。',
    '以獨立 i18n.js 管理介面翻譯，語言切換不改動挑戰紀錄及備份格式。':'インターフェース翻訳を独立したi18n.jsで管理します。言語を切り替えてもチャレンジ記録やバックアップ形式は変更されません。',
    '英文及日文技能名稱尚未完整，未有可靠對照的項目保留繁體中文。':'英語・日本語のわざ名は未完成で、確実な対応がない項目は繁体字中国語のまま表示していました。',
    'Windows 桌面版資料載入與備份修正':'Windowsデスクトップ版：データ読み込みとバックアップの修正',
    '修正 Electron 桌面版讀取內建 pokemon.json 的路徑問題。':'Electronデスクトップ版で内蔵pokemon.jsonを読み込む際のパスの問題を修正しました。',
    '匯入備份時以內建完整角色與技能組資料為基礎合併勝利紀錄，避免部分備份造成角色或技能組資料缺漏。':'バックアップの読み込み時に、内蔵された完全なポケモン・わざセットデータを基準として勝利記録を統合します。部分的なバックアップによるデータ欠落を防ぎます。',
    '保留收藏與個人化設定；桌面版版本號更新至 1.0.1。':'コレクションと個人設定を維持し、デスクトップ版のバージョンを1.0.1に更新しました。',
    '完成程式語法、JSON、資料數量及匯入合併檢查；Windows 安裝後的實機測試需另行確認。':'コード構文、JSON、データ件数、読み込み時の統合処理を確認しました。Windowsへのインストール後の実機テストは別途確認が必要です。',
    'Windows Electron 桌面版':'Windows Electronデスクトップ版',
    '加入 Electron 桌面程式架構，可將既有網站包裝成 Windows x64 應用程式。':'既存のウェブサイトをWindows x64アプリとしてパッケージ化するElectron構成を追加しました。',
    '沿用網站的挑戰介面與 JSON 備份匯入／匯出，支援網站與桌面版之間手動搬移紀錄。':'ウェブ版のチャレンジ画面とJSONバックアップの読み込み／書き出しを利用し、ウェブ版とデスクトップ版の間で記録を手動移行できます。',
    '新增 GitHub Actions Windows 安裝檔建置流程及 GitHub Releases 發布入口。':'GitHub ActionsによるWindowsインストーラーのビルド手順と、GitHub Releasesでの配布機能を追加しました。',
    '網站與桌面版的本機儲存空間彼此獨立，不會自動同步。':'ウェブ版とデスクトップ版のローカル保存領域は別々で、自動同期されません。',
    '首次進站新手導覽':'初回アクセス時のガイド',
    '首次進入網站時自動顯示五步驟導覽，介紹挑戰目標、進度總覽、搜尋篩選、智慧隨機挑戰及設定／備份／OBS。':'初回アクセス時に5ステップのガイドを自動表示し、チャレンジ目標、進捗概要、検索と絞り込み、スマートランダムチャレンジ、設定／バックアップ／OBSを紹介します。',
    '每一步可使用上一步、下一步或跳過；完成或跳過後不再自動出現。':'各ステップで「戻る」「次へ」「スキップ」を選べます。完了またはスキップすると、自動では再表示されません。',
    '可從功能說明重新觀看，導覽狀態獨立儲存，不會修改挑戰紀錄。':'機能ガイドから再度見ることができます。ガイドの状態は個別に保存され、チャレンジ記録には影響しません。',
    '功能入口按鈕文字化':'機能ボタンのテキスト化',
    '功能說明改為一般文字按鈕，不再使用問號符號。':'機能ガイドを疑問符アイコンではなく、通常のテキストボタンに変更しました。',
    '更新日誌入口移除裝飾圖示，統一使用文字按鈕。':'更新履歴のボタンから装飾アイコンを削除し、テキストボタンに統一しました。',
    '保留功能說明固定在畫面右下角，以及網站內更新日誌視窗。':'画面右下に固定された機能ガイドと、サイト内の更新履歴ウィンドウを維持しました。',
    '功能說明與更新日誌入口調整':'機能ガイドと更新履歴へのアクセス調整',
    '功能說明改為固定在畫面右下角，捲動畫面時仍可開啟。':'画面をスクロールしても開けるよう、機能ガイドボタンを画面右下に固定しました。',
    '新增網站內更新日誌視窗，集中查看版本調整。':'バージョンごとの変更点をまとめて確認できる、サイト内の更新履歴ウィンドウを追加しました。',
    '漢堡選單與功能說明':'ハンバーガーメニューと機能ガイド',
    '使用左上角三條線集中管理挑戰工具、個人化設定、備份還原與 OBS 模式。':'左上の三本線メニューに、チャレンジツール、個人設定、バックアップと復元、OBSモードをまとめました。',
    '新增功能說明視窗，集中介紹各區塊用途。':'各セクションの機能をまとめて紹介するガイドウィンドウを追加しました。',
    '可收合的工具列':'折りたたみ式ツールバー',
    '將較少使用的操作分組收合，減少主畫面工具按鈕的擁擠感。':'使用頻度の低い操作をグループごとに折りたたみ、メイン画面のボタンを整理しました。',
    '保留搜尋、職業、進度、收藏與排序等常用篩選。':'検索、バトルスタイル、進捗、お気に入り、並び替えなど、よく使う絞り込み機能は引き続き利用できます。',
    '挑戰工具與資料保護調整':'チャレンジツールとデータ保護の調整',
    '加入智慧隨機挑戰、最愛標記與個人化顯示設定。':'スマートランダムチャレンジ、お気に入りマーク、表示の個人設定を追加しました。',
    '加強備份匯出與匯入檢查，匯入前先保護現有紀錄。':'バックアップの書き出し／読み込みチェックを強化し、読み込み前に既存の記録を保護します。',
    'OBS 統計簡化為勝利數、剩餘技能組與已完成寶可夢。':'OBSの統計表示を、勝利数、残りのわざセット、達成したポケモンに簡略化しました。',
    'V37.4':'V37.4',
    '更新日誌與功能說明多語言化':'更新履歴と機能ガイドの多言語対応',
    '功能使用說明新增英文與日文完整內容，會隨介面語言切換。':'機能ガイドに英語・日本語の全文を追加し、表示言語に合わせて切り替わるようにしました。',
    '網站更新日誌 V27～V37.4 新增英文與日文翻譯。':'サイト内のV27～V37.4の更新履歴に英語・日本語訳を追加しました。',
    '保留原有繁體中文內容、功能入口、視窗操作及新手導覽。':'既存の繁体字中国語の内容、機能ボタン、ダイアログ操作、初回ガイドを維持しました。',
    'V37.3':'V37.3',
    '技能名稱補齊':'わざ名の補完',
    '依使用者提供的 UTF-8 CSV 補齊原先以繁體中文代替的英文及日文技能名稱。':'ユーザー提供のUTF-8 CSVを使用し、繁体字中国語で代用されていた英語・日本語のわざ名を補完しました。',
    '保留使用者已修改的名稱；無法可靠對應的項目標記待核對。':'ユーザーが修正した名称を維持し、確実に対応付けられない項目は確認待ちとして表示します。'
  });
  // V37.5: multilingual role-color and dynamic-label fixes.
  Object.assign(translations.en, {
    '多語言顯示與定位色彩修正':'Multilingual Display and Role Color Fixes',
    '修正英文與日文介面切換後，寶可夢卡片定位顏色消失的問題。':'Fixed Pokémon card role colors disappearing after switching to English or Japanese.',
    '修正淺色主題的定位底色，保留五種定位的柔和色彩識別。':'Adjusted role backgrounds in the light theme to preserve the five soft role-color distinctions.',
    '補齊卡片數量、挑戰進度、隨機挑戰結果及備份時間等動態文字的語言切換。':'Localized dynamic text for card counts, challenge progress, unfinished lists, random challenge results, and backup timestamps.',
    '修正初始以英文開啟時，寶可夢英文名稱對照可能尚未載入的時序問題。':'Fixed a timing issue that could leave English Pokémon names unavailable when the app initially opened in English.',
    '補齊新手導覽、備份確認、驗證錯誤及常見操作提示的英文與日文內容。':'Localized the first-run tour, backup confirmations, validation errors, and common operation prompts in English and Japanese.',
    '修正固定流派名稱在未完成清單與隨機挑戰結果中的多語言顯示。':'Fixed multilingual display of fixed-build names in unfinished lists and random challenge results.',
    'V37.5：修正多語言介面定位色彩及動態文字顯示。':'V37.5: Fixed role colors and dynamic text in the multilingual interface.'
  });
  Object.assign(translations.ja, {
    '多語言顯示與定位色彩修正':'多言語表示とバトルスタイル色の修正',
    '修正英文與日文介面切換後，寶可夢卡片定位顏色消失的問題。':'英語または日本語に切り替えた後、ポケモンカードのバトルスタイル色が消える問題を修正しました。',
    '修正淺色主題的定位底色，保留五種定位的柔和色彩識別。':'ライトテーマの背景色を調整し、5種類のバトルスタイルを淡い色で区別できるようにしました。',
    '補齊卡片數量、挑戰進度、隨機挑戰結果及備份時間等動態文字的語言切換。':'カード数、チャレンジ進捗、未達成リスト、ランダムチャレンジ結果、バックアップ時刻などの動的テキストを多言語化しました。',
    '修正初始以英文開啟時，寶可夢英文名稱對照可能尚未載入的時序問題。':'英語で起動した際にポケモンの英語名データが未読み込みになる可能性があるタイミングの問題を修正しました。',
    '補齊新手導覽、備份確認、驗證錯誤及常見操作提示的英文與日文內容。':'初回ガイド、バックアップ確認、入力エラー、一般的な操作メッセージを英語と日本語に対応しました。',
    '修正固定流派名稱在未完成清單與隨機挑戰結果中的多語言顯示。':'未達成リストとランダムチャレンジ結果で、固定ビルド名が選択言語で表示されるよう修正しました。',
    'V37.5：修正多語言介面定位色彩及動態文字顯示。':'V37.5：多言語画面のバトルスタイル色と動的テキスト表示を修正しました。'
  });
  // V37.5: localized welcome-tour content, which is rendered dynamically by app.js.
  Object.assign(translations.en, {
    '歡迎使用全技能組一勝挑戰':'Welcome to the All Moveset Wins Challenge',
    '這個網站用來記錄每隻寶可夢不同技能搭配的勝利進度。完成設定、取得勝利，再回來勾選紀錄，就能逐步完成整份挑戰。':'Use this app to track wins for different movesets on each Pokémon. Configure a moveset, win a match, then return to record the result and work through the full challenge.',
    '設定技能組':'Configure movesets','取得對戰勝利':'Win a match','回來記錄進度':'Record your progress',
    '整個導覽約一分鐘，也可以隨時按「跳過導覽」。':'The tour takes about a minute. You can skip it at any time.',
    '先看整體挑戰進度':'Review your overall challenge progress',
    '頁面上方會統計已完成技能組、總技能組、剩餘技能組與已完成寶可夢。下方兩個區塊可以查看定位分布，以及還有哪些技能組尚未完成。':'The top of the page shows movesets won, total movesets, movesets remaining, and completed Pokémon. The two sections below show role distribution and unfinished movesets.',
    '已完成技能組':'Movesets Won','總技能組':'Total Movesets','剩餘技能組':'Movesets Remaining','已完成寶可夢':'Pokémon Completed',
    '點擊「全角色挑戰總覽」或「尚未完成的技能組」標題，可以展開或收起內容。':'Click the Challenge Overview or Unfinished Movesets heading to expand or collapse each section.',
    '搜尋、篩選並開啟角色卡片':'Search, filter, and open Pokémon cards',
    '使用搜尋欄查找寶可夢，也能依角色定位、挑戰進度、最愛或收藏狀態篩選。點擊寶可夢卡片，就能設定技能選項及勝利紀錄。':'Search for Pokémon or filter by role, challenge progress, favorites, or collection status. Select a Pokémon card to configure moves and record wins.',
    '搜尋寶可夢':'Search Pokémon','依定位與進度篩選':'Filter by role and progress','點擊卡片管理技能組':'Select a card to manage movesets',
    '星號可加入最愛，收藏按鈕則能標記想追蹤的角色。':'Use the star to add a favorite and the collection button to mark Pokémon you want to track.',
    '用智慧隨機挑戰決定下一個目標':'Choose your next target with Smart Random Challenge',
    '點擊左上角三條線，打開功能選單並展開「挑戰工具」，即可使用智慧隨機挑戰。你可以選擇定位、抽選數量、策略，或排除指定角色。':'Click the menu icon in the upper-left corner and expand Challenge Tools to open Smart Random Challenge. Choose roles, the number of picks, a strategy, or Pokémon to exclude.',
    '左上角功能選單':'Menu in the upper-left','挑戰工具':'Challenge Tools','智慧隨機挑戰 2.0':'Smart Random Challenge 2.0',
    '想自己安排目標，也可以直接使用主畫面的搜尋與篩選功能。':'You can also choose your own targets using Search and Filters on the main screen.',
    '設定、備份與直播顯示':'Settings, backups, and stream display',
    '功能選單中的「管理與顯示」包含個人化設定、備份與還原，以及 OBS 實況模式。紀錄存在目前瀏覽器，換電腦或清除網站資料前，請先匯出 JSON 備份。':'The Management & Display menu contains preferences, backup and restore, and OBS Overlay. Records are stored locally. Export a JSON backup before changing computers or clearing site data.',
    '個人化設定':'Preferences','備份與還原':'Backup & Restore','OBS 實況模式':'OBS Overlay',
    '導覽結束後就可以開始挑戰。需要時，也能從右下角「功能說明」重新查看各功能。':'You are ready to start after the tour. You can review the guide anytime using Help Guide in the lower-right corner.',
    '開始使用':'Get Started','下一步':'Next','上一步':'Previous','跳過導覽':'Skip Tour'
  });
  Object.assign(translations.ja, {
    '歡迎使用全技能組一勝挑戰':'全わざセット1勝チャレンジへようこそ',
    '這個網站用來記錄每隻寶可夢不同技能搭配的勝利進度。完成設定、取得勝利，再回來勾選紀錄，就能逐步完成整份挑戰。':'このアプリでは、ポケモンごとの異なるわざセットの勝利数を記録できます。わざセットを設定して対戦に勝利し、結果を記録しながらチャレンジを進めましょう。',
    '設定技能組':'わざセットを設定','取得對戰勝利':'対戦に勝利','回來記錄進度':'進捗を記録',
    '整個導覽約一分鐘，也可以隨時按「跳過導覽」。':'ガイドは約1分で完了します。いつでもスキップできます。',
    '先看整體挑戰進度':'チャレンジ全体の進捗を確認',
    '頁面上方會統計已完成技能組、總技能組、剩餘技能組與已完成寶可夢。下方兩個區塊可以查看定位分布，以及還有哪些技能組尚未完成。':'画面上部には達成したわざセット数、合計、残りのわざセット数、達成したポケモン数が表示されます。下の2つのセクションでは、バトルスタイル別の分布と未達成のわざセットを確認できます。',
    '已完成技能組':'達成したわざセット','總技能組':'わざセット合計','剩餘技能組':'残りのわざセット','已完成寶可夢':'達成したポケモン',
    '點擊「全角色挑戰總覽」或「尚未完成的技能組」標題，可以展開或收起內容。':'「チャレンジ概要」または「未達成のわざセット」の見出しをクリックすると、内容を展開／折りたたみできます。',
    '搜尋、篩選並開啟角色卡片':'検索・絞り込みからポケモンカードを開く',
    '使用搜尋欄查找寶可夢，也能依角色定位、挑戰進度、最愛或收藏狀態篩選。點擊寶可夢卡片，就能設定技能選項及勝利紀錄。':'検索欄でポケモンを探したり、バトルスタイル、進捗、お気に入り、コレクションで絞り込めます。カードを選ぶと、わざ候補の設定や勝利記録ができます。',
    '搜尋寶可夢':'ポケモンを検索','依定位與進度篩選':'スタイルと進捗で絞り込む','點擊卡片管理技能組':'カードを選んでわざセットを管理',
    '星號可加入最愛，收藏按鈕則能標記想追蹤的角色。':'星印でお気に入りに追加し、コレクションボタンで追跡したいポケモンを登録できます。',
    '用智慧隨機挑戰決定下一個目標':'スマートランダムチャレンジで次の目標を選ぶ',
    '點擊左上角三條線，打開功能選單並展開「挑戰工具」，即可使用智慧隨機挑戰。你可以選擇定位、抽選數量、策略，或排除指定角色。':'左上のメニューを開き、「チャレンジツール」を展開するとスマートランダムチャレンジを利用できます。バトルスタイル、選択数、方法、除外するポケモンを設定できます。',
    '左上角功能選單':'左上のメニュー','挑戰工具':'チャレンジツール','智慧隨機挑戰 2.0':'スマートランダムチャレンジ 2.0',
    '想自己安排目標，也可以直接使用主畫面的搜尋與篩選功能。':'自分で目標を選びたい場合は、メイン画面の検索と絞り込みを利用してください。',
    '設定、備份與直播顯示':'設定・バックアップ・配信表示',
    '功能選單中的「管理與顯示」包含個人化設定、備份與還原，以及 OBS 實況模式。紀錄存在目前瀏覽器，換電腦或清除網站資料前，請先匯出 JSON 備份。':'メニューの「管理・表示」には、個人設定、バックアップと復元、OBS配信モードがあります。記録はこのブラウザーに保存されます。パソコンの変更やサイトデータの削除前にJSONバックアップを書き出してください。',
    '個人化設定':'個人設定','備份與還原':'バックアップと復元','OBS 實況模式':'OBS配信モード',
    '導覽結束後就可以開始挑戰。需要時，也能從右下角「功能說明」重新查看各功能。':'ガイド終了後、チャレンジを開始できます。右下の「機能ガイド」からいつでも見直せます。',
    '開始使用':'開始','下一步':'次へ','上一步':'戻る','跳過導覽':'ガイドをスキップ'
  });
  // V37.5: localize validation, confirmation, and backup messages that are created at runtime.
  Object.assign(translations.en, {
    '自動組合模式下，技能一與技能二都至少需要一個選項。':'Combination mode requires at least one option for both Move 1 and Move 2.',
    '固定流派模式至少需要填寫一套完整技能搭配。':'Enter at least one complete moveset in Fixed Builds mode.',
    '單一勝利模式至少需要填寫一個技能名稱。':'Enter at least one move name in Single Win mode.',
    '最多可填 8 個技能選項或固定流派。':'You can enter up to 8 move options or fixed builds.',
    '無法儲存收藏設定，請檢查瀏覽器網站儲存空間。':'Could not save favorites. Check the browser site storage.',
    '設定儲存失敗，原本設定仍會保留。':'Could not save preferences. Your previous settings were kept.',
    '請輸入備份檔名（可自行修改，不需要輸入 .json）':'Enter a backup filename (you can edit it; do not include .json).',
    '無法建立備份檔，請檢查瀏覽器下載設定後重試。':'Could not create the backup. Check your browser download settings and try again.',
    '備份已匯出：':'Backup exported: ','快速備份已匯出，請妥善保存檔案。':'Quick backup exported. Keep the file somewhere safe.',
    '確定要清除此寶可夢的所有設定與勝利紀錄？':'Are you sure you want to clear all settings and win records for this Pokémon?',
    '備份檔格式驗證通過。\n\n匯入會取代目前瀏覽器中的挑戰紀錄。為保護現有資料，按「確定」會先自動下載一份目前紀錄的備份，再繼續匯入；按「取消」則完全不變更資料。\n\n確定要繼續嗎？':'The backup file passed validation.\n\nImporting will replace the challenge records in this browser. To protect your current data, choosing OK will first download a backup of the current records, then continue the import. Choosing Cancel will leave everything unchanged.\n\nDo you want to continue?',
    '備份檔超過 5 MB，已取消匯入。':'The backup file is larger than 5 MB. Import cancelled.',
    '匯入前備份下載失敗，為避免資料遺失，已取消匯入。原有紀錄沒有變更。':'The pre-import backup could not be downloaded. Import was cancelled to prevent data loss. Your current records were not changed.',
    '無法儲存匯入資料（可能是瀏覽器儲存空間不足或權限受限）。系統已嘗試還原原資料，請重新整理後確認紀錄。':'Could not save the imported data (browser storage may be full or access may be restricted). The app attempted to restore the previous data. Refresh and check your records.',
    '備份匯入成功，原紀錄已先備份。':'Backup imported successfully. Your previous records were backed up first.',
    '備份檔無法讀取或格式不正確。原有紀錄沒有變更。':'The backup file could not be read or has an invalid format. Your current records were not changed.',
    '無法建立備份檔，請稍後再試。':'Could not create the backup. Please try again later.',
    '備份檔最外層必須是 JSON 物件。':'The backup file must be a JSON object.',
    '找不到有效的 state 挑戰紀錄資料。':'No valid challenge record data was found in the state field.',
    '角色名稱格式不正確。':'The Pokémon name has an invalid format.',
    '個人化資料格式不正確。':'Personalization data has an invalid format.',
    '個人化設定必須是 JSON 物件。':'Preferences must be a JSON object.',
    '所有已設定的技能組都完成了！':'All configured movesets are complete!',
    '備份檔最外層必須是 JSON 物件。':'The backup file must be a JSON object.',
    '找不到有效的 state 挑戰紀錄資料。':'No valid challenge record data was found in the state field.',
    '角色名稱格式不正確。':'The Pokémon name has an invalid format.',
    '個人化資料格式不正確。':'Personalization data has an invalid format.',
    '個人化設定必須是 JSON 物件。':'Preferences must be a JSON object.',
    '一擊流':'Single-Strike Style','連擊流':'Rapid-Strike Style',
    '依挑戰進度篩選':'Filter by challenge progress','依收藏狀態篩選':'Filter by collection status','依角色定位篩選':'Filter by Pokémon role','角色排序':'Sort Pokémon','開啟功能選單':'Open menu','關閉功能選單':'Close menu','關閉選單':'Close menu','例如：皮卡丘、噴火龍':'e.g. Pikachu, Charizard','技能圖示':'Move icon',
    'WELCOME':'WELCOME','YOUR PROGRESS':'YOUR PROGRESS','FIND A POKÉMON':'FIND A POKÉMON','CHALLENGE TOOLS':'CHALLENGE TOOLS','SETTINGS & BACKUP':'SETTINGS & BACKUP'
  });
  Object.assign(translations.ja, {
    '自動組合模式下，技能一與技能二都至少需要一個選項。':'組み合わせモードでは、わざ1とわざ2にそれぞれ1つ以上入力してください。',
    '固定流派模式至少需要填寫一套完整技能搭配。':'固定ビルドモードでは、完全なわざセットを1つ以上入力してください。',
    '單一勝利模式至少需要填寫一個技能名稱。':'1勝モードでは、わざ名を1つ以上入力してください。',
    '最多可填 8 個技能選項或固定流派。':'わざ候補または固定ビルドは最大8件まで入力できます。',
    '無法儲存收藏設定，請檢查瀏覽器網站儲存空間。':'お気に入りを保存できません。ブラウザーの保存領域を確認してください。',
    '設定儲存失敗，原本設定仍會保留。':'個人設定を保存できませんでした。以前の設定は保持されています。',
    '請輸入備份檔名（可自行修改，不需要輸入 .json）':'バックアップファイル名を入力してください（変更できます。.json は不要です）。',
    '無法建立備份檔，請檢查瀏覽器下載設定後重試。':'バックアップを作成できません。ブラウザーのダウンロード設定を確認して再試行してください。',
    '備份已匯出：':'バックアップを書き出しました：','快速備份已匯出，請妥善保存檔案。':'クイックバックアップを書き出しました。安全な場所に保存してください。',
    '確定要清除此寶可夢的所有設定與勝利紀錄？':'このポケモンの設定と勝利記録をすべて削除してもよろしいですか？',
    '備份檔格式驗證通過。\n\n匯入會取代目前瀏覽器中的挑戰紀錄。為保護現有資料，按「確定」會先自動下載一份目前紀錄的備份，再繼續匯入；按「取消」則完全不變更資料。\n\n確定要繼續嗎？':'バックアップファイルの検証に成功しました。\n\n読み込むと、このブラウザーのチャレンジ記録が置き換わります。現在のデータを保護するため、「OK」を選ぶと現在の記録を先にバックアップしてから読み込みます。「キャンセル」を選ぶと何も変更しません。\n\n続行しますか？',
    '備份檔超過 5 MB，已取消匯入。':'バックアップファイルが5 MBを超えているため、読み込みを中止しました。',
    '匯入前備份下載失敗，為避免資料遺失，已取消匯入。原有紀錄沒有變更。':'読み込み前のバックアップをダウンロードできなかったため、データ損失を防ぐために読み込みを中止しました。現在の記録は変更されていません。',
    '無法儲存匯入資料（可能是瀏覽器儲存空間不足或權限受限）。系統已嘗試還原原資料，請重新整理後確認紀錄。':'読み込んだデータを保存できませんでした（ブラウザーの保存領域不足、またはアクセス制限の可能性があります）。元のデータの復元を試みました。再読み込みして記録を確認してください。',
    '備份匯入成功，原紀錄已先備份。':'バックアップを読み込みました。元の記録は事前にバックアップされています。',
    '備份檔無法讀取或格式不正確。原有紀錄沒有變更。':'バックアップファイルを読み取れないか、形式が正しくありません。現在の記録は変更されていません。',
    '無法建立備份檔，請稍後再試。':'バックアップを作成できません。後でもう一度お試しください。',
    '備份檔最外層必須是 JSON 物件。':'バックアップファイルはJSONオブジェクトである必要があります。',
    '找不到有效的 state 挑戰紀錄資料。':'有効なチャレンジ記録データが見つかりません。',
    '角色名稱格式不正確。':'ポケモン名の形式が正しくありません。',
    '個人化資料格式不正確。':'個人データの形式が正しくありません。',
    '個人化設定必須是 JSON 物件。':'個人設定はJSONオブジェクトである必要があります。',
    '一擊流':'いちげきのかた','連擊流':'れんげきのかた',
    '依挑戰進度篩選':'チャレンジ進捗で絞り込む','依收藏狀態篩選':'コレクション状態で絞り込む','依角色定位篩選':'バトルスタイルで絞り込む','角色排序':'ポケモンの並び順','開啟功能選單':'メニューを開く','關閉功能選單':'メニューを閉じる','關閉選單':'メニューを閉じる','例如：皮卡丘、噴火龍':'例：ピカチュウ、リザードン','技能圖示':'わざアイコン',
    'WELCOME':'ようこそ','YOUR PROGRESS':'進捗状況','FIND A POKÉMON':'ポケモンを探す','CHALLENGE TOOLS':'チャレンジツール','SETTINGS & BACKUP':'設定とバックアップ'
  });
  // Japanese Pokémon names are only populated where the official Japanese spelling is confidently mapped.
  const jaNames = {
    '阿勃梭魯':'アブソル','堅盾劍怪':'ギルガルド','霜奶仙':'マホイップ','紅蓮鎧騎':'グレンアルマ','急凍鳥':'フリーザー','瑪力露麗':'マリルリ','水箭龜':'カメックス','火焰雞':'バシャーモ','幸福蛋':'ハピナス','爆肌蚊':'マッシブーン','蒼炎刃鬼':'ソウブレイズ','水晶燈火靈':'シャンデラ','噴火龍':'リザードン','超級噴火龍 X':'メガリザードンX','超級噴火龍 Y':'メガリザードンY','閃焰王牌':'エースバーン','皮可西':'ピクシー','花療環環':'キュワワー','古月鳥':'ウッウ','岩殿居蟹':'イワパレス','達克萊伊':'ダークライ','狙射樹梟':'ジュナイパー','妖火紅狐':'マフォクシー','破破舵輪':'ダダリン','嘟嘟利':'ドードリオ','多龍巴魯托':'ドラパルト','快龍':'カイリュー','鋁鋼龍':'ジュラルドン','白蓬蓬':'ワタシラガ','帝王拿波':'エンペルト','太陽伊布':'エーフィ','列陣兵':'タイレーツ','大力鱷':'オーダイル','火伊布':'ブースター','烈咬陸鯊':'ガブリアス','沙奈朵':'サーナイト','耿鬼':'ゲンガー','冰伊布':'グレイシア','黏美龍':'ヌメルゴン','藏飽栗鼠':'ヨクバリス','甲賀忍蛙':'ゲッコウガ','暴鯉龍':'ギャラドス','超級暴鯉龍':'メガギャラドス','鳳王':'ホウオウ','胡帕':'フーパ','千面避役':'インテレオン','雷伊布':'サンダース','拉普拉斯':'ラプラス','拉帝亞斯':'ラティアス','拉帝歐斯':'ラティオス','葉伊布':'リーフィア','路卡利歐':'ルカリオ','超級路卡利歐':'メガルカリオ','怪力':'カイリキー','象牙豬':'マンムー','大竺葵':'メガニウム','魔幻假面喵':'マスカーニャ','喵喵':'ニャース','巨金怪':'メタグロス','夢幻':'ミュウ','謎擬Ｑ':'ミミッキュ','密勒頓':'ミライドン','火焰鳥':'ファイヤー','莫魯貝可':'モルペコ','魔牆人偶':'バリヤード','阿羅拉九尾':'アローラキュウコン','帕路奇亞':'パルキア','巴布土撥':'パーモット','皮卡丘':'ピカチュウ','可達鴨':'コダック','狂歡浪舞鴨':'ウェーニバル','阿羅拉雷丘':'アローラライチュウ','伽勒爾烈焰馬':'ガラルギャロップ','萊希拉姆':'レシラム','勾魂眼':'ヤミラミ','巨鉗螳螂':'ハッサム','蔥遊兵':'ネギガナイト','骨紋巨聲鱷':'ラウドボーン','呆殼獸':'ヤドラン','卡比獸':'カビゴン','索爾迦雷歐':'ソルガレオ','水君':'スイクン','仙子伊布':'ニンフィア','烈箭鷹':'ファイアロー','巨鍛匠':'デカヌチャン','顫弦蠑螈':'ストリンダー','朽木妖':'オーロット','甜冷美后':'アマージョ','火爆獸':'バクフーン','班基拉斯':'バンギラス','月亮伊布':'ブラッキー','武道熊師':'ウーラオス','水伊布':'シャワーズ','妙蛙花':'フシギバナ','胖可丁':'プクリン','伊裴爾塔爾':'イベルタル','蒼響':'ザシアン','閃電鳥':'サンダー','捷拉奧拉':'ゼラオラ','索羅亞克':'ゾロアーク'
  };
  const labels = {zh:'繁體中文',en:'English',ja:'日本語'};
  let lang = localStorage.getItem(LANG_KEY) || 'zh';
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  function t(value){ return (translations[lang]||{})[value] || value; }
  function translateTree(root=document.body){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(!originalText.has(node)) originalText.set(node,node.nodeValue);
      const raw=originalText.get(node); const trimmed=raw.trim();
      if(!trimmed) return;
      const translated=lang==='zh'?raw:(t(trimmed)===trimmed?raw:(raw.replace(trimmed,t(trimmed))));
      if(node.nodeValue!==translated) node.nodeValue=translated;
    });
    root.querySelectorAll?.('[placeholder],[aria-label],[title]').forEach(el=>{
      ['placeholder','aria-label','title'].forEach(attr=>{if(!originalAttrs.has(el))originalAttrs.set(el,{});const saved=originalAttrs.get(el);if(!(attr in saved))saved[attr]=el.getAttribute(attr);const raw=saved[attr];if(raw!==null)el.setAttribute(attr,lang==='zh'?raw:(translations[lang]?.[raw]||raw));});
    });
  }
  function displayPokemonName(zh){ if(lang==='en') return window.__pokemonNameMap?.[zh] || zh; if(lang==='ja') return jaNames[zh] || zh; return zh; }
  function switchLanguage(next){ lang=['zh','en','ja'].includes(next)?next:'zh'; localStorage.setItem(LANG_KEY,lang); document.documentElement.lang=lang==='zh'?'zh-Hant':lang; const select=document.getElementById('languageSelect'); if(select)select.value=lang; document.querySelectorAll('option[data-role-value]').forEach(o=>o.textContent=t(o.dataset.roleValue)); translateTree(); window.dispatchEvent(new CustomEvent('app-language-change',{detail:{lang}})); }
  function addSelector(){const host=document.querySelector('.header-actions'); if(!host||document.getElementById('languageSelect'))return; const wrap=document.createElement('label');wrap.className='language-picker';wrap.innerHTML='<span>🌐</span><select id="languageSelect" aria-label="語言"><option value="zh">繁體中文</option><option value="en">English</option><option value="ja">日本語</option></select>';host.prepend(wrap);wrap.querySelector('select').addEventListener('change',e=>switchLanguage(e.target.value));}
  window.__i18n={get lang(){return lang;},t,displayPokemonName,switchLanguage,labels,jaNames};
  window.__pokemonNameMap={};
  document.addEventListener('DOMContentLoaded',()=>{addSelector();switchLanguage(lang);const observer=new MutationObserver(records=>records.forEach(r=>{r.addedNodes.forEach(n=>{if(n.nodeType===Node.TEXT_NODE)translateTree(n.parentElement||document.body);else if(n.nodeType===Node.ELEMENT_NODE)translateTree(n);} );}));observer.observe(document.body,{childList:true,subtree:true,characterData:true});});
})();
