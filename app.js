const STORAGE_KEY = "unite-all-moves-win-tracker-v23";
const PREV_V22_KEY = "unite-all-moves-win-tracker-v22";
const PREV_V21_KEY = "unite-all-moves-win-tracker-v21";
const PREV_V20_KEY = "unite-all-moves-win-tracker-v20";
const PREV_V19_KEY = "unite-all-moves-win-tracker-v17";
const PREV_V16_KEY = "unite-all-moves-win-tracker-v16";
const PREV_V14_KEY = "unite-all-moves-win-tracker-v14";
const PREV_V13_KEY = "unite-all-moves-win-tracker-v13";
const PREV_V12_KEY = "unite-all-moves-win-tracker-v12";
const PREVIOUS_STORAGE_KEY = "unite-all-moves-win-tracker-v11";
const LEGACY_STORAGE_KEY = "unite-all-moves-win-tracker-v10";
const OLDER_STORAGE_KEY = "unite-all-moves-win-tracker-v9";
const LAST_BACKUP_KEY = `${STORAGE_KEY}-last-backup-at`;
const BACKUP_NOTICE_KEY = `${STORAGE_KEY}-backup-notice-dismissed`;
let roster=[], state={}, activeName=null, draftWins={}, nameMap={}, avatars={}, roles={}, moveIcons={}, draftMove1=[], draftMove2=[];
const $=id=>document.getElementById(id);
const clean=s=>(s||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
function defaults(){return {mode:"unconfigured",move1:[],move2:[],wins:{}};}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function load(){
 try{
   const v23=localStorage.getItem(STORAGE_KEY);
   const v22=localStorage.getItem(PREV_V22_KEY);
    const v21=localStorage.getItem(PREV_V21_KEY);
   const v20=localStorage.getItem(PREV_V20_KEY);
   const v19=localStorage.getItem(PREV_V19_KEY);
   const v14=localStorage.getItem(PREV_V14_KEY);
   const v13=localStorage.getItem(PREV_V13_KEY);
   const v12=localStorage.getItem(PREV_V12_KEY);
   const v7=localStorage.getItem(PREVIOUS_STORAGE_KEY);
   const v6=localStorage.getItem(LEGACY_STORAGE_KEY);
   const v5=localStorage.getItem(OLDER_STORAGE_KEY);
   state=JSON.parse(v23 || v22 || v21 || v20 || v19 || v14 || v13 || v12 || v7 || v6 || v5 || "{}");
 }catch{state={};}
 Object.entries(nameMap).forEach(([zh,en])=>{if(state[en]&&!state[zh])state[zh]=state[en];if(state[en])delete state[en];});
 const presets=data.movesets||{};
 // V10：以使用者上傳的 pokemon.json 作為技能設定準則。
 // 同步模式與技能名稱，並只保留仍然存在的技能組勝利紀錄。
 Object.entries(presets).forEach(([n,c])=>{
   const current=state[n]||{};
   const next={mode:c.mode||"unconfigured",move1:c.move1||[],move2:c.move2||[],wins:{}};
   const validIds=new Set(
     next.mode==="single" ? ["__single_win__"] :
     next.mode==="paths" ? next.move1.map((path,i)=>"__path_"+i+"__:"+path) :
     next.mode==="combination" ? next.move1.flatMap(x=>next.move2.map(y=>x+"|||"+y)) : []
   );
   Object.entries(current.wins||{}).forEach(([id,won])=>{
     if(won && validIds.has(id)) next.wins[id]=true;
   });
   // Keep previous wins when a fixed path label is simplified or a former single-win Mega entry becomes one explicit path.
   if(next.mode==="paths"){
     next.move1.forEach((path,i)=>{
       const newId="__path_"+i+"__:"+path;
       if(next.wins[newId]) return;
       const oldPathWin=Object.entries(current.wins||{}).some(([oldId,won])=>
         won && (oldId.endsWith(":"+path) ||
           (n==="武道熊師" && oldId.endsWith(":"+(
             i===0 ? "一擊流："+path : "連擊流："+path
           )))
         )
       );
       const oldSingleWin=(["超級噴火龍 X","超級噴火龍 Y","超級路卡利歐","超級暴鯉龍"].includes(n) && current.wins["__single_win__"]);
       if(oldPathWin || oldSingleWin) next.wins[newId]=true;
     });
   }
   state[n]=next;
 });
 // Drop retired roster entries from saved state.
 delete state["飛天螳螂"];
 save();
}
function getConfig(name){return {...defaults(),...(state[name]||{}),wins:{...((state[name]||{}).wins||{})}};}
function combos(cfg){
 if(cfg.mode==="unconfigured")return [];
 if(cfg.mode==="single")return [{id:"__single_win__",label:"全部技能（單一路線，合併計算一勝）"}];
 if(cfg.mode==="paths")return (cfg.move1||[]).map((path,i)=>({id:"__path_"+i+"__:"+path,label:path}));
 const a=cfg.move1||[],b=cfg.move2||[];
 if(!a.length||!b.length)return [];
 return a.flatMap(x=>b.map(y=>({id:x+"|||"+y,label:x+" ＋ "+y})));
}
function counts(name){const c=getConfig(name),list=combos(c),won=list.filter(x=>c.wins[x.id]).length;return {won,total:list.length,done:list.length>0&&won===list.length,started:won>0,configured:c.mode!=="unconfigured"&&list.length>0};}
function renderStats(){let total=0,won=0,done=0,configured=0;const byRole={};roster.forEach(n=>{const c=counts(n),r=roles[n]||"未分類";total+=c.total;won+=c.won;if(c.done)done++;if(c.configured)configured++;if(!byRole[r])byRole[r]={pokemon:0,done:0,won:0,total:0};byRole[r].pokemon++;byRole[r].won+=c.won;byRole[r].total+=c.total;if(c.done)byRole[r].done++;});$("wonCount").textContent=won;$("totalCount").textContent=total;$("leftCount").textContent=total-won;$("donePokemon").textContent=done;$("rosterCount").textContent=`共 ${roster.length} 隻角色 · 已設定 ${configured} 隻`;$ ("wonPct").textContent=(total?Math.round(won/total*100):0)+"% 完成";const pct=total?Math.round(won/total*100):0;if($("overallPct")){ $("overallPct").textContent=pct+"%";$("overallBar").style.width=pct+"%";const order=["攻擊型","防禦型","敏捷型","平衡型","輔助型"];const colors={"攻擊型":"#e45d65","防禦型":"#45c78e","敏捷型":"#4e9fe7","平衡型":"#b28af0","輔助型":"#e5b84f"};$("roleOverview").innerHTML=order.map(r=>{const x=byRole[r]||{pokemon:0,done:0,won:0,total:0};return `<div class="overview-role" style="border-top:3px solid ${colors[r]}"><small>${r} · ${x.pokemon} 隻</small><strong>${x.done}/${x.pokemon}</strong><small>角色完成 · ${x.won}/${x.total} 組勝利</small></div>`;}).join("");}}
function renderUnfinished(){const items=[];roster.forEach(name=>{const cfg=getConfig(name);combos(cfg).forEach(x=>{if(!cfg.wins[x.id])items.push({name,label:x.label});});});const box=$("unfinishedList");if(!box)return;$("unfinishedCount").textContent=items.length+" 組";box.innerHTML=items.length?items.slice(0,40).map((x,i)=>`<button class="unfinished-item" data-name="${escapeHtml(x.name)}"><span><b>${escapeHtml(x.name)}</b><small>${escapeHtml(x.label)}</small></span><span>›</span></button>`).join(""):'<div class="unfinished-empty">🎉 所有已設定的技能組都完成了！</div>';box.querySelectorAll("button").forEach(b=>b.onclick=()=>openModal(b.dataset.name));}
function renderOverlay(){const mode=new URLSearchParams(location.search).get("mode");if(mode!=="overlay")return false;document.body.className="obs-mode";const total=roster.reduce((a,n)=>a+counts(n).total,0),won=roster.reduce((a,n)=>a+counts(n).won,0),done=roster.filter(n=>counts(n).done).length,pct=total?Math.round(won/total*100):0;document.body.innerHTML=`<main class="obs-wrap"><div class="obs-title">全技能組一勝挑戰</div><div class="obs-sub">POKÉMON UNITE · LIVE CHALLENGE</div><div class="obs-numbers"><div class="obs-number"><b>${won}</b><span>已取得勝利</span></div><div class="obs-number"><b>${total-won}</b><span>剩餘技能組</span></div><div class="obs-number"><b>${done}/${roster.length}</b><span>完成角色</span></div></div><div class="obs-bar"><span style="width:${pct}%"></span></div><div class="obs-hint">整體完成率 ${pct}% · 本機紀錄即時讀取</div></main>`;return true;}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){renderStats();renderUnfinished();const q=$("search").value.trim().toLowerCase(),f=$("filter").value,r=$("roleFilter").value;const list=roster.filter(n=>{const c=counts(n);return (n.toLowerCase().includes(q)||(nameMap[n]||"").toLowerCase().includes(q))&&(r==="all"||roles[n]===r)&&(f==="all"||(f==="progress"&&c.started&&!c.done)||(f==="done"&&c.done)||(f==="not"&&(!c.started||!c.configured))||(f==="unconfigured"&&!c.configured));});$("shownCount").textContent=`${list.length} 隻`;
 $("grid").innerHTML=list.map(n=>{const c=counts(n),pct=c.total?Math.round(c.won/c.total*100):0;const status=!c.configured?'<span class="status">待設定</span>':c.done?'<span class="status done">已完成</span>':c.started?'<span class="status started">進行中</span>':'<span class="status">未開始</span>';const avatar=avatars[n]||"";const role=roles[n]||"未分類";const roleClass={"攻擊型":"attacker","防禦型":"defender","敏捷型":"speedster","平衡型":"allrounder","輔助型":"supporter"}[role]||"";return `<article class="pokemon-card role-${roleClass}" data-name="${escapeHtml(n)}"><div class="card-top"><div class="pokemon-identity">${avatar?`<img class="pokemon-avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(n)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`:""}<span class="avatar-fallback" style="${avatar?"display:none":""}">${escapeHtml(n.slice(0,1))}</span><div class="pokemon-title"><span class="pokemon-name">${escapeHtml(n)}</span><small>${escapeHtml(nameMap[n]||"")}</small></div></div><div class="card-tags"><span class="role-tag">${escapeHtml(role)}</span>${status}</div></div><div class="card-progress"><span style="width:${pct}%"></span></div><div class="card-bottom"><span>${c.configured?`${c.won} / ${c.total} 組勝利`:"技能資料尚未設定"}</span><b>${c.configured?pct+"%":"—"}</b></div></article>`;}).join("");
 $("grid").querySelectorAll(".pokemon-card").forEach(el=>el.addEventListener("click",()=>openModal(el.dataset.name)));if(!list.length)$("grid").innerHTML='<p class="sub">找不到符合條件的寶可夢。</p>';}
function readDraft(){return {mode:$("countMode").value,move1:clean($("move1").value),move2:clean($("move2").value)};}
function syncModeUI(){const mode=$("countMode").value,single=mode==="single",paths=mode==="paths",unconfigured=mode==="unconfigured";$("move1Label").style.display=unconfigured?"none":"";$("move2Label").style.display=(single||paths||unconfigured)?"none":"";$("move1Label").firstChild.textContent=paths?"固定流派（每行一套完整技能搭配）":single?"技能名稱（僅供參考）":"技能一選項";$("move1").disabled=unconfigured;$("move2").disabled=single||paths||unconfigured;$("move1").value=draftMove1.join("\n");$("move2").value=draftMove2.join("\n");$("move1").placeholder=paths?"例如：一擊流：技能A＋技能B":single?"每行一個技能名稱":"每行一個技能選項";}
function openModal(name){activeName=name;const c=getConfig(name);$("modalTitle").textContent=name;const avatar=$("modalAvatar");avatar.src=avatars[name]||"";avatar.alt=name;avatar.style.display=avatars[name]?"block":"none";avatar.onerror=()=>avatar.style.display="none";$("countMode").value=c.mode;draftMove1=[...c.move1];draftMove2=[...c.move2];draftWins={...c.wins};syncModeUI();renderCombos();$("modal").classList.remove("hidden");document.body.style.overflow="hidden";}
function closeModal(){$("modal").classList.add("hidden");document.body.style.overflow="";}
const directMoveIconUrls={
 "阿羅拉雷丘":{
  "輔助力量":"https://archives.bulbagarden.net/media/upload/0/0c/UNITE_Alolan_Raichu_Stored_Power.png",
  "電球":"https://archives.bulbagarden.net/media/upload/5/54/UNITE_Alolan_Raichu_Electro_Ball.png",
  "十萬伏特":"https://archives.bulbagarden.net/media/upload/a/a1/UNITE_Alolan_Raichu_Thunderbolt.png",
  "精神強念":"https://archives.bulbagarden.net/media/upload/3/31/UNITE_Alolan_Raichu_Psychic.png"
 },
 "武道熊師":{
  "暗冥強擊":"https://www.pokemonunite.gg/res/img/pkmn/892_003.png",
  "地獄突刺":"https://www.pokemonunite.gg/res/img/pkmn/892_005.png",
  "水流連打":"https://www.pokemonunite.gg/res/img/pkmn/892_004.png",
  "流水裂破":"https://www.pokemonunite.gg/res/img/pkmn/892_006.png"
 }
};
// Unite-DB 的公開技能圖示 CDN。技能英文名稱沿用 pokemon.json 的 moveIcons 對照。
// 多數資料夾以 Pokémon 英文名稱命名；部分形態會沿用基礎名稱（例如 Alolan Raichu -> Raichu）。
const UNITE_DB_SKILL_CDN = "https://d275t8dp8rxb42.cloudfront.net/assets/skills";
const uniteDbSkillFolders = {
 "阿勃梭魯":"Absol", "阿羅拉雷丘":"Raichu", "火焰雞":"Blaziken", "武道熊師":"Urshifu",
 "巨鉗螳螂":"Scizor", "夢幻":"Mew", "妙蛙花":"Venusaur", "皮卡丘":"Pikachu",
 "閃焰王牌":"Cinderace", "沙奈朵":"Gardevoir", "堅盾劍怪":"Aegislash", "霜奶仙":"Alcremie",
 "紅蓮鎧騎":"Armarouge", "瑪力露麗":"Azumarill", "水箭龜":"Blastoise", "幸福蛋":"Blissey",
 "爆肌蚊":"Buzzwole", "蒼炎刃鬼":"Ceruledge", "水晶燈火靈":"Chandelure", "噴火龍":"Charizard",
 "皮可西":"Clefable", "花療環環":"Comfey", "古月鳥":"Cramorant", "岩殿居蟹":"Crustle"
};
function uniteDbMoveIconUrl(name, move){
 const folder=uniteDbSkillFolders[name];
 const englishMove=moveIcons[name]?.[move];
 if(!folder||!englishMove)return "";
 const file=encodeURIComponent(englishMove).replaceAll("%20","+");
 return `${UNITE_DB_SKILL_CDN}/${folder}/${file}.png`;
}
function legacyMoveIconUrl(name, move){
 const direct=directMoveIconUrls[name]?.[move];
 if(direct)return direct;
 const en=nameMap[name],slug=moveIcons[name]?.[move];
 if(!en||!slug)return "";
 const file=`UNITE_${en.replaceAll(" ","_")}_${slug.replaceAll(" ","_")}.png`;
 return `https://archives.bulbagarden.net/wiki/Special:Redirect/file/${encodeURIComponent(file).replaceAll("%2F","/")}`;
}
function moveIconCandidates(name,move){
 return [...new Set([uniteDbMoveIconUrl(name,move),legacyMoveIconUrl(name,move)].filter(Boolean))];
}
function skillChip(name,move){
 const candidates=moveIconCandidates(name,move);
 const first=candidates.shift()||"";
 const second=candidates.shift()||"";
 const img=first
  ? `<img class="skill-icon" src="${first}" data-fallback="${second}" alt="${escapeHtml(move)} 技能圖示" loading="lazy" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.dataset.fallback='';}else{this.replaceWith(Object.assign(document.createElement('span'),{className:'skill-icon-fallback',textContent:'✦'}))}">`
  : '<span class="skill-icon-fallback">✦</span>';
 return `<span class="skill-chip">${img}<span>${escapeHtml(move)}</span></span>`;
}
function comboSkills(name,label,cfg){if(cfg.mode==="combination"){const parts=label.split(" ＋ ");return parts.map(x=>skillChip(name,x)).join('<span class="skill-plus">＋</span>');}if(cfg.mode==="single"){return (cfg.move1||[]).map(x=>skillChip(name,x)).join("");}if(cfg.mode==="paths"){const text=label.includes(":")?label.split(":").slice(1).join(":").trim():label;return text.split(/[＋+]/).map(x=>skillChip(name,x.trim())).join('<span class="skill-plus">＋</span>');}return escapeHtml(label);}
function renderCombos(){const cfg=readDraft(),list=combos(cfg);$("comboSummary").textContent=cfg.mode==="unconfigured"?"尚未設定，不計入統計":`${list.length} 種組合 · ${list.filter(x=>draftWins[x.id]).length} 勝`;
 $("comboList").innerHTML=cfg.mode==="unconfigured"?'<p class="sub">此角色的技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。</p>':!list.length?'<p class="sub">請先填入技能名稱，每行一個選項。</p>':list.map((x,i)=>`<div class="combo-row"><div class="combo-name"><span style="color:#7187a2;margin-right:7px">${String(i+1).padStart(2,"0")}</span><div class="combo-skills">${comboSkills(activeName,x.label,cfg)}</div></div><button class="win-toggle ${draftWins[x.id]?"active":""}" data-id="${encodeURIComponent(x.id)}">${draftWins[x.id]?"✓ 已取得勝利":"＋ 記錄一勝"}</button></div>`).join("");
 $("comboList").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{const id=decodeURIComponent(btn.dataset.id);draftWins[id]=!draftWins[id];renderCombos();}));}
