import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import HeaderBar from '../../components/common/header/HeaderBar';

import './chatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState(['Welcome to the chat!']);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const contacts = ['Person1', 'Person2', 'Person3', 'Person4']

  return (
    <>
    <HeaderBar/>
    <div className="chat-container">
      <div className="chat-sidebar">
                <List
                    dataSource={contacts}
                    renderItem={item => (
                        <List.Item>
                            <Avatar icon={<UserOutlined />} />
                            <div className="chat-sidebar-name">{item}</div>
                        </List.Item>
                    )}
                />
        </div>
      <div className="chat-window">
        <div className="messages-container">
          {/* Messages will go here */}
          {messages.map((message, index) => (
            <div key={index} className='message-bubble sent'>{message} </div>
          ))}
          <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
        </div>
        <div className="input-container">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <Button id="send-button" type="primary" onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  </>
  );
};

export default ChatPage;