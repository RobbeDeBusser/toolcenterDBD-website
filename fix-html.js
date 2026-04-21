import fs from 'fs';
import path from 'path';

const files = [
  'index.html',
  'producten.html',
  'handtools.html',
  'powertools.html',
  'diagnose.html',
  'specials.html',
  'catalogus.html',
  'contact.html',
  'privacy.html',
  '404.html',
  'src/components/layout/header.html',
  'src/components/meta.html'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix the malformed img tags created by the previous script
    content = content.replace(/\/\s*loading="lazy"\s*decoding="async">/gi, 'loading="lazy" decoding="async" />');
    content = content.replace(/\/\s*decoding="async">/gi, 'decoding="async" />');

    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
}
