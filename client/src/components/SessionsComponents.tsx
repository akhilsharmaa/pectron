import { useState, useEffect} from 'react' 
import { BASE_URL } from '../config'
import { SessionCard } from './ui/SessionCard';

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
             
            setLoading(false);

            // // After API call, update state
            setSessionComponents(result); 
            console.log(sessionComponents);
            

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
                </div>
                
            }
            
            <div  className="grid grid-cols-2 md:grid-cols-3 gap-4">
            { 
                sessionComponents.map((session) => (
                    SessionCard(session)
                ))
            }
            </div>
        </div> 
    )
}
 