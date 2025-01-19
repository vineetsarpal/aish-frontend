import { useState } from "react";
import "./App.css";
import aishImg from "./assets/Aish1.png";
import ChatBubble from "./ChatBubble";

function App() {

  const apiURL = import.meta.env.VITE_BACKEND_URL || '/api'
  
  console.log(apiURL)

  const [messages, setMessages] = useState([])

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userInput = formData.get("user-input");

    setMessages(prevMessages => [...prevMessages, { type: 'user', content: userInput }])

    try {
      const response = await fetch(`${apiURL}/chat`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json()

      setMessages(prevMessages => [...prevMessages, { type: 'ai', content: data }])

      console.log("Response from server:", data)
    } catch (error) {
      console.error("Error:", error);
      setMessages(prevMessages => [...prevMessages, { type: 'error', content: 'An error occurred' }])
    }
    console.log(messages)
    e.target.reset()
  }

  async function handleClickCapture(e) {
    e.preventDefault()
    console.log(messages)
  }

  return (
    <>
      <img src={aishImg} alt="aish image" className="logo-img" />
      <h1 className="logo-text">AI-SH</h1>

      <form onSubmit={handleSubmit}>
        <div className="conversation-container">
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message}/>
          ))}
        </div>
        <textarea
          type="text"
          name="user-input"
          className="user-input"
          placeholder="What is happening?"
        />
        <div className="btn-container">
          <button type="submit" name="ask">Ask</button>
          {/* <button type="button" formAction={handleClickCapture} name="capture">Capture</button> */}
        </div>
      </form>
    </>
  );
}

export default App;
