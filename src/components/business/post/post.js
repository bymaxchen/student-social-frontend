import React, { useState, useContext } from 'react';
import { Card } from 'antd';
import { LikeOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { like } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './post.css';


// Function to generate a random color
const getRandomColor = () => {
  const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#1890ff']; // Example color palette
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Post = ({ id, title, username: author, content, createTime, isAnonymous, likes: initialLikes, imageUrl }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const isToday = moment(createTime).isSame(moment(), 'day');
  const displayTime = isToday ? moment(createTime).fromNow() : moment(createTime).format('MMMM Do YYYY, h:mm:ss a');
  const borderColor = getRandomColor(); // Assuming getRandomColor is defined elsewhere

  // Navigate to post detail
  const navigateToPostDetail = () => {
    navigate(`/posts/${id}`);
  };

    // Stop propagation to prevent navigation when clicking on interactive elements
    const stopPropagation = (e) => {
      e.stopPropagation();
    };

  // Function to handle like click
  const handleLikeClick = async (e) => {
    stopPropagation(e);
    const isAlreadyLiked = liked;
    setLiked(!isAlreadyLiked);
    const likeChange = isAlreadyLiked ? -1 : 1;
    const updatedLikes = likes + likeChange;
    setLikes(updatedLikes);
    
    // If you have an API to call, you might do something like:
    try {
      const response = await like(id); // Your API call to like the post
      if (response.success) {
        // Update the likes count from the response if needed
        // setLikes(response.likes); // Uncomment if you want to use the count from the backend
      }
    } catch (error) {
      console.error('Failed to like the post:', error);
      // Revert the like state if the API call fails
      setLiked(isAlreadyLiked);
      setLikes(likes);
    }
  };

  return (
    <Card
      onClick={navigateToPostDetail}
      title={<div style={{ display: 'flex', alignItems: 'center' }}>{title}</div>}
      style={{ width: 600, margin: 'auto', marginBottom: '20px', borderLeft: `6px solid ${borderColor}`, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', cursor: 'pointer' }}
      actions={[
        <LikeOutlined
          key="like"
          onClick={handleLikeClick}
          id={liked ? 'active-like-btn' : ''}
        />
        ,
        <span key="likes" onClick={stopPropagation}>{likes} Likes</span>,
        <span key="time">{displayTime}</span>,
      ]}
    >
      <p onClick={stopPropagation}><UserOutlined style={{ marginRight: 8 }}/>{isAnonymous ? 'Anonymous' : author}</p>
      <p style={{ color: '#555' }} onClick={stopPropagation}>{content}</p>
      {imageUrl && <img src={imageUrl} alt="Card" style={{ width: '100%' }} onClick={stopPropagation} />}
    </Card>
  );
};

export default Post;
