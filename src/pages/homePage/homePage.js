import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { Button } from 'antd';
import HeaderBar from '../../components/common/header/HeaderBar';
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


  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <HeaderBar></HeaderBar>
    </>
  );
}

export default HomePage;
