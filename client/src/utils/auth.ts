import { BASE_URL } from "../config";

export const isAuthenticated = async () => {
    
    try{ 
            const token = localStorage.getItem("token");

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({}),
            }; 
        
            const response = await fetch(`${BASE_URL}/users/me`, requestOptions);  

            if(response.status == 200){ 
                return true;
            } 

    }catch(err){
        console.error(err); 
    }

    return false; 
}