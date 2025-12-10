/**
 * ═══════════════════════════════════════════════════════════════════
 * DOWNLOAD & OPTIMIZE PRODUCT IMAGES
 * ═══════════════════════════════════════════════════════════════════
 *
 * Downloads all product images from Unsplash and optimizes them
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Product images from products.js
const images = [
    { id: 1, name: 'nighthawk-x2-pro', url: 'https://images.unsplash.com/photo-1615663245857-acda84b471bc?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'viper-stealth', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'ghost-tracker', url: 'https://images.unsplash.com/photo-1601445638532-3c6f6c2aa4d6?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'cyberdeck-mk-iv', url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600' },
    { id: 5, name: 'mechanic-k-75', url: 'https://images.unsplash.com/photo-1587829741301-dc798b91a91e?auto=format&fit=crop&q=80&w=600' },
    { id: 6, name: 'shadowtype-mini', url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600' },
    { id: 7, name: 'tg-1-pro-wireless', url: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&q=80&w=600' },
    { id: 8, name: 'void-surround', url: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=600' },
    { id: 9, name: 'silent-predator', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcf?auto=format&fit=crop&q=80&w=600' }
];

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'img', 'products');
const TEMP_DIR = path.join(OUTPUT_DIR, 'temp');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

/**
 * Optimize image with Sharp
 */
async function optimizeImage(inputPath, outputPath) {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    await sharp(inputPath)
        .resize(600, 600, {
            fit: 'cover',
            position: 'center'
        })
        .jpeg({
            quality: 85,
            progressive: true,
            mozjpeg: true
        })
        .toFile(outputPath);

    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;
    const savedPercent = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    return {
        original: (originalSize / 1024).toFixed(2),
        optimized: (optimizedSize / 1024).toFixed(2),
        saved: savedPercent
    };
}

/**
 * Main execution
 */
async function main() {
    console.log('🚀 Starting product images download & optimization...\n');

    let totalOriginal = 0;
    let totalOptimized = 0;

    for (const image of images) {
        const tempPath = path.join(TEMP_DIR, `${image.name}.jpg`);
        const outputPath = path.join(OUTPUT_DIR, `${image.name}.jpg`);

        try {
            // Download
            console.log(`📥 Downloading: ${image.name}...`);
            await downloadImage(image.url, tempPath);

            // Optimize
            console.log(`⚡ Optimizing: ${image.name}...`);
            const result = await optimizeImage(tempPath, outputPath);

            totalOriginal += parseFloat(result.original);
            totalOptimized += parseFloat(result.optimized);

            console.log(`   Original:   ${result.original} KB`);
            console.log(`   Optimized:  ${result.optimized} KB`);
            console.log(`   Saved:      ${result.saved}%`);
            console.log(`   ✅ Saved to: assets/img/products/${image.name}.jpg\n`);

        } catch (error) {
            console.error(`❌ Error processing ${image.name}:`, error.message);
        }
    }

    // Cleanup temp directory
    console.log('🧹 Cleaning up temp files...');
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });

    // Summary
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ OPTIMIZATION COMPLETE!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Total images processed: ${images.length}`);
    console.log(`Total original size:    ${totalOriginal.toFixed(2)} KB`);
    console.log(`Total optimized size:   ${totalOptimized.toFixed(2)} KB`);
    console.log(`Total saved:            ${(totalOriginal - totalOptimized).toFixed(2)} KB (${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%)`);
    console.log('═══════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
