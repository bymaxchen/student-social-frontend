import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../AuthContext'
import { Form, Input, Button, Card, DatePicker, Radio } from 'antd';
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
            <h1 className='form-header-signup'>Sign Up</h1>
            <Form
                layout='vertical'
                name="signup"
                className="signup-form"
                initialValues={{ remember: true }}
                //onFinish={onFinish}
            >
            
            <Form.Item className="signup-form-item" label="CID" required tooltip="This is a required field"          >
              <Input placeholder="CID" />
            </Form.Item>
            <Form.Item className="signup-form-item" label="Username" required tooltip="This is a required field"          >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item className="signup-form-item" label="First Name" required tooltip="This is a required field"          >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item className="signup-form-item" label="Last Name" required tooltip="This is a required field"          >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item className="signup-form-item" label="Gender" required tooltip="This is a required field"          >
                <Radio.Group>
                    <Radio.Button value="female">Female</Radio.Button>
                    <Radio.Button value="male">Male</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item className="signup-form-item" label="Birthday" required tooltip="This is a required field"          >
              <DatePicker />
            </Form.Item>
            <Form.Item className="signup-form-item" label="Password" required tooltip="This is a required field"          >
              <Input placeholder="Password" />
            </Form.Item>
            <Form.Item className="signup-form-item" label="Confirm Password" required tooltip="This is a required field"          >
              <Input placeholder="Confirm Password" />
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
