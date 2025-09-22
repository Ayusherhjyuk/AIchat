import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";

function ChatPage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]); // All chats
  const [activeChat, setActiveChat] = useState(null); // Current chat ID
  const [message, setMessage] = useState("");

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) return "Hello 👋 How are you?";
    if (msg.includes("help")) return "Sure! What do you need help with? 🤝";
    if (msg.includes("bye")) return "Goodbye! Have a nice day 🌟";
    if (msg.includes("weather")) return "☀️ The weather looks great today!";
    return "Hmm… interesting! Tell me more. 🤔";
  };
  

  // Handle creating new chat
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  // Handle sending message
  const handleSend = () => {
    if (!message.trim()) return;

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? message.slice(0, 20) + "..."
                  : chat.title,
              messages: [
                ...chat.messages,
                { sender: user, text: message },
                { sender: "Bot", text: getBotReply(message) }

              ],
            }
          : chat
      )
    );

    setMessage("");
  };

  const currentChat = chats.find((c) => c.id === activeChat);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#f9f9f9",
          borderRight: "1px solid #ddd",
          padding: "1rem",
        }}
      >
        <h3>AI Chat</h3>
        <button
          onClick={handleNewChat}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + New Chat
        </button>

        {chats.length === 0 ? (
          <p>No conversations yet</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              style={{
                padding: "8px",
                marginBottom: "5px",
                borderRadius: "6px",
                background: chat.id === activeChat ? "#e6f0ff" : "transparent",
                cursor: "pointer",
              }}
            >
              {chat.title}
            </div>
          ))
        )}
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.8rem 1rem",
            borderBottom: "1px solid #ddd",
          }}
        >
          <span>💎 1,250</span>
          <div>
            <span style={{ marginRight: "1rem" }}>{user}</span>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
          {!currentChat ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h2>✨ Welcome to AI Chat</h2>
              <p>Start a conversation with our AI assistant.</p>
            </div>
          ) : (
            currentChat.messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "1rem",
                  textAlign: msg.sender === user ? "right" : "left",
                }}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))
          )}
        </div>

        {/* Input Box */}
        {currentChat && (
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #ddd",
              padding: "0.5rem",
            }}
          >
            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{ flex: 1, padding: "0.5rem", borderRadius: "8px" }}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "0.5rem",
                padding: "0 1rem",
                borderRadius: "8px",
                background: "#007bff",
                color: "white",
                border: "none",
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
