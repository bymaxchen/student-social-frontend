import React from 'react';
import {Modal, Button, Form, Input, Select,Card, message} from 'antd';
import {CalendarOutlined, MailOutlined, ManOutlined, UserOutlined, WomanOutlined} from '@ant-design/icons';
import './profilePage.css';
import HeaderBar from '../../components/common/header/HeaderBar';
import Sidebar from '../../components/common/sidebar/sidebar';
import {getCurrentUser, editCurrentUser} from "../../api/api";
const { Option } = Select;

class ProfilePage extends React.Component {
    formRef = React.createRef(); // Create a ref for the form

    state = {
        email: '',
        username: '',
        gender: '',
        birthdate: '',
        isModalVisible: false,
        isSubmitDisabled: true, // Manage the disabled state of the Submit button
    };

    

    async componentDidMount() {
        try {
            const userData = await fetchProfile();
            this.setState({
                id: userData.id,
                email: userData.email,
                username: userData.username,
                gender: userData.gender,
                birthdate: userData.birthdate,
                isSubmitDisabled: false, // Assuming fetched data is valid, enable Submit
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }

    showModal = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            isModalVisible: false,
        });
    };

    handleSubmit = (values) => {
        this.formRef.current.validateFields() // Make sure to validate fields before submitting
        .then(async (values) => {
            values.id = this.state.id;
            values.birthdate = 
            await editCurrentUser(values);
            // Close modal and potentially update profile here
            this.setState({
                isModalVisible: false,
            });

            const userData = await fetchProfile();
            this.setState({
                id: userData.id,
                email: userData.email,
                username: userData.username,
                gender: userData.gender,
                birthdate: userData.birthdate,
                isSubmitDisabled: false, // Assuming fetched data is valid, enable Submit
            });
            
            message.success('edit successfully!');
        });
    };

    // Validate form fields to enable/disable submit button
    onValuesChange = (_, allValues) => {
        const isSubmitDisabled = Object.values(allValues).some(x => !x);
        this.setState({ isSubmitDisabled });
    };    

    render() {
        const { email, username, gender, birthdate, isModalVisible, isSubmitDisabled } = this.state;

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
                            <Button type="primary" onClick={this.showModal}>
                                Edit
                            </Button>,
                        ]}
                    >
                        <p><MailOutlined /> <b>Email:</b> {email}</p>
                        <p><UserOutlined /> <b>Username:</b> {username}</p>
                        <p>{gender === 'Male' ? <ManOutlined /> : <WomanOutlined />} <b>Gender:</b> {gender}</p>
                        <p><CalendarOutlined /> <b>Birthday:</b> {birthdate}</p>
                    </Card>
                </div>
                <Modal
                    title="Edit Profile"
                    visible={isModalVisible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleSubmit} disabled={isSubmitDisabled}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onValuesChange={this.onValuesChange}
                        ref={this.formRef}
                        initialValues={{ email, username, gender, birthdate }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input disabled="true"/>
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Select>
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Birthday"
                            name="birthdate"
                            rules={[{ required: true, message: 'Please input your birthday!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
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
