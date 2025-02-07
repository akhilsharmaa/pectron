import { useState, useEffect } from "react"
import { BASE_URL } from "../config";

export const Navbar = () => {

    const [credits, setCredits] = useState(0); 

    useEffect(()=> {
        fetchCreditPoints()
    }, []);

    const fetchCreditPoints = async () => {
        
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
                const result = await response.json();
                console.log(result);

                if(response.status == 200){  
                    setCredits(result.credits);
                } 
    
        }catch(err){
            console.error(err); 
        }
    } 
    
  return (
    <nav className="fixed top-0 border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
        <a href="/app" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./logo.png" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                Pectron
            </span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
 
            <li>
                <button type="button" className="text-white text-1xl  bg-gray-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800  rounded-full ">
                    Credits: {credits}
                </button>
            </li>   
        </ul>
        </div>

    </div>
        <hr />
    </nav>
  )
}
