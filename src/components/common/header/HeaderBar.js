import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import { Layout, Menu, Input } from 'antd';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { RedditOutlined, MessageOutlined, PlusOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import './HeaderBar.css';

const { Header } = Layout;
const { Search } = Input;

const HeaderBar = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const onClickMenu = async (e) => {
        if (e.key === '/logout') {
            await logout();
            navigate("/");
            return;
        }
        navigate(e.key);
    }

    return (
        <Header className="header">
            <div className="logo">
                <Link to="/">
                    <img src='/images/logo.png'  alt="Logo" ></img>
                </Link>
            </div>
            <Search placeholder="Search CampusHub" className="search" />
            <Menu theme="dark" mode="horizontal" className="menu" selectedKeys={[location.pathname]} onClick={onClickMenu}>
                <Menu.Item key="/message" icon={<MessageOutlined />}></Menu.Item>
                <Menu.Item key="/create-post" icon={<PlusOutlined />}>Create</Menu.Item>
                <Menu.Item key="/profile" icon={<UserOutlined />}>Profile</Menu.Item>
                <Menu.Item key="/logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
            </Menu>
        </Header>
    );
};

export default HeaderBar;
