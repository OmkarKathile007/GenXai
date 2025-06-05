"use client"

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import SpinnerLoad from '@/components/SpinnerLoad';
import {GoogleGenerativeAI,HarmCategory,  HarmBlockThreshold} from "@google/generative-ai";

const GenAI = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loader, setLoader] = useState(false);
    const [displayQuiz, setDisplayquiz] = useState(false);
    const [hide, setHidden] = useState("");


const  generateAns=async()=> {
    setLoader(true);
    setAnswer("loading");
    console.log("📝 About to POST, text state:", JSON.stringify(question));

    if (!question.trim()) {
      console.warn("No text to send!");
      return;
    }
    // var res1='';
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/roadmap`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
     
      const text1 = data.candidates?.[0]?.content?.parts?.[0]?.text;
   
      console.log("🟢 Server responded with:", text1);
      setAnswer(text1 || "No answer returned.");
    } catch (err) {
      console.error("🛑 Error generating answer:", err);
      setAnswer("Error: " + err.message);
    }

    
    // Simulate delay for modern feel and UX
    setTimeout(() => {
     
      setLoader(false);
      setDisplayquiz(true);
      setHidden("hidden");
    }, 3000);
  }




    const downloadQuiz = () => {
        const element = document.createElement("a");
        const file = new Blob([answer], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "roadmap.txt"; // You can use .docx for Word document
        document.body.appendChild(element); 
        element.click();
        document.body.removeChild(element); 
    };

    return (
        <>
            <div className='min-w-full bg-black h-full'>
                {loader ? (
                    <div>
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className={`w-full bg-black h-screen flex flex-col items-center gap-4 ${hide}`}>
                        <h1 className='text-white tracking-wider text-5xl font-sans font-bold mt-56'>DISCUSS ABOUT YOUR GOAL</h1>
                        <p>Discuss what you want to achieve in next 6 months </p>
                        <p></p>
                        <textarea
                            className='w-4/5 bg-transparent p-6 border-2 border-white text-white'
                            value={question}
                            placeholder='discuss here what you want to achieve in 6 months'
                            onChange={(e) => { setQuestion(e.target.value) }}
                            cols="30"
                            rows="10"
                        ></textarea>
                        <button
                            className='rounded-md w-1/3 my-0 mx-auto p-4 bg-sky-400 text-white'
                            onClick={generateAns}
                        >
                            Generate Roadmap
                        </button>
                    </div>
                )}

                <div className=' w-full md:min-w-full flex items-center justify-self-center'>
                    {displayQuiz && (
                        <div className='w-full flex flex-col justify-center'>
                            <pre className='rounded-lg mt-10  text-lg text-lime-400'>{answer}</pre>
                            <button
                                className='mt-4 w-1/2 px-4 py-2 m-auto bg-green-600 text-white rounded-md'
                                onClick={downloadQuiz}
                            >
                                Download Roadmap
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GenAI;


