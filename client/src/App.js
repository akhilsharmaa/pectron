import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [question, setQuestion] = useState(""); // State for user input
  const [responseText, setResponseText] = useState(""); // State to hold the streamed response
  const [isGenerating, setIsGenerating] = useState(false); // State to hold the streamed response

  // Function to handle button click and initiate SSE connection
  const handleAsk = () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    setIsGenerating(true);
    setResponseText(""); // Clear the previous response
    const eventSource = new EventSource(`http://localhost:8000/llm/ask?question=${encodeURIComponent(question)}`);

    // Listen for messages from the server
    eventSource.onmessage = (event) => {
      setResponseText((prev) => prev + event.data); // Append the new data to the existing text
    };

    // Handle errors (optional)
    eventSource.onerror = () => {
      console.error("Error with the SSE connection.");
      eventSource.close();
    };

    // Close connection when response is complete (optional if server sends "done" messages)
    return () => {
      eventSource.close();
    };
  };

  return (
    <div>
      <h1>LLM Streaming Response</h1>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ marginRight: "10px", width: "300px" }}
      />
      {!isGenerating && <button onClick={handleAsk}>Ask</button>}
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h2>Response:</h2>
        <p>{responseText}</p>
      </div>
    </div>
  );
};

export default App;
