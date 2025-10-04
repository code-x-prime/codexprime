// Optional: TinyPNG batch optimizer. Requires TINYPNG_API_KEY env var.
// Usage: pnpm optimize-images
// Note: This is an optional helper for pre-compressing local images in /public or content dir.

import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.env.TINYPNG_API_KEY;
if (!API_KEY) {
    console.log('Set TINYPNG_API_KEY to enable image optimization. Skipping.');
    process.exit(0);
}

const exts = new Set(['.png', '.jpg', '.jpeg']);
const root = path.resolve(process.cwd(), 'public');

function listImages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) files.push(...listImages(p));
        else if (exts.has(path.extname(e.name).toLowerCase())) files.push(p);
    }
    return files;
}

async function compress(file) {
    const data = fs.readFileSync(file);
    const options = {
        hostname: 'api.tinify.com',
        path: '/shrink',
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + Buffer.from('api:' + API_KEY).toString('base64'),
            'Content-Type': 'application/octet-stream',
            'Content-Length': data.length,
        },
    };
    const url = await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            if (res.statusCode === 201 || res.statusCode === 200) {
                resolve(res.headers.location);
            } else {
                reject(new Error('TinyPNG error: ' + res.statusCode));
            }
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });

    const out = await fetch(url, {
        headers: { Authorization: 'Basic ' + Buffer.from('api:' + API_KEY).toString('base64') },
    });
    const buf = Buffer.from(await out.arrayBuffer());
    fs.writeFileSync(file, buf);
    console.log('Optimized', file);
}

(async function main() {
    const files = listImages(root);
    if (!files.length) {
        console.log('No images found to optimize in', root);
        return;
    }
    for (const f of files) {
        try {
            await compress(f);
        } catch (e) {
            console.warn('Skip', f, e.message);
        }
    }
})();
