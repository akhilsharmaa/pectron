import { useState } from 'react' 
import { Button } from "@/components/ui/button" 
import '../App.css' 
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'
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
 
      const register = async () => {

          const body = {
              "username": "io",
              "email": "akhilsharma3333333@gmail.com",
              "first_name": "Akhil",
              "last_name": "Sharma",
              "password": "asdfasdfadsfasdf"
          }

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          };

          fetch(`${BASE_URL}/users/register`, requestOptions)
              .then(response => response.json())
              .then(data => {
                  console.log(data);
              });
      }


      const login = async () => { 
          
          const formData = new FormData();
          formData.append("username", "io");
          formData.append("password", "asdfasdfadsfasdf");

          const requestOptions = {
            method: 'POST', 
            body: formData
          };

          await fetch(`${BASE_URL}/token`, requestOptions)
              .then(response => response.json())
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
                          <Input className='mt-4'
                              placeholder='Email'>
                          </Input>
                          <Input className='mt-2'
                              type='password'
                              placeholder='Password'/>
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
                              placeholder='Username'>
                          </Input>
                          <Input
                              id='email-input-register' 
                              className='mt-2'
                              type='email'
                              placeholder='Email'>
                          </Input>
                          <Input
                              id='firstname-input-register' 
                              className='mt-2'
                              type='text'
                              placeholder='First Name'/>
                          <Input
                              id='lastname-input-register' 
                              className='mt-2'
                              type='text'
                              placeholder='Last Name'/>
                          <Input
                              id='password-input-register' 
                              className='mt-2'
                              type='password'
                              placeholder='Password'/>
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

    </div>
  );
};

export default Authentication; 