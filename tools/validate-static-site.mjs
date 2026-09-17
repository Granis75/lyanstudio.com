import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import assert from 'node:assert/strict';

const pages = readdirSync('.').filter((file) => file.endsWith('.html'));
const requiredPages = ['index.html', 'work.html', 'services.html', 'about.html', 'contact.html', 'alcaisse.html', 'alcaisse-demo.html', 'legal.html', 'privacy.html'];
for (const page of requiredPages) assert(pages.includes(page), `Missing page: ${page}`);
const forbidden = /photography|graphic design portfolio|event agency|gaming|esports|live events|combat sports/i;
let references = 0;
for (const file of [...pages, 'js/main.js', 'assets/og-image.svg', 'site.webmanifest']) {
  const content = readFileSync(file, 'utf8');
  assert(!forbidden.test(content), `Unwanted positioning in ${file}`);
  if (!file.endsWith('.html')) continue;
  assert(content.includes('rel="canonical"'), `Missing canonical: ${file}`);
  for (const [, ref] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    const path = ref.split(/[?#]/)[0];
    const target = path.startsWith('/') ? resolve('.' + path) : resolve(dirname(file), path);
    assert(existsSync(target), `Missing reference in ${file}: ${ref}`);
    references++;
  }
}
const home = readFileSync('index.html', 'utf8');
for (const term of ['Software Lab', 'software studio', 'StorePilot', 'Alcaisse', 'Kepler Express', 'dashboards', 'internal tools', 'React', 'TypeScript', 'Supabase']) {
  assert(home.includes(term), `Missing software positioning: ${term}`);
}
const sitemap = readFileSync('sitemap.xml', 'utf8');
for (const page of pages) assert(sitemap.includes(`https://www.lyanstudio.com/${page === 'index.html' ? '' : page}</loc>`), `Missing sitemap entry: ${page}`);
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
for (const redirect of config.redirects ?? []) assert(!requiredPages.filter(p => p !== 'index.html').some(p => redirect.source === '/' + p), `Redirect hides restored page: ${redirect.source}`);
console.log(`Software site validation passed: ${pages.length} pages, ${references} local references, positioning and sitemap checked.`);
