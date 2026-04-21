import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'images');

async function convertImages() {
  console.log('Starting image conversion...');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const filePath = path.join(dir, file);
      const newPath = path.join(dir, file.replace(/\.[^/.]+$/, ".webp"));
      
      try {
        await sharp(filePath).webp({ quality: 80 }).toFile(newPath);
        console.log(`Converted ${file} to WebP`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    }
  }
  console.log('Conversion complete!');
}

convertImages();
