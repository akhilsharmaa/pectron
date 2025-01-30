import requests
import json

# searching from https://serper.dev/playground api provider. 
def imageSearchOnSerper(query: str):
    """ Seach images and return some images from the google search"""
     
    url = "https://google.serper.dev/images"

    payload = json.dumps({
        "q": query
    })
    
    headers = {
        'X-API-KEY': '855664a0927de766b7c21dd7a7069436c8ff4944',
        'Content-Type': 'application/json'
    }
 
    response = requests.request("POST", url, headers=headers, data=payload)
    result = json.loads(response.text) 
    images = result["images"]; 
    
    return images[:10]; 
     
def search_image(query: str):
    return imageSearchOnSerper(query=query);
