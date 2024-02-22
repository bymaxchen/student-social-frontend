import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext';
import { Layout, Menu, Input, Modal, Button, Form, Upload,message } from 'antd';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { MessageOutlined, PlusOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './HeaderBar.css';
import axios from 'axios'; // Ensure axios is installed
import { UploadOutlined } from '@ant-design/icons';


const { Header } = Layout;
const { Search } = Input;


const HeaderBar = ({ reloadPosts }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation();
    const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);


    const showModal = () => {
        setOpen(true);
      };

    
    const handleOk = async () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);

        const formData = {
          title,
          content,
        };
        let imageUrl;
        if (file) {
          const formData = new FormData();
          formData.append('file', file); // Assuming 'file' is the expected field name

          try {
            const response = await axios.post('/api/pictures/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
             imageUrl = response.data;
            console.log(imageUrl)
            message.success('File uploaded successfully');
            } catch (error) {
              console.error('File upload error:', error.response || error.message);
              message.error('File upload failed');
            }
          }
          
        try {
            formData.imageUrl=imageUrl;
          // Substitute 'http://localhost:8081/api/signup' with your actual backend endpoint
          const response = await axios.post('/api/posts/create', formData);
          //window.location.reload();
            reloadPosts();
          console.log(response.data);
        } catch (error) {
          console.error(error.response || error.message);
        } finally {
          setConfirmLoading(false);
          setOpen(false);
          setTitle("");
          setContent("");
          setFile(null);
        }
      };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };

    const onClickMenu = async (e) => {
        if (e.key === '/logout') {
            await logout();
            navigate("/");
            return;
        }
        if (e.key === "post") {
            return
        }
        navigate(e.key);
    }

    const uploadProps = {
      beforeUpload: file => {
        setFile(file); // Update the state with the selected file
        return false; // Prevent automatic upload
      },
        onChange(info) {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file prepared for upload`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file preparation failed.`);
          }
        },
    };

      return (
        <>
        <Header className="header">
            <div className="logo">
                <Link to="/">
                    <img src='/images/logo/logo.png'  alt="Logo" ></img>
                </Link>
            </div>
            <Search placeholder="Search CampusHub" className="search" />
            <Menu theme="dark" mode="horizontal" className="menu" selectedKeys={[location.pathname]} onClick={onClickMenu}>
                <Menu.Item className="msg" key="/message" icon={<MessageOutlined />}></Menu.Item>
                <Menu.Item className='post' key="post" onClick={showModal} icon={<PlusOutlined />}>Create</Menu.Item>
                <Menu.Item className='profile' key="/profile" icon={<UserOutlined />}>Profile</Menu.Item>
                <Menu.Item className='logout' key="/logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
            </Menu>
        </Header> 
    
        <Modal okText="Post" title="Create Post" open={open} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading} footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Upload {...uploadProps} className='special_button_atch'>
              <Button icon={<UploadOutlined />} >Add Image</Button>
            </Upload>
            <CancelBtn />
            <OkBtn />
          </>
        )}>
          <Form
              layout='vertical'
              name='post'
              className='post-form'
              initialValues={{ remember: true }}
              // onFinish={whatever}
            >
              <Form.Item>
                <Input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
              </Form.Item>
              <Form.Item>
                <Input.TextArea value={content} className='text_area' onChange={e => setContent(e.target.value)} placeholder='Content' autoSize={{minRows: 5, maxRows :20}} showCount maxLength={10000}/>
              </Form.Item>
            </Form>
            

        </Modal>
        </>
      );
};

export default HeaderBar;
