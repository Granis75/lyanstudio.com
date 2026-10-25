import test from "node:test";
import assert from "node:assert/strict";
import {seed,demoSeed,addBarcodeToCart,hydrate,activeSession,openSession,closeSession,addToCart,changeCart,checkout,cancelSale,adjustStock,createProduct,metrics,sumCart,formatDZD,escapeHtml,csv} from "./core.mjs";
const at="2026-10-23T12:00:00Z";
test("synthetic stock, cash-only integer DZD and initial closed session",()=>{
 const s=seed();assert.equal(activeSession(s),null);assert.equal(s.products.length,10);assert.equal(formatDZD(1530).includes("DZD"),true);
});
test("cannot sell before session is open",()=>assert.throws(()=>addToCart(seed(),"P-101"),/Ouvrez/));
test("open session, add cart, cash checkout decreases stock and preserves invariant",()=>{
 const s=openSession(seed(),1000,at),a=addToCart(s,"P-101",2),b=addToCart(a,"P-104");
 assert.equal(sumCart(b),290);assert.equal(s.products[0].stock,24);
 const z=checkout(b,500,at);
 assert.equal(z.sales[0].total,290);assert.equal(z.sales[0].change,210);
 assert.equal(z.products.find(p=>p.id==="P-101").stock,22);assert.equal(z.cart.length,0);
 assert.equal(metrics(z).revenue,290);assert.equal(metrics(z).units,3);
});
test("cash underpayment prevents mutation",()=>{
 const s=addToCart(openSession(seed()),"P-101");assert.throws(()=>checkout(s,0),/inférieur/);assert.equal(s.sales.length,0);
});
test("out of stock, negative stock and invalid quantities are blocked",()=>{
 const s=openSession(seed());assert.throws(()=>addToCart(s,"P-110"),/Stock insuffisant/);
 assert.throws(()=>addToCart(s,"P-101",25),/Stock insuffisant/);
 assert.throws(()=>adjustStock(s,"P-101",-99,"test"),/Stock négatif/);
 assert.throws(()=>addToCart(s,"P-101",1.5),/invalide/);
});
test("cancellation restores original quantities and is idempotently refused",()=>{
 let s=checkout(addToCart(openSession(seed()),"P-103",2),500,at);const id=s.sales[0].id;
 let t=cancelSale(s,id,at);assert.equal(t.products.find(p=>p.id==="P-103").stock,12);assert.equal(metrics(t).revenue,0);
 assert.throws(()=>cancelSale(t,id),/déjà annulée/);assert.equal(s.products.find(p=>p.id==="P-103").stock,10);
});
test("closed session prohibits new sales and records expected cash, counted difference",()=>{
 let s=checkout(addToCart(openSession(seed(),500),"P-101",2),500,at);
 let z=closeSession(s,650,at);assert.equal(z.sessions[0].expected,640);assert.equal(z.sessions[0].difference,10);
 assert.throws(()=>addToCart(z,"P-101"),/Ouvrez/);assert.throws(()=>closeSession(z,650),/Aucune/);
});
test("cannot close register with nonempty cart",()=>assert.throws(()=>closeSession(addToCart(openSession(seed()),"P-101"),10),/Videz/));
test("inventory adjustments create movements with reasons",()=>{
 let s=adjustStock(seed(),"P-105",4,"Livraison test",at);assert.equal(s.products.find(p=>p.id==="P-105").stock,8);
 assert.equal(s.movements[0].reason,"Livraison test");assert.throws(()=>adjustStock(seed(),"P-105",3," "),/obligatoire/);
});
test("unique barcode, required product fields, inventory counts",()=>{
 let s=createProduct(seed(),{name:"Test",barcode:"FICTIF-111",category:"Divers",price:100,stock:1,minStock:2});
 assert.equal(s.products.length,11);assert.throws(()=>createProduct(s,{name:"Dup",barcode:"FICTIF-111",price:300,stock:1}),/existe/);
});
test("change cart count and no checkout when empty",()=>{
 let s=addToCart(openSession(seed()),"P-101",3);
 s=changeCart(s,"P-101",1);assert.equal(s.cart[0].qty,1);
 s=changeCart(s,"P-101",0);assert.equal(s.cart.length,0);assert.throws(()=>checkout(s,100),/Ajoutez/);
});
test("backup roundtrip and prevents mismatched version",()=>{
 assert.deepEqual(hydrate(seed()),seed());assert.throws(()=>hydrate({...seed(),version:1}),/incompatible/);
});
test("escapes user inputs and sanitizes CSV formulas",()=>{
 assert.equal(escapeHtml('<script>'),"&lt;script&gt;");assert.match(csv([{name:"=SUM(A1)"}],["name"]),/'=SUM/);
});

test("presentation session starts open with consistent sample sales and stock",()=>{
 const s=demoSeed(new Date("2026-10-25T12:00:00Z"));
 assert.equal(activeSession(s)?.status,"open");
 assert.equal(s.products.length,14);
 assert.equal(s.sales.length,3);
 assert.equal(s.sessions.length,2);
 assert.equal(metrics(s).revenue,s.sales.reduce((n,x)=>n+x.total,0));
 assert.equal(s.products.find(x=>x.id==="P-101").stock,22);
 assert.equal(s.products.find(x=>x.id==="P-111").stock,21);
 assert.deepEqual(hydrate(s),s);
});
test("scanning the same barcode twice adds quantity and preserves stock rules",()=>{
 let s=demoSeed(new Date("2026-10-25T12:00:00Z"));
 s=addBarcodeToCart(s," 61001001 ");
 s=addBarcodeToCart(s,"61001001");
 assert.equal(s.cart[0].qty,2);
 const before=s.products.find(x=>x.id==="P-101").stock;
 const paid=checkout(s,200);
 assert.equal(paid.sales[0].lines[0].qty,2);
 assert.equal(paid.products.find(x=>x.id==="P-101").stock,before-2);
 assert.throws(()=>addBarcodeToCart(s,"99999999"),/inconnu/);
 assert.throws(()=>addBarcodeToCart(s,"  "),/obligatoire/);
 assert.throws(()=>addBarcodeToCart(seed(),"61001001"),/Ouvrez/);
 assert.throws(()=>addBarcodeToCart(s,"61001010"),/Stock insuffisant/);
});
