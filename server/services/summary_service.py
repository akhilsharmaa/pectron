from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_ollama.llms import OllamaLLM
from langchain.callbacks.base import BaseCallbackHandler
from fastapi.responses import StreamingResponse
from langchain.schema import LLMResult 
from ..config import MODEL_NAME
  
def get_summary(message: str):
    """
    Use to convert very very long sentences to one-three word. 
    """ 
    
    model = OllamaLLM(
        model=MODEL_NAME
    )

    # Define messages
    messages = [
        SystemMessage(
                content=""" You are helpfull assistant which give 
                            very very short summary about what ever long content user give, 
                            you summary should be only 1 to 5 word, no any other text. 
                            your result will be directly going to interact 
                            with a system more precise (going to serch on google to fetch 
                            image realted to what ever user typed.)  
                        """
            ),
        HumanMessage(content=message),
    ]

    result = model.invoke(messages); 
    return result; 