import React from 'react';
import {Button, Card} from 'antd';
import {CalendarOutlined, MailOutlined, ManOutlined, UserOutlined, WomanOutlined} from '@ant-design/icons';
import './profilePage.css';
import HeaderBar from '../../components/common/header/HeaderBar';
import Sidebar from '../../components/common/sidebar/sidebar';
import {getCurrentUser} from "../../api/api";

class ProfilePage extends React.Component {
    state = {
        email: '',
        username: '',
        gender: '',
        birthday: '',
    };

    async componentDidMount() {
        try {
            const userData = await fetchProfile();
            console.log(userData);
            // Update state with user data
            this.setState({
                email: userData.email,
                username: userData.username,
                gender: userData.gender,
                birthday: userData.birthdate,
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }

    render() {
        const { email, username, gender, birthday } = this.state;

        return (
            <>
                <HeaderBar />
                <Sidebar />
                <div className="profile-container">
                    <Card
                        title={<span><UserOutlined /> My Profile</span>}
                        bordered={false}
                        style={{ width: 300 }}
                        actions={[
                            <Button type="primary" onClick={() => alert('Edit Profile')}>
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

async function fetchProfile() {
    try {
        return await getCurrentUser(); // Adjust according to your API response structure
    } catch (error) {
        throw error;
    }
}

export default ProfilePage;
