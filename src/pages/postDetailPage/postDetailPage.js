import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePost } from '../../api/api';
import HeaderBar from '../../components/common/header/HeaderBar';
import Sidebar from '../../components/common/sidebar/sidebar';
import Post from '../../components/business/post/post';
import { List, Avatar, Comment,Input, Button } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getComments, createComment } from '../../api/api';
const { TextArea } = Input; // Importing TextArea

const PostDetailPage = () => {
  const { postId } = useParams(); // This gets the post ID from the URL
  const [postDetail, setPostDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [commentText, setCommentText] = useState('');

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

useEffect(() => {


  fetchComments();
  fetchPostDetail();
}, [postId]); // This effect depends on postId and will re-run if postId changes

const handleCancel = () => {
  setCommentText('');
  setInputFocused(false);
};

  const handleSubmit = async () => {
    const newComment = {
      postId: postId,
      content: commentText,
    };

    await createComment(newComment);

    setCommentText(''); // Clear the input field
    setInputFocused(false); // Optionally unfocus the input field

    await fetchComments();
  };


  return (
    <>
      <HeaderBar />
      <Sidebar />
      <div 
        id="scrollableDiv" 
        style={{
          height: 80,
        }}
      >

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {postDetail ? <Post {...postDetail} /> : <p>Loading post details...</p>}
      </div>

      {/* Comment Input Section */}
      <div style={{ margin: '20px auto', position: 'relative', width: '600px' }}>
        <TextArea
          placeholder="Write a comment..."
          onFocus={() => setInputFocused(true)}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
        {inputFocused && (
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="primary" 
              onClick={handleSubmit}
              style={{ marginRight: '10px' }}
            >
              Submit
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <List
        className="comment-list"
        style={{ width: 600, margin: '16px auto',
        boxShadow: comments.length === 0 ? 'none' : '0 4px 8px 0 rgba(0,0,0,0.2)',
           padding: '10px' }}
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