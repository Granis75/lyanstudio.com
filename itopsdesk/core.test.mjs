import test from "node:test";
import assert from "node:assert/strict";
import {seed,restore,stats,saveRecord,deleteRecord,csv,escapeHtml} from "./core.mjs";
test("demo dataset integrity",()=>{const s=seed();assert.equal(stats(s).assets,6);assert.equal(stats(s).open,3);assert.equal(s.version,1)});
test("ticket CRUD and immutable history",()=>{
 const s=seed();
 const a=saveRecord(s,"tickets",{title:"Wi-Fi issue",status:"Open",priority:"High",assetId:"AST-1001",assignee:"Sam"}, "QA","2026-10-23T10:00:00Z");
 assert.equal(s.tickets.length,4);assert.equal(a.tickets.length,5);assert.equal(a.activity[0].actor,"QA");
 const b=saveRecord(a,"tickets",{...a.tickets[0],status:"Resolved"});assert.equal(stats(b).open,3);
 const c=deleteRecord(b,"tickets",b.tickets[0].id);assert.equal(c.tickets.length,4);
});
test("serials unique and asset links checked",()=>{
 const s=seed();
 assert.throws(()=>saveRecord(s,"assets",{name:"Duplicate",type:"Laptop",serial:"DEMO-LAT-5440",status:"Active"}),/already exists/);
 assert.throws(()=>deleteRecord(s,"assets","AST-1001"),/linked/);
 assert.throws(()=>saveRecord(s,"tickets",{title:"X",assetId:"MISSING",status:"Open",priority:"Low"}),/Unknown asset/);
});
test("backup validation",()=>{
 assert.deepEqual(restore(seed()),seed());
 assert.throws(()=>restore({version:2,assets:[],tickets:[],activity:[]}),/Unsupported/);
});
test("CSV injection and HTML escaping",()=>{
 const data=csv([{name:'=SUM(A1,"B2")'}],["name"]);
 assert.match(data,/'=SUM/);
 assert.equal(escapeHtml('<img onerror="x">'),'&lt;img onerror=&quot;x&quot;&gt;');
});
