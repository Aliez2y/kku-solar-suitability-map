const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'tile_layer', 'SolarRaKKN_Tile', '_alllayers');
const outputDir = path.join(__dirname, 'public', 'tiles');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function processBundle(levelDir, bundleFile, z) {
    const bundlePath = path.join(levelDir, bundleFile);
    // Parse RXXXXCXXXX from bundle name
    const match = bundleFile.match(/R([0-9A-Fa-f]{4})C([0-9A-Fa-f]{4})\.bundle/);
    if (!match) return;

    const baserow = parseInt(match[1], 16);
    const basecol = parseInt(match[2], 16);

    console.log(`Processing Z:${z} BaseRow:${baserow} BaseCol:${basecol} File:${bundleFile}`);

    const buffer = fs.readFileSync(bundlePath);
    const INDEX_OFFSET = 64;

    for (let r = 0; r < 128; r++) {
        for (let c = 0; c < 128; c++) {
            const indexPos = INDEX_OFFSET + (r * 128 + c) * 8;
            if (indexPos + 8 > buffer.length) continue;

            // Offset (5 bytes little-endian)
            let offset = buffer[indexPos] +
                         (buffer[indexPos + 1] * 256) +
                         (buffer[indexPos + 2] * 65536) +
                         (buffer[indexPos + 3] * 16777216) +
                         (buffer[indexPos + 4] * 4294967296);

            // Size (3 bytes little-endian)
            let size = buffer[indexPos + 5] +
                       (buffer[indexPos + 6] * 256) +
                       (buffer[indexPos + 7] * 65536);

            if (offset > 0 && size > 0 && offset + size <= buffer.length) {
                const y = baserow + r;
                const x = basecol + c;
                
                // Actual tile data starts at offset, but may have a 4-byte size header before the image data in V2 compact cache
                // Let's check if it's PNG or JPEG. PNG starts with 89 50 4E 47. 
                // Wait, some arcgis versions have a 4 byte length header at the offset. Let's check signature.
                let tileDataOffset = offset;
                let tileDataSize = size;

                // Check first 4 bytes at offset
                // If it matches size, then it's a 4-byte prefix.
                // If the first 4 bytes are PNG magic (0x89 0x50 0x4E 0x47) or JPEG (0xFF 0xD8 0xFF), it's raw.
                if (buffer[offset] !== 0x89 && buffer[offset] !== 0xFF) {
                     tileDataOffset += 4; // skip 4-byte local header
                     tileDataSize -= 4;
                }

                if (tileDataSize <= 0) continue;

                const tileBuffer = buffer.subarray(tileDataOffset, tileDataOffset + tileDataSize);
                
                const zDir = path.join(outputDir, String(z));
                const xDir = path.join(zDir, String(x));
                
                if (!fs.existsSync(zDir)) fs.mkdirSync(zDir);
                if (!fs.existsSync(xDir)) fs.mkdirSync(xDir);

                const tilePath = path.join(xDir, `${y}.png`);
                fs.writeFileSync(tilePath, tileBuffer);
            }
        }
    }
}

function run() {
    if (!fs.existsSync(inputDir)) {
        console.error("Input dir not found", inputDir);
        return;
    }
    const levels = fs.readdirSync(inputDir).filter(dir => dir.startsWith('L'));
    for (const level of levels) {
        const z = parseInt(level.replace('L', ''), 10);
        const levelDir = path.join(inputDir, level);
        const bundles = fs.readdirSync(levelDir).filter(file => file.endsWith('.bundle'));
        
        for (const bundle of bundles) {
            processBundle(levelDir, bundle, z);
        }
    }
    console.log("Extraction complete!");
}

run();
