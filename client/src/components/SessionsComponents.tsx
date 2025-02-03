import { useState, useEffect} from 'react' 
import { BASE_URL } from '../config'

export const SessionsComponents = () => {

    const [isLoading, setLoading] = useState(false);
    const [sessionComponents, setSessionComponents] = useState([]);


    const getAllSession = async () => {

        try { 
            
            setLoading(true);
            
            const token = localStorage.getItem("token");

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await fetch(`${BASE_URL}/session/getall`, requestOptions); 
            const result = await response.json(); 
            
            console.log(result); 
            setLoading(false);

            // // After API call, update state
            // setKonvaComponents((prev) => [...prev]); 
            
        } catch (err) {
            setLoading(false);
            console.error(err); 
        }

        setLoading(false);
    }
    
    useEffect(() => {
        getAllSession();
    }, []);

    return (
        <div>
            {
                isLoading ? "Loading..." : 
                <div>
                    {
                        <p>{sessionComponents}</p>
                    }
                </div>
            }
        </div> 
    )
}
 