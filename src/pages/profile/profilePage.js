import React from 'react';
import { Card, Button } from 'antd';
import {
  MailOutlined,
  UserOutlined,
  ManOutlined,
  WomanOutlined,
  CalendarOutlined,
  EditOutlined
} from '@ant-design/icons';
import './profilePage.css';
import HeaderBar from '../../components/common/header/HeaderBar';
import Sidebar from '../../components/common/sidebar/sidebar';

class ProfilePage extends React.Component {
  state = {
    email: '',
    username: '',
    gender: '',
    birthday: '',
  };

  componentDidMount() {
    // Retrieve profile information from localStorage
    this.setState({
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username'),
      gender: localStorage.getItem('gender'),
      birthday: localStorage.getItem('birthdate'),
    });
  }

  render() {
    const { email, username, gender, birthday } = this.state;

    return (
      <>
        <HeaderBar/>
        <Sidebar/>
        <div className="profile-container">
        <Card
          title={<span><UserOutlined /> My Profile</span>}
          bordered={false}
          style={{ width: 300 }}
          actions={[
            <Button type="primary"  onClick={() => alert('Edit Profile')}>
              Edit
            </Button>
          ]}
        >
          <p><MailOutlined /> <b>Email:</b> {email}</p>
          <p><UserOutlined /> <b>Username:</b> {username}</p>
          <p>{gender === 'Male' ? <ManOutlined /> : <WomanOutlined />} <b>Gender:</b> {gender}</p>
          <p><CalendarOutlined /> <b>Birthday:</b> {birthday}</p>
        </Card>
      </div> 
      </>

    );
  }
}

export default ProfilePage;
