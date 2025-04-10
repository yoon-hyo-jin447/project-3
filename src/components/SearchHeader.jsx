import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import YoutubeLogo from '../assets/Youtube_logo.png';
import { getSuggestions } from '../services/youtube';
import { useUser } from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Header({ onSearch }) {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const handleChange = (e) => setText(e.target.value);
  const { user, setUser } = useUser();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(console.error);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim()) {
        getSuggestions(text).then(setSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('✅ 검색 버튼 눌림');
    if (!text.trim()) return;
    onSearch(text);
    setText('');
  };

  return (
    <header className="w-full bg-black text-white p-4 flex gap-2 flex-col items-center sm:flex-row justify-between">
      <Link to="/" className="flex items-center space-x-3">
        <section className="flex space-x-2">
          <img src={YoutubeLogo} alt="Youtube Lodo" className="w-10 h-8" />
          <h1 className="logo">Youtube</h1>
        </section>
      </Link>
      <form onSubmit={handleSubmit} className="flex ml-auto">
        <input
          className="search-input"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="검색어를 입력하세요"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-r-md "
        >
          🔍
        </button>
      </form>

      {user ? (
        <div
          className="flex items-center gap-4"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img
            src={user.photoURL}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          {showProfile && (
            <div className="absolute top-10 right-0 bg-white text-black p-4 rounded shadow-lg z-50">
              <p className="font-semibold">{user.displayName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <button
                onClick={handleLogout}
                className="mt-2 text-red-500 text-sm"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <a
          href="/login"
          className="bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          로그인
        </a>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-14 left-0 w-full bg-white text-black rounded shadow-md z-10">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-zinc-200 cursor-pointer"
              onClick={() => {
                // setText(s);
                onSearch(s);
                setSuggestions([]);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
