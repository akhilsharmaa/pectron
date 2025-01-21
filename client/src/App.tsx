import { useState } from 'react'
import { Stage, Layer, Star, Text } from 'react-konva';
import { Button } from "@/components/ui/button"
import './App.css'
 
const CANVAS_HEIGHT = 1080/3; 
const CANVAS_WIDTH  = 1920/3; 

const App = () => {
  const [question, setQuestion] = useState("Tourism in kolkata"); // State for user input
  const [isGenerating, setIsGenerating] = useState(false); // State to disable button while generating
  const [currentParagraph, setCurrentParagraph] = useState(""); // State to disable button while generating
  
  var keyCounter = 0;
  var canAddNewPage = true; 

  const [konvaComponents, setKonvaComponents] = useState([
  ]);
  

  const addTextComponent = () => { 
    
    setKonvaComponents((prev) => {
      
        console.log("konvaComponent: ", prev); 

        const updatedComponents = [...prev];

        // Clone the previous components to avoid mutating state
        const lastComponent = updatedComponents[updatedComponents.length - 1]; 
        const lastPy = lastComponent.texts[lastComponent.texts.length-1]?.y ?? 0; 
 
        const newTextComponent = {
            id: keyCounter++,
            x: 30, // Random x position
            y: lastPy + 36, // Random y position
            text: ``,
            width: `${CANVAS_WIDTH-40}`, 
            fontSize: 16,
            fill: "black"
        }

        // Add the new text to the last component's texts array immutably
        const updatedLastComponent = {
          ...lastComponent,
          texts: [...lastComponent.texts, newTextComponent],
        };
 

        updatedComponents[updatedComponents.length - 1] = updatedLastComponent;
        return updatedComponents;
    }); 
  }; 


  const addTextToLastComponent = (text:string) => { 

    setKonvaComponents((prev) => {
        
      const updatedComponents = [...prev];

      // Clone the previous components to avoid mutating state
      var lastComponent = updatedComponents[updatedComponents.length - 1]; 

      const size = lastComponent.texts.length; 
      if(size >= 1){ 
        lastComponent.texts[size-1].text = text; 
      }

      updatedComponents[updatedComponents.length - 1] = lastComponent;
      return updatedComponents;
    }); 
  }  

  const getLastThreeSubstring = (str) => {
      return str.substring(str.length-3, str.length);
  }

  const addNewStageComponent = () => {
    setKonvaComponents((prev) => {
        const update = [...prev, {"texts": []}];  
        return update; 
    }); 
  }
 

  // Function to handle the "Ask" button click
  const handleAsk = () => { 

    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    } 

    setIsGenerating(true); // Disable button 
    
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
                addNewStageComponent(); 
                canAddNewPage = false;

              } else if (command === "SSS") {
                return "";  

              } else if (command === "EEE") {
                addTextComponent();
                canAddNewPage = true;
                return "";  

              }else {
                addTextToLastComponent(updatedParagraph);
              }
              
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
      <Button onClick={handleAsk} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Ask"}
      </Button> 

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
                        lineHeight={1.25}
                        width={CANVAS_WIDTH-50}  
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
