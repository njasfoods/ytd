'use server'

import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';

async function downloadYouTubeVideo(videoUrl) {
  try {
    const videoInfo = await ytdl.getInfo(videoUrl); // Fetch metadata about the video
    const videoTitle = videoInfo.videoDetails.title; // Get the title of the video
    const filename = `${videoTitle}.mp4`; // Construct filename using the video title
    const outputPath = path.join(__dirname, filename);
    console.log(outputPath)
    // Download video
    await new Promise((resolve, reject) => {
      const videoStream = ytdl(videoUrl, { filter: 'audioandvideo' });
      const outputStream = fs.createWriteStream(outputPath);
      
      videoStream.pipe(outputStream);

      videoStream.on('end', resolve);
      videoStream.on('error', reject);
    });

    console.log('Video downloaded successfully!');
    return filename; // Return the filename
  } catch (error) {
    console.error('Error downloading video:', error);
    return null;
  }
}

export default downloadYouTubeVideo;
