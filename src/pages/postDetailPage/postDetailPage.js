import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../../api/api';
import HeaderBar from '../../components/common/header/HeaderBar';
import Sidebar from '../../components/common/sidebar/sidebar';
import Post from '../../components/business/post/post';
import { List, Avatar, Comment } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getComments } from '../../api/api';

const PostDetailPage = () => {
  const { postId } = useParams(); // This gets the post ID from the URL
  const [postDetail, setPostDetail] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Function to fetch post details
    const fetchPostDetail = async () => {
      try {
        const response = await getOnePost(postId);
        setPostDetail(response);
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getComments(postId);
        setComments(response);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
    fetchPostDetail();
  }, [postId]); // This effect depends on postId and will re-run if postId changes


  return (
    <>
      <HeaderBar />
      <Sidebar />
      {postDetail ? <Post {...postDetail} /> : <p>Loading post details...</p>}

      <List
        className="comment-list"
        style={{ width: 600, margin: '16px auto',  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '10px' }}
        header={`${comments.length} ${comments.length === 1 ? 'Comment' : 'Comments'}`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.username}
              description={
                <>
                  <p>{item.content}</p>
                  <span>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    {new Date(item.createTime).toLocaleString()}
                  </span>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default PostDetailPage;