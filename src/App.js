import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import pro from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import chatBtn from './assets/chatgptLogo.svg';
import userIcon from './assets/me01.jpg';
import deleteIcon from './assets/delete.svg';
import React, { useState, useEffect, useRef } from 'react';

// Dynamic import for sendMsgToOpenAI
let sendMsgToOpenAI;

// Function to truncate text
const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

function App() {
  const [input, setInput] = useState('');
  const [chatSessions, setChatSessions] = useState(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    return savedSessions ? JSON.parse(savedSessions) : [
      {
        id: 1,
        title: truncateText("What is Euphoria?"), // Initial title truncated if needed
        messages: [
          { text: "What is Euphoria?", user: true, timestamp: new Date().toLocaleTimeString() },
          { text: "Euphoria Society (referred to as 'Euphoria' in the question) is a community-driven club focused on creating fun, engaging, and memorable experiences through games and activities. It emphasizes promoting social well-being and mental health by bringing people together for gatherings designed to enhance problem-solving skills and build meaningful connections.", user: false, timestamp: new Date().toLocaleTimeString() },
        ],
      },
    ];
  });
  const [activeChatId, setActiveChatId] = useState(chatSessions[0]?.id || null);
  const [isLoaded, setIsLoaded] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    import('./openai')
      .then((module) => {
        sendMsgToOpenAI = module.sendMsgToOpenAI;
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to import sendMsgToOpenAI:", error);
        sendMsgToOpenAI = () => Promise.resolve("No OpenAI keys set. It works though.. 😁 If you add some. Fing 'openai.js' file in 'src' folder and add your OpenAI Key. THANK YOU!");
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  const activeChat = chatSessions.find((session) => session.id === activeChatId) || { messages: [] };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = {
      text: input,
      user: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatSessions((prevSessions) => {
      const updatedSessions = prevSessions.map((session) => {
        if (session.id === activeChatId) {
          const isFirstMessage = session.messages.length === 0;
          return {
            ...session,
            title: isFirstMessage ? truncateText(input) : session.title, // Truncate title for first message
            messages: [...session.messages, newUserMessage],
          };
        }
        return session;
      });
      return updatedSessions;
    });

    try {
      const response = await sendMsgToOpenAI(input);
      setChatSessions((prevSessions) => {
        const updatedSessions = prevSessions.map((session) => {
          if (session.id === activeChatId) {
            const updatedMessages = [...session.messages, { text: response, user: false, timestamp: new Date().toLocaleTimeString() }];
            return { ...session, messages: updatedMessages };
          }
          return session;
        });
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        return updatedSessions;
      });
    } catch (error) {
      console.error("Error in handleSend:", error);
      setChatSessions((prevSessions) => {
        const updatedSessions = prevSessions.map((session) => {
          if (session.id === activeChatId) {
            const updatedMessages = [...session.messages, { text: "Error: Could not get response.", user: false, timestamp: new Date().toLocaleTimeString() }];
            return { ...session, messages: updatedMessages };
          }
          return session;
        });
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        return updatedSessions;
      });
    }

    setInput('');
  };

  const handleNewChat = () => {
    const newChatId = chatSessions.length > 0 ? Math.max(...chatSessions.map((s) => s.id)) + 1 : 1;
    const newChat = {
      id: newChatId,
      title: truncateText(`New Chat ${newChatId}`), // Truncate initial title if needed
      messages: [],
    };
    setChatSessions((prevSessions) => [...prevSessions, newChat]);
    setActiveChatId(newChatId);
    setInput('');
  };

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
    setInput('');
  };

  const handleDeleteChat = (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      setChatSessions((prevSessions) => {
        const updatedSessions = prevSessions.filter((session) => session.id !== chatId);
        const newActiveChatId = updatedSessions.length > 0 ? updatedSessions[0].id : null;
        setActiveChatId(newActiveChatId);
        return updatedSessions;
      });
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo"/><span className="brand">ChatGPT Clone</span></div>
          <button className="midBtn" onClick={handleNewChat}>
            <img src={addBtn} alt="New Chat" className="addBtn"/>New Chat
          </button>
          <div className="upperSideBottom">
            {chatSessions.map((session) => (
              <div key={session.id} className="query-container" style={{ position: 'relative' }}>
                <button
                  key={session.id}
                  className={`query ${session.id === activeChatId ? 'active' : ''}`}
                  onClick={() => handleChatSelect(session.id)}
                >
                  <img src={msgIcon} alt="Query" />{session.title}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteChat(session.id)}
                  style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <img src={deleteIcon} alt="Delete" style={{ height: '1.5rem' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={pro} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats" ref={chatContainerRef}>
          {activeChat.messages.map((chat, index) => (
            <div key={index} className={`chat ${!chat.user ? 'bot' : ''}`}>
              <img src={chat.user ? userIcon : chatBtn} alt={chat.user ? 'User' : 'ChatGPT'} className="chatImg" />
              <div>
                <p className="txt">{chat.text}</p>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>{chat.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT October 05 Version</p>
        </div>
      </div>
    </div>
  );
}

export default App;