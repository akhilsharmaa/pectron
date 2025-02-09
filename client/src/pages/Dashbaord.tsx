import { useState, useEffect,} from 'react'
import { Stage, Layer, Text, Image as KonvaImage } from 'react-konva';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import '../App.css'
import useImage from 'use-image';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {BASE_URL} from "../config"
import Autoplay from "embla-carousel-autoplay"
import { Carousel,CarouselContent, CarouselItem} from "@/components/ui/carousel"; 
import { type CarouselApi } from "@/components/ui/carousel"
import {getAllStringContent } from "../utils/tools" 
import {Navbar } from "../components/Navbar"
import {SessionsComponents } from "../components/SessionsComponents"
import {RenderKonvaImage } from "../components/ui/RenderKonvaImage"
import { saveKonvaComponentsJson } from '@/utils/session';
import { useLocation } from 'react-router-dom';
import { getSessionBody } from '@/utils/getSessionBody';


const CANVAS_HEIGHT = 1080/2; 
const CANVAS_WIDTH  = 1920/2; 
const FONTSIZE  = 22; 
const CAVASMARGIN = 80; 

const Dashboard = () => {

  const [question, setQuestion] = useState("Tourism in kolkata"); // State for user input
  const [isGenerating, setIsGenerating] = useState(false); // State to disable button while generating
  const [currentParagraph, setCurrentParagraph] = useState(""); // State to disable button while generating
  const [konvaComponents, setKonvaComponents] = useState([]); 
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [fullSceenMode, setFullSceenMode] = useState(false);
  
  
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
 
  const location = useLocation();

  let keyCounter = 0;
  let canAddNewPage = true; 

  const addSessionIfProvided  = async () => {

      const queryParams = new URLSearchParams(location.search);
      const sessionId:string = queryParams.get('sessionId');
      const result = await getSessionBody({"sessionId": sessionId});
 

      if(result.length){
          setFullSceenMode(true);
      } 

      setKonvaComponents(result);

  }

  useEffect(() => {
    addSessionIfProvided();
  }, []);


  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  useEffect(() => { 
      addNewImageToLastPage(); 
      // console.log("count:", count, " current:", current, "currentParagraph:", currentParagraph);
  }, [totalPageCount])



  const addTextComponent = () => { 
    
    setKonvaComponents((prev) => {
        // console.log("konvaComponent: ", prev); 

        const updatedComponents = [...prev];

        // Clone the previous components to avoid mutating state
        const lastComponent: {"texts": Array<
          {
            "id": string, 
            "x": number, 
            "y": number,
            "text": string, 
            "width": number, 
            "fontSize": number, 
            "fill": string
          }>, 
          "image": string
        } = updatedComponents[updatedComponents.length - 1]; 
        const lastPy = lastComponent.texts[lastComponent.texts.length-1]?.y ?? 0; 
 
        
        const newTextComponent = {
            id: keyCounter++,
            x: CAVASMARGIN,  
            y: lastPy + 36, // Random y position
            text: ``,
            width: `${CANVAS_WIDTH/2}`, 
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
        
      const updatedComponents:Array<{"texts": Array<
        {
          "id": string, 
          "x": number, 
          "y": number,
          "text": string, 
          "width": number, 
          "fontSize": number, 
          "fill": string
        }>, 
        "image": string
      }> = [...prev];

      // Clone the previous components to avoid mutating state
      const lastComponent = updatedComponents[updatedComponents.length - 1]; 

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
 
  const addNewStageComponent = () => {
 
    // changeFontOfFirstComponent(); 

    setKonvaComponents((prev) => {
        const update = [...prev, {"texts": []}];
        setTotalPageCount((prev) => prev+1); 
        return update; 
    }); 
  }

  const addNewImageToLastPage = async () => {
    
    if (konvaComponents.length >= 2) {

        const lastComponent:{
                  "image":string, 
                  "texts": Array<{"text": string}>
                } = konvaComponents[konvaComponents.length - 2];

        const totalTextContent = getAllStringContent(lastComponent.texts);
        
        try { 
  
            const token = localStorage.getItem("token");

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "content": totalTextContent,  
                  }
                ),
            };

            const response = await fetch(`${BASE_URL}/llm/fetchimage`, requestOptions); 
            const result = await response.json(); 

            // console.log("result: ", result[0].imageUrl);

            lastComponent.image = result[0].imageUrl; 

            console.log(lastComponent);
            

            if (response.status === 200) { 
                toast("Registered successfully.", {});
            } else {
                toast("Failed to register", {
                    description: `${result.detail}`,
                });
            }

            // After API call, update state
            setKonvaComponents((prev) => [...prev]); 

        } catch (err) {
            console.error(err);
            toast("Something went wrong! Please try again later", {
                description: `Failed to register!`,
            });
        }
    }
};
 

  // Function to handle the "Ask" button click
  const handleAsk = () => { 

      if (!question.trim()) {
        alert("Please enter a question.");
        return;
      } 

      const token = localStorage.getItem("token");

      const eventSource = new EventSource(
        `${BASE_URL}/llm/ask?question=${encodeURIComponent(question)}&token=${token}`
      );
       
      setIsGenerating(true); // Disable button 
   
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
      console.error("Error with the SSE connection: ", error); 

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

  const handleSaveSession = () => {
    saveKonvaComponentsJson(question, konvaComponents);
  }
 
  const toggleViewMode = () => {
    setFullSceenMode(prev => !prev);
  }

  return (
    <div>
      {!fullSceenMode && 
        <div>
          <Navbar />
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <img src="./logo.png" className="h-12" alt="Flowbite Logo" />
            <h1>Pectron</h1> 
          </div>

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
          <SessionsComponents/>
        </div>
      }
      <Carousel setApi={setApi} 
            plugins={[
              Autoplay({
                delay: 100, 
                stopOnLastSnap: true
              },),
            ]}
            >
        <CarouselContent>
            { konvaComponents.map((pages: 
                    {"texts": Array<
                      {
                        "id": string, 
                        "x": number, 
                        "y": number,
                        "text": string, 
                        "width": number, 
                        "fontSize": number, 
                        "fill": string
                      }>, 
                      "image": string
                    }, ) => (
              <CarouselItem>
              <Stage width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  key={`stage-${keyCounter++}`}
                  className="stage-canvas"> 
                    <Layer >
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

                      {pages.image && 
                          <RenderKonvaImage
                            imageUrl={pages.image}
                            CANVAS_HEIGHT={CANVAS_HEIGHT}
                            CANVAS_WIDTH={CANVAS_WIDTH}
                          />
                      }
                    </Layer>
                </Stage> 
                </CarouselItem> 
              ))
            } 

        </CarouselContent>
      </Carousel>
      <button 
          type="button" 
          className="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          onClick={handleSaveSession}>
        SAVE
      </button>
      <Toaster/>
      
      <button 
          type="button" 
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          onClick={toggleViewMode}>
        View
      </button>

    </div>
  );
};

export default Dashboard;