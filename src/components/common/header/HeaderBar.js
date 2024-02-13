import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext';
import { Layout, Menu, Input, Modal, Button, Form } from 'antd';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { RedditOutlined, MessageOutlined, PlusOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './HeaderBar.css';

const { Header } = Layout;
const { Search } = Input;


const HeaderBar = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation();
    const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');


    const showModal = () => {
        setOpen(true);
      };

    
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
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
        if (e.key == "post") {
            return
        }
        navigate(e.key);
    }

    return (
        <>
        <Header className="header">
            <div className="logo">
                <Link to="/">
                    <img src='/images/logo.png'  alt="Logo" ></img>
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
    
        <Modal title="Create Post" open={open} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading}>
        <p>Hello</p>
        </Modal>
    </>
    );
};

export default HeaderBar;
