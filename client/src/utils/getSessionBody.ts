import { BASE_URL } from "../config";

export const getSessionBody = async (props: {"sessionId": string}) => {
  
    try{
            const token = localStorage.getItem("token");

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({}),
            }; 
        
            const response = await fetch(`${BASE_URL}/session/getsessioncontent?sessionId=${props.sessionId}`, requestOptions);  
            const result = await response.json();
            
            if(response.status == 200){ 
                return JSON.parse(result.body);
            }
            return [];
            
    }catch(err){
        console.error(err); 
    }

    return []; 
}