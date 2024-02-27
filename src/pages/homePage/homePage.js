import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import HeaderBar from '../../components/common/header/HeaderBar';
import Sidebar from '../../components/common/sidebar/sidebar';
import { Spin } from 'antd';
import Post from '../../components/business/post/post';
import { getHomePostList } from '../../api/api';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Dummy function to simulate fetching posts from a backend
  // Replace with your actual fetch call
  const fetchPosts = async (page) => {
    // Example URL: replace with your backend endpoint
    const response = await getHomePostList(page);
    return response; // Adjust according to your API response structure
  };

  const loadPosts = (page) => {
    fetchPosts(page).then(newPosts => {
      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }
      setPosts([...posts, ...newPosts]);
    });
  };
    const reloadPosts = async () => {
        // Fetch and reload posts
        const updatedPosts = await fetchPosts(0); // Fetch the latest posts starting from page 0
        setPosts(updatedPosts); // Update the posts state with the latest posts
        setHasMore(true); // Reset hasMore flag if necessary
    };
  return (
    <>
      <HeaderBar reloadPosts={reloadPosts}/>
      <Sidebar/>
      <div 
        id="scrollableDiv" 
        style={{
          height: 80,
        }}
      >

      </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadPosts}
          hasMore={hasMore}
          loader={<Spin key={0} />}
          scrollableTarget="scrollableDiv"
        >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </InfiniteScroll>   
    
    </>

  );
};

export default HomePage;
