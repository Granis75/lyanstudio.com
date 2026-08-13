import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const files = [
  'index.html',
  'journal.html',
  'journal/player-experience.html',
  'journal/athlete-flow.html',
  'journal/fgc-freeplay.html',
  'css/styles.css',
  'js/main.js'
];
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
  'Hire me',
  'future editorial space',
  'article template',
  'draft space',
  'Open article template',
  'Coming soon'
];

for (const file of files) {
  const content = readFileSync(join(root, file), 'utf8');
  for (const term of forbidden) {
    if (content.includes(term)) {
      throw new Error(`${file} still contains forbidden visible term: ${term}`);
    }
  }
}

const htmlImageRefs = files
  .filter((file) => file.endsWith('.html'))
  .flatMap((file) => {
    const html = readFileSync(join(root, file), 'utf8');
    return [...html.matchAll(/src="([^"]+\.(?:svg|png|jpg|jpeg|webp))"/g)].map((match) => ({
      file,
      imageRef: match[1]
    }));
  });

for (const { file, imageRef } of htmlImageRefs) {
  if (imageRef.startsWith('http')) continue;
  const imagePath = imageRef.startsWith('/')
    ? join(root, imageRef.replace(/^\//, ''))
    : join(root, dirname(file), imageRef);
  if (!existsSync(imagePath)) {
    throw new Error(`Missing referenced image in ${file}: ${imageRef}`);
  }
}

const script = readFileSync(join(root, 'js/main.js'), 'utf8');
const dataImageRefs = [...script.matchAll(/image: '([^']+\.(?:svg|png|jpg|jpeg|webp))'/g)].map((match) => match[1]);

for (const imageRef of dataImageRefs) {
  if (!existsSync(join(root, imageRef))) {
    throw new Error(`Missing article data image: ${imageRef}`);
  }
}

console.log(`Static site validation passed: ${htmlImageRefs.length + dataImageRefs.length} local images checked.`);
