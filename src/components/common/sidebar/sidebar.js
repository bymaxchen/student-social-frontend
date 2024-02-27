import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} style={{ height: '50vh', position: 'fixed', left: 0, overflow: 'auto', marginTop: 90 }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">Sports</Menu.Item>
        <Menu.Item key="3">Board games</Menu.Item>
        <Menu.Item key="4">Literature</Menu.Item>
        {/* Add more categories as needed */}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
