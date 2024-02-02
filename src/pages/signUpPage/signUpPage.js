import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../AuthContext'
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ChalmersLogo from '../../asserts/images/sign-up.svg'

import './signUpPage.css';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  return (

    <div className="signup-container">
        <div className="form-container-sign-up">
          <div className='form-section-sign-up'>
            <Form
              name="signup"
              className="signup-form"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
            >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Username or email" 
              />
            </Form.Item>
            <Form.Item
              name="cid"
              rules={[{ required: true, message: 'Please input your CID!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="CID" 
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Password" 
              />
            </Form.Item>
            <Form.Item
              name="password_repeat"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Confirm password" 
              />
            </Form.Item>
            <Form.Item
              name="firstname"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="First name" 
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Last name" 
              />
            </Form.Item>
            <Form.Item
              name="birthday"
              rules={[{ required: true, message: 'Please input your birthday!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Birthday" 
              />
            </Form.Item>
            </Form>
          </div>
        </div>
        {/* <div className="chalmers-logo-container">
        </div> */}
    </div>

  )
}

export default SignUpPage;
