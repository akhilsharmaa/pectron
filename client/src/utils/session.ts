import { BASE_URL } from "../config";
import { toast } from "sonner"

export const saveKonvaComponentsJson = async (title : string, jsonBody: object) => {

    const generateRandomSessionId = () => {
        return String(Math.floor(100000 + Math.random() * 900000)); 
    }

    try { 
  
        const token = localStorage.getItem("token");

        const body = {
            "sessionId": generateRandomSessionId(), 
            "title": title, 
            "body": JSON.stringify(jsonBody)
        }

        console.log("jsonBody::: ", jsonBody);
        

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
        };

        const response = await fetch(`${BASE_URL}/session/save`, requestOptions); 
        const result = await response.json(); 
 
        console.log(result);

        if (response.status === 200) { 
            toast("Session saved Successfully. ", {});
        } else {
            toast("Failed to save", {
                description: `${result.detail}`,
            });
        }

    } catch (err) {
        console.error(err); 
    }

}