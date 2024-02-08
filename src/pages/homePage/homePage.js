import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { Button } from 'antd';
import {getPostList} from '../../api/api';
import './homePage.css'; // Import custom CSS for additional styling

function HomePage() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostList();
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchPosts();
  }, []);


  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className='header'>
          <div className='logo-div'>
            <p>Logo</p>
          </div>
          <div className='cp-button'>
            <Button>Create Post</Button>
          </div>
    </div>
    <h1>Welcome to the Student Social Platform</h1>
    <Button type="primary"  onClick={handleLogout}>logout</Button>
    </div>
  );
}

export default HomePage;
