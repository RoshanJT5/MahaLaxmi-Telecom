// Rebuild the scroll sequence from the local 1920x1080 source video.
// Set FFMPEG_PATH if ffmpeg is not on PATH. The source MP4 remains gitignored.
import { spawn } from 'node:child_process';
import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'JM Scrolling video.mp4');
const output = path.join(root, 'public', 'page-section2', 'hires');
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';

await mkdir(output, { recursive: true });
for (const name of await readdir(output)) {
  if (/^frame-\d{3}\.webp$/.test(name)) await unlink(path.join(output, name));
}

await new Promise((resolve, reject) => {
  const process = spawn(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-i', source, '-an',
    '-vf', 'fps=5', '-start_number', '0', '-c:v', 'libwebp',
    '-quality', '90', '-compression_level', '6',
    path.join(output, 'frame-%03d.webp'),
  ], { stdio: 'inherit' });
  process.on('error', reject);
  process.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)));
});

const frames = (await readdir(output)).filter((name) => /^frame-\d{3}\.webp$/.test(name)).sort();
if (!frames.length) throw new Error('No video frames were created');
const first = await sharp(path.join(output, frames[0])).metadata();
await writeFile(path.join(output, 'manifest.json'), JSON.stringify({
  total: frames.length,
  width: first.width,
  height: first.height,
  fps: 5,
}, null, 2) + '\n');
console.log(`Built ${frames.length} frames at ${first.width}x${first.height}`);
