// import React, { useEffect } from 'react'
"use client"
import React, { useEffect, useState } from 'react';

const SpinnerLoad = () => {
     
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let c = 0;
    const interval = setInterval(() => {
      setCounter(c);
      c++;
      if (c > 100) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    
       <div className="loading-page flex  justify-center w-screen h-screen bg-black ">
       <div className="counter text-center relative max-w-screen-md mt-64 flex flex-col gap-6">
         <p className="text-pink-500 text-4xl font-thin">Generating Your Roadmap Please wait a moment</p>
         <h1 className="text-white mt-9 text-6xl mt-[-10px]">{counter}%</h1>
         <hr className="w-full h-1 bg-pink-500 border-none mt-4" style={{ width: `${counter}%` }} />
       </div>
      </div>
        

  )
}

export default SpinnerLoad

