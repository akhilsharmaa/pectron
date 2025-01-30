from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_ollama.llms import OllamaLLM
from langchain.callbacks.base import BaseCallbackHandler
from fastapi.responses import StreamingResponse
from langchain.schema import LLMResult
from ..utils.stream_handler import CustomStreamingCallbackHandler
from typing import AsyncGenerator

def on_llm_new_token(token: str): 
    print(token, end=''); 
    yield token
    
def on_complete_function(): 
    print("......Stream end"); 
 
# Async generator for token streaming
async def token_stream_handler(message: str) -> AsyncGenerator[str, None]:
    """
    Async generator that streams tokens directly from the model's callback.
    """
    # Callback handler to stream tokens
    class DirectStreamingCallbackHandler(BaseCallbackHandler):
        async def on_llm_new_token(self, token: str, **kwargs):
            print(token);
            yield f'data: {token}\n\n'  # Stream token in event-stream format

        def on_llm_end(self, result: LLMResult, **kwargs):
            yield "data: [DONE]\n\n"  # Signal the end of the stream

    # Model setup
    model = OllamaLLM(
        model="llama3.2",
        streaming=True,
        callbacks=[DirectStreamingCallbackHandler()],
    )

    # Define messages
    messages = [
        SystemMessage(
                content="""You are eddin an presentation content generator, 
                            you generate 8-9 page of presentation by default, 
                            strictly: you have to add --- (three -) in start of every page by, 
                            (this will help me to understand that new page is starting,  
                            each page contents 
                                (
                                  [TITLE 2-5 word], 
                                  [DESCRIPTION: 10-20 words], 
                                  [BODY 20-30 words], 
                                  [FOOTER 5-10 words] 
                                ),  
                            you generate the content on a particular topic in markdown format, 
                            you don't generate any other format then below describe (not even extra symbols), 
                            you don't generate any other thing like (here is your presentation...) 
                            you don't generate more then 30 words per component.
                            here is a example of how you will generate content: 
                            RESPONSE: 
                                --- 
                                SSS [This is title] EEE 
                                SSS [This is the short decription] EEE  
                                SSS [this is the body of the **content** which will be in markdown format] EEE
                                SSS [this is short footer] EEE 
                                
                                --- 
                                SSS [This is title] EEE 
                                SSS [This is the short decription] EEE  
                                SSS [this is the body of the **content** which will be in markdown format] EEE
                                SSS [this is short footer] EEE 
                                .
                                .
                                .
                                also make sure to add: 
                                    - 'SSS' starting of every component 
                                    - 'EEE' at end of every component.
                        """
            ),
        HumanMessage(content=message),
    ]

    # Run model and yield tokens
    async for token in model.astream(messages): 
        yield f"data: {token}\n\n"
        
        
import time

# Using yield
def use_yield(n):
    for i in range(1, n):
        yield f'data: {i}\n\n'
        time.sleep(2); 


def ask_question(question: str): 
                 
    return StreamingResponse(
        token_stream_handler(question),
        media_type="text/event-stream",
    )
    