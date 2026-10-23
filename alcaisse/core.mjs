// AlCaisse Web Lab — fictional, browser-only product workflow simulation.
// No code or customer data is copied from the private Windows/Electron app.
export const VERSION = 2;
export const CATEGORIES = ["Boissons","Snacks","Épicerie","Hygiène","Divers"];
export const MAX_AMOUNT = 100_000_000;
const time = () => new Date().toISOString();
const next = (s,kind,prefix) => prefix+String(++s.seq[kind]).padStart(4,"0");
const log = (s,what,at=time()) => s.events.unshift({id:next(s,"event","EV-"),at,what});
const ensureInt=(value,field,min=0,max=MAX_AMOUNT)=>{
  const n=Number(value);
  if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error(field+" : montant ou quantité invalide.");
  return n;
};
const required=(value,field,max=120)=>{
  const t=String(value??"").trim().slice(0,max);
  if(!t)throw new Error(field+" est obligatoire.");
  return t;
};
export function seed() {
 return {version:VERSION,
  seq:{product:110,session:100,sale:1000,event:0,movement:0},
  products:[
  {id:"P-101",name:"Eau minérale 50 cl",barcode:"61001001",category:"Boissons",price:70,stock:24,minStock:5},
  {id:"P-102",name:"Jus d'orange 25 cl",barcode:"61001002",category:"Boissons",price:130,stock:18,minStock:6},
  {id:"P-103",name:"Boisson gazeuse 33 cl",barcode:"61001003",category:"Boissons",price:110,stock:12,minStock:5},
  {id:"P-104",name:"Biscuits chocolat",barcode:"61001004",category:"Snacks",price:150,stock:14,minStock:5},
  {id:"P-105",name:"Chips nature 45 g",barcode:"61001005",category:"Snacks",price:120,stock:4,minStock:5},
  {id:"P-106",name:"Barre céréales",barcode:"61001006",category:"Snacks",price:100,stock:10,minStock:4},
  {id:"P-107",name:"Lait 1 litre",barcode:"61001007",category:"Épicerie",price:170,stock:9,minStock:5},
  {id:"P-108",name:"Café moulu 250 g",barcode:"61001008",category:"Épicerie",price:520,stock:5,minStock:3},
  {id:"P-109",name:"Savon liquide",barcode:"61001009",category:"Hygiène",price:260,stock:3,minStock:4},
  {id:"P-110",name:"Papier essuie-tout",barcode:"61001010",category:"Hygiène",price:190,stock:0,minStock:3}
 ],sessions:[],sales:[],movements:[],cart:[],events:[]};
}
export function hydrate(input){
 if(!input||input.version!==VERSION)throw new Error("Format de sauvegarde incompatible.");
 for(const field of ["products","sessions","sales","movements","cart","events"])if(!Array.isArray(input[field]))throw new Error("Données invalides : "+field);
 if(!input.seq||typeof input.seq!=="object")throw new Error("Compteurs manquants.");
 if(input.products.length>2000||input.sales.length>10000||input.events.length>30000)throw new Error("Sauvegarde trop volumineuse.");
 for(const p of input.products){if(typeof p.name!=="string"||typeof p.barcode!=="string")throw new Error("Produit invalide");ensureInt(p.price,"Prix");ensureInt(p.stock,"Stock");}
 for(const s of input.sessions)if(!["open","closed"].includes(s.status))throw new Error("Session invalide");
 if(input.sessions.filter(s=>s.status==="open").length>1)throw new Error("Deux sessions ouvertes dans la sauvegarde");
 return structuredClone(input);
}
export const activeSession=s=>s.sessions.find(x=>x.status==="open")??null;
export const sumCart=s=>s.cart.reduce((total,line)=>total+(s.products.find(x=>x.id===line.productId)?.price??0)*line.qty,0);
export function saleTotal(sale){return sale.lines.reduce((n,l)=>n+l.price*l.qty,0)}
export function sessionTotal(s,id){return s.sales.filter(x=>x.sessionId===id&&x.status==="completed").reduce((n,x)=>n+x.total,0)}
export function openSession(state,opening=0,at=time()){
 const s=hydrate(state);if(activeSession(s))throw new Error("Une session est déjà ouverte.");
 const session={id:next(s,"session","CS-"),status:"open",openedAt:at,closedAt:null,opening:ensureInt(opening,"Fonds de caisse"),closing:null};
 s.sessions.unshift(session);log(s,session.id+" · Session ouverte",at);return s;
}
export function closeSession(state,counted,at=time()){
 const s=hydrate(state),session=activeSession(s);
 if(!session)throw new Error("Aucune session ouverte.");
 if(s.cart.length)throw new Error("Videz le panier avant de clôturer.");
 session.closing=ensureInt(counted,"Montant compté");session.expected=session.opening+sessionTotal(s,session.id);
 session.difference=session.closing-session.expected;session.status="closed";session.closedAt=at;
 log(s,session.id+" · Session clôturée",at);return s;
}
export function addToCart(state,productId,qty=1){
 const s=hydrate(state);if(!activeSession(s))throw new Error("Ouvrez une session de caisse pour commencer.");
 const p=s.products.find(p=>p.id===productId);if(!p)throw new Error("Produit introuvable.");
 const inc=ensureInt(qty,"Quantité",1,1000),line=s.cart.find(x=>x.productId===productId);
 const n=(line?.qty??0)+inc;
 if(n>p.stock)throw new Error("Stock insuffisant pour "+p.name+".");
 if(line)line.qty=n;else s.cart.push({productId,qty:n});
 return s;
}
export function changeCart(state,productId,qty){
 const s=hydrate(state),line=s.cart.find(x=>x.productId===productId);
 if(!line)throw new Error("Ligne inexistante.");
 const n=ensureInt(qty,"Quantité",0,1000);const p=s.products.find(x=>x.id===productId);
 if(!p||n>p.stock)throw new Error("Stock insuffisant.");
 if(n===0)s.cart=s.cart.filter(x=>x.productId!==productId);else line.qty=n;
 return s;
}
export function clearCart(state){const s=hydrate(state);s.cart=[];return s;}
export function checkout(state,received,at=time()){
 const s=hydrate(state),session=activeSession(s);
 if(!session)throw new Error("Aucune session de caisse ouverte.");
 if(!s.cart.length)throw new Error("Ajoutez au moins un produit.");
 const total=sumCart(s),cash=ensureInt(received,"Montant reçu");
 if(cash<total)throw new Error("Le montant reçu est inférieur au total.");
 const lines=s.cart.map(x=>{
  const p=s.products.find(p=>p.id===x.productId);
  if(!p||p.stock<x.qty)throw new Error("Stock insuffisant, vente non enregistrée.");
  return {productId:p.id,name:p.name,price:p.price,qty:x.qty};
 });
 const sale={id:next(s,"sale","V-"),sessionId:session.id,at,status:"completed",total,received:cash,change:cash-total,lines};
 for(const l of lines){const p=s.products.find(x=>x.id===l.productId);p.stock-=l.qty;
   s.movements.unshift({id:next(s,"movement","MV-"),at,productId:p.id,delta:-l.qty,reason:"Vente "+sale.id});
 }
 s.sales.unshift(sale);s.cart=[];log(s,sale.id+" · Vente encaissée · "+total+" DZD",at);
 return s;
}
export function cancelSale(state,saleId,at=time()){
 const s=hydrate(state),sale=s.sales.find(x=>x.id===saleId);
 if(!sale)throw new Error("Vente introuvable.");
 if(sale.status!=="completed")throw new Error("Vente déjà annulée.");
 if(!activeSession(s))throw new Error("Ouvrez une session pour enregistrer l'annulation.");
 for(const l of sale.lines){const p=s.products.find(x=>x.id===l.productId);if(!p)throw new Error("Produit lié introuvable.");}
 for(const l of sale.lines){
  const p=s.products.find(x=>x.id===l.productId);p.stock+=l.qty;
  s.movements.unshift({id:next(s,"movement","MV-"),at,productId:p.id,delta:l.qty,reason:"Annulation "+sale.id});
 }
 sale.status="cancelled";sale.cancelledAt=at;
 log(s,sale.id+" · Vente annulée, stock rétabli",at);return s;
}
export function adjustStock(state,productId,delta,reason,at=time()){
 const s=hydrate(state),p=s.products.find(x=>x.id===productId);
 if(!p)throw new Error("Produit introuvable.");
 const n=Number(delta);
 if(!Number.isSafeInteger(n)||!n||Math.abs(n)>100000)throw new Error("Ajustement invalide.");
 if(p.stock+n<0)throw new Error("Stock négatif interdit.");
 const label=required(reason,"Motif",150);
 p.stock+=n;s.movements.unshift({id:next(s,"movement","MV-"),at,productId,delta:n,reason:label});
 log(s,p.name+" · Stock ajusté ("+(n>0?"+":"")+n+")",at);return s;
}
export function createProduct(state,data,at=time()){
 const s=hydrate(state);
 const name=required(data.name,"Nom"),barcode=required(data.barcode,"Code-barres",36);
 if(s.products.some(x=>x.barcode.toLowerCase()===barcode.toLowerCase()))throw new Error("Ce code-barres existe déjà.");
 const price=ensureInt(data.price,"Prix",1),stock=ensureInt(data.stock,"Stock"),minStock=ensureInt(data.minStock??5,"Seuil d'alerte");
 const category=CATEGORIES.includes(data.category)?data.category:"Divers";
 const p={id:next(s,"product","P-"),name,barcode,category,price,stock,minStock};
 s.products.push(p);log(s,p.id+" · Produit créé",at);return s;
}
export function metrics(s){
 const active=s.sales.filter(x=>x.status==="completed"),revenue=active.reduce((n,x)=>n+x.total,0);
 return {revenue,sales:active.length,units:active.reduce((n,x)=>n+x.lines.reduce((m,l)=>m+l.qty,0),0),
 low:s.products.filter(p=>p.stock<=p.minStock).length,inventory:s.products.length,
 sessions:s.sessions.length};
}
export const formatDZD=n=>new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(n)+" DZD";
export const escapeHtml=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function csv(rows,columns){
 const q=v=>'"'+String(v??"").replace(/"/g,'""').replace(/^[=+\-@\t\r]/,"'$&")+'"';
 return [columns.map(q).join(";"),...rows.map(r=>columns.map(c=>q(r[c])).join(";"))].join("\r\n");
}
