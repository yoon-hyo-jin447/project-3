import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { fetchPopularVideos, fetchRelatedVideos } from '../services/youtube';

export default function VideoList({
  type,
  videoId,
  videos: propVideos,
  channelId,
}) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (propVideos) {
      setVideos(propVideos);
      console.log('propVideos:', propVideos);
      return;
    }
    if (type === 'channel' && channelId) {
      console.log('📺 같은 채널 영상 요청, channelId:', channelId);
      fetchRelatedVideos(channelId).then(setVideos);
    }
  }, [type, videoId, propVideos]);

  return (
    <section className="video-list">
      {videos.map((video) => {
        const id = video.id?.videoId || video.id;
        return <VideoCard key={id} video={video} />;
      })}
    </section>
  );
}

// return (
//   <section className="video-list">
//     {Array.isArray(videos) && videos.length > 0 ? (
//       videos.map((video) => {
//         const id = video.id?.videoId || video.id;
//         return <VideoCard key={id} video={video} />;
//       })
//     ) : (
//       <p className="text-white">추천 영상이 없습니다.</p>
//     )}
//   </section>
// );
// }
