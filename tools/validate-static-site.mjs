import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const files = ['index.html', 'article.html', 'css/styles.css', 'js/main.js'];
const forbidden = [
  'React',
  'TypeScript',
  'Supabase',
  'sprint',
  'agency',
  'Dashboards',
  'portals',
  'internal tools',
  'StorePilot',
  'Alcaisse',
  'Kepler',
  'Hire me'
];

for (const file of files) {
  const content = readFileSync(join(root, file), 'utf8');
  for (const term of forbidden) {
    if (content.includes(term)) {
      throw new Error(`${file} still contains forbidden visible term: ${term}`);
    }
  }
}

const imageRefs = files
  .filter((file) => file.endsWith('.html'))
  .flatMap((file) => {
    const html = readFileSync(join(root, file), 'utf8');
    return [...html.matchAll(/src="([^"]+\.(?:svg|png|jpg|jpeg|webp))"/g)].map((match) => match[1]);
  });

for (const imageRef of imageRefs) {
  if (imageRef.startsWith('http')) continue;
  if (!existsSync(join(root, imageRef.replace(/^\//, '')))) {
    throw new Error(`Missing referenced image: ${imageRef}`);
  }
}

console.log(`Static homepage validation passed: ${imageRefs.length} local images checked.`);
