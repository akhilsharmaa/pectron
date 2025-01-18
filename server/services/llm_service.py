from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_ollama.llms import OllamaLLM
from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema import LLMResult
from ..utils.stream_handler import CustomStreamingCallbackHandler
 
def on_llm_new_token(token: str): 
    print(token, end=''); 
    
def on_complete_function(): 
    print("......Stream end"); 
 
def ask_question(message: str): 
                
    model = OllamaLLM(
            model="llama3.2", 
            streaming=True,
            callbacks=[
                CustomStreamingCallbackHandler(
                        callback_function=on_llm_new_token,
                        on_complete_function=on_complete_function
                    )
                ]
        )

    messages = [
        SystemMessage(content="You are eddin a assistant, you always respose in maximum 30-40 words with 2 three on point"), 
        HumanMessage(content=message), 
    ]

    # Invoke the model with messages
    result = model.invoke(messages) 

