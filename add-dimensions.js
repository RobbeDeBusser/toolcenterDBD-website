import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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
  'src/components/layout/footer.html',
  'src/components/meta.html'
];

async function updateDimensions() {
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    
    // We will find all <img ...> tags
    const imgRegex = /<img([^>]+)>/gi;
    let match;
    let newContent = content;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const imgTag = match[0];
      // If it already has width and height, skip
      if (imgTag.includes('width=') && imgTag.includes('height=')) continue;
      
      const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
      if (!srcMatch) continue;
      
      let src = srcMatch[1];
      // remove leading slash for local path resolution
      if (src.startsWith('/')) {
        src = src.substring(1);
      }
      
      // we know static files are in public/ or root
      let localPath = path.join('public', src);
      if (!fs.existsSync(localPath)) {
        localPath = path.join(src);
      }
      
      if (fs.existsSync(localPath)) {
        try {
          const metadata = await sharp(localPath).metadata();
          if (metadata.width && metadata.height) {
            let newTag = imgTag.replace(/<img\s+/, `<img width="${metadata.width}" height="${metadata.height}" `);
            newContent = newContent.replace(imgTag, newTag);
          }
        } catch (e) {
          console.error(`Error reading ${localPath}:`, e.message);
        }
      }
    }
    
    if (content !== newContent) {
      fs.writeFileSync(file, newContent);
      console.log(`Added dimensions in ${file}`);
    }
  }
}

updateDimensions();
