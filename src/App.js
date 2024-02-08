import { BrowserRouter as Router, Routes, Route, useNavigate  } from 'react-router-dom';
import React, { useEffect } from 'react';
import HomePage from './pages/homePage/homePage'
import PostPage from './pages/postPage/postPage'
import SigninPage from './pages/signInPage/signInPage'
import SignUpPage from './pages/signUpPage/signUpPage';
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
        <Route path="/post/:postId" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
