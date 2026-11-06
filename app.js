const STORAGE_KEY = "unite-all-moves-win-tracker-v15";
const PREV_V14_KEY = "unite-all-moves-win-tracker-v14";
const PREV_V13_KEY = "unite-all-moves-win-tracker-v13";
const PREV_V12_KEY = "unite-all-moves-win-tracker-v12";
const PREVIOUS_STORAGE_KEY = "unite-all-moves-win-tracker-v11";
const LEGACY_STORAGE_KEY = "unite-all-moves-win-tracker-v10";
const OLDER_STORAGE_KEY = "unite-all-moves-win-tracker-v9";
let roster=[], state={}, activeName=null, draftWins={}, nameMap={}, avatars={}, roles={}, moveIcons={}, draftMove1=[], draftMove2=[];
const $=id=>document.getElementById(id);
const clean=s=>(s||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
function defaults(){return {mode:"unconfigured",move1:[],move2:[],wins:{}};}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function load(){
 try{
   const v8=localStorage.getItem(STORAGE_KEY);
   const v14=localStorage.getItem(PREV_V14_KEY);
   const v13=localStorage.getItem(PREV_V13_KEY);
   const v12=localStorage.getItem(PREV_V12_KEY);
   const v7=localStorage.getItem(PREVIOUS_STORAGE_KEY);
   const v6=localStorage.getItem(LEGACY_STORAGE_KEY);
   const v5=localStorage.getItem(OLDER_STORAGE_KEY);
   state=JSON.parse(v8 || v14 || v13 || v12 || v7 || v6 || v5 || "{}");
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
function moveIconUrl(name, move){const en=nameMap[name],slug=moveIcons[name]?.[move];if(!en||!slug)return "";const file=`UNITE_${en.replaceAll(" ","_")}_${slug.replaceAll(" ","_")}.png`;return `https://archives.bulbagarden.net/wiki/Special:Redirect/file/${encodeURIComponent(file).replaceAll("%2F","/")}`;}
function skillChip(name,move){const url=moveIconUrl(name,move);return `<span class="skill-chip">${url?`<img class="skill-icon" src="${url}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'skill-icon-fallback',textContent:'✦'}))">`:'<span class="skill-icon-fallback">✦</span>'}<span>${escapeHtml(move)}</span></span>`;}
function comboSkills(name,label,cfg){if(cfg.mode==="combination"){const parts=label.split(" ＋ ");return parts.map(x=>skillChip(name,x)).join('<span class="skill-plus">＋</span>');}if(cfg.mode==="single"){return (cfg.move1||[]).map(x=>skillChip(name,x)).join("");}if(cfg.mode==="paths"){const text=label.includes(":")?label.split(":").slice(1).join(":").trim():label;return text.split(/[＋+]/).map(x=>skillChip(name,x.trim())).join('<span class="skill-plus">＋</span>');}return escapeHtml(label);}
function renderCombos(){const cfg=readDraft(),list=combos(cfg);$("comboSummary").textContent=cfg.mode==="unconfigured"?"尚未設定，不計入統計":`${list.length} 種組合 · ${list.filter(x=>draftWins[x.id]).length} 勝`;
 $("comboList").innerHTML=cfg.mode==="unconfigured"?'<p class="sub">此角色的技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。</p>':!list.length?'<p class="sub">請先填入技能名稱，每行一個選項。</p>':list.map((x,i)=>`<div class="combo-row"><div class="combo-name"><span style="color:#7187a2;margin-right:7px">${String(i+1).padStart(2,"0")}</span><div class="combo-skills">${comboSkills(activeName,x.label,cfg)}</div></div><button class="win-toggle ${draftWins[x.id]?"active":""}" data-id="${encodeURIComponent(x.id)}">${draftWins[x.id]?"✓ 已取得勝利":"＋ 記錄一勝"}</button></div>`).join("");
 $("comboList").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{const id=decodeURIComponent(btn.dataset.id);draftWins[id]=!draftWins[id];renderCombos();}));}
function saveCurrent(){const cfg=readDraft();if(cfg.mode==="combination"&&(!cfg.move1.length||!cfg.move2.length)){alert("自動組合模式下，技能一與技能二都至少需要一個選項。");return;}if((cfg.mode==="single"||cfg.mode==="paths")&&!cfg.move1.length){alert(cfg.mode==="paths"?"固定流派模式至少需要填寫一套完整技能搭配。":"單一勝利模式至少需要填寫一個技能名稱。");return;}if(cfg.move1.length>8||cfg.move2.length>4){alert("最多可填 8 個技能選項或固定流派。");return;}const valid=new Set(combos(cfg).map(x=>x.id)),wins={};Object.keys(draftWins).forEach(k=>{if(valid.has(k)&&draftWins[k])wins[k]=true;});state[activeName]={...cfg,wins};save();closeModal();render();toast("已儲存 "+activeName+" 的設定");}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800);}
$("search").addEventListener("input",render);$("filter").addEventListener("change",render);$("roleFilter").addEventListener("change",render);$("closeModal").onclick=closeModal;$("cancelModal").onclick=closeModal;$("modal").addEventListener("click",e=>{if(e.target.dataset.close)closeModal();});
$("move1").addEventListener("input",()=>{draftMove1=clean($("move1").value);renderCombos();});$("move2").addEventListener("input",()=>{draftMove2=clean($("move2").value);renderCombos();});
$("countMode").addEventListener("change",()=>{$("move1").value&&(draftMove1=clean($("move1").value));$("move2").value&&(draftMove2=clean($("move2").value));syncModeUI();renderCombos();});$("saveModal").onclick=saveCurrent;
$("resetPokemon").onclick=()=>{if(confirm("確定要清除此寶可夢的所有設定與勝利紀錄？")){draftWins={};draftMove1=[];draftMove2=[];$("countMode").value="unconfigured";syncModeUI();renderCombos();}};
$("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify({version:15,exportedAt:new Date().toISOString(),state},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="unite-moves-win-backup-v15.json";a.click();URL.revokeObjectURL(a.href);toast("備份檔已匯出");};
$("importBtn").onclick=()=>$("importFile").click();$("obsBtn").onclick=()=>window.open(location.pathname+"?mode=overlay","unite-obs-overlay","width=900,height=500");
$("importFile").onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const obj=JSON.parse(await file.text());if(!obj.state||typeof obj.state!=="object")throw Error();if(confirm("匯入會覆蓋目前挑戰紀錄，確定繼續？")){state=obj.state;save();render();toast("備份匯入成功");}}catch{alert("檔案格式不正確，無法匯入。");}e.target.value="";};

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

let data={};fetch("pokemon.json").then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{data=d;roster=d.pokemon;nameMap=d.nameMap||{};avatars=d.avatars||{};roles=d.roles||{};moveIcons=d.moveIcons||{};load();if(!renderOverlay())render();}).catch(()=>$ ("grid").innerHTML='<p class="sub">無法載入 pokemon.json，請確認專案檔案都已上傳。</p>');

window.addEventListener("storage",e=>{if(e.key===STORAGE_KEY){try{state=JSON.parse(e.newValue||"{}");if(new URLSearchParams(location.search).get("mode")==="overlay")renderOverlay();else render();}catch{}}});

if(new URLSearchParams(location.search).get("mode")==="overlay"){setInterval(()=>{if(data&&roster.length)renderOverlay();},2000);}
