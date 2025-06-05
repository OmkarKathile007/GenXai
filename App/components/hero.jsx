"use client"
import React, { useEffect,useRef } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
function HeroSection() {
   
    

  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
        <div className='space-y-6 text-center'>
            <div className='space-y-6 mx-auto'>
                <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title'>
                      One Platform Endless 
                    <br/>
                    <span>AI Possibilities</span> 
                </h1>
                <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                No more searching everywhere get instant access to the most powerful AI tools
                </p>
            </div>

            <div className='flex justify-center space-x-4'> 
                <Link href='/onboarding'>
                  <Button size="lg" className="px-8"> Get Started</Button>
                </Link>
                
            </div>
            
        </div>
    </section>
  )
}

export default HeroSection