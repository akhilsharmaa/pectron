from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema import LLMResult


class CustomStreamingCallbackHandler(BaseCallbackHandler):
    def __init__(self, callback_function, on_complete_function):
        self.callback_function = callback_function  
        self.on_complete_function = on_complete_function  

    def on_llm_new_token(self, token: str, **kwargs): 
        self.callback_function(token)

    def on_llm_end(self, result: LLMResult, **kwargs):
        self.on_complete_function() 