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
      username: localStorage.getItem('userName'),
      gender: localStorage.getItem('gender') || "Male",
      birthday: localStorage.getItem('birthday') || "2000-12-12",
    });
  }

  render() {
    const { email, username, gender, birthday } = this.state;

    return (
      <>
        <HeaderBar/>
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
