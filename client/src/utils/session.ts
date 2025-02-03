import { json } from "node:stream/consumers";
import { BASE_URL } from "../config";
import { toast } from "sonner"

export const saveKonvaComponentsJson = async (title : string, jsonBody) => {

    try { 
  
        const token = localStorage.getItem("token");

        const body = {
            "sessionId": "string", 
            "title": title, 
            "body": JSON.stringify(jsonBody)
        }

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