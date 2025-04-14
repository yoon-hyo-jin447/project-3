import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { fetchPopularVideos, fetchRelatedVideos } from '../services/youtube';
import { motion } from 'framer-motion';

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
    <section className="video-list gap-4 p-4">
      {videos.map((video, index) => {
        const id = video.id?.videoId || video.id;
        return (
          <motion.div
            key={id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <VideoCard video={video} />;
          </motion.div>
        );
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
