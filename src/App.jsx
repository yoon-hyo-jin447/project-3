import { useQuery } from '@tanstack/react-query';
import { fetchPopularVideos, searchVideos } from './services/youtube';
import Header from './components/SearchHeader';
import VideoList from './components/VideoList';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import CategoryBar from './components/CategoryBar';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';
import VideoDetail from './pages/VideoDetail';
// const Videos = Array(8).fill({
//   id: Math.random(),
//   snippet: {
//     title: '테스트 영상 제목',
//     channelTitle: '테스트 채널',
//     thumbnails: {
//       medium: {
//         url: 'https://i.ytimg.com/vi/ysz5S6PUM-U/mqdefault.jpg',
//       },
//     },
//   },
// });

// function App() {
//   const [keyword, setkeyword] = useState('');
//   const handleSearch = (searchTerm) => {
//     setkeyword(searchTerm);
//     refetch();
//   };

//   const {
//     data: videos,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ['videos', keyword],
//     queryFn: () => (keyword ? searchVideos(keyword) : fetchPopularVideos()),

//     staleTime: 1000 * 3,
//   });

//   return (
//     <>
//       <Header onSearch={handleSearch} />
//       {isLoading && <p>Loading...</p>}
//       {error && <p>에러 발생: {error.message}</p>}
//       {videos && <VideoList videos={videos} />}
//     </>
//   );
// }
// export default App;

function App() {
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('✅ App 렌더링 됨');
    fetchPopularVideos().then(setVideos);
  }, []);

  const searchMutation = useMutation({
    mutationFn: (keyword) => searchVideos(keyword),
    onSuccess: (data) => {
      setVideos(data);
    },
  });

  const handleSearch = (searchTerm) => {
    setKeyword(searchTerm);
    searchMutation.mutate(searchTerm);
    navigate('/');
  };

  return (
    <UserProvider>
      <Header onSearch={handleSearch} />
      {searchMutation.isPending && (
        <p className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></p>
      )}
      {searchMutation.isError && (
        <p>에러 발생: {searchMutation.error.message}</p>
      )}
      <CategoryBar onSelect={handleSearch} />

      <Routes>
        <Route path="/" element={videos && <VideoList videos={videos} />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserProvider>
  );
}
export default App;
