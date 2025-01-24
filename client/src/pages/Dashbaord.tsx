import { useState } from 'react'
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import '../App.css'
import useImage from 'use-image';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {BASE_URL} from "../config"
  
const CANVAS_HEIGHT = 1080/2; 
const CANVAS_WIDTH  = 1920/2; 
const FONTSIZE  = 22; 
const CAVASMARGIN = 80; 

const Dashboard = () => {

  const [question, setQuestion] = useState("Tourism in kolkata"); // State for user input
  const [isGenerating, setIsGenerating] = useState(false); // State to disable button while generating
  const [currentParagraph, setCurrentParagraph] = useState(""); // State to disable button while generating
  
  var keyCounter = 0;
  var canAddNewPage = true; 

  const [konvaComponents, setKonvaComponents] = useState([
  ]);
  

  const addTextComponent = () => { 
    
    setKonvaComponents((prev) => {
        // console.log("konvaComponent: ", prev); 

        const updatedComponents = [...prev];

        // Clone the previous components to avoid mutating state
        const lastComponent = updatedComponents[updatedComponents.length - 1]; 
        const lastPy = lastComponent.texts[lastComponent.texts.length-1]?.y ?? 0; 
 
        const newTextComponent = {
            id: keyCounter++,
            x: CAVASMARGIN,  
            y: lastPy + 36, // Random y position
            text: ``,
            width: `${CANVAS_WIDTH-(2*CAVASMARGIN)}`, 
            fontSize: FONTSIZE,
            fill: "white"
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

  const getLastThreeSubstring = (str:string) => {
      return str.substring(str.length-3, str.length);
  }


  // the first very simple and recommended way:
  const RenderKonvaImage = () => {
    const [image] = useImage('./image2.jpg');
    return <KonvaImage image={image} />;
  };


  const changeFontOfFirstComponent = () => {
 

      setKonvaComponents((prev) => { 

              if(prev.length >= 1){
                
                    const updatedComponents = prev;
                    var lastComponent = prev[prev.length - 1]; 
                    
                    lastComponent.texts[0].fontSize=18; 
                    lastComponent.texts[1].fontSize=18; 

                    updatedComponents[updatedComponents.length-1] = lastComponent; 

                    return updatedComponents; 
              }

              return prev; 
      })
  }
   
  const addNewStageComponent = () => {
 
    // changeFontOfFirstComponent(); 

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

      
      const eventSource = new EventSource(
        `${BASE_URL}/llm/ask?question=${encodeURIComponent(question)}`
      );
       
      setIsGenerating(true); // Disable button 
 
      console.log(eventSource);
      if(eventSource){
        console.log("Unauthursed");
      }

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
    eventSource.onerror = (error) => {
      console.error("Error with the SSE connection."); 

      toast("Something Went Wrong", {
        description: "Please login before"
      })

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
      <h1>Pectron</h1> 

      <div className='wrap flex mt-10 mb-10'>
        <Input
          type="text"
          placeholder="Enter the topic"
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          style={{ marginRight:"1rem", padding: "10px 20px", fontSize:"24px" }}
        />

        <Button onClick={handleAsk} disabled={isGenerating}
            style={{padding: "23px 20px", fontSize:"24px" }}>
          {isGenerating ? "Generating..." : "Create"}
        </Button> 
      </div>


      {
          konvaComponents.map((pages) => (
            <Stage width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                key={`stage-${keyCounter++}`}
                className="stage-canvas">
                  
                  <Layer >
                    {/* <RenderKonvaImage/> */}
                    {pages.texts.map((text) => ( 
                        <Text
                          key={text.id}
                          x={text.x}
                          y={text.y}
                          text={text.text}
                          draggable={true}
                          lineHeight={1.25}
                          width={text.width}  
                          fontSize={text.fontSize}
                          fill={text.fill}
                        /> 
                    ))}
                  </Layer>
            </Stage> 
          ))
      } 

      <Toaster/>
 
    </div>
  );
};

export default Dashboard; 