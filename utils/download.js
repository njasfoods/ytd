// utils/youtubeDownloader.js

import fs from 'fs';
import ytdl from 'ytdl-core';

async function downloadYouTubeVideo(videoUrl, outputPath) {
  try {
    // Download video
    await new Promise((resolve, reject) => {
      const videoStream = ytdl(videoUrl, { filter: 'audioandvideo' });
      const outputStream = fs.createWriteStream(outputPath);
      
      videoStream.pipe(outputStream);

      videoStream.on('end', resolve);
      videoStream.on('error', reject);
    });

    console.log('Video downloaded successfully!');
    return true;
  } catch (error) {
    console.error('Error downloading video:', error);
    return false;
  }
}

export default downloadYouTubeVideo;
