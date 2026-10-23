// IT Ops Desk — deterministic state model. Browser-local demo data only.
export const VERSION = 1;
export const STATES = ["Open","In progress","Waiting","Resolved"];
export const PRIORITIES = ["Critical","High","Medium","Low"];
export const ASSET_STATES = ["Active","In repair","In stock","Retired"];
const iso = () => new Date().toISOString();
export const seed = () => ({
  version: VERSION,
  assets: [
    {id:"AST-1001",name:"Latitude 5440",type:"Laptop",serial:"DEMO-LAT-5440",owner:"A. Martin",location:"Paris",status:"Active"},
    {id:"AST-1002",name:"ThinkPad T14",type:"Laptop",serial:"DEMO-T14-02",owner:"J. Laurent",location:"Paris",status:"In repair"},
    {id:"AST-1003",name:"MacBook Air M3",type:"Laptop",serial:"DEMO-MBA-03",owner:"S. Chen",location:"Lyon",status:"Active"},
    {id:"AST-1004",name:"HP LaserJet Pro",type:"Printer",serial:"DEMO-LJ-04",owner:"Shared",location:"Paris",status:"Active"},
    {id:"AST-1005",name:"Cisco Catalyst 9200",type:"Network",serial:"DEMO-CAT-05",owner:"IT",location:"Paris",status:"Active"},
    {id:"AST-1006",name:"Dell OptiPlex 7010",type:"Desktop",serial:"DEMO-OPT-06",owner:"Unassigned",location:"Stock",status:"In stock"}
  ],
  tickets: [
    {id:"INC-2001",title:"VPN authentication failure",assetId:"AST-1001",priority:"Critical",status:"In progress",assignee:"Alex",requester:"A. Martin",description:"User cannot connect to the corporate VPN."},
    {id:"INC-2002",title:"Laptop battery replacement",assetId:"AST-1002",priority:"High",status:"Waiting",assignee:"Sam",requester:"J. Laurent",description:"Battery does not hold charge. Part requested."},
    {id:"INC-2003",title:"Shared printer offline",assetId:"AST-1004",priority:"Medium",status:"Open",assignee:"Alex",requester:"Office",description:"Network printer is not responding."},
    {id:"INC-2004",title:"Onboarding workstation setup",assetId:"AST-1006",priority:"Low",status:"Resolved",assignee:"Sam",requester:"HR",description:"Prepare a workstation for a new colleague."}
  ],
  activity: [
    {id:"LOG-1",at:"2026-10-20T08:30:00.000Z",actor:"Demo",message:"Demonstration workspace created"},
    {id:"LOG-2",at:"2026-10-21T13:10:00.000Z",actor:"Alex",message:"INC-2001 moved to In progress"},
    {id:"LOG-3",at:"2026-10-22T09:00:00.000Z",actor:"Sam",message:"INC-2004 marked Resolved"}
  ]
});
export function restore(input) {
  if (!input || input.version !== VERSION || !Array.isArray(input.assets) || !Array.isArray(input.tickets) || !Array.isArray(input.activity)) throw new Error("Unsupported backup format");
  if (input.assets.length>5000 || input.tickets.length>10000 || input.activity.length>30000) throw new Error("Backup too large");
  for(const asset of input.assets) if(!asset || typeof asset.id!=="string" || typeof asset.name!=="string" || !ASSET_STATES.includes(asset.status)) throw new Error("Invalid asset record");
  for(const ticket of input.tickets) if(!ticket || typeof ticket.id!=="string" || typeof ticket.title!=="string" || !STATES.includes(ticket.status) || !PRIORITIES.includes(ticket.priority)) throw new Error("Invalid ticket record");
  for(const log of input.activity) if(!log || typeof log.message!=="string" || typeof log.at!=="string") throw new Error("Invalid history record");
  return structuredClone(input);
}
export function nextId(records,prefix,start){
  let max=start-1;
  for(const r of records){const n=Number(String(r.id).replace(prefix,""));if(String(r.id).startsWith(prefix)&&Number.isInteger(n))max=Math.max(max,n)}
  return prefix+String(max+1);
}
const clean = (v,n=180) => String(v??"").trim().slice(0,n);
const required = (v,label) => {const s=clean(v);if(!s)throw new Error(label+" is required");return s};
export function stats(state){
  return {open:state.tickets.filter(x=>x.status!=="Resolved").length,critical:state.tickets.filter(x=>x.status!=="Resolved"&&x.priority==="Critical").length,active:state.assets.filter(x=>x.status==="Active").length,assets:state.assets.length,resolved:state.tickets.filter(x=>x.status==="Resolved").length};
}
export function saveRecord(state,kind,data,actor="Demo",at=iso()){
  if(!["tickets","assets"].includes(kind))throw new Error("Unknown record type");
  const next=restore(state);
  const list=next[kind];
  const old=data.id?list.find(x=>x.id===data.id):null;
  if(data.id&&!old)throw new Error("Record not found");
  let record;
  if(kind==="tickets"){
    const assetId=clean(data.assetId,40);
    if(assetId&&!next.assets.some(a=>a.id===assetId))throw new Error("Unknown asset");
    if(!STATES.includes(data.status))throw new Error("Invalid ticket status");
    if(!PRIORITIES.includes(data.priority))throw new Error("Invalid priority");
    record={id:old?.id??nextId(list,"INC-",2001),title:required(data.title,"Ticket title"),requester:clean(data.requester,100),assignee:clean(data.assignee,100),assetId,priority:data.priority,status:data.status,description:clean(data.description,1000)};
  }else{
    if(!ASSET_STATES.includes(data.status))throw new Error("Invalid asset status");
    const serial=clean(data.serial,100);
    if(serial&&list.some(a=>a.id!==old?.id&&a.serial.toLowerCase()===serial.toLowerCase()))throw new Error("Serial number already exists");
    record={id:old?.id??nextId(list,"AST-",1001),name:required(data.name,"Asset name"),type:required(data.type,"Asset type"),serial,owner:clean(data.owner,100),location:clean(data.location,100),status:data.status};
  }
  if(old)list.splice(list.findIndex(x=>x.id===old.id),1,record);else list.unshift(record);
  next.activity.unshift({id:"LOG-"+Date.now()+"-"+Math.random().toString(36).slice(2,6),at,actor:clean(actor,60)||"Demo",message:(old?"Updated ":"Created ")+record.id+" · "+(kind==="tickets"?record.title:record.name)});
  return next;
}
export function deleteRecord(state,kind,id,actor="Demo",at=iso()){
  const next=restore(state);
  if(!["tickets","assets"].includes(kind))throw new Error("Unknown record type");
  if(kind==="assets"&&next.tickets.some(t=>t.assetId===id))throw new Error("This asset is linked to a ticket. Unlink it first.");
  const index=next[kind].findIndex(x=>x.id===id);
  if(index<0)throw new Error("Record not found");
  next[kind].splice(index,1);
  next.activity.unshift({id:"LOG-"+Date.now(),at,actor:clean(actor,60)||"Demo",message:"Deleted "+id});
  return next;
}
export function csv(rows,cols) {
  const q = v => '"'+String(v??"").replace(/"/g,'""').replace(/^[=+\-@\t\r]/,"'$&")+'"';
  return [cols.map(q).join(","),...rows.map(r=>cols.map(k=>q(r[k])).join(","))].join("\r\n");
}
export function escapeHtml(input){
  return String(input??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
