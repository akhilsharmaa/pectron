import { useState } from 'react' 
import { Button } from "@/components/ui/button" 
import '../App.css' 
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import {BASE_URL} from "../config"


const Authentication = () => {
  
      const [username, setUsername] = useState(""); 
      const [firstname, setFirstName] = useState(""); 
      const [lastname, setLastName] = useState(""); 
      const [email, setEmail] = useState(""); 
      const [password, setPassword] = useState(""); 

      const register = async () => {

          try{

              const body = {
                  "username": username, 
                  "email": email, 
                  "first_name": firstname,
                  "last_name": lastname,
                  "password": password,
              }

              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              };
 
              const response = await fetch(`${BASE_URL}/users/register`, requestOptions); 
              const result = await response.json(); 

              console.log(result);  

              if(response.status == 200){

                toast("Failed to register",  {
                  description: `${result.detail}`
                })
                
              }else {
                toast("Failed to register",  {
                  description: `${result.detail}`
                })
              }

          }catch(err){
              console.error(err);
              toast("Something went wrong! Please try again later",  {
                description: `fail to register!`
              })
          }
      }


      const login = async () => { 
          
          const formData = new FormData();
          formData.append("username", username);
          formData.append("password", password);

          const requestOptions = {
            method: 'POST', 
            body: formData
          };

          await fetch(`${BASE_URL}/token`, requestOptions)
              .then(response => {
                  toast("Success Login", {
                    description: "enjoy creating the presentations..."
                  })
              })
              .then(data => {
                  console.log(data);

              });
    }



  return (
    
    <div>
      <Tabs defaultValue="account" className="w-[400px] bg-">
        <TabsList className='w-full pb-2 pt-2'>
          <TabsTrigger className='w-full' value="account">Login</TabsTrigger>
          <TabsTrigger className='w-full' value="password">Register</TabsTrigger>
        </TabsList>
          <Card  className='p-10 mt-2'>
              <TabsContent value="account">
                      <CardHeader>
                          <CardTitle className='text-3xl'>Login</CardTitle>
                          <CardDescription>Welcome back to the pectron</CardDescription>
                      </CardHeader>
                      <CardContent> 
                      </CardContent>
                       
                          <Input
                              id='email-input-register' 
                              className='mt-2'
                              type='email'
                              placeholder='Email'
                              onChange={(e) => setEmail(e.target.value)}>
                          </Input> 
                          <Input
                              id='password-input-register' 
                              className='mt-2'
                              type='password'
                              placeholder='Password'
                              onChange={(e) => setPassword(e.target.value)}/>

                      <CardFooter> 
                      </CardFooter>
                      <Button 
                        className='w-full'
                        onClick={login} >
                        Login
                      </Button>
              </TabsContent>
              
              <TabsContent value="password">
                      <CardHeader>
                              <CardTitle className='text-3xl'>Register</CardTitle>
                              <CardDescription>Welcome back to the pectron</CardDescription>
                      </CardHeader>
                      <CardContent> 
                      </CardContent>
                          <Input
                              id='username-input-register' 
                              className='mt-2'
                              placeholder='Username'
                              onChange={(e) => setUsername(e.target.value)}>
                          </Input>
                          <Input
                              id='email-input-register' 
                              className='mt-2'
                              type='email'
                              placeholder='Email'
                              onChange={(e) => setEmail(e.target.value)}>
                          </Input>
                          <Input
                              id='firstname-input-register' 
                              className='mt-2'
                              type='text'
                              placeholder='First Name'
                              onChange={(e) => setFirstName(e.target.value)}>
                            </Input>
                          <Input
                              id='lastname-input-register' 
                              className='mt-2'
                              type='text'
                              placeholder='Last Name' 
                              onChange={(e) => setLastName(e.target.value)}>
                            </Input>
                          <Input
                              id='password-input-register' 
                              className='mt-2'
                              type='password'
                              placeholder='Password'
                              onChange={(e) => setPassword(e.target.value)}/>
                      <CardFooter> 
                      </CardFooter>
                      <Button 
                        className='w-full'
                        onClick={register} >
                        Register
                      </Button>
              </TabsContent>
          </Card>
      </Tabs>
      <Toaster/>

    </div>
  );
};

export default Authentication; 