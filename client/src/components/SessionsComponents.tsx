import { useState, useEffect} from 'react' 
import { BASE_URL } from '../config'
import { SessionCard } from './ui/SessionCard';
import { Skeleton } from "@/components/ui/skeleton"

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
            // console.log(sessionComponents);
            

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
                isLoading &&
                <div  className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <SkeletonBox/>
                    <SkeletonBox/>
                    <SkeletonBox/>
                    <SkeletonBox/>
                    <SkeletonBox/> 
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
 
const SkeletonBox = () => {
    return (
        <div className="w-54 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Skeleton className="h-1 w-[200px] m-4 p-5" />
            <Skeleton className="h-1 w-[250px] m-4 p-5" />
        </div>
    );
}