import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { Form, Input, Button, DatePicker, Radio } from 'antd';
import PasswordChecklist from 'react-password-checklist';
import axios from 'axios'; // Ensure axios is installed
import moment from 'moment'; // Ensure moment is installed

import './signUpPage.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setbirthdate] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const arePasswordsMatching = password && password === passwordAgain;
    const isAllFieldsFilled = email && username && firstname && lastname && birthdate && arePasswordsMatching;
    setIsButtonDisabled(!isAllFieldsFilled);
  }, [email, username, firstname, lastname, gender, birthdate, password, passwordAgain]);

  const handleSubmit = async () => {
    setLoading(true);

    // real one
    const formData = {
      email,
      username,
      firstname,
      lastname,
      gender,
      birthdate: birthdate ? moment(birthdate).format('YYYY-MM-DD') : null,
      password,
    };

    // // experimental
    // const formData = {
    //   // id: "g",
    //   name: username,
    //   email: email,
    //   // birthdate: birthdate ? moment(birthdate).format('YYYY-MM-DD') : null,
    //   password: password,
    // };

    try {
      // Substitute 'http://localhost:8081/api/signup' with your actual backend endpoint
      const response = await axios.post('/api/users/register', formData);
      console.log(response.data);
      await login({ email, password }); // Auto-login after registration
      navigate('/home'); // Redirect upon successful signup, replace '/success' with your route
    } catch (error) {
      console.error(error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

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
            <Form.Item className="signup-form-item" label="Email" required tooltip="This is a required field">
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item className="signup-form-item" label="Username" required tooltip="This is a required field">
              <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item className="signup-form-item" label="First Name" required tooltip="This is a required field">
              <Input placeholder="First Name" value={firstname} onChange={e => setFirstName(e.target.value)} />
            </Form.Item>

            <Form.Item className="signup-form-item" label="Last Name" required tooltip="This is a required field">
              <Input placeholder="Last Name" value={lastname} onChange={e => setLastName(e.target.value)} />
            </Form.Item>

            <Form.Item className="signup-form-item" label="Gender">
              <Radio.Group value={gender} onChange={e => setGender(e.target.value)}>
                <Radio value="female">Female</Radio>
                <Radio value="male">Male</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item className="signup-form-item" label="Birthdate" required tooltip="This is a required field">
              <DatePicker onChange={date => setbirthdate(date)} />
            </Form.Item>

            <Form.Item className="signup-form-item" name="password" label="Password" required tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
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

            <Form.Item className="signup-form-item" name="confirm" label="Confirm Password" required tooltip="This is a required field" dependencies={["password"]}
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
              <Input.Password
                placeholder="Confirm Password"
                value={passwordAgain}
                onChange={e => setPasswordAgain(e.target.value)}
              />
            </Form.Item>

            <Form.Item className="signup-form-item">
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