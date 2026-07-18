import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

// Set the path to the statically linked ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegStatic);

const videoPath = path.resolve('./public/Bg_video.mp4');
const outputFolder = path.resolve('./public/video-frames');

// Ensure output folder exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

console.log(`Starting frame extraction from ${videoPath}...`);
console.log(`Outputting to ${outputFolder}`);

ffmpeg(videoPath)
  .outputOptions([
    '-r 15',             // Extract 15 frames per second
    '-vf scale=-1:720', // Downscale height to 720p
    '-qscale:v 2'       // High quality JPG
  ])
  .output(`${outputFolder}/frame_%04d.jpg`)
  .on('start', (commandLine) => {
    console.log('Spawned FFmpeg with command: ' + commandLine);
  })
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    } else {
      console.log(`Processing frame ${progress.frames}`);
    }
  })
  .on('end', () => {
    console.log('Frame extraction complete!');
    // Also write a simple JSON file so the client knows how many frames there are
    const files = fs.readdirSync(outputFolder).filter(f => f.endsWith('.jpg'));
    fs.writeFileSync(path.resolve(outputFolder, 'metadata.json'), JSON.stringify({ totalFrames: files.length }));
    console.log(`Wrote metadata.json. Total frames: ${files.length}`);
  })
  .on('error', (err) => {
    console.error('Error extracting frames:', err);
  })
  .run();
