import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoList from '../components/VideoList';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();

  console.log('🎬 video detail 확인:', video);
  const { title, description, channelTitle } = video.snippet;
  const videoId = typeof video.id === 'string' ? video.id : video.id?.videoId;
  ``;
  const channelId = video.snippet.channelId; // ✅ 추가

  return (
    <section className="flex flex-col lg:flex-row p-4 gap-4 text-black">
      <article className="flex-1">
        {videoId ? (
          <>
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allowFullScreen
            />

            <h2 className="text-2xl font-bold mt-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-2">{channelTitle}</p>
            <p>{description}</p>
          </>
        ) : (
          <div className="text-red-500">
            ❌ 이 영상은 재생할 수 없습니다. Shorts 영상일 수 있습니다.
          </div>
        )}
      </article>
      <aside className="w-full lg:w-[300px]">
        <h3 className="text-lg font-semibold mb-2">💡 이 채널의 다른 영상</h3>
        <VideoList type="channel" channelId={channelId} />{' '}
        {/* ✅ 수정된 부분 */}
      </aside>
    </section>
  );
}
