import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [responseText, setResponseText] = useState(""); // State to hold the streamed response

  useEffect(() => {

    // Open a connection to the SSE endpoint
    const eventSource = new EventSource("http://localhost:8000/llm/ask?question=`role of coal mines of jharkhand in colletrasl damage`");

    // Listen for messages from the server
    eventSource.onmessage = (event) => {
      setResponseText((prev) => prev + event.data); // Append the new data to the existing text
    };

    // Clean up the connection when the component unmounts
    return () => {
      eventSource.close();
    };
  }, []); // Only run once when the component mounts

  return (
    <div>
      <h1>LLM Streaming Response</h1>
      <p>{responseText}</p> 
    </div>
  );
};

export default App;