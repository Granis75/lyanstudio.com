import {CATEGORIES,seed,demoSeed,addBarcodeToCart,hydrate,activeSession,openSession,closeSession,addToCart,changeCart,clearCart,checkout,cancelSale,adjustStock,createProduct,metrics,sumCart,formatDZD,escapeHtml,csv} from "./core.mjs";
const KEY="alcaisse-web-lab-v2";
const $=q=>document.querySelector(q), e=escapeHtml, fmt=formatDZD;
let state;try{state=hydrate(JSON.parse(localStorage.getItem(KEY)))}catch{state=demoSeed()}
const page=document.body.dataset.page;
const routes={checkout:"/alcaisse-demo.html",products:"/alcaisse/products.html",stock:"/alcaisse/stock.html",sales:"/alcaisse/sales.html",reports:"/alcaisse/reports.html",sessions:"/alcaisse/sessions.html"};
const date=iso=>{const t=new Date(iso);return Number.isNaN(t.getTime())?"—":t.toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"})};
let query="",category="Tout",received="",modalMode="",modalTarget="",lastShown="";
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{toast("Le stockage local est indisponible. Les changements peuvent disparaître.");return false}};
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("shown");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("shown"),3600)}
function commit(next,message){state=next;save();render();if(message)toast(message)}
const chip=(str,kind="")=>'<span class="status '+kind+'">'+e(str)+'</span>';
function card(label,value,sub){return '<div class="a-kpi"><span>'+e(label)+'</span><strong>'+e(value)+'</strong><small>'+e(sub)+'</small></div>'}
function panel(title,content,sub=""){return '<section class="a-panel"><div class="a-panel-head"><h2 class="a-section-title">'+title+'</h2>'+ (sub?'<small>'+sub+'</small>':"")+'</div>'+content+'</section>'}
function empty(text){return '<div class="empty-state">'+e(text)+'</div>'}
function badgeStock(p){return p.stock===0?chip("Rupture","danger"):p.stock<=p.minStock?chip("Stock faible","warn"):chip("Disponible","ok")}
function topbar(){
 const a=activeSession(state),el=$("#sidebar-status");
 el.textContent=a?"Session "+a.id+" ouverte":"Aucune session ouverte";
 $("#sidebar-status-dot").className="dot"+(a?"":" dim");
 $("#head-actions").innerHTML=page==="products"?'<button class="btn btn-solid" data-modal="product">＋ Nouveau produit</button>':page==="sessions"?(a?'<button class="btn btn-solid" data-modal="close">Clôturer la session</button>':'<button class="btn btn-solid" data-modal="open">Ouvrir une session</button>'):"";
}
function demoProgress(){
 return '<div class="demo-progress" aria-label="Parcours de découverte">'+[
  "Scanner ou choisir un article","Saisir les espèces reçues",
  "Valider et consulter le ticket","Vérifier les ventes et le stock"
 ].map((x,i)=>'<div class="progress-step"><b>'+(i+1)+'</b><span>'+e(x)+'</span></div>').join("")+'</div>';
}
function checkoutView(){
 const session=activeSession(state),total=sumCart(state),visible=state.products.filter(p=>(category==="Tout"||p.category===category)&&(!query||[p.name,p.barcode,p.category].join(" ").toLowerCase().includes(query.toLowerCase())));
 const banner='<section class="register-banner"><div class="register-banner-inner"><span class="label">CAISSE DE SUPÉRETTE · DONNÉES FICTIVES</span><h2>'+(session?'Caisse ouverte. À vous de jouer.':'Ouvrez votre session.')+'</h2><p>'+(session?'Une caisse doit servir rapidement : scannez ou choisissez un article, encaissez, puis vérifiez le stock. Ventes et sessions affichées sont des exemples fictifs.':'La démonstration respecte un principe métier : aucune vente ne peut être enregistrée sans session de caisse ouverte.')+'</p></div><div class="banner-side"><div><strong>'+(session?e(session.id):"FERMÉE")+'</strong><small>'+(session?"Fonds initial : "+fmt(session.opening):"Prêt pour une ouverture de caisse")+'</small></div><a class="btn btn-outline" href="/alcaisse/sessions.html">'+(session?"Voir la session":"Ouvrir la caisse")+" ↗</a></div></section>";
 const chips=['Tout',...CATEGORIES].map(cat=>'<option value="'+e(cat)+'"'+(cat===category?' selected':'')+'>'+e(cat)+'</option>').join("");
 const scanner='<form id="barcode-form" class="barcode-panel" aria-label="Lecture de code-barres"><div class="barcode-heading"><span class="barcode-icon" aria-hidden="true">▥</span><div><label for="barcode-scan">Scanner un code-barres</label><small>Lecteur USB (mode clavier) + Entrée, ou saisie manuelle</small></div></div><div class="barcode-row"><input id="barcode-scan" class="barcode-input" inputmode="numeric" autocomplete="off" spellcheck="false" placeholder="Ex. 61001001" aria-describedby="barcode-help"'+(!session?' disabled':'')+'><button class="btn btn-solid" type="submit"'+(!session?' disabled':'')+'>Ajouter au panier</button></div><div class="barcode-help" id="barcode-help">Pas de scanner ? <button type="button" class="barcode-example" data-scan-example="61001001"'+(!session?' disabled':'')+'>Tester le scan de l’eau (61001001)</button><span>Codes fictifs. Aucun accès caméra.</span></div></form>';
 const catalog='<div class="catalog-tools"><input class="search-field" id="product-search" type="search" value="'+e(query)+'" aria-label="Rechercher par nom ou code-barres" placeholder="⌕ Rechercher un produit, code-barres..."><select class="search-field" id="category" aria-label="Catégorie">'+chips+'</select></div><div class="products-grid">'+(visible.length?visible.map(p=>'<button class="product-tile" type="button" data-add="'+e(p.id)+'"'+(!session||!p.stock?' disabled':'')+'><span class="mark">'+e(p.category.slice(0,2).toUpperCase())+'</span><small>'+e(p.category)+'</small><strong>'+e(p.name)+'</strong><span class="tile-bottom"><b>'+e(fmt(p.price))+'</b><small>'+p.stock+' en stock</small></span></button>').join(""):empty("Aucun produit trouvé."))+'</div>';
 const lines=state.cart.length?state.cart.map(line=>{
 const p=state.products.find(p=>p.id===line.productId);if(!p)return"";
 return '<div class="cart-line"><div><strong>'+e(p.name)+'</strong><small>'+e(fmt(p.price))+' × '+line.qty+'</small></div><div class="qty-controls"><button type="button" data-qty="'+e(p.id)+'" data-delta="-1" aria-label="Retirer un '+e(p.name)+'">−</button><b>'+line.qty+'</b><button type="button" data-qty="'+e(p.id)+'" data-delta="1" aria-label="Ajouter un '+e(p.name)+'"'+(line.qty>=p.stock?' disabled':'')+'>+</button></div></div>'}).join(""):'<div class="cart-empty"><span class="cart-illustration">▧</span>Votre panier est vide.<br>Choisissez un produit pour commencer.</div>';
 const cart='<div class="cart-content">'+lines+'<div class="cart-totals"><span>TOTAL ENCAISSEMENT</span><strong>'+e(fmt(total))+'</strong></div><label class="pay-label" for="received">Espèces reçues (DZD)</label><input class="pay-input" id="received" type="number" min="0" max="100000000" step="1" inputmode="numeric" placeholder="Montant reçu" value="'+e(received)+'"><p class="pay-note" id="cash-feedback">Montant entier, aucune transaction réelle.</p><div class="action-row" style="margin-bottom:13px"><button class="btn btn-outline" type="button" data-exact'+(!total?' disabled':'')+'>Montant exact</button><button class="btn btn-outline" type="button" data-clear'+(!state.cart.length?' disabled':'')+'>Vider le panier</button></div><button class="btn btn-solid pay-button" type="button" data-checkout'+(!session||!state.cart.length?' disabled':'')+'>Valider la vente simulée →</button></div>';
 const last=state.sales[0];
 return banner+scanner+'<div class="register-columns">'+panel("Catalogue · "+state.products.length+" articles",catalog,"Données fictives")+
 panel('Panier <span class="status">'+state.cart.reduce((n,x)=>n+x.qty,0)+' article(s)</span>',cart,"Espèces uniquement")+'</div>'+
 '<div class="a-kpi-grid" style="margin-top:19px">'+card("CA fictif",fmt(metrics(state).revenue),"Net des annulations")+card("Ventes validées",String(metrics(state).sales),"Dans ce navigateur")+card("Alertes stock",String(metrics(state).low),"Seuils inclus")+card("Dernière vente",last?fmt(last.total):"—",last?last.id:"Aucune vente")+'</div>'+
 demoProgress();
}
function filterRow(placeholder){return '<div class="tool-row"><input id="table-search" class="search-field" aria-label="Filtrer le tableau" type="search" placeholder="'+e(placeholder)+'" value="'+e(query)+'"></div>'}
function productsView(){
 const s=state.products.filter(p=>[p.name,p.barcode,p.category].join(" ").toLowerCase().includes(query.toLowerCase()));
 const trs=s.map(p=>'<tr><td><span class="strong">'+e(p.name)+'</span><div class="muted">'+e(p.id)+'</div></td><td>'+e(p.barcode)+'</td><td>'+e(p.category)+'</td><td class="strong">'+e(fmt(p.price))+'</td><td>'+p.stock+'</td><td>'+badgeStock(p)+'</td></tr>').join("");
 return '<div class="a-kpi-grid">'+card("Références",state.products.length.toString(),"Catalogue fictif")+card("En stock",state.products.filter(p=>p.stock>0).length.toString(),"Produits disponibles")+card("Stock bas",metrics(state).low.toString(),"Sous le seuil ou à zéro")+card("Devise","DZD","Dinars algériens")+'</div>'+filterRow("Chercher un nom, une catégorie, un code-barres...")+
 panel("Registre des articles",'<div class="a-table-wrap"><table class="a-table"><thead><tr><th>Article</th><th>Code-barres</th><th>Catégorie</th><th>Prix</th><th>Stock</th><th>État</th></tr></thead><tbody>'+trs+'</tbody></table></div>'+(s.length?"":empty("Aucun produit trouvé.")),s.length+" résultats");
}
function stockView(){
 const s=state.products.filter(p=>[p.name,p.barcode,p.category].join(" ").toLowerCase().includes(query.toLowerCase()));
 const trs=s.map(p=>'<tr><td class="strong">'+e(p.name)+'</td><td>'+e(p.barcode)+'</td><td>'+p.stock+'</td><td>'+p.minStock+'</td><td>'+badgeStock(p)+'</td><td><button class="small-btn" type="button" data-adjust="'+e(p.id)+'">Ajuster ↗</button></td></tr>').join("");
 const movements=state.movements.slice(0,8).map(m=>{const p=state.products.find(x=>x.id===m.productId);return '<div class="activity-line"><i class="bubble"></i><div><strong>'+e(p?.name||m.productId)+'</strong> · <b>'+(m.delta>0?"+":"")+m.delta+'</b><small>'+e(m.reason)+' · '+e(date(m.at))+'</small></div></div>'}).join("");
 return '<div class="a-kpi-grid">'+card("Unités physiques",state.products.reduce((n,p)=>n+p.stock,0).toString(),"Inventaire fictif")+card("Alertes",metrics(state).low.toString(),"Sous les seuils")+card("Mouvements",String(state.movements.length),"Ventes et corrections")+card("Articles",String(state.products.length),"Références suivies")+'</div>'+filterRow("Chercher un article ou un code-barres...")+
 '<div class="two-col">'+panel("État du stock",'<div class="a-table-wrap"><table class="a-table"><thead><tr><th>Article</th><th>Code-barres</th><th>Stock</th><th>Seuil</th><th>État</th><th>Action</th></tr></thead><tbody>'+trs+'</tbody></table></div>'+(s.length?"":empty("Aucun produit.")),s.length+" références")+
 panel("Mouvements récents",'<div class="a-panel-body">'+(movements||empty("Aucun mouvement pour le moment."))+'</div>')+'</div>';
}
function salesView(){
 const trs=state.sales.map(x=>'<tr><td><button class="small-btn" type="button" data-receipt="'+e(x.id)+'">'+e(x.id)+' ↗</button></td><td>'+e(date(x.at))+'</td><td>'+x.lines.reduce((n,l)=>n+l.qty,0)+'</td><td>'+e(fmt(x.total))+'</td><td>'+badgeSale(x)+'</td><td>'+e(x.sessionId)+'</td><td>'+(x.status==="completed"?'<button class="small-btn red" data-cancel="'+e(x.id)+'" type="button">Annuler</button>':"—")+'</td></tr>').join("");
 return '<div class="a-kpi-grid">'+card("Ventes enregistrées",String(state.sales.length),"Y compris annulations")+card("Ventes actives",String(metrics(state).sales),"Hors annulations")+card("CA net",fmt(metrics(state).revenue),"Espèces simulées")+card("Articles vendus",String(metrics(state).units),"Net des annulations")+'</div>'+
 panel("Journal de caisse",'<div class="a-table-wrap"><table class="a-table"><thead><tr><th>Ticket</th><th>Date</th><th>Qté</th><th>Total</th><th>Statut</th><th>Session</th><th>Action</th></tr></thead><tbody>'+trs+'</tbody></table></div>'+(state.sales.length?"":empty("Aucune vente. Ouvrez une session, puis encaissez un panier fictif.")),state.sales.length+" tickets")+
 '<div class="note-card" style="margin-top:17px"><strong>Annulations</strong> : la démonstration restaure les stocks, conserve le ticket initial avec le statut « Annulé » et met à jour les indicateurs. Aucun remboursement réel n’est effectué.</div>';
}
function badgeSale(sale){return sale.status==="completed"?chip("Validée","ok"):chip("Annulée","danger")}
function reportsView(){
 const m=metrics(state),completed=state.sales.filter(x=>x.status==="completed");
 const quantities=new Map();for(const sale of completed)for(const l of sale.lines)quantities.set(l.productId,(quantities.get(l.productId)||0)+l.qty);
 const leaders=[...quantities].sort((a,b)=>b[1]-a[1]).slice(0,6),max=Math.max(1,...leaders.map(x=>x[1]));
 const chart=leaders.length?leaders.map(([id,n])=>{const p=state.products.find(x=>x.id===id);return '<div class="report-item"><span>'+e(p?.name||id)+'</span><b>'+n+' unités</b><div class="report-track"><i style="width:'+Math.round(n/max*100)+'%"></i></div></div>'}).join(""):empty("Effectuez une vente fictive pour afficher les articles vendus.");
 const rows=completed.map(x=>'<tr><td>'+e(x.id)+'</td><td>'+e(date(x.at))+'</td><td>'+x.lines.reduce((n,l)=>n+l.qty,0)+'</td><td class="strong">'+e(fmt(x.total))+'</td></tr>').join("");
 return '<div class="a-kpi-grid">'+card("CA net simulé",fmt(m.revenue),"Toutes sessions confondues")+card("Ventes validées",String(m.sales),"Annulations exclues")+card("Unités vendues",String(m.units),"Net des annulations")+card("Panier moyen",fmt(m.sales?Math.round(m.revenue/m.sales):0),"Montants fictifs")+'</div>'+
 '<div class="two-col">'+panel("Produits les plus vendus",'<div class="a-panel-body">'+chart+'</div>')+
 panel("Informations du rapport",'<div class="a-panel-body"><div class="note-card"><strong>Source de données :</strong> uniquement les ventes fictives que vous avez créées ici, enregistrées dans le stockage local du navigateur.<p>Les annulations sont exclues des revenus et des volumes. Aucun chiffre ne représente un vrai magasin ou client.</p></div><div class="action-row" style="margin-top:18px"><button type="button" class="btn btn-outline" data-csv="sales">Exporter les ventes CSV</button></div></div>')+'</div><div style="height:18px"></div>'+
 panel("Transactions retenues dans les calculs",'<div class="a-table-wrap"><table class="a-table"><thead><tr><th>Référence</th><th>Date</th><th>Articles</th><th>Montant</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+(completed.length?"":empty("Aucune transaction disponible.")));
}
function sessionsView(){
 const a=activeSession(state);
 const status=a?'<div class="register-banner"><div class="register-banner-inner"><span class="label">SESSION EN COURS</span><h2>'+e(a.id)+' · Ouverte</h2><p>Ouverture : '+e(date(a.openedAt))+'. Les ventes simulées peuvent être enregistrées tant que cette session est active.</p></div><div class="banner-side"><div><strong>'+e(fmt(a.opening+state.sales.filter(x=>x.sessionId===a.id&&x.status==="completed").reduce((n,x)=>n+x.total,0)))+'</strong><small>Espèces attendues selon la simulation</small></div><button class="btn btn-outline" type="button" data-modal="close">Clôturer ↗</button></div></div>':
 '<div class="register-banner"><div class="register-banner-inner"><span class="label">SESSION FERMÉE</span><h2>Prêt pour la prochaine caisse.</h2><p>Ouvrez une session et saisissez un fonds initial fictif pour autoriser l’encaissement.</p></div><div class="banner-side"><div><strong>INACTIVE</strong><small>Les ventes sont bloquées jusqu’à l’ouverture.</small></div><button class="btn btn-outline" type="button" data-modal="open">Nouvelle session →</button></div></div>';
 const trs=state.sessions.map(x=>'<tr><td class="strong">'+e(x.id)+'</td><td>'+e(date(x.openedAt))+'</td><td>'+e(fmt(x.opening))+'</td><td>'+e(fmt(x.opening+state.sales.filter(s=>s.sessionId===x.id&&s.status==="completed").reduce((n,s)=>n+s.total,0)))+'</td><td>'+chip(x.status==="open"?"Ouverte":"Clôturée",x.status==="open"?"ok":"off")+'</td><td>'+(x.status==="closed"?e(fmt(x.difference)):"—")+'</td></tr>').join("");
 return status+'<div class="a-kpi-grid">'+card("Sessions enregistrées",String(state.sessions.length),"Ouvertes et clôturées")+card("Caisse active",a?a.id:"Aucune","Persona fictif")+card("Fonds initial",fmt(a?.opening??0),"Espèces simulées")+card("Ventes sur session",a?fmt(state.sales.filter(x=>x.sessionId===a.id&&x.status==="completed").reduce((n,x)=>n+x.total,0)):"—","Net des annulations")+'</div>'+
 panel("Historique des sessions",'<div class="a-table-wrap"><table class="a-table"><thead><tr><th>Session</th><th>Ouverture</th><th>Fonds initial</th><th>Attendu actuel</th><th>Statut</th><th>Écart clôture</th></tr></thead><tbody>'+trs+'</tbody></table></div>'+(state.sessions.length?"":empty("Aucune session enregistrée.")));
}
function render(){
 topbar();
 const contents={checkout:checkoutView,products:productsView,stock:stockView,sales:salesView,reports:reportsView,sessions:sessionsView};
 $("#workspace").innerHTML=(contents[page]||checkoutView)();
 updateCashInfo();
}
function updateCashInfo(){
 const el=$("#cash-feedback"),inp=$("#received");if(!el||!inp)return;
 received=inp.value;
 const n=Number(received),total=sumCart(state);
 el.textContent=!received?"Montant entier, aucun paiement réel.":!Number.isSafeInteger(n)||n<0?"Saisissez un montant entier.":n<total?"Reste à recevoir : "+fmt(total-n):"Monnaie à rendre : "+fmt(n-total);
}
function openModal(kind,target=""){
 modalMode=kind;modalTarget=target;let title="",fields="";
 const f=(name,label,value="",type="text",full=false,required=false)=>'<div class="dlg-field'+(full?' full':'')+'"><label for="f-'+name+'">'+e(label)+'</label><input id="f-'+name+'" name="'+name+'" type="'+type+'" value="'+e(value)+'"'+(type==="number"?' min="0" step="1"':"")+(required?' required':"")+'></div>';
 if(kind==="open"){title="Ouvrir une session";fields=f("opening","Fonds initial fictif (DZD)","1000","number",true,true)}
 else if(kind==="close"){title="Clôturer la caisse";const a=activeSession(state),expected=a?a.opening+state.sales.filter(x=>x.sessionId===a.id&&x.status==="completed").reduce((n,x)=>n+x.total,0):0;fields='<div class="dlg-field full"><div class="note-card">Espèces attendues : <strong>'+e(fmt(expected))+'</strong>. Saisissez un montant fictif compté. L’écart sera conservé dans cette session.</div></div>'+f("counted","Montant fictif compté (DZD)",expected,"number",true,true)}
 else if(kind==="adjust"){const p=state.products.find(x=>x.id===target);if(!p)return;title="Ajuster : "+p.name;fields='<div class="dlg-field full"><div class="note-card">Stock avant ajustement : <strong>'+p.stock+' unité(s)</strong>. Utiliser un nombre négatif pour une sortie.</div></div>'+f("delta","Variation (+ ou −)","1","number",true,true).replace('min="0" ','')+f("reason","Motif (obligatoire)","","text",true,true)}
 else if(kind==="product"){title="Ajouter un produit fictif";fields=f("name","Nom du produit","","text",true,true)+f("barcode","Code-barres fictif","","text",true,true)+f("price","Prix en DZD (entier)","150","number",false,true)+f("stock","Stock initial","10","number",false,true)+f("minStock","Seuil d'alerte","5","number",false,true)+'<div class="dlg-field"><label for="f-category">Catégorie</label><select id="f-category" name="category">'+CATEGORIES.map(x=>'<option>'+e(x)+'</option>').join("")+'</select></div>';}
 else return;
 $("#form-title").textContent=title;$("#form-fields").innerHTML='<div class="dlg-fields">'+fields+'</div>';$("#form-dialog").showModal();$("#form-fields").querySelector("input")?.focus();
}
$("#operation-form").addEventListener("submit",ev=>{
 ev.preventDefault();const data=Object.fromEntries(new FormData(ev.currentTarget).entries());
 try{
  let next;
  if(modalMode==="open")next=openSession(state,data.opening);
  else if(modalMode==="close")next=closeSession(state,data.counted);
  else if(modalMode==="adjust")next=adjustStock(state,modalTarget,data.delta,data.reason);
  else if(modalMode==="product")next=createProduct(state,data);
  else return;
  $("#form-dialog").close();commit(next,"Action fictive enregistrée localement.");
 }catch(error){toast(error.message)}
});
$("#dialog-close").addEventListener("click",()=>$("#form-dialog").close());
$("#dialog-cancel").addEventListener("click",()=>$("#form-dialog").close());
function handleBarcode(barcode){
 try{
  const next=addBarcodeToCart(state,barcode);
  const product=state.products.find(p=>p.barcode.toLowerCase()===String(barcode).trim().toLowerCase());
  commit(next,(product?.name??"Article")+" ajouté au panier.");
 }catch(err){toast(err.message)}
 $("#barcode-scan")?.focus();
}
document.addEventListener("submit",ev=>{
 if(ev.target.id!=="barcode-form")return;
 ev.preventDefault();
 handleBarcode($("#barcode-scan")?.value??"");
});
function showReceipt(id){
 const sale=state.sales.find(x=>x.id===id);if(!sale)return;
 $("#receipt-content").innerHTML='<div class="receipt-paper"><h3>ALCAISSE · DÉMO</h3><p style="text-align:center">Simulation navigateur · aucun reçu fiscal</p><div>'+e(sale.id)+' · '+e(date(sale.at))+'</div><div>Session : '+e(sale.sessionId)+'</div><hr>'+sale.lines.map(l=>'<div class="receipt-line"><span>'+e(l.name)+' × '+l.qty+'</span><strong>'+e(fmt(l.price*l.qty))+'</strong></div>').join("")+'<hr><div class="receipt-line"><strong>Total</strong><strong>'+e(fmt(sale.total))+'</strong></div><div class="receipt-line"><span>Espèces reçues</span><strong>'+e(fmt(sale.received))+'</strong></div><div class="receipt-line"><span>Monnaie</span><strong>'+e(fmt(sale.change))+'</strong></div><p>Statut : '+(sale.status==="completed"?"Vente simulée validée":"ANNULÉE")+'</p><p>NE VAUT PAS TICKET DE CAISSE</p></div>';
 $("#receipt-dialog").showModal();
}
$("#receipt-close").addEventListener("click",()=>$("#receipt-dialog").close());
$("#receipt-done").addEventListener("click",()=>$("#receipt-dialog").close());
document.addEventListener("click",ev=>{
 const target=ev.target.closest("[data-add],[data-qty],[data-clear],[data-exact],[data-checkout],[data-cancel],[data-receipt],[data-adjust],[data-modal],[data-csv],[data-scan-example]");
 if(!target)return;
 try{
  if(target.dataset.scanExample){handleBarcode(target.dataset.scanExample);return}
  if(target.dataset.modal){openModal(target.dataset.modal);return}
  if(target.dataset.adjust){openModal("adjust",target.dataset.adjust);return}
  if(target.dataset.add){commit(addToCart(state,target.dataset.add),"Produit ajouté au panier.");return}
  if(target.dataset.qty){const line=state.cart.find(x=>x.productId===target.dataset.qty);if(line)commit(changeCart(state,line.productId,line.qty+Number(target.dataset.delta)));return}
  if(target.hasAttribute("data-clear")){commit(clearCart(state),"Panier vidé.");return}
  if(target.hasAttribute("data-exact")){received=String(sumCart(state));const el=$("#received");if(el)el.value=received;updateCashInfo();return}
  if(target.hasAttribute("data-checkout")){
   const next=checkout(state,$("#received")?.value??"");const sale=next.sales[0];received="";commit(next,"Vente simulée validée, stock actualisé.");showReceipt(sale.id);return;
  }
  if(target.dataset.receipt){showReceipt(target.dataset.receipt);return}
  if(target.dataset.cancel){if(!confirm("Annuler cette vente de démonstration et rétablir le stock ?"))return;commit(cancelSale(state,target.dataset.cancel),"Vente fictive annulée et stock rétabli.");return}
  if(target.dataset.csv){const rows=state.sales.map(x=>({id:x.id,date:x.at,session:x.sessionId,total:x.total,statut:x.status}));download("alcaisse-demo-ventes.csv","text/csv;charset=utf-8","\uFEFF"+csv(rows,["id","date","session","total","statut"]));toast("Export CSV fictif prêt.");return}
 }catch(err){toast(err.message)}
});
document.addEventListener("input",ev=>{
 if(ev.target.id==="received"){received=ev.target.value;updateCashInfo();return}
 if(ev.target.id==="table-search"||ev.target.id==="product-search"){
  query=ev.target.value;const id=ev.target.id,position=ev.target.selectionStart;
  render();const next=$("#"+id);if(next){next.focus();next.setSelectionRange(position,position)}
 }
});
document.addEventListener("change",ev=>{if(ev.target.id==="category"){category=ev.target.value;render()}});
function download(name,type,content){const link=document.createElement("a");const url=URL.createObjectURL(new Blob([content],{type}));link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$("#export").addEventListener("click",()=>download("alcaisse-demo-backup.json","application/json",JSON.stringify(state,null,2)));
$("#import-trigger").addEventListener("click",()=>$("#import-json").click());
$("#import-json").addEventListener("change",async ev=>{
 const file=ev.target.files?.[0];if(!file)return;
 try{
  if(file.size>1_000_000)throw new Error("Fichier supérieur à 1 Mo.");
  const parsed=hydrate(JSON.parse(await file.text()));
  if(confirm("Remplacer toutes les données de démonstration locales par cet export ?"))commit(parsed,"Données fictives importées.");
 }catch(error){toast("Import impossible : "+error.message)}finally{ev.target.value=""}
});
$("#reset").addEventListener("click",()=>{if(confirm("Effacer vos actions locales et recharger les ventes et sessions de présentation ?")){query="";category="Tout";received="";commit(demoSeed(),"Données de présentation rechargées.")}});
render();
