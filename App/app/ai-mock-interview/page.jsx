'use client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
//import Router from 'next/navigation'
import { useRouter } from 'next/navigation'




const page = () => {

    const router=useRouter();
    const AI_Interview = async (e) => {

    e.preventDefault();
    ;
    router.push('/ai-mock-interview/interview');

    }
  return (
    <div className='w-full relative top-20  flex flex-col items-center justify-center '>
    <div className=' w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
       <h1 className='text-5xl font-bold p-4'>Welcome to AI Interview Prep</h1>
         <p className='text-lg p-4'>Get ready for your next interview with our AI-powered mock interview system. Practice, get feedback, and improve your skills.</p>
    </div>
    <Card className='w-1/3 mt-32 p-6  shadow-lg'>
          
          <form onSubmit={AI_Interview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Enter Your Name
                      </label>
                      <Input
                        type="text"
                        
                        placeholder="your name"
                        className="mt-1 "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Your Skills
                      </label>
                      <Input
                        type="text"
                       
                        
                        placeholder="Enter your skills"
                        className="mt-1 "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                       job description
                      </label>
                      <Input
                        type="text"
                       
                        placeholder="Enter job description"
                        className="mt-1 "
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Mock Interview
                    </Button>
                    
                 
                  </form>
                  
                  </Card>
    </div>
  )
}

export default page