import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/common/header/HeaderBar';

import './chatPage.css';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chatHistories, setChatHistories] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Initial welcome message for each contact
  const initialMessages = {
    Person1: ['Welcome to Person1 chat!'],
    Person2: ['Welcome to Person2 chat!'],
    Person3: ['Welcome to Person3 chat!'],
    Person4: ['Welcome to Person4 chat!'],
  };

  useEffect(() => {
    setChatHistories(initialMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    const isAtBottom =
      messagesContainerRef.current.scrollHeight - messagesContainerRef.current.scrollTop <=
      messagesContainerRef.current.clientHeight;
    setShowScrollButton(!isAtBottom);
  };

  useEffect(() => {
    scrollToBottom();
    // Add scroll listener
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.addEventListener('scroll', handleScroll);

    return () => {
      // Remove scroll listener on cleanup
      messagesContainer.removeEventListener('scroll', handleScroll);
    };
  }, [chatHistories, activeChat]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newChatHistories = {
        ...chatHistories,
        [activeChat]: [...chatHistories[activeChat], inputValue],
      };
      setChatHistories(newChatHistories);
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

  const handleContactClick = (contact) => {
    setActiveChat(contact);
  };

  const contacts = ['Person1', 'Person2', 'Person3', 'Person4'];

  return (
    <>
      <HeaderBar />
      <div className="chat-container">
        <div className="chat-sidebar">
          <List
            dataSource={contacts}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleContactClick(item)}
                className={activeChat === item ? 'active-chat' : ''}
              >
                <Avatar icon={<UserOutlined />} />
                <div className="chat-sidebar-name">{item}</div>
              </List.Item>
            )}
          />
        </div>
        <div className="chat-window">
          <div className="messages-container" ref={messagesContainerRef} onScroll={handleScroll}>
            {activeChat &&
              chatHistories[activeChat].map((message, index) => (
                <div key={index} className="message-bubble sent">
                  {message}
                </div>
              ))}
            <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
          </div>
          {showScrollButton && (
            <Button
              shape="circle"
              icon={<DownOutlined />}
              className="scroll-to-bottom-button"
              onClick={scrollToBottom}
            />
          )}
          {activeChat && (
            <div className="input-container">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
              />
              <Button id="send-button" type="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
