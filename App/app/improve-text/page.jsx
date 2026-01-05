// "use client";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { ClipboardCopy } from "lucide-react";
// import {GoogleGenerativeAI,HarmCategory,  HarmBlockThreshold} from "@google/generative-ai";

// const InterviewPage = () => {
//   const [text, setText] = useState("");
//   const [code, setCode] = useState("");
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(code).then(() => {
//       alert("Improved Query copied to clipboard!");
//     }).catch(err => {
//       console.error("Failed to copy: ", err);
//     });
//   };

// //   async function generateAns(e) {
// //     e.preventDefault();
// //     if (!text.trim()) return; // Prevent empty requests

// //     // setLoading(true);
// //     setCode("Loading...");

// //     try {
// //       const response = await axios.post(
// //         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
// //         {
// //           contents: [
// //             {
// //               parts: [
// //                 {
// //                   text: `Please rewrite the following text to improve its grammar and overall clarity while preserving the original meaning. Correct any punctuation, sentence structure, and word usage errors. Here is the text:${text}`,
// //                 },
// //               ],
// //             },
// //           ],
// //         }
// //       );
// //       // const apiKey = "AIzaSyADh3WJQYUNU7T1n3vtNqtPwOsxCcoud-M";
// //           // const genAI = new GoogleGenerativeAI(apiKey);
          
// //           const model = genAI.getGenerativeModel({
// //             model: "gemini-2.0-flash",
// //           });
          
// //           const generationConfig = {
// //             temperature: 1,
// //             topP: 0.95,
// //             topK: 40,
// //             maxOutputTokens: 8192,
// //             responseMimeType: "text/plain",
// //           };
// //           const chatSession = model.startChat({
// //             generationConfig,
// //             history: [
// //             ],
// //           });
        
// //           const result = await chatSession.sendMessage( `Rewrite the following text to improve its grammar and clarity while preserving its original meaning. Correct any punctuation, sentence structure, and word usage errors. Do not include any additional commentary or explanations. Your response must have exactly the same number of lines as the input text.

// // Here is the text:
// // ${text}`);
// //           //console.log(result.response.text());
      
// //           // Simulate delay for modern feel and UX
// //           // setTimeout(() => {
// //           //   setAnswer(result.response.text());
// //           //   setLoader(false);
// //           //   setDisplayquiz(true);
// //           //   setHidden("hidden");
// //           // }, 3000);
        

// //       setCode(result.response.text());
// //     } catch (error) {
// //       setCode("Error generating summary. Please try again.");
// //       console.error("API error:", error);
// //     } finally {
// //       //setLoading(false);
// //     }
// //   }

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setLoading(true);
//     // setError(null);

//     try {
//       const response = await fetch('http://localhost:8080/api/qna/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text }),
//       });
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }
//       const data = await response.json();
//       // Assuming structure: { candidates: [ { content: { parts: [ { text: '...' } ] } } ] }
//       const text1 = data.candidates?.[0]?.content?.parts?.[0]?.text;
//       // setAnswer(text || 'No answer returned.');
//       console.log(text1);
//     } catch (err) {
//       console.error(err);
//       // setError(err.message);
//       console.log("Error generating answer:", err);
//     } finally {
//       // setLoading(false);
//     }
//   }; 

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-16">
//       <div className="w-full max-w-2xl space-y-8 ">
        
//         <form
//           onSubmit={handleSubmit}
//           className="border p-4 rounded  shadow-md flex flex-col gap-4"
//         >
//           <p className="text-white text-center text-xl">
//             Input your response here
//           </p>
//           <Textarea
//             className="w-full min-h-[150px] p-3 rounded border focus:outline-none"
//             onChange={(e) => setText(e.target.value)}
//             value={text}
//             placeholder="Input your query"
//             name="text"
//           />
//           {/* <Button  type="submit" className="w-full sm:w-1/2 m-auto">
//             Improve
//           </Button> */}
//           <button   className="w-full sm:w-1/2 m-auto">
//             Improve
//           </button>
//         </form>

//         {/* Output Section */}
//         <div className="border p-4 rounded shadow-md flex flex-col   gap-4">
//           <p className="text-white text-center text-xl">
//             Your Improved Text Goes Here
//           </p>
//           <Textarea
//             className="w-full min-h-[150px] p-3 rounded border focus:outline-none"
//             name="text"
//             value={code}
//             readOnly
//           />
//           <Button
//             className="px-6 flex items-center gap-2"
//             onClick={copyToClipboard}
//           >
//             <ClipboardCopy className="w-5 h-5" /> Copy to Clipboard
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewPage;

// pages/interview.js
// // page.jsx
// -------------
// Your React/Next.js component (placed under `app/` or `pages/` depending on your setup).
// It remains almost the same—since CORS is now handled by the server, no front-end changes are needed
// other than ensuring you POST to http://localhost:8080/text.


"use client";

import React, { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Loader2, Sparkles, PenTool } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const InterviewPage = () => {
  const [inputText, setInputText] = useState("");
  const [improvedText, setImprovedText] = useState("");
  
  // Async States
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Helper to clean up Gemini's raw JSON response
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
          const cleanText = extractTextFromRawResponse(data.responseData);
          setImprovedText(cleanText);
          setLoading(false);
          setStatusMessage("Completed!");
        } else if (data.status === "FAILED") {
          clearInterval(pollInterval);
          setImprovedText("Error: Task failed on server.");
          setLoading(false);
          setStatusMessage("Failed");
        } else {
          setStatusMessage(`Status: ${data.status}...`);
        }
      } catch (err) {
        clearInterval(pollInterval);
        setImprovedText("Error polling status: " + err.message);
        setLoading(false);
      }
    }, 2000); // Check every 2 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setImprovedText("");
    setStatusMessage("Queueing...");

    try {
      // 1. Submit Job
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/text`,
        { text: inputText },
        { headers: { "Content-Type": "application/json" } }
      );

      // 2. Start Polling
      if (data.jobId) {
        setStatusMessage("Improving your text...");
        pollJobStatus(data.jobId);
      } else {
        throw new Error("No Job ID received");
      }
    } catch (err) {
      console.error("Error:", err);
      setImprovedText("Error: " + (err.message || "Unknown error"));
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(improvedText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-slate-950 text-slate-100">
      <div className="w-full max-w-3xl space-y-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3 text-white">
            <PenTool className="w-8 h-8 text-purple-500" />
            AI Text Improver
          </h1>
          <p className="text-slate-400 mt-2">Refine your answers for interviews & emails</p>
        </div>

        {/* INPUT FORM */}
        <form
          onSubmit={handleSubmit}
          className="border border-slate-800 bg-slate-900 p-6 rounded-xl shadow-lg flex flex-col gap-4"
        >
          <label className="text-slate-300 font-medium">Input your draft here</label>
          <Textarea
            className="w-full min-h-[150px] p-4 rounded-lg bg-slate-950 border-slate-700 text-white focus:border-purple-500 transition-colors"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            placeholder="e.g. I worked on java project and made api..."
            name="text"
          />
          <Button
            type="submit"
            className="w-full sm:w-1/2 m-auto bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all"
            disabled={loading || !inputText}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {statusMessage}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Improve Text
              </>
            )}
          </Button>
        </form>

        {/* OUTPUT SECTION */}
        <div className="border border-slate-800 bg-slate-900 p-6 rounded-xl shadow-lg flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <label className="text-slate-300 font-medium">Polished Version</label>
          <Textarea
            className="w-full min-h-[150px] p-4 rounded-lg bg-slate-950 border-slate-700 text-green-400 font-medium"
            name="text"
            value={improvedText}
            readOnly
            placeholder="Your improved text will appear here..."
          />
          <Button 
            className="self-end px-6 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700" 
            onClick={copyToClipboard}
            disabled={!improvedText}
          >
            <ClipboardCopy className="w-4 h-4" /> Copy
          </Button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default InterviewPage;