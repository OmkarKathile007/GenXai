"use client"

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import SpinnerLoad from '@/components/SpinnerLoad';

const GenAI = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loader, setLoader] = useState(false);
    const [displayQuiz, setDisplayquiz] = useState(false);
    const [hide, setHidden] = useState("");

    async function generateAns() {
        setLoader(true);
        setAnswer("loading");

        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
            method: "post",
            data: {
                contents: [
                    { parts: [{ text: `"I want a highly detailed 6-month roadmap to achieve [specific goal]. The plan should include a strict daily schedule with hour-by-hour utilization, covering learning, practice, revision, mindset growth, and practical application. It must ensure continuous improvement, include weekly and monthly milestones, and guarantee success if followed rigorously. Make it as detailed and structured as possible."

Key Points to Include in the Plan:
Daily Hour-by-Hour Schedule

Learning new concepts
Hands-on practice
Revision sessions
Breaks and relaxation
Mindset growth activities
Weekly and Monthly Milestones

Specific learning goals
Practical applications and projects
Self-assessment and mock tests
Continuous Growth & Mindset Building

Reflection on progress
Adaptation based on weaknesses
Problem-solving challenges
Revision & Feedback Loop

Daily and weekly revision plans
Self-testing and improvement strategy
Peer discussions or mentorship about the following topic: ${question}. ` }] },
                ]
            }
        });

        setTimeout(() => {
            setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
            setLoader(false);
            setDisplayquiz(true);
            setHidden("hidden");
        }, 3000);
    }

    const downloadQuiz = () => {
        const element = document.createElement("a");
        const file = new Blob([answer], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "quiz.txt"; // You can use .docx for Word document
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
                            <pre className='rounded-lg   text-lg text-lime-400'>{answer}</pre>
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