function saveCurrent(){const cfg=readDraft();if(cfg.mode==="combination"&&(!cfg.move1.length||!cfg.move2.length)){alert("自動組合模式下，技能一與技能二都至少需要一個選項。");return;}if((cfg.mode==="single"||cfg.mode==="paths")&&!cfg.move1.length){alert(cfg.mode==="paths"?"固定流派模式至少需要填寫一套完整技能搭配。":"單一勝利模式至少需要填寫一個技能名稱。");return;}if(cfg.move1.length>8||cfg.move2.length>4){alert("最多可填 8 個技能選項或固定流派。");return;}const valid=new Set(combos(cfg).map(x=>x.id)),wins={};Object.keys(draftWins).forEach(k=>{if(valid.has(k)&&draftWins[k])wins[k]=true;});state[activeName]={...cfg,wins};save();closeModal();render();toast("已儲存 "+activeName+" 的設定");}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800);}
function formatBackupDate(value){
 const date=new Date(value);
 if(Number.isNaN(date.getTime()))return "日期資料無法辨識";
 return date.toLocaleString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});
}
function renderBackupStatus(){
 const el=$("lastBackupText");
 if(!el)return;
 let last="";
 try{last=localStorage.getItem(LAST_BACKUP_KEY)||"";}catch{}
 el.textContent=last?`上次匯出：${formatBackupDate(last)}`:"上次匯出：尚未匯出";
}
function downloadBackup(reason="manual"){
 const now=new Date();
 const pad=n=>String(n).padStart(2,"0");
 const stamp=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
 const prefix=reason==="before-import"?"pokemon-unite-before-import-backup":"pokemon-unite-challenge-backup";
 const payload={format:"pokemon-unite-challenge-backup",version:23,exportedAt:now.toISOString(),state};
 let url="";
 try{
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json;charset=utf-8"});
  url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=`${prefix}_${stamp}.json`;
  a.style.display="none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
  try{localStorage.setItem(LAST_BACKUP_KEY,now.toISOString());}catch{}
  renderBackupStatus();
  return true;
 }catch(error){
  if(url)URL.revokeObjectURL(url);
  console.error("Backup export failed:",error);
  return false;
 }
}
function validateBackupPayload(obj){
 if(!obj||typeof obj!=="object"||Array.isArray(obj))throw new Error("備份檔最外層必須是 JSON 物件。");
 if(!obj.state||typeof obj.state!=="object"||Array.isArray(obj.state))throw new Error("找不到有效的 state 挑戰紀錄資料。");
 const allowedModes=new Set(["unconfigured","combination","single","paths"]);
 for(const [name,cfg] of Object.entries(obj.state)){
  if(typeof name!=="string"||!name.trim()||name.length>100)throw new Error("角色名稱格式不正確。");
  if(!cfg||typeof cfg!=="object"||Array.isArray(cfg))throw new Error(`「${name}」的紀錄格式不正確。`);
  if(cfg.mode!==undefined&&!allowedModes.has(cfg.mode))throw new Error(`「${name}」的勝利計算方式無法辨識。`);
  for(const field of ["move1","move2"]){
   if(cfg[field]===undefined)continue;
   if(!Array.isArray(cfg[field]))throw new Error(`「${name}」的 ${field} 必須是陣列。`);
   const limit=field==="move1"?8:4;
   if(cfg[field].length>limit)throw new Error(`「${name}」的技能選項超過允許數量。`);
   if(!cfg[field].every(v=>typeof v==="string"&&v.trim().length>0&&v.length<=150))throw new Error(`「${name}」包含無效的技能名稱。`);
  }
  if(cfg.wins!==undefined){
   if(!cfg.wins||typeof cfg.wins!=="object"||Array.isArray(cfg.wins))throw new Error(`「${name}」的勝利紀錄格式不正確。`);
   for(const [id,won] of Object.entries(cfg.wins)){
    if(typeof id!=="string"||id.length>500||typeof won!=="boolean")throw new Error(`「${name}」包含無效的勝利紀錄。`);
   }
  }
 }
 // JSON.parse creates plain data only. Clone before committing so the validated object is detached.
 return JSON.parse(JSON.stringify(obj.state));
}
function showFirstBackupNotice(){
 let dismissed=false;
 try{dismissed=localStorage.getItem(BACKUP_NOTICE_KEY)==="1";}catch{}
 if(dismissed)return;
 const notice=$("backupNotice");
 if(notice)notice.classList.remove("hidden");
}
function dismissFirstBackupNotice(){
 try{localStorage.setItem(BACKUP_NOTICE_KEY,"1");}catch{}
 const notice=$("backupNotice");
 if(notice)notice.classList.add("hidden");
}

