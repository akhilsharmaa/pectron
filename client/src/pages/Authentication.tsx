import { useState } from 'react' 
import { Button } from "@/components/ui/button" 
import '../App.css' 
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const Authentication = () => {
 
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
                <Button className='w-full' >LOGIN</Button>
        </TabsContent>
        
        <TabsContent value="password">
                <CardHeader>
                        <CardTitle className='text-3xl'>Register</CardTitle>
                        <CardDescription>Welcome back to the pectron</CardDescription>
                </CardHeader>
                <CardContent> 
                </CardContent>
                    <Input className='mt-2'
                        placeholder='Username'>
                    </Input>
                    <Input className='mt-2'
                        placeholder='Email'>
                    </Input>
                    <Input className='mt-2'
                        type='password'
                        placeholder='Password'/>
                <CardFooter> 
                </CardFooter>
                <Button className='w-full' >Register</Button>
        </TabsContent>
    </Card>
</Tabs>

    </div>
  );
};

export default Authentication; 