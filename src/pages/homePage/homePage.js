import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { Button } from 'antd';
import {getPostList} from '../../api/api';


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
      <h1>Welcome to the Student Social Platform</h1>
      <Button type="primary"  onClick={handleLogout}>logout</Button>
    </div>
  );
}

export default HomePage;
