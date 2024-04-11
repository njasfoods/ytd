'use client'
import downloadYouTubeVideo from '@/utils/download';
import { useState } from 'react';

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [ylink, setylink] = useState('');

  const handleDownload = async () => {
    setIsDownloading(true);
    const videoUrl = ylink;
    const filename = await downloadYouTubeVideo(videoUrl);
    setIsDownloading(false);

    if (filename) {
      console.log('Downloaded video:', filename);
    } else {
      console.log('Failed to download video.');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mx-auto max-w-lg min-h-screen'>
      <input type='text' onChange={(e)=>setylink(e.target.value)} className='border p-2 rounded w-full'/>
      <button className='p-2 bg-blue-600 mt-4' onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'Download Video'}
      </button>
    </div>
  );
}
