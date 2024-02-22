import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
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

  return (
    <div className="chat-container">
      <div className="chat-list">
        {/* List of chats */}
        <div>Chat 1</div>
        <div>Chat 2</div>
        {/* Add more chats as needed */}
      </div>
      <div className="chat-window">
        <div className="messages-container">
          {/* Messages will go here */}
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
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
          <Button type="primary" onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;