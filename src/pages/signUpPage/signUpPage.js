import React, { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../AuthContext'
import { Form, Input, Button, Card, DatePicker, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import PasswordChecklist from "react-password-checklist"


import ChalmersLogo from '../../asserts/images/sign-up.svg'

import './signUpPage.css';

function SignUpPage() {
  const [cid, setCid] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [passwordAgain, setPasswordAgain] = useState(''); // Add state to track the confirmation password

  isValid(()
  );

  useEffect(() => {
    // Add all required fields in this condition
    const isFilled = cid && username && firstName && lastName && gender && birthday && password && confirmPassword;
    setIsFormFilled(isFilled);
  }, [cid, username, firstName, lastName, gender, birthday, password, confirmPassword]); // Dependency array includes all field states

  const handleCidChange = (e) => setCid(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleBirthdayChange = (date) => setBirthday(date);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

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
                // onFinish={onFinish}
            >
            
            <Form.Item className="signup-form-item" label="CID" required tooltip="This is a required field"          >
              <Input placeholder="CID" vaue={cid} onChange={handleCidChange} />
            </Form.Item>
            <Form.Item className="signup-form-item" label="Username" required tooltip="This is a required field"          >
              <Input placeholder="Username" vaue={username} onChange={handleUsernameChange}/>
            </Form.Item>
            <Form.Item className="signup-form-item" label="First Name" required tooltip="This is a required field"          >
              <Input placeholder="First Name" vaue={firstName} onChange={handleFirstNameChange}/>
            </Form.Item>
            <Form.Item className="signup-form-item" label="Last Name" required tooltip="This is a required field"          >
              <Input placeholder="Last Name" vaue={lastName} onChange={handleLastNameChange}/>
            </Form.Item>
            <Form.Item className="signup-form-item" label="Gender">
                <Radio.Group vaue={gender} onChange={handleGenderChange}>
                    <Radio.Button value="female">Female</Radio.Button>
                    <Radio.Button value="male">Male</Radio.Button>
                    <Radio.Button value="other">Other</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item className="signup-form-item" label="Birthday" required tooltip="This is a required field"          >
              <DatePicker onChange={handleBirthdayChange}/>
            </Form.Item>
            <Form.Item name="password" className="signup-form-item" label="Password" required tooltip="This is a required field"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" value={password} onChange={handlePasswordChange} />
            </Form.Item>
            <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                minLength={10}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => {}}
            />
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
              <Input.Password placeholder="Confirm Password" value={passwordAgain} onChange={handleConfirmPasswordChange} />
            </Form.Item>
            <Form.Item className="signup-form-item">
              <Button type='primary' htmlType='submit' disabled={!isFormFilled || loading}>
                Create Account
              </Button>
            </Form.Item>            
          </Form>
          </div>
        </div>
    </div>

  )
}

export default SignUpPage;
