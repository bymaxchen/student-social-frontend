import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { Form, Input, Button, DatePicker, Radio } from 'antd';
import PasswordChecklist from 'react-password-checklist';
import axios from 'axios'; // Ensure axios is installed
import moment from 'moment'; // Ensure moment is installed

import './signUpPage.css';

function SignUpPage() {
  const [cid, setCid] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const arePasswordsMatching = password && password === passwordAgain;
    const isAllFieldsFilled = cid && username && firstName && lastName && gender && birthday && arePasswordsMatching;
    setIsButtonDisabled(!isAllFieldsFilled);
  }, [cid, username, firstName, lastName, gender, birthday, password, passwordAgain]);

  const handleSubmit = async () => {
    setLoading(true);

    const formData = {
      cid,
      username,
      firstName,
      lastName,
      gender,
      birthday: birthday ? moment(birthday).format('YYYY-MM-DD') : null,
      password,
    };

    try {
      // Substitute 'http://localhost:8081/api/signup' with your actual backend endpoint
      const response = await axios.post('http://localhost:8081/api/signup', formData);
      console.log(response.data);
      navigate('/success'); // Redirect upon successful signup, replace '/success' with your route
    } catch (error) {
      console.error(error.response || error.message);
    } finally {
      setLoading(false);
    }
  };


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
            onFinish={handleSubmit}
          >
            <Form.Item label="CID" required tooltip="This is a required field">
              <Input placeholder="CID" value={cid} onChange={e => setCid(e.target.value)} />
            </Form.Item>

            <Form.Item label="Username" required tooltip="This is a required field">
              <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item label="First Name" required tooltip="This is a required field">
              <Input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Form.Item>

            <Form.Item label="Last Name" required tooltip="This is a required field">
              <Input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Form.Item>

            <Form.Item label="Gender">
              <Radio.Group value={gender} onChange={e => setGender(e.target.value)}>
                <Radio value="female">Female</Radio>
                <Radio value="male">Male</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Birthday" required tooltip="This is a required field">
              <DatePicker onChange={date => setBirthday(date)} />
            </Form.Item>

            <Form.Item label="Password" required tooltip="This is a required field">
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Item>

            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={10}
              value={password}
              valueAgain={passwordAgain}
              onChange={isValid => {}}
            />

            <Form.Item label="Confirm Password" required tooltip="This is a required field">
              <Input.Password
                placeholder="Confirm Password"
                value={passwordAgain}
                onChange={e => setPasswordAgain(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isButtonDisabled || loading}>
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;