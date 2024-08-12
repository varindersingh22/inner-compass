import React, { useState, useEffect } from "react";
import axios from 'axios';
import './chatt.css';
import homebg from '../public/images/homebg.jpg';

// Component to fetch CSRF token
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get('https://varindersingh.pythonanywhere.com/chat/get-csrf-token/');
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (error) {
        console.log("Error fetching CSRF token:", error);
      }
    };

    getCsrfToken();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return; // Don't send empty messages

    const newMessage = { text: input, type: "user" };

    // Add the user's message to the chat
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Send the message to the API
    axios.post("https://varindersingh.pythonanywhere.com/chat/chatbot/", { message: input }, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken, // Include CSRF token in headers
      }
    })
    .then((response) => {
      // Process response to format as HTML
      const formattedResponse = response.data.response[0]
        .split('\n')
        .map(line => line.startsWith('• ') ? `<li>${line.slice(2)}</li>` : `<p>${line}</p>`)
        .join('\n')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **bold** to <strong>
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Convert *italic* to <em>
        .replace(/•\s+/g, '<li>') // Convert bullet points to list items
        .replace(/<\/li>\s*<\/li>/g, '</li>\n<li>') // Handle multiple list items in a row
        .replace(/\n/g, '</li>\n')
        .concat('</li>') // Close the last list item
        .replace(/<\/li>\s*<\/p>/g, '</li><p>') // Handle list items followed by paragraphs
        .concat('</p>');;

      // Add the bot's response to the chat
      const botMessage = { text: formattedResponse, type: "bot" };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setInput(""); // Clear input field
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission or other default behavior
      handleSendMessage(); // Call send message function
    }
  };

  return (
    <div className="chatbg" style={{
      backgroundImage: `url(${homebg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    }}>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              {/* Render HTML content safely */}
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
