const STORAGE_KEY = "unite-all-moves-win-tracker-v11";
const PREVIOUS_STORAGE_KEY = "unite-all-moves-win-tracker-v10";
const LEGACY_STORAGE_KEY = "unite-all-moves-win-tracker-v9";
let roster=[], state={}, activeName=null, draftWins={}, nameMap={}, avatars={}, draftMove1=[], draftMove2=[];
const $=id=>document.getElementById(id);
const clean=s=>(s||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
function defaults(){return {mode:"unconfigured",move1:[],move2:[],wins:{}};}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function load(){
 try{
   const v8=localStorage.getItem(STORAGE_KEY);
   const v7=localStorage.getItem(PREVIOUS_STORAGE_KEY);
   const v6=localStorage.getItem(LEGACY_STORAGE_KEY);
   state=JSON.parse(v8 || v7 || v6 || "{}");
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
function renderStats(){let total=0,won=0,done=0,configured=0;roster.forEach(n=>{const c=counts(n);total+=c.total;won+=c.won;if(c.done)done++;if(c.configured)configured++;});$("wonCount").textContent=won;$("totalCount").textContent=total;$("leftCount").textContent=total-won;$("donePokemon").textContent=done;$("rosterCount").textContent=`共 ${roster.length} 隻角色 · 已設定 ${configured} 隻`;$ ("wonPct").textContent=(total?Math.round(won/total*100):0)+"% 完成";}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){renderStats();const q=$("search").value.trim().toLowerCase(),f=$("filter").value;const list=roster.filter(n=>{const c=counts(n);return (n.toLowerCase().includes(q)||(nameMap[n]||"").toLowerCase().includes(q))&&(f==="all"||(f==="progress"&&c.started&&!c.done)||(f==="done"&&c.done)||(f==="not"&&(!c.started||!c.configured))||(f==="unconfigured"&&!c.configured));});$("shownCount").textContent=`${list.length} 隻`;
 $("grid").innerHTML=list.map(n=>{const c=counts(n),pct=c.total?Math.round(c.won/c.total*100):0;const status=!c.configured?'<span class="status">待設定</span>':c.done?'<span class="status done">已完成</span>':c.started?'<span class="status started">進行中</span>':'<span class="status">未開始</span>';const avatar=avatars[n]||"";return `<article class="pokemon-card" data-name="${escapeHtml(n)}"><div class="card-top"><div class="pokemon-identity">${avatar?`<img class="pokemon-avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(n)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`:""}<span class="avatar-fallback" style="${avatar?"display:none":""}">${escapeHtml(n.slice(0,1))}</span><div class="pokemon-title"><span class="pokemon-name">${escapeHtml(n)}</span><small>${escapeHtml(nameMap[n]||"")}</small></div></div>${status}</div><div class="card-progress"><span style="width:${pct}%"></span></div><div class="card-bottom"><span>${c.configured?`${c.won} / ${c.total} 組勝利`:"技能資料尚未設定"}</span><b>${c.configured?pct+"%":"—"}</b></div></article>`;}).join("");
 $("grid").querySelectorAll(".pokemon-card").forEach(el=>el.addEventListener("click",()=>openModal(el.dataset.name)));if(!list.length)$("grid").innerHTML='<p class="sub">找不到符合條件的寶可夢。</p>';}
function readDraft(){return {mode:$("countMode").value,move1:clean($("move1").value),move2:clean($("move2").value)};}
function syncModeUI(){const mode=$("countMode").value,single=mode==="single",paths=mode==="paths",unconfigured=mode==="unconfigured";$("move1Label").style.display=unconfigured?"none":"";$("move2Label").style.display=(single||paths||unconfigured)?"none":"";$("move1Label").firstChild.textContent=paths?"固定流派（每行一套完整技能搭配）":single?"技能名稱（僅供參考）":"技能一選項";$("move1").disabled=unconfigured;$("move2").disabled=single||paths||unconfigured;$("move1").value=draftMove1.join("\n");$("move2").value=draftMove2.join("\n");$("move1").placeholder=paths?"例如：一擊流：技能A＋技能B":single?"每行一個技能名稱":"每行一個技能選項";}
function openModal(name){activeName=name;const c=getConfig(name);$("modalTitle").textContent=name;const avatar=$("modalAvatar");avatar.src=avatars[name]||"";avatar.alt=name;avatar.style.display=avatars[name]?"block":"none";avatar.onerror=()=>avatar.style.display="none";$("countMode").value=c.mode;draftMove1=[...c.move1];draftMove2=[...c.move2];draftWins={...c.wins};syncModeUI();renderCombos();$("modal").classList.remove("hidden");document.body.style.overflow="hidden";}
function closeModal(){$("modal").classList.add("hidden");document.body.style.overflow="";}
function renderCombos(){const cfg=readDraft(),list=combos(cfg);$("comboSummary").textContent=cfg.mode==="unconfigured"?"尚未設定，不計入統計":`${list.length} 種組合 · ${list.filter(x=>draftWins[x.id]).length} 勝`;
 $("comboList").innerHTML=cfg.mode==="unconfigured"?'<p class="sub">此角色的技能資料尚未設定。確認遊戲內技能後，再選擇計算方式。</p>':!list.length?'<p class="sub">請先填入技能名稱，每行一個選項。</p>':list.map((x,i)=>`<div class="combo-row"><div class="combo-name"><span style="color:#7187a2;margin-right:7px">${String(i+1).padStart(2,"0")}</span>${escapeHtml(x.label)}</div><button class="win-toggle ${draftWins[x.id]?"active":""}" data-id="${encodeURIComponent(x.id)}">${draftWins[x.id]?"✓ 已取得勝利":"＋ 記錄一勝"}</button></div>`).join("");
 $("comboList").querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{const id=decodeURIComponent(btn.dataset.id);draftWins[id]=!draftWins[id];renderCombos();}));}
function saveCurrent(){const cfg=readDraft();if(cfg.mode==="combination"&&(!cfg.move1.length||!cfg.move2.length)){alert("自動組合模式下，技能一與技能二都至少需要一個選項。");return;}if((cfg.mode==="single"||cfg.mode==="paths")&&!cfg.move1.length){alert(cfg.mode==="paths"?"固定流派模式至少需要填寫一套完整技能搭配。":"單一勝利模式至少需要填寫一個技能名稱。");return;}if(cfg.move1.length>8||cfg.move2.length>4){alert("最多可填 8 個技能選項或固定流派。");return;}const valid=new Set(combos(cfg).map(x=>x.id)),wins={};Object.keys(draftWins).forEach(k=>{if(valid.has(k)&&draftWins[k])wins[k]=true;});state[activeName]={...cfg,wins};save();closeModal();render();toast("已儲存 "+activeName+" 的設定");}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800);}
$("search").addEventListener("input",render);$("filter").addEventListener("change",render);$("closeModal").onclick=closeModal;$("cancelModal").onclick=closeModal;$("modal").addEventListener("click",e=>{if(e.target.dataset.close)closeModal();});
$("move1").addEventListener("input",()=>{draftMove1=clean($("move1").value);renderCombos();});$("move2").addEventListener("input",()=>{draftMove2=clean($("move2").value);renderCombos();});
$("countMode").addEventListener("change",()=>{$("move1").value&&(draftMove1=clean($("move1").value));$("move2").value&&(draftMove2=clean($("move2").value));syncModeUI();renderCombos();});$("saveModal").onclick=saveCurrent;
$("resetPokemon").onclick=()=>{if(confirm("確定要清除此寶可夢的所有設定與勝利紀錄？")){draftWins={};draftMove1=[];draftMove2=[];$("countMode").value="unconfigured";syncModeUI();renderCombos();}};
$("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify({version:11,exportedAt:new Date().toISOString(),state},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="unite-moves-win-backup-v11.json";a.click();URL.revokeObjectURL(a.href);toast("備份檔已匯出");};
$("importBtn").onclick=()=>$("importFile").click();$("importFile").onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const obj=JSON.parse(await file.text());if(!obj.state||typeof obj.state!=="object")throw Error();if(confirm("匯入會覆蓋目前 V11 紀錄，確定繼續？")){state=obj.state;save();render();toast("備份匯入成功");}}catch{alert("檔案格式不正確，無法匯入。");}e.target.value="";};

