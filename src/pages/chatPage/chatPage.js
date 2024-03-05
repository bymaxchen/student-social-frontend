import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/common/header/HeaderBar';
import { getCurrentUser, getAllUsers } from "../../api/api";
import './chatPage.css';

const ChatPage = () => {
  const [chatHistories, setChatHistories] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [webSocket, setWebSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [receiverId, setReceiverId] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        const initialMessagesObj = {};
        usersData.forEach(user => {
          initialMessagesObj[user.id] = [];
        });
        setChatHistories(initialMessagesObj);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchCurrentUserAndConnectWebSocket = async () => {
      try {
        const user = await getCurrentUser();
        const uid = user.id;
        const websocket = new WebSocket("ws://127.0.0.1:8081/api/websocket/client/" + uid);
        websocket.onopen = function () {
          console.log("WebSocket connect success");
        };

        websocket.onmessage = function (event) {
          //console.log('Receiver ID:', receiverId); // Log the receiverId
          console.log('Chat Histories:', chatHistories); // Log the chatHistories
          const receivedMessage = JSON.parse(event.data);
          console.log('Received message:', receivedMessage);
          setChatHistories(prevChatHistories => ({
            ...prevChatHistories,
            [receivedMessage.data.acceptId]: [
              ...(prevChatHistories[receivedMessage.data.acceptId] || []),
              receivedMessage.data
            ]
          }));
        };

        websocket.onclose = function () {
          alert("WebSocket connection closed");
        };

        websocket.onerror = function (event) {
          console.log(event)
        };

        setWebSocket(websocket);

        return () => {
          websocket.close();
        };
      } catch (error) {
        console.error('Error fetching user or connecting WebSocket:', error);
      }
    };
    fetchCurrentUserAndConnectWebSocket();
  }, [receiverId]); // Reconnect WebSocket when receiverId changes

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
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.addEventListener('scroll', handleScroll);

    return () => {
      messagesContainer.removeEventListener('scroll', handleScroll);
    };
  }, [chatHistories, receiverId]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' && webSocket && receiverId) {
      const userMessage = {
        message: inputValue,
        sender: 'Me',
      };
      const model = {
        message: inputValue,
        sendType: "USER",
        acceptId: receiverId,
      };
      webSocket.send(JSON.stringify(model));
      setChatHistories(prevChatHistories => ({
        ...prevChatHistories,
        [receiverId]: [...prevChatHistories[receiverId], userMessage]
      }));
      setInputValue('');
      scrollToBottom();
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

  const handleContactClick = (contactId) => {
    setReceiverId(contactId);
  };

  return (
      <>
        <HeaderBar />
        <div className="chat-container">
          <div className="chat-sidebar">
            <List
                dataSource={users}
                renderItem={(user) => (
                    <List.Item
                        key={user.id}
                        onClick={() => handleContactClick(user.id)}
                        className={receiverId === user.id ? 'active-chat' : ''}
                    >
                      <Avatar icon={<UserOutlined />} />
                      <div className="chat-sidebar-name">{user.username}</div>
                    </List.Item>
                )}
            />
          </div>
          <div className="chat-window">
            <div className="messages-container" ref={messagesContainerRef} onScroll={handleScroll}>
              {receiverId &&
                  chatHistories[receiverId].map((message, index) => (
                      <div key={index} className={`message-bubble ${message.sender === 'Me' ? 'sent' : 'received'}`}>
                        <div>{message.message}</div>
                      </div>
                  ))
              }

              <div ref={messagesEndRef} />
            </div>
            {showScrollButton && (
                <Button
                    shape="circle"
                    icon={<DownOutlined />}
                    className="scroll-to-bottom-button"
                    onClick={scrollToBottom}
                />
            )}
            {receiverId && (
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
