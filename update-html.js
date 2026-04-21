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
    
    // Replace image extensions
    content = content.replace(/\.png/g, '.webp').replace(/\.jpg/g, '.webp').replace(/\.jpeg/g, '.webp');
    
    // Add loading and decoding attributes
    content = content.replace(/<img([^>]*)>/gi, (match, p1) => {
        if (p1.includes('loading=') || p1.includes('decoding=')) return match;
        // Do not lazy load LCP candidates
        if (p1.includes('werkplaats.webp') || p1.includes('Snap-on-Logo.webp')) {
           return `<img${p1} decoding="async">`;
        }
        return `<img${p1} loading="lazy" decoding="async">`;
    });

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
}
