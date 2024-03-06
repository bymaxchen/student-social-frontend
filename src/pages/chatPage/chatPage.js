import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import HeaderBar from '../../components/common/header/HeaderBar';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Client } from '@stomp/stompjs';
import { getAllUsers} from "../../api/api";
import './chatPage.css';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [chatHistories, setChatHistories] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  // Initial welcome message for each contact
  const [initialMessages, setInitialMessages] = useState({});


  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);


  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await getAllUsers();
        console.log(users)
        const initialMessagesObj = {};
        users.forEach(user => {
          initialMessagesObj[user.username] = [];
        });
        setInitialMessages(initialMessagesObj);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

     fetchAllUsers();
  }, []);

  const activeChatRef = useRef(activeChat);
  useEffect(() => {

    activeChatRef.current = activeChat;
    const stompClient = new Client({
      brokerURL: "ws://localhost:8081/chat",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WS');

        // Subscribe to a topic
        stompClient.subscribe('/topic/public', (message) => {
          // Called when the client receives a message
          const newMessage = JSON.parse(message.body);

          // not my message
          if (newMessage.sendName !== localStorage.getItem("username")) {
            console.log("11111" + "_" + newMessage.text);
            console.log("11111" + "_" + JSON.stringify(newMessage));
            
            console.log(activeChatRef.current);
            console.log(chatHistories);

            setChatHistories((currentChatHistories) => {
              const newChatHistory = currentChatHistories[activeChatRef.current]
                ? [...currentChatHistories[activeChatRef.current], newMessage]
                : [newMessage];
              return { ...currentChatHistories, [activeChatRef.current]: newChatHistory };
            });         
          }
        });
      },
      onDisconnect: () => {
        console.log('Disconnected');
      }
    });

    stompClient.activate();
    setClient(stompClient);
    return () => {
      stompClient.deactivate();
    };
  }, [activeChat]);




  // // Initial welcome message for each contact
  // const initialMessages = {
  //   Person1: [{ text: 'Welcome to Person1 chat!', sender: 'Person1' }],
  //   Person2: [{ text: 'Welcome to Person2 chat!', sender: 'Person2' }],
  //   Person3: [{ text: 'Welcome to Person3 chat!', sender: 'Person3' }],
  //   Person4: [{ text: 'Welcome to Person4 chat!', sender: 'Person4' }],
  // };

  const simulateResponse = () => {
    // Here you can define how the "other person" generates a response.
    // This is a simple static example:
    return {
      text: `Thanks for your message! This is a simulated response.`,
      sender: activeChat, // The "other person" is the active chat contact
    };
  };


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
      if (client && client.activate) {
        client.publish({destination: '/topic/public', body: JSON.stringify({ 
          sendName: localStorage.getItem("username"),
          receiverName: activeChat,
          text: inputValue.trim()
         })});
      }


      const userMessage = {
        text: inputValue,
        sender: 'Me',
      };
      setChatHistories((currentChatHistories) => {
        const newChatHistory = currentChatHistories[activeChat]
          ? [...currentChatHistories[activeChat], userMessage]
          : [userMessage];
        return { ...currentChatHistories, [activeChat]: newChatHistory };
      }); 
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
    console.log(contact + "contact----------");
    setActiveChat(contact);
    console.log(chatHistories[contact]);
    if (chatHistories[contact] == null) {
      chatHistories[contact] = [];
      setChatHistories(chatHistories);
    }
  };

  const contacts = Object.keys(initialMessages);

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
              <div key={index} className={`message-bubble ${message.sender === 'Me' ? 'sent' : 'received'}`}>
                <div>{message.text}</div>
                {/* <div className="message-sender">{message.sender}</div> */}
              </div>
            ))
          }
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
