import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { } from 'react';
import HomePage from './pages/homePage/homePage'
import ChatPage from './pages/chatPage/chatPage'
import PostDetailPage from './pages/postDetailPage/postDetailPage';
import SigninPage from './pages/signInPage/signInPage'
import SignUpPage from './pages/signUpPage/signUpPage';
import ProfilePage from './pages/profile/profilePage';
import ProtectedRoute from './ProtectedRoute';

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/posts/:postId" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
