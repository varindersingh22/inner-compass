import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './chatt.css';

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

  const navigate = useNavigate();

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
        console.log("Fetched CSRF token:", token); // Debugging line
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
      console.log("API response:", response.data); // Debugging line
      // Add the bot's response to the chat
      const botMessage = { text: response.data.response[0], type: "bot" };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setInput(""); // Clear input field
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
