"use client";

import React, { useState } from 'react';
import axios from 'axios';
import SpinnerLoad from '@/components/SpinnerLoad'; // Ensure this path is correct for your project
import ProtectedRoute from '@/components/ProtectedRoute';

const GenAI = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loader, setLoader] = useState(false);
    const [displayQuiz, setDisplayquiz] = useState(false);
    const [hide, setHidden] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    // Helper to extract clean text from raw Gemini JSON
    const extractTextFromRawResponse = (rawString) => {
        try {
            const parsed = JSON.parse(rawString);
            return parsed.candidates?.[0]?.content?.parts?.[0]?.text || "No text found.";
        } catch (e) {
            return rawString;
        }
    };

    const pollJobStatus = async (jobId) => {
        const pollInterval = setInterval(async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/job/${jobId}`
                );

                console.log("Polling...", data.status);

                if (data.status === "COMPLETED") {
                    clearInterval(pollInterval);
                    const cleanRoadmap = extractTextFromRawResponse(data.responseData);
                    setAnswer(cleanRoadmap);
                    setLoader(false);
                    setDisplayquiz(true);
                    setHidden("hidden");
                } else if (data.status === "FAILED") {
                    clearInterval(pollInterval);
                    setAnswer("Error: Task failed on server.");
                    setLoader(false);
                    alert("Job Failed. Please try again.");
                } else {
                    setStatusMessage(`Status: ${data.status}...`);
                }
            } catch (err) {
                clearInterval(pollInterval);
                console.error("Polling Error:", err);
                setLoader(false);
            }
        }, 2000); // Check every 2 seconds
    };

    const generateAns = async () => {
        if (!question.trim()) {
            console.warn("No text to send!");
            return;
        }

        setLoader(true);
        setAnswer("");
        setStatusMessage("Queueing...");

        try {
            // 1. Submit Job
            // Note: Ensure your backend prompt expects {{topic}} or simply uses the input as the prompt
            // Based on previous steps, the controller might expect "topic" and "duration" or just "question".
            // Adjusting payload to match your likely controller expectation:
            const payload = { question: question }; 

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/roadmap`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            // 2. Start Polling
            if (data.jobId) {
                setStatusMessage("Generating Roadmap...");
                pollJobStatus(data.jobId);
            } else {
                throw new Error("No Job ID received");
            }
        } catch (err) {
            console.error("🛑 Error generating answer:", err);
            setAnswer("Error: " + err.message);
            setLoader(false);
        }
    };

    const downloadQuiz = () => {
        const element = document.createElement("a");
        const file = new Blob([answer], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "roadmap.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <>
        <ProtectedRoute>
            <div className='min-w-full bg-black h-full min-h-screen text-white'>
                {loader ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <SpinnerLoad />
                        <p className="mt-4 text-sky-400 animate-pulse">{statusMessage}</p>
                    </div>
                ) : (
                    <div className={`w-full flex flex-col items-center gap-4 ${hide}`}>
                        <h1 className='tracking-wider text-5xl font-sans font-bold mt-32 text-center'>DISCUSS YOUR GOAL</h1>
                        <p className="text-gray-400">Describe what you want to achieve in the next 6 months</p>
                        
                        <textarea
                            className='w-4/5 md:w-1/2 bg-transparent p-6 border-2 border-white rounded-lg focus:border-sky-400 outline-none transition-all'
                            value={question}
                            placeholder='e.g., I want to become a Senior Java Developer, master System Design, and learn Cloud deployment.'
                            onChange={(e) => { setQuestion(e.target.value) }}
                            rows="8"
                        ></textarea>
                        
                        <button
                            className='rounded-md w-4/5 md:w-1/3 p-4 bg-sky-500 hover:bg-sky-600 transition-colors text-white font-bold tracking-wide'
                            onClick={generateAns}
                        >
                            Generate Roadmap
                        </button>
                    </div>
                )}

                <div className='w-full flex items-center justify-center p-10'>
                    {displayQuiz && (
                        <div className='w-full md:w-3/4 flex flex-col justify-center animate-in fade-in duration-700'>
                            <h2 className="text-2xl font-bold text-sky-400 mb-4 border-b border-gray-700 pb-2">Your Personalized Roadmap</h2>
                            <pre className='rounded-lg bg-gray-900 p-6 text-lg text-lime-400 whitespace-pre-wrap font-mono border border-gray-800 shadow-2xl overflow-x-auto'>
                                {answer}
                            </pre>
                            <button
                                className='mt-6 px-8 py-3 m-auto bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition-colors'
                                onClick={downloadQuiz}
                            >
                                Download Roadmap (.txt)
                            </button>
                        </div>
                    )}
                </div>
            </div>
            </ProtectedRoute>
        </>
    );
};

export default GenAI;