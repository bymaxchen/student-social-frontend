import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import {getPostList} from '../../api/api';
import './homePage.css'; // Import custom CSS for additional styling
import PopUp from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { Form, Input, Button, TextArea } from 'antd';

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

  const PostPopUp = () => (
    <PopUp trigger={<Button>Create Post</Button>} modal >
      <div className='popup'>
        <div className='popup-header'>
          <div className='popup-header-username'>
            <h2>
              username
            </h2>
          </div>
          <div className='popup-header-close-button'>
            <Button>
              X
            </Button>
          </div>
        </div>
        <div>
          <Form
            layout='vertical'
            name='post'
            className='post-form'
            initialValues={{ remember: true }}
            // onFinish={whatever}
          >
            <Form.Item>
              <Input placeholder='Title'/>
            </Form.Item>
            <Form.Item>
              <Input.TextArea className='text_area' placeholder='Content' autoSize={{minRows: 5, maxRows :20}} showCount maxLength={10000}/>
            </Form.Item>
            <Form.Item>
              <Button>
                Add attachement
              </Button>
              <Button>
                POST!!!
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>

    </PopUp>

  )


  return (
    <div>
      <div className='header'>
          <div className='logo-div'>
            <p>Logo</p>
          </div>
          <div className='cp-button'>
            <PostPopUp/>
          </div>
    </div>
    <h1>Welcome to the Student Social Platform</h1>
    <Button type="primary"  onClick={handleLogout}>logout</Button>
    </div>
  );
}

export default HomePage;
