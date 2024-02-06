import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../AuthContext'
import { Form, Input, Button, Card, DatePicker, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PasswordChecklist from "react-password-checklist"


import ChalmersLogo from '../../asserts/images/sign-up.svg'

import './signUpPage.css';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [passwordAgain, setPasswordAgain] = useState(''); // Add state to track the confirmation password

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
            <Form.Item className="signup-form-item" label="Gender" tooltip="This is a required field"          >
                <Radio.Group>
                    <Radio.Button value="female">Female</Radio.Button>
                    <Radio.Button value="male">Male</Radio.Button>
                    <Radio.Button value="other">Other</Radio.Button>

                </Radio.Group>
            </Form.Item>
            <Form.Item className="signup-form-item" label="Birthday" required tooltip="This is a required field"          >
              <DatePicker />
            </Form.Item>
            <Form.Item name="password" className="signup-form-item" label="Password" required tooltip="This is a required field"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item name="confirm" className="signup-form-item" label="Confirm Password" required tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The passwords that you entered do not match!'));
                  },
                }),
              ]}            
            >
              <Input.Password placeholder="Confirm Password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
            </Form.Item>
            <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital"]}
                minLength={10}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => {}}
            />
            <Form.Item className="signup-form-item">
              <Button type='primary' htmlType='submit'>
                Create Account
              </Button>
            </Form.Item>            </Form>
          </div>
        </div>
        {/* <div className="chalmers-logo-container">
        </div> */}
    </div>

  )
}

export default SignUpPage;
