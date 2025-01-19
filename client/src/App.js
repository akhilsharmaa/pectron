import React, { useState } from "react";
import { Stage, Layer, Star, Text } from 'react-konva';
import { v4 as uuidv4 } from "uuid"; // Install with `npm install uuid`

const CANVAS_HEIGHT = 1080/3; 
const CANVAS_WIDTH  = 1920/3; 

const App = () => {
  const [question, setQuestion] = useState("Tourism in kolkata"); // State for user input
  const [components, setComponents] = useState([]); // Array to hold dynamic components
  const [isGenerating, setIsGenerating] = useState(false); // State to disable button while generating
  const [currentParagraph, setCurrentParagraph] = useState(""); // State to disable button while generating
  
  var keyCounter = 0;

  // Function to add a new text component
  const addTextComponent = (text) => {
    const newComponent = (
      <div key={`text-${keyCounter}`} className="dynamic-component">
        <p>{text}</p>
      </div>
    );
    setComponents((prev) => [...prev, newComponent]);
    keyCounter += 1; // Increment the counter
  };
 
  const addTextToLastComponent = (text) => {
    const paragraphs = document.querySelectorAll("p");

    // Check if there are any <p> elements and set text for the last one
    if (paragraphs.length > 0) {
      paragraphs[paragraphs.length - 1].textContent = text;
    }
  }  

  const getLastThreeSubstring = (str) => {
      return str.substring(str.length-3, str.length); 
  }

  const addNewStageComponent = () => {
    
      const newComponent = (
            <div key={`divider-${keyCounter}`} 
                className="stage-canvas"> 
                <Stage 
                      width={CANVAS_WIDTH} 
                      height={CANVAS_HEIGHT}
                      backgroundColor="000sdd">
                        <Layer>
                            <Text 
                              text={currentParagraph}>
                            </Text> 
                        </Layer>
                </Stage>
            </div>)

      setComponents((prev) => [...prev, newComponent]);
      keyCounter += 1; // Increment the counter
  }
 
  var canAddNewPage = true; 

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
          // console.log(token);
           
          setCurrentParagraph((prevParagraph) => {
              const updatedParagraph = prevParagraph + token;

              const command = getLastThreeSubstring(updatedParagraph); 

              if (command === "---" && canAddNewPage) {
                addNewStageComponent(); // Add a new stage component when "---" is received
                console.log("token: ", token);
                console.log("command: ", command);
                console.log("updatedParagraph: ", updatedParagraph);
                canAddNewPage = false; 

              } else if (command === "SSS") {
                return ""; // Reset paragraph for a new block
              } else if (command === "EEE") {
                addTextComponent("");
                canAddNewPage = true;
                return ""; // Reset paragraph for a new block
              }

              addTextToLastComponent(updatedParagraph);
              return updatedParagraph; 
          });

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


      {/* <div className="stage-canvas"> 
        <Stage width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              backgroundColor="000sdd">
                <Layer>
                  <Text 
                      text="Try to drag a star"
                      draggable="true" />
                </Layer>
        </Stage>
      </div> */}

 
    </div>
  );
};

export default App;
