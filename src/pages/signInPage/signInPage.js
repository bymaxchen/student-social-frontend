import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../AuthContext'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import backgroundImage from '../../asserts/images/sign-in.jpg'

import './signInPage.css'; // Import custom CSS for additional styling


function SignInPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    try {
      await login(values);
      navigate("/");
      // Here you would handle the login logic, possibly sending a request to your server
      // After the request:
      setLoading(false);
    } catch (error) {
      message.error('Incorrect email or password'); // Show error message on failure
      setLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigate('/signup', {replace: true})
  }

  return (
    <div className="signin-container">
      <div className="background-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      </div>
      <div className="form-section">
        <div className="form-container">
          <h1 className="form-header">CampusHub</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="email" 
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                Log in
              </Button>
              <Button 
                type="default" 
                className="signup-form-button" 
                onClick={navigateToSignUp}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
