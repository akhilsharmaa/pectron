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
  var canAddNewPage = true; 

  const [konvaComponents, setKonvaComponents] = useState([
    {"texts": [
      {
        id: 1,
        x: 10, // Random x position
        y: 20, // Random y position
        text: "This is text 1", // Dynamic text content
        fontSize: 20,
        fill: 'black',
      }, 
      {
        id: 1,
        x: 20, // Random x position
        y: 40, // Random y position
        text: "This is text 2", // Dynamic text content
        fontSize: 20,
        fill: 'black',
      }
    ]}, 
    {"texts": [
      {
        id: 1,
        x: 10, // Random x position
        y: 20, // Random y position
        text: "This is text 1", // Dynamic text content
        fontSize: 20,
        fill: 'black',
      }, 
      {
        id: 1,
        x: 20, // Random x position
        y: 40, // Random y position
        text: `"This is text 2"`, // Dynamic text content
        fontSize: 20,
        fill: 'black',
      }
    ]}
  ]);
  

  // Function to add a new text component
  const addTextComponent = (text) => {

    // setComponents((prev) => [...prev, newTextComponent]);
    setKonvaComponents((prv) => {
        var lastKonvaComponents = prv[prv.length-1]; 
        
        const lastTextYposition = lastKonvaComponents.texts[lastKonvaComponents.texts.length-1].y; 
        const lastTextXposition = lastKonvaComponents.texts[lastKonvaComponents.texts.length-1].x; 

        const newTextComponent = {
          id: 1,
          x: 10, // Random x position
          y: lastTextYposition + 10, // Random y position
          text: "",
          fontSize: 20,
          fill: "black"
        }

        lastKonvaComponents.texts.push(newTextComponent); 
        return [...prv, lastKonvaComponents]; 
    }); 

    keyCounter += 1; // Increment the counter
  };
 
  const addTextToLastComponent = (text) => {
    const paragraphs = document.querySelectorAll("p");

    // Check if there are any <p> elements and set text for the last one
    if (paragraphs.length > 0) {
      paragraphs[paragraphs.length - 1].textContent = text;
    }

    setKonvaComponents((prv) => {

        var lastKonvaComponents = prv[prv.length-1]; 
        // var lastTextEle = lastKonvaComponents.texts[lastKonvaComponents.texts.length-1]; 
        
        const numOfKonvaTextInLastComponent = lastKonvaComponents.texts.length; 

        console.log("numOfKonvaTextInLastComponent: ", numOfKonvaTextInLastComponent);
        console.log("lastKonvaComponents: ", lastKonvaComponents.texts[numOfKonvaTextInLastComponent-1]);


        lastKonvaComponents.texts[numOfKonvaTextInLastComponent-1].text =  text;

        return [...prv]; 
        // return [...prv, lastTextEle]; 
    })
  }  

  const getLastThreeSubstring = (str) => {
      return str.substring(str.length-3, str.length);
  }

  const addNewStageComponent = () => {
    
      const newComponent = (
            <div key={`divider-${keyCounter++}`} 
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
  }
 

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

      {
          konvaComponents.map((texts) => (
            <Stage width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                key={`stage-${keyCounter++}`}
                className="stage-canvas">
                  <Layer > 
                    {texts.texts.map((text) => (
                      <Text
                        key={text.id}
                        x={text.x}
                        y={text.y}
                        text={text.text}
                        fontSize={text.fontSize}
                        fill={text.fill}
                      />
                    ))}
                  </Layer>
            </Stage> 
          ))
      }

 
    </div>
  );
};

export default App;