// V11 隨機挑戰：從所有尚未取得勝利的技能組中抽選。
$("randomBtn").onclick=()=>{
 const pool=[];
 roster.forEach(name=>{const cfg=getConfig(name);combos(cfg).forEach(combo=>{if(!cfg.wins[combo.id])pool.push({name,id:combo.id,label:combo.label});});});
 if(!pool.length){toast("所有已設定技能組都完成了！");return;}
 const pick=pool[Math.floor(Math.random()*pool.length)];
 $("search").value="";$("filter").value="all";render();openModal(pick.name);
 setTimeout(()=>{const row=[...$("comboList").querySelectorAll(".combo-row")].find(el=>el.querySelector("button")?.dataset.id===encodeURIComponent(pick.id));if(row){row.classList.add("random-highlight");row.scrollIntoView({behavior:"smooth",block:"center"});}},80);
 toast(`隨機挑戰：${pick.name}｜${pick.label}`);
};
// Supabase REST 雲端備份。連線設定僅存在目前瀏覽器，不會寫進備份檔。
const CLOUD_CONFIG_KEY="unite-moves-cloud-config-v1";
function cloudConfig(){try{return JSON.parse(localStorage.getItem(CLOUD_CONFIG_KEY)||"{}");}catch{return {};}}
function setCloudStatus(msg,isError=false){$("cloudStatus").textContent=msg;$("cloudStatus").style.color=isError?"#ffad9f":"#93a4bb";}
function readCloudFields(){return {url:$("sbUrl").value.trim().replace(/\/$/,""),key:$("sbKey").value.trim(),id:$("syncId").value.trim()};}
function validCloud(c){return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(c.url)&&c.key.length>20&&c.id.length>=12;}
function cloudHeaders(c){return {"Content-Type":"application/json",apikey:c.key,Authorization:`Bearer ${c.key}`,Prefer:"resolution=merge-duplicates,return=minimal"};}
$("cloudToggle").onclick=()=>{$("cloudPanel").classList.toggle("hidden");};
$("closeCloud").onclick=()=>$("cloudPanel").classList.add("hidden");
(()=>{const c=cloudConfig();$("sbUrl").value=c.url||"";$("sbKey").value=c.key||"";$("syncId").value=c.id||"";if(validCloud(c))setCloudStatus("已儲存連線設定。可上傳或載入雲端紀錄。");})();
$("saveCloud").onclick=()=>{const c=readCloudFields();if(!validCloud(c)){setCloudStatus("請確認 Project URL、anon key，並設定至少 12 個字元的同步代碼。",true);return;}localStorage.setItem(CLOUD_CONFIG_KEY,JSON.stringify(c));setCloudStatus("連線設定已儲存。接著可上傳或載入雲端紀錄。");toast("雲端設定已儲存");};
async function cloudRequest(method,body){const c=cloudConfig();if(!validCloud(c))throw Error("請先填寫並儲存有效的 Supabase 連線設定。");const url=`${c.url}/rest/v1/unite_sync`;const headers=cloudHeaders(c);if(method==="GET"){const r=await fetch(`${url}?sync_id=eq.${encodeURIComponent(c.id)}&select=payload,updated_at`,{headers:{apikey:c.key,Authorization:`Bearer ${c.key}`}});if(!r.ok)throw Error(`雲端讀取失敗（${r.status}），請檢查資料表與權限。`);return r.json();}const r=await fetch(`${url}?on_conflict=sync_id`,{method:"POST",headers,body:JSON.stringify(body)});if(!r.ok){const detail=await r.text();throw Error(`雲端上傳失敗（${r.status}）：${detail.slice(0,180)}`);}return true;}
$("cloudUpload").onclick=async()=>{try{setCloudStatus("正在上傳目前紀錄…");const c=cloudConfig();if(!validCloud(c))throw Error("請先填寫並儲存有效的 Supabase 連線設定。");await cloudRequest("POST",{sync_id:c.id,payload:{version:11,state},updated_at:new Date().toISOString()});setCloudStatus("上傳成功！目前瀏覽器的紀錄已備份到雲端。");toast("雲端備份完成");}catch(e){setCloudStatus(e.message,true);}};
$("cloudDownload").onclick=async()=>{try{setCloudStatus("正在讀取雲端紀錄…");const rows=await cloudRequest("GET");if(!rows.length)throw Error("這組同步代碼尚無雲端備份，請先從有紀錄的裝置上傳。");const payload=rows[0].payload;if(!payload||!payload.state||typeof payload.state!=="object")throw Error("雲端資料格式不正確。");if(confirm("從雲端載入會覆蓋目前瀏覽器的挑戰紀錄，建議先匯出本機備份。確定繼續？")){state=payload.state;save();render();setCloudStatus(`載入成功！雲端備份時間：${new Date(rows[0].updated_at).toLocaleString("zh-TW")}`);toast("雲端紀錄已載入");}else setCloudStatus("已取消載入，原紀錄保持不變。");}catch(e){setCloudStatus(e.message,true);}};

let data={};fetch("pokemon.json").then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{data=d;roster=d.pokemon;nameMap=d.nameMap||{};avatars=d.avatars||{};load();render();}).catch(()=>$ ("grid").innerHTML='<p class="sub">無法載入 pokemon.json，請確認專案檔案都已上傳。</p>');
