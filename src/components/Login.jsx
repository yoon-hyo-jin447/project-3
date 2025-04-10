import react, { useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('✅ 로그인 성공:', user);
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     console.log('👋 로그아웃 성공');
  //     setUser(null);
  //   } catch (error) {
  //     console.log('❌ 로그아웃 실패: ', error);
  // }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-red-600 text-white px-6 py-6 rounded-lg text-lg"
      >
        Google 로그인
      </button>
    </div>
  );
}
