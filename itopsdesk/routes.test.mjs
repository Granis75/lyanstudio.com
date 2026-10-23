import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const routes = [
["overview","index.html","/itopsdesk/"],
["tickets","incidents.html","/itopsdesk/incidents.html"],
["assets","assets.html","/itopsdesk/assets.html"],
["activity","activity.html","/itopsdesk/activity.html"]
];
for (const [page,file,route] of routes) {
 test("directly addressable "+page+" page with stable assets",()=>{
  const path="itopsdesk/"+file;
  assert(existsSync(path));
  const html=readFileSync(path,"utf8");
  assert(html.includes('data-page="'+page+'"'));
  assert(html.includes('href="/itopsdesk/styles.css"'));
  assert(html.includes('src="/itopsdesk/app.mjs"'));
  assert(html.includes('rel="canonical" href="https://www.lyanstudio.com'+route+'"'));
  assert(html.includes('id="workspace"'));
  assert(html.includes('data-nav="'+page+'"'));
  assert(!html.includes('href="./styles.css"'));
  assert(!html.includes('src="./app.mjs"'));
  for(const [, ,href] of routes)assert(html.includes('href="'+href+'"'),"Missing nav "+href+" in "+page);
 });
}
test("router preserves page-specific startup",()=>{
 const js=readFileSync("itopsdesk/app.mjs","utf8");
 assert(js.includes("document.body.dataset.page"));
 assert(js.includes('document.querySelectorAll("[data-nav]")'));
 assert(js.includes('window.location.assign(routes[next])'));
});
