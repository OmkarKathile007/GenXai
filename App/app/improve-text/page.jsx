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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";

const InterviewPage = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Improved Query copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📝 About to POST, text state:", JSON.stringify(text));

    if (!text.trim()) {
      console.warn("No text to send!");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      // Expecting: { candidates: [ { content: { parts: [ { text: "…" } ] } } ] }
      const text1 = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log("🟢 Server responded with:", text1);
      setCode(text1 || "No answer returned.");
    } catch (err) {
      console.error("🛑 Error generating answer:", err);
      setCode("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-2xl space-y-8">
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded shadow-md flex flex-col gap-4"
        >
          <p className="text-white text-center text-xl">Input your response here</p>
          <Textarea
            className="w-full min-h-[150px] p-3 rounded border focus:outline-none"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Input your query"
            name="text"
          />
          <button
            type="submit"
            className="w-full sm:w-1/2 m-auto bg-blue-600 text-white py-2 rounded"
          >
            Improve
          </button>
        </form>

        {/* Output Section */}
        <div className="border p-4 rounded shadow-md flex flex-col gap-4">
          <p className="text-white text-center text-xl">Your Improved Text Goes Here</p>
          <Textarea
            className="w-full min-h-[150px] p-3 rounded border focus:outline-none"
            name="text"
            value={code}
            readOnly
          />
          <Button className="px-6 flex items-center gap-2" onClick={copyToClipboard}>
            <ClipboardCopy className="w-5 h-5" /> Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
