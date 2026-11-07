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
const FAVORITES_KEY = `${STORAGE_KEY}-favorites-v1`;
const COLLECTION_KEY = `${STORAGE_KEY}-collection-v1`;
const PREFERENCES_KEY = `${STORAGE_KEY}-preferences-v1`;
const DEFAULT_PREFERENCES = {theme:"dark",density:"comfortable",sort:"original",defaultRole:"all",defaultProgress:"all",animations:true,obsScale:"medium",obsShowTitle:true};
let roster=[], state={}, activeName=null, draftWins={}, nameMap={}, avatars={}, roles={}, moveIcons={}, draftMove1=[], draftMove2=[];
let favorites=new Set(), collection=new Set(), preferences={...DEFAULT_PREFERENCES};
const $=id=>document.getElementById(id);
const clean=s=>(s||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
function displayPokemonName(name){return window.__i18n?.displayPokemonName(name)||name;}
function displayMoveName(name,move){if(window.__i18n?.lang==="en")return moveIcons[name]?.[move]||move;return move;}
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
function renderUnfinished(){const items=[];roster.forEach(name=>{const cfg=getConfig(name);combos(cfg).forEach(x=>{if(!cfg.wins[x.id])items.push({name,label:x.label});});});const box=$("unfinishedList");if(!box)return;$("unfinishedCount").textContent=items.length+" 組";box.innerHTML=items.length?items.slice(0,40).map((x,i)=>`<button class="unfinished-item" data-name="${escapeHtml(x.name)}"><span><b>${escapeHtml(displayPokemonName(x.name))}</b><small>${escapeHtml(x.label)}</small></span><span>›</span></button>`).join(""):'<div class="unfinished-empty">🎉 所有已設定的技能組都完成了！</div>';box.querySelectorAll("button").forEach(b=>b.onclick=()=>openModal(b.dataset.name));}
function renderOverlay(){
 const mode=new URLSearchParams(location.search).get("mode");
 if(mode!=="overlay")return false;
 document.body.className="obs-mode";
 const total=roster.reduce((a,n)=>a+counts(n).total,0);
 const won=roster.reduce((a,n)=>a+counts(n).won,0);
 const done=roster.filter(n=>counts(n).done).length;
 document.body.innerHTML=`<main class="obs-wrap obs-scale-${preferences.obsScale||"medium"}">
   ${preferences.obsShowTitle?'<div class="obs-title">全技能組一勝挑戰</div>':""}
   <div class="obs-numbers">
     <div class="obs-number"><b>${won}</b><span>已取得勝利</span></div>
     <div class="obs-number"><b>${total-won}</b><span>剩餘技能組</span></div>
     <div class="obs-number"><b>${done}/${roster.length}</b><span>完成角色</span></div>
   </div>
 </main>`;
 return true;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){
 renderStats();renderUnfinished();
 const q=$("search").value.trim().toLowerCase(),f=$("filter").value,r=$("roleFilter").value,mark=$("savedFilter")?.value||"all";
 let list=roster.filter(n=>{
  const c=counts(n);
  return (n.toLowerCase().includes(q)||(nameMap[n]||"").toLowerCase().includes(q)||(displayPokemonName(n)||"").toLowerCase().includes(q)) &&
   (r==="all"||roles[n]===r) &&
   (f==="all"||(f==="progress"&&c.started&&!c.done)||(f==="done"&&c.done)||(f==="not"&&(!c.started||!c.configured))||(f==="unconfigured"&&!c.configured)) &&
   (mark==="all"||(mark==="favorites"&&favorites.has(n))||(mark==="collection"&&collection.has(n)));
 });
 const sort=$("sortOrder")?.value||preferences.sort;
 if(sort==="name")list.sort((a,b)=>a.localeCompare(b,"zh-Hant"));
 else if(sort==="progress-desc")list.sort((a,b)=>completionRatio(b)-completionRatio(a));
 else if(sort==="progress-asc")list.sort((a,b)=>completionRatio(a)-completionRatio(b));
 else if(sort==="favorites")list.sort((a,b)=>Number(favorites.has(b))-Number(favorites.has(a))||roster.indexOf(a)-roster.indexOf(b));
 $("shownCount").textContent=`${list.length} 隻`;
 $("grid").innerHTML=list.map(n=>{
  const c=counts(n),pct=c.total?Math.round(c.won/c.total*100):0;
  const status=!c.configured?'<span class="status">待設定</span>':c.done?'<span class="status done">已完成</span>':c.started?'<span class="status started">進行中</span>':'<span class="status">未開始</span>';
  const avatar=avatars[n]||"",role=roles[n]||"未分類";
  const roleClass={"攻擊型":"attacker","防禦型":"defender","敏捷型":"speedster","平衡型":"allrounder","輔助型":"supporter"}[role]||"";
  const isFavorite=favorites.has(n),isCollected=collection.has(n);
  return `<article class="pokemon-card role-${roleClass}" data-name="${escapeHtml(n)}"><div class="card-top"><div class="pokemon-identity">${avatar?`<img class="pokemon-avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(n)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`:""}<span class="avatar-fallback" style="${avatar?"display:none":""}">${escapeHtml(n.slice(0,1))}</span><div class="pokemon-title"><span class="pokemon-name">${escapeHtml(displayPokemonName(n))}</span><small>${escapeHtml(window.__i18n?.lang==="en"?n:window.__i18n?.lang==="ja"?(nameMap[n]||""):(nameMap[n]||""))}</small></div></div><div class="card-tags"><span class="role-tag">${escapeHtml(role)}</span>${status}<div class="card-markers"><button type="button" class="mark-btn favorite-btn ${isFavorite?"active":""}" data-action="favorite" data-name="${escapeHtml(n)}" aria-label="${isFavorite?"取消最愛":"加入最愛"}" title="${isFavorite?"取消最愛":"加入最愛"}">${isFavorite?"★":"☆"}</button><button type="button" class="mark-btn collection-btn ${isCollected?"active":""}" data-action="collection" data-name="${escapeHtml(n)}" aria-label="${isCollected?"移出收藏":"加入收藏"}" title="${isCollected?"移出收藏":"加入收藏"}">${isCollected?"▣":"▢"}</button></div></div></div><div class="card-progress"><span style="width:${pct}%"></span></div><div class="card-bottom"><span>${c.configured?`${c.won} / ${c.total} 組勝利`:"技能資料尚未設定"}</span><b>${c.configured?pct+"%":"—"}</b></div></article>`;
 }).join("");
 $("grid").querySelectorAll(".pokemon-card").forEach(el=>el.addEventListener("click",e=>{if(e.target.closest(".mark-btn"))return;openModal(el.dataset.name);}));
 $("grid").querySelectorAll(".mark-btn").forEach(btn=>btn.addEventListener("click",e=>{e.stopPropagation();toggleSaved(btn.dataset.name,btn.dataset.action);}));
 if(!list.length)$("grid").innerHTML='<p class="sub">找不到符合條件的寶可夢。</p>';
}
function completionRatio(name){const c=counts(name);return c.total?c.won/c.total:0;}
function readDraft(){return {mode:$("countMode").value,move1:clean($("move1").value),move2:clean($("move2").value)};}
function syncModeUI(){const mode=$("countMode").value,single=mode==="single",paths=mode==="paths",unconfigured=mode==="unconfigured";$("move1Label").style.display=unconfigured?"none":"";$("move2Label").style.display=(single||paths||unconfigured)?"none":"";$("move1Label").firstChild.textContent=paths?"固定流派（每行一套完整技能搭配）":single?"技能名稱（僅供參考）":"技能一選項";$("move1").disabled=unconfigured;$("move2").disabled=single||paths||unconfigured;$("move1").value=draftMove1.join("\n");$("move2").value=draftMove2.join("\n");$("move1").placeholder=paths?"例如：一擊流：技能A＋技能B":single?"每行一個技能名稱":"每行一個技能選項";}
function openModal(name){activeName=name;const c=getConfig(name);$("modalTitle").textContent=displayPokemonName(name);const avatar=$("modalAvatar");avatar.src=avatars[name]||"";avatar.alt=name;avatar.style.display=avatars[name]?"block":"none";avatar.onerror=()=>avatar.style.display="none";$("countMode").value=c.mode;draftMove1=[...c.move1];draftMove2=[...c.move2];draftWins={...c.wins};syncModeUI();renderCombos();$("modal").classList.remove("hidden");document.body.style.overflow="hidden";}
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
 return `<span class="skill-chip">${img}<span>${escapeHtml(displayMoveName(name,move))}</span></span>`;
}
function comboSkills(name,label,cfg){if(cfg.mode==="combination"){const parts=label.split(" ＋ ");return parts.map(x=>skillChip(name,x)).join('<span class="skill-plus">＋</span>');}if(cfg.mode==="single"){return (cfg.move1||[]).map(x=>skillChip(name,x)).join("");}if(cfg.mode==="paths"){const text=label.includes(":")?label.split(":").slice(1).join(":").trim():label;return text.split(/[＋+]/).map(x=>skillChip(name,x.trim())).join('<span class="skill-plus">＋</span>');}return escapeHtml(label);}
function renderCombos(){const cfg=readDraft(),list=combos(cfg);$("comboSummary").textContent=cfg.mode==="unconfigured"?"尚未設定，不計入統計":`${list.length} 種組合 · ${list.filter(x=>draftWins[x.id]).length} 勝`;
 $("comboList").innerHTML=cfg.mode==="unconfigured"?'<p class="sub">此角色的技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。</p>':!list.length?'<p class="sub">請先填入技能名稱，每行一個選項。</p>':list.map((x,i)=>`<div class="combo-row"><div class="combo-name"><span style="color:#7187a2;margin-right:7px">${String(i+1).padStart(2,"0")}</span><div class="combo-skills">${comboSkills(activeName,x.label,cfg)}</div></div><button class="win-toggle ${draftWins[x.id]?"active":""}" data-id="${encodeURIComponent(x.id)}">${draftWins[x.id]?"✓ 已取得勝利":"＋ 記錄一勝"}</button></div>`).join("");
 $("comboList").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{const id=decodeURIComponent(btn.dataset.id);draftWins[id]=!draftWins[id];renderCombos();}));}
