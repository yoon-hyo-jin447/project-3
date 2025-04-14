import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoList from '../components/VideoList';
import { useEffect, useState } from 'react';
import { fetchComments } from '../services/youtube';
import { translateText } from '../services/youtube';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();

  console.log('🎬 video detail 확인:', video);
  const { title, description, channelTitle } = video.snippet;
  const videoId = typeof video.id === 'string' ? video.id : video.id?.videoId;
  ``;
  const channelId = video.snippet.channelId; // ✅ 추가

  const [comments, setComments] = useState([]);

  const [translatedComments, setTranslatedComments] = useState({});

  useEffect(() => {
    fetchComments(videoId).then(setComments);
  }, [videoId]);
  console.log('🟡 댓글 응답:', videoId);

  function stripHtmlTags(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  return (
    <section className="flex flex-col lg:flex-row p-4 gap-4 text-black">
      <article className="flex-1">
        {videoId ? (
          <>
            <iframe
              className="w-full aspect-video rounded-lg "
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allowFullScreen
            />

            <h2 className="text-2xl font-bold mt-4 dark:text-white">{title}</h2>
            <p className="text-lg text-gray-600 mb-2 dark:text-white ">
              {channelTitle}
            </p>
            <p className="dark:text-white">{description}</p>
          </>
        ) : (
          <div className="text-red-500 ">
            ❌ 이 영상은 재생할 수 없습니다. Shorts 영상일 수 있습니다.
          </div>
        )}

        <div className="p-4 w-full mt-6">
          <h2 className="text-xl font-bold mb-2">댓글</h2>
          <ul>
            {comments.map((item, index) => {
              const comment = item.snippet.topLevelComment.snippet;
              const originalText = comment.textDisplay;
              const cleanText = stripHtmlTags(originalText);

              const handleTranslate = async () => {
                const translated = await translateText(cleanText);
                setTranslatedComments((prev) => ({
                  ...prev,
                  [index]: translated, // 인덱스 기준으로 번역 결과 저장
                }));
              };

              return (
                <li key={index} className="mb-3 border-b pb-2">
                  <p className="font-semibold">{comment.authorDisplayName}</p>
                  <p>{comment.textDisplay}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.publishedAt).toLocaleString()}
                  </p>

                  {translatedComments[index] && (
                    <p className="text-sm text-gray-500 mt-1">
                      ➤ 번역: {translatedComments[index]}
                    </p>
                  )}

                  <button
                    onClick={handleTranslate}
                    className="text-blue-500 text-sm mt-1 hover:underline"
                  >
                    번역
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </article>

      <aside className="w-full lg:w-[300px] dark:text-white">
        <h3 className="text-lg font-semibold mb-2">💡 이 채널의 다른 영상</h3>
        <VideoList
          type="channel"
          channelId={channelId}
          className="grid grid-col-2"
        />{' '}
        {/* ✅ 수정된 부분 */}
      </aside>
    </section>
  );
}
