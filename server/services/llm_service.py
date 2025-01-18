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
        SystemMessage(content="You are eddin, an assistant. Always respond in 30-40 words with 2-3 precise points."),
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