$("search").addEventListener("input",render);$("filter").addEventListener("change",render);$("roleFilter").addEventListener("change",render);$("closeModal").onclick=closeModal;$("cancelModal").onclick=closeModal;$("modal").addEventListener("click",e=>{if(e.target.dataset.close)closeModal();});
$("move1").addEventListener("input",()=>{draftMove1=clean($("move1").value);renderCombos();});$("move2").addEventListener("input",()=>{draftMove2=clean($("move2").value);renderCombos();});
$("countMode").addEventListener("change",()=>{$("move1").value&&(draftMove1=clean($("move1").value));$("move2").value&&(draftMove2=clean($("move2").value));syncModeUI();renderCombos();});$("saveModal").onclick=saveCurrent;
$("resetPokemon").onclick=()=>{if(confirm("確定要清除此寶可夢的所有設定與勝利紀錄？")){draftWins={};draftMove1=[];draftMove2=[];$("countMode").value="unconfigured";syncModeUI();renderCombos();}};
$("exportBtn").onclick=()=>{if(downloadBackup())toast("備份已匯出，請妥善保存檔案。");else alert("無法建立備份檔，請檢查瀏覽器下載設定後重試。");};
$("importBtn").onclick=()=>$("importFile").click();$("obsBtn").onclick=()=>window.open(location.pathname+"?mode=overlay","unite-obs-overlay","width=900,height=500");
$("importFile").onchange=async e=>{
 const file=e.target.files?.[0];
 if(!file)return;
 try{
  if(file.size>5*1024*1024)throw new Error("備份檔超過 5 MB，已取消匯入。");
  const parsed=JSON.parse(await file.text());
  const candidateState=validateBackupPayload(parsed);
  const proceed=confirm(`備份檔格式驗證通過。

匯入會取代目前瀏覽器中的挑戰紀錄。為保護現有資料，按「確定」會先自動下載一份目前紀錄的備份，再繼續匯入；按「取消」則完全不變更資料。

確定要繼續嗎？`);
  if(!proceed)return;
  if(!downloadBackup("before-import"))throw new Error("匯入前備份下載失敗，為避免資料遺失，已取消匯入。原有紀錄沒有變更。");
  // Atomic commit: persist the fully validated candidate before changing in-memory state.
  // If localStorage throws (for example, quota/security restrictions), the current state stays intact.
  let serialized;
  try{serialized=JSON.stringify(candidateState);localStorage.setItem(STORAGE_KEY,serialized);}
  catch(storageError){throw new Error("無法儲存匯入資料（可能是瀏覽器儲存空間不足或權限受限）。原有紀錄沒有變更。");}
  state=candidateState;
  render();
  toast("備份匯入成功，原紀錄已先備份。");
 }catch(error){
  console.error("Backup import rejected:",error);
  alert(error.message||"備份檔無法讀取或格式不正確。原有紀錄沒有變更。");
 }finally{
  e.target.value="";
 }
};
$("backupNoticeDismiss").onclick=dismissFirstBackupNotice;
$("backupNoticeExport").onclick=()=>{if(downloadBackup()){dismissFirstBackupNotice();toast("備份已匯出，請妥善保存檔案。");}else alert("無法建立備份檔，請稍後再試。");};

