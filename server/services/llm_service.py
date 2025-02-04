from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_ollama.llms import OllamaLLM
from langchain.callbacks.base import BaseCallbackHandler
from fastapi.responses import StreamingResponse
from langchain.schema import LLMResult
from ..utils.stream_handler import CustomStreamingCallbackHandler
from typing import AsyncGenerator
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.schema.runnable import RunnableParallel, RunnableLambda


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
            yield "data: [DONE]\n\n"  # Si gnal the end of the stream
 
     
    description = ChatPromptTemplate.from_messages(
    [  
        ("system", """you are very interlligent assitant,
                        you give deep knowledge about everything user asks,
                        but not more that 300 words, you try to describe every aspect
                        of the topic user ask.""" ),
        ("user", "describe me a the topic '{topic}' in detail"),
    ])
     
    formatting = ChatPromptTemplate.from_messages(
    [  
        ("system", """You are an formator assistant,
                    you just format the content user give to specific way, 
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
                                        - 'EEE' at end of every component.""" ),
        ("user", "CONTENT:\n '{topic}'"),
    ])
    
         
    llm = OllamaLLM(
        model="llama3.2",  
    )
 
    model = OllamaLLM(
        model="llama3.2",
        streaming=True,
        callbacks=[DirectStreamingCallbackHandler()],
    )
 

    chain = description | llm | formatting | model     

    # Run model and yield tokens
    async for token in chain.astream(message): 
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
    