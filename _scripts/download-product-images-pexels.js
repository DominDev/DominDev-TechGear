/**
 * Download cyberpunk-style product images from Pexels (free, no API key needed)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Alternative gaming product images (from Pexels - free to use)
const images = [
    // MICE
    { id: 1, name: 'nighthawk-x2-pro', url: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800' }, // gaming mouse
    { id: 2, name: 'viper-stealth', url: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800' }, // black mouse
    { id: 3, name: 'ghost-tracker', url: 'https://images.pexels.com/photos/7861580/pexels-photo-7861580.jpeg?auto=compress&cs=tinysrgb&w=800' }, // tech mouse

    // KEYBOARDS
    { id: 4, name: 'cyberdeck-mk-iv', url: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800' }, // mechanical keyboard
    { id: 5, name: 'mechanic-k-75', url: 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=800' }, // gaming keyboard
    { id: 6, name: 'shadowtype-mini', url: 'https://images.pexels.com/photos/2582935/pexels-photo-2582935.jpeg?auto=compress&cs=tinysrgb&w=800' }, // compact keyboard

    // HEADSETS
    { id: 7, name: 'tg-1-pro-wireless', url: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800' }, // gaming headset
    { id: 8, name: 'void-surround', url: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800' }, // black headset
    { id: 9, name: 'silent-predator', url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800' } // premium headset
];

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'img', 'products', 'originals');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        console.log(`📥 Downloading: ${path.basename(filepath)}...`);

        const file = fs.createWriteStream(filepath);

        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Follow redirect
                https.get(response.headers.location, (redirectResponse) => {
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        const stats = fs.statSync(filepath);
                        console.log(`   ✅ Downloaded: ${(stats.size / 1024).toFixed(2)} KB`);
                        resolve();
                    });
                }).on('error', (err) => {
                    fs.unlink(filepath, () => {});
                    reject(err);
                });
            } else {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    const stats = fs.statSync(filepath);
                    console.log(`   ✅ Downloaded: ${(stats.size / 1024).toFixed(2)} KB`);
                    resolve();
                });
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function main() {
    console.log('🚀 Starting product images download from Pexels...\n');

    for (const image of images) {
        const filepath = path.join(OUTPUT_DIR, `${image.name}.jpg`);

        try {
            await downloadImage(image.url, filepath);
        } catch (error) {
            console.error(`❌ Error downloading ${image.name}:`, error.message);
        }
    }

    console.log('\n✅ Download complete!');
    console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
    console.log('\n🔧 Next step: Run optimize-images.js to create responsive variants');
}

main().catch(console.error);
