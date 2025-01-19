import React, { useState } from "react";

const App = () => {
  const [question, setQuestion] = useState(""); // State for user input
  const [components, setComponents] = useState([]); // Array to hold dynamic components
  const [isGenerating, setIsGenerating] = useState(false); // State to disable button while generating

  // Function to add a new text component
  const addTextComponent = (text) => {
    const newComponent = (
      <div key={`text-${components.length}`} className="dynamic-component">
        <p>{text}</p>
      </div>
    );
    setComponents((prev) => [...prev, newComponent]);
  };

  const getLastThreeSubstring = (str) => {
      return str.substring(str.length-3, str.length); 
  }

  // Function to add a divider component
  const addDivider = () => {
    const newComponent = <hr key={`divider-${components.length}`} />;
    setComponents((prev) => [...prev, newComponent]);
  };

  let paragraph = ""; // Temporary variable to store streaming paragraph

  // Function to handle the "Ask" button click
  const handleAsk = () => { 

    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    } 

    setIsGenerating(true); // Disable button
    setComponents([]); // Clear previous components

    const eventSource = new EventSource(
      `http://localhost:8000/llm/ask?question=${encodeURIComponent(question)}`
    );

    // Listen for messages from the server
    eventSource.onmessage = (event) => {
      const token = event.data; // Current token sent by the server


      // console.log(paragraph.substring(-10, 2));
      const command = getLastThreeSubstring(paragraph); 
      console.log(paragraph);
      

      if (command === "---") {
        addDivider(); // Add a divider when "---" is received
      } else if (command === "SSS") {
        paragraph = "";  
      } else if (command === "EEE") {
        addTextComponent(paragraph);  
        paragraph = ""; // Reset paragraph for a new block
      } 
      
      paragraph += token; 
    };

    // Handle errors
    eventSource.onerror = () => {
      console.error("Error with the SSE connection.");
      setIsGenerating(false);
      eventSource.close();
    };

    // Close connection when component unmounts
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
      <button onClick={handleAsk} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Ask"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <h2>Response:</h2>
        <div className="components-container">{components}</div>
      </div>
    </div>
  );
};

export default App;
