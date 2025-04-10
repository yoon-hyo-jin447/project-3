const API_KEY = 'AIzaSyC-xZpRDlF_m-tjcOJgpv2odOactqi71uc';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';

let popularFetchcount = 0;
console.log('🔥 API_KEY:', API_KEY);
export async function fetchPopularVideos() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=KR&key=${API_KEY}
      `
    );
    if (!res.ok) throw new Error('API 요청 실패');
    const data = await res.json();
    return data.items;
  } catch (err) {
    console.err('fetchPopularVideos Error:', err);
    throw err;
  }
}

export async function searchVideos(keyword) {
  popularFetchcount++;
  console.log('검색어(keyword):', keyword);
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${keyword}&type=video&regionCode=KR&key=${API_KEY}`
  );

  const data = await res.json();
  console.log('검색 api 응답:', data);
  return data.items;
}

export async function fetchRelatedVideos(channelId) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&channelId=${channelId}&key=${API_KEY}`
  );

  if (!res.ok) {
    console.error('❌ 추천 영상 요청 실패:', res.status);
    return [];
  }

  const data = await res.json();
  console.log('✅ 추천 API 응답:', data);

  const filtered = data.items.filter((item) => {
    const videoId = item.id?.videoId;
    const isShorts =
      item.snippet?.title?.toLowerCase().includes('shorts') ||
      item.snippet?.thumbnails?.default?.url?.includes('shorts');

    return videoId && videoId.length === 11 && !isShorts;
  });
  console.log(
    '🎯 필터링된 videoId 목록:',
    filtered.map((item) => item.id.videoId)
  );
  return filtered;
}

export async function getSuggestions(keyword) {
  console.log('검색어(keyword):', keyword);
  try {
    const res = await fetch(`/api/suggest?client=firefox&ds=yt&q=${keyword}`);
    const data = await res.json();
    // console.log ('자동완성 API 응답:' data);
    return data[1];
  } catch (error) {
    console.error('자동완성 API 요청 실패:', error);
    return [];
  }
}
