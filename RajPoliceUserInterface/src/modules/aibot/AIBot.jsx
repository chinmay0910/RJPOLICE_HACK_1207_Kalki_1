import React, { useState, useEffect } from 'react';
import './AIBot.css'
const App = () => {
  const [theme, setTheme] = useState('dark');
  const [chats, setChats] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleDeleteChats = () => {
    if (window.confirm('Are you sure you want to delete all chats?')) {
      localStorage.removeItem('all-chats');
      setChats([]);
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newChats = [...chats, { type: 'outgoing', content: trimmedInput }];
    setChats(newChats);
    setUserInput('');

    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
      setChats((prevChats) => [
        ...prevChats,
        { type: 'incoming', content: 'Is typing...', isTyping: true },
      ]);
    }, 500);

    // Simulate API call or asynchronous task
    setTimeout(() => {
      setChats((prevChats) => [
        ...prevChats.slice(0, -1),
        { type: 'incoming', content: 'Responsing' },
      ]);
    }, 1500);
  };

  useEffect(() => {
    const storedChats = localStorage.getItem('all-chats');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('all-chats', JSON.stringify(chats));
  }, [chats]);

  

  return (
    <div  className={`container chat-container-${theme}`}>
      <div>
        {chats.length === 0 && (
          <div className="default-text">
            <h1 className="headingChatBot">Justice Gaurd</h1>
            <p className='mx-48'>"Justice Guard, your all-encompassing ally in the digital and offline realms. Safeguarding with wit and vigilance, it ensures protection and peace, both online and off. Your trusty cyber and street guardian!" 🛡️💬🌐👥Let's chat!</p>
            <h2>Example: What can I do if my purse got stole...</h2>
          </div>
        )}

        {chats.map((chat, index) => (
          <div key={index} className={`chat ${chat.type}`}>
            {chat.type === 'outgoing' ? (
              <div className="chat-details">
                <img src="images/profile.png" alt="user-img" />
                <p>{chat.content}</p>
              </div>
            ) : (
              <div className="chat-details">
                <img src="images/chatbot.png" alt="chatbot-img" />
                {chat.isTyping ? (
                  <div className="typing-animation">
                    <div className="typing-dot" style={{ '--delay': '0.2s' }}></div>
                    <div className="typing-dot" style={{ '--delay': '0.3s' }}></div>
                    <div className="typing-dot" style={{ '--delay': '0.4s' }}></div>
                  </div>
                ) : (
                  <p>{chat.content}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Typing Container */}
      <div className="typing-container">
        <div className="typing-content">
          <div className="typing-textarea">
            <textarea
              id="chat-input"
              spellCheck="false"
              placeholder="Enter a prompt here"
              value={userInput}
              onChange={handleUserInput}
              required
            ></textarea>
            <span className="material-symbols-rounded" onClick={handleSend}>
              send
            </span>
          </div>
          <div className="typing-controls">
            <span className="material-symbols-rounded" onClick={handleThemeToggle}>
              {theme === 'light' ? 'dark' : 'light'}
            </span>
            <span className="material-symbols-rounded" onClick={handleDeleteChats}>
              delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