// V11 隨機挑戰：從所有尚未取得勝利的技能組中抽選。
$("randomBtn").onclick=()=>{
 const pool=[];
 roster.forEach(name=>{const cfg=getConfig(name);combos(cfg).forEach(combo=>{if(!cfg.wins[combo.id])pool.push({name,id:combo.id,label:combo.label});});});
 if(!pool.length){toast("所有已設定技能組都完成了！");return;}
 const pick=pool[Math.floor(Math.random()*pool.length)];
 $("search").value="";$("filter").value="all";$("roleFilter").value="all";render();openModal(pick.name);
 setTimeout(()=>{const row=[...$("comboList").querySelectorAll(".combo-row")].find(el=>el.querySelector("button")?.dataset.id===encodeURIComponent(pick.id));if(row){row.classList.add("random-highlight");row.scrollIntoView({behavior:"smooth",block:"center"});}},80);
 toast(`隨機挑戰：${pick.name}｜${pick.label}`);
};

// V15：以明確按鈕控制兩個面板，避免原生 details/summary 在部分樣式或瀏覽器下無法辨識。
document.querySelectorAll("[data-panel-toggle]").forEach(button=>{
 button.addEventListener("click",()=>{
  const panel=document.getElementById(button.dataset.panelToggle);
  if(!panel)return;
  const expanded=button.getAttribute("aria-expanded")==="true";
  button.setAttribute("aria-expanded",String(!expanded));
  panel.classList.toggle("is-collapsed",expanded);
 });
});

let data={};fetch("pokemon.json").then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{data=d;roster=d.pokemon;nameMap=d.nameMap||{};avatars=d.avatars||{};roles=d.roles||{};moveIcons=d.moveIcons||{};load();if(!renderOverlay()){render();renderBackupStatus();showFirstBackupNotice();}}).catch(()=>$ ("grid").innerHTML='<p class="sub">無法載入 pokemon.json，請確認專案檔案都已上傳。</p>');

window.addEventListener("storage",e=>{if(e.key===STORAGE_KEY){try{state=JSON.parse(e.newValue||"{}");if(new URLSearchParams(location.search).get("mode")==="overlay")renderOverlay();else render();}catch{}}});

if(new URLSearchParams(location.search).get("mode")==="overlay"){setInterval(()=>{if(data&&roster.length)renderOverlay();},2000);}
