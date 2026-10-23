import {seed,restore,stats,saveRecord,deleteRecord,csv,escapeHtml,STATES,PRIORITIES,ASSET_STATES} from "./core.mjs";
const KEY="lyan-itopsdesk-v1";
const $=sel=>document.querySelector(sel);
const h=escapeHtml;
let state;
try{state=restore(JSON.parse(localStorage.getItem(KEY)||"null"))}catch{state=seed()}
let view="overview",search="",statusFilter="all",editorKind="tickets",editingId="";
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{notify("Browser storage unavailable. Changes may not persist.")}};
const notify=msg=>{const t=$("#toast");t.textContent=msg;t.classList.add("visible");clearTimeout(notify.timer);notify.timer=setTimeout(()=>t.classList.remove("visible"),3500)};
const dot=(value,kind="status")=>'<span class="pill '+kind+'-'+h(String(value).toLowerCase().replace(/\s+/g,"-"))+'">'+h(value)+'</span>';
const findAsset=id=>state.assets.find(a=>a.id===id);
const moment=t=>{const d=new Date(t);return Number.isNaN(d.getTime())?"Unknown":d.toLocaleString(undefined,{dateStyle:"medium",timeStyle:"short"})};
const headers={overview:["Operations overview","One workspace for incidents, devices and day-to-day technical operations."],tickets:["Incident management","Follow the lifecycle of technical requests and keep ownership visible."],assets:["Asset inventory","A lightweight register for equipment, status and allocation."],activity:["Activity history","A trace of changes made inside this browser-local demonstration."]};
function tableTickets(rows,compact=false){
 if(!rows.length)return '<div class="empty">No incidents match your filters.</div>';
 return '<div class="table-wrap"><table><thead><tr><th>Incident</th><th>Priority</th><th>Status</th><th>Asset</th><th>Assigned to</th>'+(compact?'':'<th>Actions</th>')+'</tr></thead><tbody>'+rows.map(t=>'<tr><td><button class="table-link" data-edit="tickets" data-id="'+h(t.id)+'">'+h(t.id)+'</button><div class="sub">'+h(t.title)+'</div></td><td>'+dot(t.priority,"priority")+'</td><td>'+dot(t.status)+'</td><td>'+h(findAsset(t.assetId)?.name||"Unlinked")+'</td><td>'+h(t.assignee||"Unassigned")+'</td>'+(compact?'':'<td><div class="row-actions"><button class="mini-btn" data-edit="tickets" data-id="'+h(t.id)+'">Edit</button><button class="mini-btn danger" data-delete="tickets" data-id="'+h(t.id)+'">Delete</button></div></td>')+'</tr>').join("")+'</tbody></table></div>';
}
function tableAssets(rows,compact=false){
 if(!rows.length)return '<div class="empty">No devices match your filters.</div>';
 return '<div class="table-wrap"><table><thead><tr><th>Equipment</th><th>Type</th><th>Owner</th><th>Location</th><th>Status</th>'+(compact?'':'<th>Actions</th>')+'</tr></thead><tbody>'+rows.map(a=>'<tr><td><button class="table-link" data-edit="assets" data-id="'+h(a.id)+'">'+h(a.name)+'</button><div class="sub">'+h(a.id)+' · '+h(a.serial||"No serial")+'</div></td><td>'+h(a.type)+'</td><td>'+h(a.owner||"Unassigned")+'</td><td>'+h(a.location||"—")+'</td><td>'+dot(a.status)+'</td>'+(compact?'':'<td><div class="row-actions"><button class="mini-btn" data-edit="assets" data-id="'+h(a.id)+'">Edit</button><button class="mini-btn danger" data-delete="assets" data-id="'+h(a.id)+'">Delete</button></div></td>')+'</tr>').join("")+'</tbody></table></div>';
}
function activity(rows){return rows.length?'<div class="panel-list">'+rows.map(x=>'<div class="activity-item"><i class="event-dot" aria-hidden="true"></i><div class="event-body"><strong>'+h(x.message)+'</strong><p>'+h(x.actor)+' · '+h(moment(x.at))+'</p></div></div>').join("")+'</div>':'<div class="empty">No activity yet.</div>'}
const panel=(title,content,action="",foot="")=>'<div class="panel"><div class="panel-head"><h2>'+title+'</h2>'+action+'</div>'+content+(foot?'<div class="panel-foot">'+foot+'</div>':'')+'</div>';
function overview(){
 const s=stats(state);
 const cards=[["Open incidents",s.open,"Unresolved service requests","◫"],["Critical priority",s.critical,"Requires immediate attention","!"],["Active devices",s.active,"Registered and in use","▤"],["Total equipment",s.assets,"Tracked in inventory","▦"]];
 const summary='<div class="stats">'+cards.map(c=>'<div class="stat-card"><div class="stat-top"><span>'+c[0]+'</span><span class="stat-symbol">'+c[3]+'</span></div><div class="stat-value">'+c[1]+'</div><div class="stat-bottom">'+c[2]+'</div></div>').join("")+'</div>';
 const counts=STATES.map(v=>[v,state.tickets.filter(t=>t.status===v).length]);
 const bars='<div class="distribution">'+counts.map(([label,count])=>'<div class="dist-row"><strong>'+label+'</strong><span>'+count+'</span></div><div class="bar-track"><div class="bar-fill" style="width:'+Math.round(count/Math.max(state.tickets.length,1)*100)+'%"></div></div>').join("")+'</div>';
 return summary+'<div class="cols">'+panel("Recent incidents",tableTickets(state.tickets.slice(0,5),true),'<button type="button" data-route="tickets">View all →</button>','Select a ticket ID to inspect or edit its details.')+'<div class="side-panels">'+panel("Ticket distribution",bars)+'<div style="height:18px"></div>'+panel("Latest activity",activity(state.activity.slice(0,4)),'<button type="button" data-route="activity">View log →</button>')+'</div></div>';
}
function filtered(){
 const term=search.toLowerCase();
 const list=state[view].filter(x=>(statusFilter==="all"||x.status===statusFilter)&&Object.values(x).some(v=>String(v??"").toLowerCase().includes(term)));
 return list;
}
function collection(){
 const isTicket=view==="tickets";
 const statuses=isTicket?STATES:ASSET_STATES;
 return '<div class="toolbar"><input class="searchbox" aria-label="Search records" id="search" type="search" placeholder="Search by title, ID, owner or device..." value="'+h(search)+'"><select id="status-filter" class="filter" aria-label="Filter by status"><option value="all">All statuses</option>'+statuses.map(s=>'<option value="'+h(s)+'"'+(statusFilter===s?' selected':'')+'>'+h(s)+'</option>').join("")+'</select></div>'+panel(isTicket?"Incident queue":"Equipment register",isTicket?tableTickets(filtered()):tableAssets(filtered()),'<small>'+filtered().length+' records</small>','Demo records. Editing is stored locally, not synchronized with a service.');
}
function render(){
 const labels={overview:"Overview",tickets:"Incidents",assets:"Assets",activity:"Activity log"};
 $("#breadcrumb").textContent=labels[view];$("#page-title").textContent=headers[view][0];$("#page-intro").textContent=headers[view][1];
 document.querySelectorAll("[data-view]").forEach(b=>{b.classList.toggle("active",b.dataset.view===view);if(b.dataset.view===view)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
 $("#nav-count").textContent=stats(state).open;
 $("#new-item").textContent=view==="assets"?"+ New asset":"+ New incident";
 $("#new-item").style.display=view==="activity"?"none":"";
 $("#workspace").innerHTML=view==="overview"?overview():view==="activity"?panel("Change history",activity(state.activity)):collection();
}
function setView(next){if(!headers[next])return;view=next;search="";statusFilter="all";render()}
const field=(name,label,value="",type="text",full=false,options=null)=>'<div class="field'+(full?' full':'')+'"><label for="f-'+name+'">'+label+'</label>'+(options?'<select id="f-'+name+'" name="'+name+'">'+options.map(o=>'<option value="'+h(o.value??o)+'"'+(String(o.value??o)===String(value)?' selected':'')+'>'+h(o.label??o)+'</option>').join("")+'</select>':type==="textarea"?'<textarea id="f-'+name+'" name="'+name+'" maxlength="1000">'+h(value)+'</textarea>':'<input id="f-'+name+'" name="'+name+'" type="'+type+'" value="'+h(value)+'" maxlength="180">')+'</div>';
function editor(kind,id=""){
 editorKind=kind;editingId=id;
 const item=state[kind].find(x=>x.id===id)||{};
 $("#dialog-title").textContent=(id?"Edit ":"New ")+(kind==="tickets"?"incident":"asset");
 const f=kind==="tickets"?
 field("title","Incident title",item.title,"text",true)+field("requester","Requested by",item.requester)+field("assignee","Assigned to",item.assignee)+field("priority","Priority",item.priority||"Medium","text",false,PRIORITIES)+field("status","Status",item.status||"Open","text",false,STATES)+field("assetId","Related equipment",item.assetId||"","text",true,[{value:"",label:"None"},...state.assets.map(a=>({value:a.id,label:a.id+" — "+a.name}))])+field("description","Technical notes",item.description,"textarea",true):
 field("name","Equipment name",item.name,"text",true)+field("type","Device type",item.type,"text",false,["Laptop","Desktop","Printer","Network","Monitor","Other"])+field("serial","Serial / asset identifier",item.serial)+field("owner","Assigned owner",item.owner)+field("location","Location",item.location)+field("status","Device status",item.status||"Active","text",false,ASSET_STATES);
 $("#form-fields").innerHTML='<div class="fields">'+f+'</div>';
 $("#editor").showModal();
 $("#form-fields").querySelector("input,select,textarea")?.focus();
}
$("#record-form").addEventListener("submit",e=>{
 e.preventDefault();
 const values=Object.fromEntries(new FormData(e.target).entries());
 if(editingId)values.id=editingId;
 try{state=saveRecord(state,editorKind,values,$("#actor").value);persist();$("#editor").close();render();notify("Record saved locally.")}catch(err){notify(err.message)}
});
$("#cancel-dialog").addEventListener("click",()=>$("#editor").close());$("#close-dialog").addEventListener("click",()=>$("#editor").close());
document.addEventListener("click",e=>{
 const v=e.target.closest("[data-view],[data-route],[data-edit],[data-delete]");
 if(!v)return;
 if(v.dataset.view||v.dataset.route){setView(v.dataset.view||v.dataset.route);return}
 if(v.dataset.edit){editor(v.dataset.edit,v.dataset.id);return}
 if(v.dataset.delete){
  if(!confirm("Delete "+v.dataset.id+" from this local demo?"))return;
  try{state=deleteRecord(state,v.dataset.delete,v.dataset.id,$("#actor").value);persist();render();notify("Record deleted locally.")}catch(err){notify(err.message)}
 }
});
$("#new-item").addEventListener("click",()=>editor(view==="assets"?"assets":"tickets"));
$("#workspace").addEventListener("input",e=>{if(e.target.id==="search"){const pos=e.target.selectionStart;search=e.target.value;render();const el=$("#search");el.focus();el.setSelectionRange(pos,pos)}});
$("#workspace").addEventListener("change",e=>{if(e.target.id==="status-filter"){statusFilter=e.target.value;render()}});
function download(name,type,data){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$("#export-json").addEventListener("click",()=>download("itopsdesk-backup.json","application/json",JSON.stringify(state,null,2)));
$("#export-csv").addEventListener("click",()=>{const kind=view==="assets"?"assets":"tickets";download("itopsdesk-"+kind+".csv","text/csv;charset=utf-8","\uFEFF"+csv(state[kind],kind==="assets"?["id","name","type","serial","owner","location","status"]:["id","title","assetId","priority","status","assignee","requester","description"]));notify("CSV exported.")});
$("#import-trigger").addEventListener("click",()=>$("#import-json").click());
$("#import-json").addEventListener("change",async e=>{
 const f=e.target.files?.[0];if(!f)return;
 try{
  if(f.size>1024*1024)throw new Error("Backup exceeds 1 MB.");
  const parsed=restore(JSON.parse(await f.text()));
  if(!confirm("Replace this browser's demo records with the backup?"))return;
  state=parsed;persist();render();notify("Backup imported.")
 }catch(err){notify("Import failed: "+err.message)}finally{e.target.value=""}
});
$("#reset").addEventListener("click",()=>{if(confirm("Reset all local changes to the fictional sample dataset?")){state=seed();persist();render();notify("Demo restored.")}});
render();