function saveCurrent(){const cfg=readDraft();if(cfg.mode==="combination"&&(!cfg.move1.length||!cfg.move2.length)){alert("自動組合模式下，技能一與技能二都至少需要一個選項。");return;}if((cfg.mode==="single"||cfg.mode==="paths")&&!cfg.move1.length){alert(cfg.mode==="paths"?"固定流派模式至少需要填寫一套完整技能搭配。":"單一勝利模式至少需要填寫一個技能名稱。");return;}if(cfg.move1.length>8||cfg.move2.length>4){alert("最多可填 8 個技能選項或固定流派。");return;}const valid=new Set(combos(cfg).map(x=>x.id)),wins={};Object.keys(draftWins).forEach(k=>{if(valid.has(k)&&draftWins[k])wins[k]=true;});state[activeName]={...cfg,wins};save();closeModal();render();toast("已儲存 "+activeName+" 的設定");}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800);}
function loadUserData(){
 try{favorites=new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY)||"[]").filter(n=>roster.includes(n)));}catch{favorites=new Set();}
 try{collection=new Set(JSON.parse(localStorage.getItem(COLLECTION_KEY)||"[]").filter(n=>roster.includes(n)));}catch{collection=new Set();}
 try{preferences={...DEFAULT_PREFERENCES,...JSON.parse(localStorage.getItem(PREFERENCES_KEY)||"{}")};}catch{preferences={...DEFAULT_PREFERENCES};}
 applyPreferences();
}
function saveUserData(){
 const keys=[FAVORITES_KEY,COLLECTION_KEY,PREFERENCES_KEY];
 const values=[JSON.stringify([...favorites]),JSON.stringify([...collection]),JSON.stringify(preferences)];
 const previous=Object.fromEntries(keys.map(key=>[key,localStorage.getItem(key)]));
 try{keys.forEach((key,index)=>localStorage.setItem(key,values[index]));}
 catch(error){
  keys.forEach(key=>{try{if(previous[key]===null)localStorage.removeItem(key);else localStorage.setItem(key,previous[key]);}catch(rollbackError){console.error("User-data rollback failed for",key,rollbackError);}});
  throw error;
 }
}
function toggleSaved(name,type){
 const target=type==="favorite"?favorites:collection;
 if(target.has(name))target.delete(name);else target.add(name);
 try{saveUserData();}catch(error){alert("無法儲存收藏設定，請檢查瀏覽器網站儲存空間。");if(target.has(name))target.delete(name);else target.add(name);return;}
 render();
 toast(type==="favorite"?(favorites.has(name)?`已將 ${name} 加入最愛`:`已取消 ${name} 的最愛`):(collection.has(name)?`已將 ${name} 加入收藏`:`已將 ${name} 移出收藏`));
}
function applyPreferences(){
 document.body.classList.toggle("light-theme",preferences.theme==="light");
 document.body.classList.toggle("compact-cards",preferences.density==="compact");
 document.body.classList.toggle("reduce-motion",!preferences.animations);
 const role=$("roleFilter"),progress=$("filter"),sort=$("sortOrder");
 if(role)role.value=preferences.defaultRole||"all";
 if(progress)progress.value=preferences.defaultProgress||"all";
 if(sort)sort.value=preferences.sort||"original";
}
function openSettings(){
 $("settingTheme").value=preferences.theme;
 $("settingDensity").value=preferences.density;
 $("settingSort").value=preferences.sort;
 $("settingRole").value=preferences.defaultRole;
 $("settingProgress").value=preferences.defaultProgress;
 $("settingAnimations").checked=!!preferences.animations;
 $("settingObsScale").value=preferences.obsScale;
 $("settingObsTitle").checked=!!preferences.obsShowTitle;
 $("settingsModal").classList.remove("hidden");document.body.style.overflow="hidden";
}
function closeSettings(){$("settingsModal").classList.add("hidden");document.body.style.overflow="";}
function saveSettings(){
 preferences={
  theme:$("settingTheme").value,
  density:$("settingDensity").value,
  sort:$("settingSort").value,
  defaultRole:$("settingRole").value,
  defaultProgress:$("settingProgress").value,
  animations:$("settingAnimations").checked,
  obsScale:$("settingObsScale").value,
  obsShowTitle:$("settingObsTitle").checked
 };
 try{saveUserData();}catch(error){alert("設定儲存失敗，原本設定仍會保留。");loadUserData();return;}
 applyPreferences();$("savedFilter").value="all";render();closeSettings();toast("個人化設定已儲存");
}
function openRandomModal(){
 $("randomRole").value="all";$("randomQuantity").value="3";$("randomStrategy").value="random";$("randomExcludeFavorites").checked=false;$("randomExcludeNames").value="";
 $("randomResults").innerHTML="";$("randomResults").classList.add("hidden");
 $("randomModal").classList.remove("hidden");document.body.style.overflow="hidden";
}
function closeRandomModal(){$("randomModal").classList.add("hidden");document.body.style.overflow="";}
function drawSmartChallenges(){
 const role=$("randomRole").value,quantity=Number($("randomQuantity").value)||1,strategy=$("randomStrategy").value;
 const excluded=new Set($("randomExcludeNames").value.split(/[、,，;；]+/).map(x=>x.trim()).filter(Boolean));
 const excludeFavorites=$("randomExcludeFavorites").checked;
 const pool=[];
 roster.forEach(name=>{
  if(role!=="all"&&roles[name]!==role)return;
  if(excluded.has(name)||(nameMap[name]&&excluded.has(nameMap[name])))return;
  if(excludeFavorites&&favorites.has(name))return;
  const cfg=getConfig(name),all=combos(cfg),remaining=all.filter(combo=>!cfg.wins[combo.id]);
  if(!remaining.length)return;
  const picked=remaining[Math.floor(Math.random()*remaining.length)];
  const c=counts(name);
  pool.push({name,id:picked.id,label:picked.label,ratio:c.total?c.won/c.total:0,remaining:remaining.length,won:c.won,total:c.total,tie:Math.random()});
 });
 if(strategy==="low-progress")pool.sort((a,b)=>a.ratio-b.ratio||a.tie-b.tie);
 else if(strategy==="many-sets")pool.sort((a,b)=>b.remaining-a.remaining||a.tie-b.tie);
 else for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
 const result=pool.slice(0,quantity);
 if(!result.length){toast("沒有符合條件的未完成角色，請調整篩選條件。");return;}
 $("randomResults").classList.remove("hidden");
 $("randomResults").innerHTML=`<div class="random-result-head"><strong>抽選結果</strong><span>${result.length} / ${quantity} 個目標</span></div>`+result.map((item,index)=>`<button type="button" class="random-result-item" data-name="${escapeHtml(item.name)}" data-combo="${encodeURIComponent(item.id)}"><span class="random-result-index">${index+1}</span><span class="random-result-info"><b>${escapeHtml(displayPokemonName(item.name))}</b><small>${escapeHtml(item.label)} · ${item.won}/${item.total} 勝</small></span><span class="random-result-open">開啟 ›</span></button>`).join("");
 $("randomResults").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{
  const name=btn.dataset.name,id=decodeURIComponent(btn.dataset.combo);
  closeRandomModal();$("search").value="";$("filter").value="all";$("roleFilter").value="all";$("savedFilter").value="all";render();openModal(name);
  setTimeout(()=>{const row=[...$("comboList").querySelectorAll(".combo-row")].find(el=>el.querySelector("button")?.dataset.id===encodeURIComponent(id));if(row){row.classList.add("random-highlight");row.scrollIntoView({behavior:preferences.animations?"smooth":"auto",block:"center"});}},80);
  toast(`挑戰目標：${name}`);
 }));
 if(result.length<quantity)toast(`符合條件的角色只有 ${result.length} 隻，已全部列出。`);
}
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
function makeBackupTimestamp(date=new Date()){
 const pad=n=>String(n).padStart(2,"0");
 return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
}
function makeBackupPayload(now=new Date()){
 return {format:"pokemon-unite-challenge-backup",version:24,exportedAt:now.toISOString(),state,userData:{favorites:[...favorites],collection:[...collection],preferences:{...preferences}}};
}
function sanitizeBackupFilename(input,fallback){
 let name=String(input??"").trim();
 name=name.replace(/\.json$/i,"")
  .replace(/[<>:"/\\|?*\u0000-\u001F]/g,"-")
  .replace(/\s+/g,"-")
  .replace(/-+/g,"-")
  .replace(/^\.+|\.+$/g,"")
  .slice(0,120)
  .replace(/[. -]+$/g,"");
 if(!name)name=fallback;
 return `${name}.json`;
}
function startBackupDownload(filename){
 const now=new Date();
 let url="";
 try{
  const blob=new Blob([JSON.stringify(makeBackupPayload(now),null,2)],{type:"application/json;charset=utf-8"});
  url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=filename;
  a.style.display="none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
  try{localStorage.setItem(LAST_BACKUP_KEY,now.toISOString());}catch(storageError){console.warn("Could not save last backup timestamp:",storageError);}
  renderBackupStatus();
  return true;
 }catch(error){
  if(url)URL.revokeObjectURL(url);
  console.error("Backup export failed:",error);
  return false;
 }
}
// One-click export: a timestamped filename is generated automatically.
function downloadBackup(reason="quick"){
 const prefix=reason==="before-import"?"pokemon-unite-before-import-backup":"pokemon-unite-challenge-backup";
 return startBackupDownload(`${prefix}_${makeBackupTimestamp()}.json`);
}
// Manual export: retain the original editable-filename workflow.
function exportBackupWithCustomName(){
 const suggested=`pokemon-unite-challenge-backup_${makeBackupTimestamp()}`;
 const input=prompt("請輸入備份檔名（可自行修改，不需要輸入 .json）",suggested);
 if(input===null)return false;
 const filename=sanitizeBackupFilename(input,suggested);
 if(!startBackupDownload(filename)){
  alert("無法建立備份檔，請檢查瀏覽器下載設定後重試。");
  return false;
 }
 toast(`備份已匯出：${filename}`);
 return true;
}

function mergeBackupWithPreset(importedState){
 // The bundled pokemon.json is the canonical source for the complete roster
 // and current skill-set definitions. A website backup contributes progress,
 // not a partial replacement for the bundled catalogue.
 const merged={};
 const englishToChinese=Object.fromEntries(Object.entries(nameMap).map(([zh,en])=>[en,zh]));
 const importedByChinese={...importedState};
 Object.entries(importedState).forEach(([name,cfg])=>{
  const zh=englishToChinese[name];
  if(zh && !importedByChinese[zh]) importedByChinese[zh]=cfg;
 });
 roster.forEach(name=>{
  const preset=data.movesets?.[name]||defaults();
  const imported=importedByChinese[name]||{};
  const next={
   mode:preset.mode||"unconfigured",
   move1:Array.isArray(preset.move1)?[...preset.move1]:[],
   move2:Array.isArray(preset.move2)?[...preset.move2]:[],
   wins:{}
  };
  const oldWins=imported.wins&&typeof imported.wins==="object"?imported.wins:{};
  if(next.mode==="single"){
   if(oldWins["__single_win__"]===true)next.wins["__single_win__"]=true;
  }else if(next.mode==="paths"){
   next.move1.forEach((path,index)=>{
    const id=`__path_${index}__:${path}`;
    const legacyMatch=Object.entries(oldWins).some(([oldId,won])=>won===true&&oldId.endsWith(`:${path}`));
    if(oldWins[id]===true||legacyMatch)next.wins[id]=true;
   });
  }else if(next.mode==="combination"){
   next.move1.forEach(a=>next.move2.forEach(b=>{
    const id=`${a}|||${b}`;
    if(oldWins[id]===true)next.wins[id]=true;
   }));
  }
  merged[name]=next;
 });
 return merged;
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
 // Validate optional user data from newer backups. Older backup files remain supported.
 let userData=null;
 if(obj.userData!==undefined){
  const u=obj.userData;
  if(!u||typeof u!=="object"||Array.isArray(u))throw new Error("個人化資料格式不正確。");
  const validateNameList=(value,label)=>{
   if(!Array.isArray(value)||value.length>roster.length||!value.every(n=>typeof n==="string"&&roster.includes(n)))throw new Error(`${label}清單格式不正確。`);
   return [...new Set(value)];
  };
  const raw=u.preferences===undefined?{}:u.preferences;
  if(!raw||typeof raw!=="object"||Array.isArray(raw))throw new Error("個人化設定必須是 JSON 物件。");
  const allowed={theme:["dark","light"],density:["comfortable","compact"],sort:["original","name","progress-desc","progress-asc","favorites"],defaultRole:["all","攻擊型","防禦型","敏捷型","平衡型","輔助型"],defaultProgress:["all","progress","done","not","unconfigured"],obsScale:["small","medium","large"]};
  const cleanPrefs={...DEFAULT_PREFERENCES};
  for(const [key,values] of Object.entries(allowed)){if(raw[key]!==undefined){if(!values.includes(raw[key]))throw new Error(`個人化設定「${key}」的值無效。`);cleanPrefs[key]=raw[key];}}
  for(const key of ["animations","obsShowTitle"]){if(raw[key]!==undefined){if(typeof raw[key]!=="boolean")throw new Error(`個人化設定「${key}」必須是布林值。`);cleanPrefs[key]=raw[key];}}
  userData={favorites:validateNameList(u.favorites||[],"最愛"),collection:validateNameList(u.collection||[],"收藏"),preferences:cleanPrefs};
 }
 // JSON.parse creates plain data only. Clone before committing so the validated object is detached.
 return {state:JSON.parse(JSON.stringify(obj.state)),userData};
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

// V32: first-visit guided tour. This uses its own key and never touches challenge records.
const WELCOME_TOUR_KEY = `${STORAGE_KEY}-welcome-tour-completed-v1`;
const WELCOME_TOUR_STEPS = [
 {eyebrow:"WELCOME",title:"歡迎使用全技能組一勝挑戰",description:"這個網站用來記錄每隻寶可夢不同技能搭配的勝利進度。完成設定、取得勝利，再回來勾選紀錄，就能逐步完成整份挑戰。",visual:["設定技能組","取得對戰勝利","回來記錄進度"],tip:"整個導覽約一分鐘，也可以隨時按「跳過導覽」。"},
 {eyebrow:"YOUR PROGRESS",title:"先看整體挑戰進度",description:"頁面上方會統計已完成技能組、總技能組、剩餘技能組與已完成寶可夢。下方兩個區塊可以查看定位分布，以及還有哪些技能組尚未完成。",visual:["已完成技能組","總技能組","剩餘技能組","已完成寶可夢"],tip:"點擊「全角色挑戰總覽」或「尚未完成的技能組」標題，可以展開或收起內容。"},
 {eyebrow:"FIND A POKÉMON",title:"搜尋、篩選並開啟角色卡片",description:"使用搜尋欄查找寶可夢，也能依角色定位、挑戰進度、最愛或收藏狀態篩選。點擊寶可夢卡片，就能設定技能選項及勝利紀錄。",visual:["搜尋寶可夢","依定位與進度篩選","點擊卡片管理技能組"],tip:"星號可加入最愛，收藏按鈕則能標記想追蹤的角色。"},
 {eyebrow:"CHALLENGE TOOLS",title:"用智慧隨機挑戰決定下一個目標",description:"點擊左上角三條線，打開功能選單並展開「挑戰工具」，即可使用智慧隨機挑戰。你可以選擇定位、抽選數量、策略，或排除指定角色。",visual:["左上角功能選單","挑戰工具","智慧隨機挑戰 2.0"],tip:"想自己安排目標，也可以直接使用主畫面的搜尋與篩選功能。"},
 {eyebrow:"SETTINGS & BACKUP",title:"設定、備份與直播顯示",description:"功能選單中的「管理與顯示」包含個人化設定、備份與還原，以及 OBS 實況模式。紀錄存在目前瀏覽器，換電腦或清除網站資料前，請先匯出 JSON 備份。",visual:["個人化設定","備份與還原","OBS 實況模式"],tip:"導覽結束後就可以開始挑戰。需要時，也能從右下角「功能說明」重新查看各功能。"}
];
let welcomeTourIndex=0;
function renderWelcomeTourStep(){
 const step=WELCOME_TOUR_STEPS[welcomeTourIndex];
 if(!step)return;
 $("welcomeTourStep").textContent=`${welcomeTourIndex+1} / ${WELCOME_TOUR_STEPS.length}`;
 $("welcomeTourProgress").style.width=`${((welcomeTourIndex+1)/WELCOME_TOUR_STEPS.length)*100}%`;
 $("welcomeTourEyebrow").textContent=step.eyebrow;
 $("welcomeTourTitle").textContent=step.title;
 $("welcomeTourDescription").textContent=step.description;
 $("welcomeTourVisual").replaceChildren(...step.visual.map((label,index)=>{const item=document.createElement("span");item.className="welcome-tour-chip";item.textContent=label;return item;}));
 $("welcomeTourTip").textContent=step.tip;
 $("welcomeTourPrev").disabled=welcomeTourIndex===0;
 $("welcomeTourPrev").style.visibility=welcomeTourIndex===0?"hidden":"visible";
 $("welcomeTourNext").textContent=welcomeTourIndex===WELCOME_TOUR_STEPS.length-1?"開始使用":"下一步";
}
function startWelcomeTour(force=false){
 if(!force){try{if(localStorage.getItem(WELCOME_TOUR_KEY)==="1")return false;}catch{}}
 welcomeTourIndex=0;
 renderWelcomeTourStep();
 $("welcomeTour").classList.remove("hidden");
 return true;
}
function closeWelcomeTour(){
 try{localStorage.setItem(WELCOME_TOUR_KEY,"1");}catch{}
 $("welcomeTour").classList.add("hidden");
 showFirstBackupNotice();
}
$("welcomeTourPrev").addEventListener("click",()=>{if(welcomeTourIndex>0){welcomeTourIndex--;renderWelcomeTourStep();}});
$("welcomeTourNext").addEventListener("click",()=>{if(welcomeTourIndex<WELCOME_TOUR_STEPS.length-1){welcomeTourIndex++;renderWelcomeTourStep();}else closeWelcomeTour();});
$("welcomeTourSkip").addEventListener("click",closeWelcomeTour);
$("helpReplayTour").addEventListener("click",()=>{$("helpModal").classList.add("hidden");startWelcomeTour(true);});
window.startWelcomeTour=startWelcomeTour;

$("search").addEventListener("input",render);$("filter").addEventListener("change",render);$("roleFilter").addEventListener("change",render);$("closeModal").onclick=closeModal;$("cancelModal").onclick=closeModal;$("modal").addEventListener("click",e=>{if(e.target.dataset.close)closeModal();});
$("move1").addEventListener("input",()=>{draftMove1=clean($("move1").value);renderCombos();});$("move2").addEventListener("input",()=>{draftMove2=clean($("move2").value);renderCombos();});
$("countMode").addEventListener("change",()=>{$("move1").value&&(draftMove1=clean($("move1").value));$("move2").value&&(draftMove2=clean($("move2").value));syncModeUI();renderCombos();});$("saveModal").onclick=saveCurrent;
$("resetPokemon").onclick=()=>{if(confirm("確定要清除此寶可夢的所有設定與勝利紀錄？")){draftWins={};draftMove1=[];draftMove2=[];$("countMode").value="unconfigured";syncModeUI();renderCombos();}};
$("exportBtn").onclick=exportBackupWithCustomName;
$("quickExportBtn").onclick=()=>{if(downloadBackup())toast("快速備份已匯出，請妥善保存檔案。");else alert("無法建立備份檔，請檢查瀏覽器下載設定後重試。");};
$("importBtn").onclick=()=>$("importFile").click();$("obsBtn").onclick=()=>window.open(location.pathname+"?mode=overlay","unite-obs-overlay","width=900,height=500");
$("importFile").onchange=async e=>{
 const file=e.target.files?.[0];
 if(!file)return;
 try{
  if(file.size>5*1024*1024)throw new Error("備份檔超過 5 MB，已取消匯入。");
  const parsed=JSON.parse(await file.text());
  const validated=validateBackupPayload(parsed);
  const candidateState=mergeBackupWithPreset(validated.state);
  const candidateUserData=validated.userData;
  const proceed=confirm(`備份檔格式驗證通過。

匯入會取代目前瀏覽器中的挑戰紀錄。為保護現有資料，按「確定」會先自動下載一份目前紀錄的備份，再繼續匯入；按「取消」則完全不變更資料。

確定要繼續嗎？`);
  if(!proceed)return;
  if(!downloadBackup("before-import"))throw new Error("匯入前備份下載失敗，為避免資料遺失，已取消匯入。原有紀錄沒有變更。");
  // Atomic commit: persist the fully validated candidate before changing in-memory state.
  // If localStorage throws (for example, quota/security restrictions), the current state stays intact.
  const storageKeys=[STORAGE_KEY,FAVORITES_KEY,COLLECTION_KEY,PREFERENCES_KEY];
  const oldValues=Object.fromEntries(storageKeys.map(key=>[key,localStorage.getItem(key)]));
  try{
   localStorage.setItem(STORAGE_KEY,JSON.stringify(candidateState));
   if(candidateUserData){
    localStorage.setItem(FAVORITES_KEY,JSON.stringify(candidateUserData.favorites));
    localStorage.setItem(COLLECTION_KEY,JSON.stringify(candidateUserData.collection));
    localStorage.setItem(PREFERENCES_KEY,JSON.stringify(candidateUserData.preferences));
   }
  }catch(storageError){
   for(const key of storageKeys){try{if(oldValues[key]===null)localStorage.removeItem(key);else localStorage.setItem(key,oldValues[key]);}catch(rollbackError){console.error("Import rollback failed for",key,rollbackError);}}
   throw new Error("無法儲存匯入資料（可能是瀏覽器儲存空間不足或權限受限）。系統已嘗試還原原資料，請重新整理後確認紀錄。");
  }
  state=candidateState;
  if(candidateUserData){favorites=new Set(candidateUserData.favorites);collection=new Set(candidateUserData.collection);preferences={...DEFAULT_PREFERENCES,...candidateUserData.preferences};applyPreferences();}
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
$("backupNoticeExport").onclick=()=>{if(downloadBackup()){dismissFirstBackupNotice();toast("快速備份已匯出，請妥善保存檔案。");}else alert("無法建立備份檔，請稍後再試。");};

// Smart Random Challenge 2.0
$("randomBtn").onclick=openRandomModal;
$("runRandomBtn").onclick=drawSmartChallenges;
$("closeRandomModal").onclick=closeRandomModal;
$("cancelRandomModal").onclick=closeRandomModal;
$("randomModal").addEventListener("click",e=>{if(e.target.dataset.close)closeRandomModal();});
$("settingsBtn").onclick=openSettings;
$("closeSettingsModal").onclick=closeSettings;
$("cancelSettings").onclick=closeSettings;
$("saveSettings").onclick=saveSettings;
$("settingsModal").addEventListener("click",e=>{if(e.target.dataset.close)closeSettings();});
$("savedFilter").addEventListener("change",render);
$("sortOrder").addEventListener("change",render);

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

let data={};
async function loadPokemonCatalogue(){
 const urls=[new URL("pokemon.json",location.href).href,new URL("/pokemon.json",location.origin).href];
 let lastError=null;
 for(const url of [...new Set(urls)]){
  try{
   const response=await fetch(url,{cache:"no-store"});
   if(!response.ok)throw new Error(`HTTP ${response.status}: ${url}`);
   const parsed=await response.json();
   if(!Array.isArray(parsed.pokemon)||!parsed.movesets||typeof parsed.movesets!=="object")throw new Error("pokemon.json 缺少 pokemon 或 movesets 資料。");
   if(parsed.pokemon.length===0)throw new Error("pokemon.json 的角色清單是空的。");
   const missing=parsed.pokemon.filter(name=>!parsed.movesets[name]);
   if(missing.length)throw new Error(`pokemon.json 有 ${missing.length} 隻角色缺少技能設定：${missing.slice(0,5).join("、")}`);
   data=parsed;
   roster=parsed.pokemon;
   nameMap=parsed.nameMap||{};
   avatars=parsed.avatars||{};
   roles=parsed.roles||{};
   moveIcons=parsed.moveIcons||{};
   load();
   loadUserData();
   if(!renderOverlay()){
    render();
    renderBackupStatus();
    if(!startWelcomeTour())showFirstBackupNotice();
   }
   return;
  }catch(error){lastError=error;console.error("Catalogue load failed:",url,error);}
 }
 const grid=$("grid");
 if(grid)grid.innerHTML=`<p class="sub">無法載入 pokemon.json。${escapeHtml(lastError?.message||"請確認安裝檔包含完整資料。")}</p>`;
}
loadPokemonCatalogue();

window.addEventListener("storage",e=>{
 if(e.key===STORAGE_KEY){try{state=JSON.parse(e.newValue||"{}");if(new URLSearchParams(location.search).get("mode")==="overlay")renderOverlay();else render();}catch{}}
 if([FAVORITES_KEY,COLLECTION_KEY,PREFERENCES_KEY].includes(e.key)){loadUserData();if(new URLSearchParams(location.search).get("mode")==="overlay")renderOverlay();else render();}
});

if(new URLSearchParams(location.search).get("mode")==="overlay"){setInterval(()=>{if(data&&roster.length)renderOverlay();},2000);}

window.addEventListener("app-language-change",()=>{if(window.__pokemonNameMap&&nameMap&&Object.keys(nameMap).length)window.__pokemonNameMap=nameMap;if(activeName&&!$("modal").classList.contains("hidden")){$("modalTitle").textContent=displayPokemonName(activeName);renderCombos();}if(roster.length&&new URLSearchParams(location.search).get("mode")!=="overlay")render();});
