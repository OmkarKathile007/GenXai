

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { Mic, MicOff, Brain, Wand2, Sparkles } from "lucide-react";

// // Replace with your actual Google Gemini (Text-Bison) model endpoint and API key
// const GEMINI_API_KEY = "AIzaSyCxqR3jzEUOvoOiCIN71-LmFOVySvMbO9M";
// const GEMINI_ENDPOINT =
//   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// /**
//  * Calls Google Gemini (Text-Bison) to get the next interviewer's message.
//  * @param {string} promptContent The content to send as the user's input.
//  * @returns {Promise<string>} The AI-generated response text.
//  *  prompt: {
//         // We include a system message to instruct the model to behave as an interviewer.
//         messages: [
//           {
//             author: "system",
//             content:
//               "You are an experienced technical interviewer conducting a mock interview. Ask one question at a time, wait for the user's spoken response, and then proceed to the next question. Keep the tone professional and concise.",
//           },
//           {
//             author: "user",
//             content: promptContent,
//           },
//         ],
//       },
//       // You can adjust temperature, maxOutputTokens, etc., as needed.
//       temperature: 0.7,
//       candidateCount: 1,
//       topK: 40,
//       topP: 0.95,
//  */

// async function fetchAIResponse(promptContent) {
//   try {
//     const body = {
     
//     "contents": [
//       {
//         "parts": [
//           {
//             "text":"You are an experienced technical interviewer conducting a mock interview. Ask one question at a time, wait for the user's spoken response, and then proceed to the next question. Keep the tone professional and concise."
//           }
//         ]
//       }
//     ]
  
   
//     };

//     const response = await fetch(GEMINI_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       console.error("Gemini API error:", response.statusText);
//       return "Sorry, I encountered an error. Let's try again.";
//     }

//     const data = await response.json();
//     // The generated message will be in data.candidates[0].message.content
//     const aiMessage = data.candidates?.[0]?.message?.content;
//     return aiMessage || "Sorry, I didn't get a response. Please try again.";
//   } catch (error) {
//     console.error("Error fetching AI response:", error);
//     return "Sorry, I encountered an error. Please try again.";
//   }
// }

// function AIAssistantAnimation({ isListening, isSpeaking }) {
//   return (
//     <div className="relative w-1/4">
//       <div
//         className={
//           `absolute inset-0 bg-gradient-to-b from-cyan-500 to-purple-600  blur-xl opacity-20 ` +
//           `${
//             isListening || isSpeaking ? "scale-110" : "scale-100"
//           } transition-transform duration-500`
//         }
//       />

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="relative w-full h-full">
//           <div className="w-full h-full border-4 border-cyan-400 bg-gray-800 flex items-center justify-center">
//             <Image
//               src="/images/AI_Interviewer.png"
//               alt="AI Logo"
//               fill="cover"
//               className="object-cover rounded-lg"
//             />
//           </div>
//           <div className={`absolute inset-0 border-4 border-purple-500`} />
//           <div className={`absolute inset-0 border-4 border-cyan-400`} />
//           <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl opacity-20" />
//         </div>
//       </div>

//       {(isListening || isSpeaking) && (
//         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="w-1 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full animate-sound-wave"
//               style={{
//                 height: `${Math.random() * 24 + 8}px`,
//                 animationDelay: `${i * 0.1}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function HomePage() {
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       type: "system",
//       text: "Initializing interview session...",
//     },
//   ]);
//   const [recognition, setRecognition] = useState(null);
//   const [interviewActive, setInterviewActive] = useState(true);
//   const containerRef = useRef(null);

//   // Initialize speech recognition on mount
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const newRecognition = new SpeechRecognition();
//         newRecognition.continuous = true;
//         newRecognition.interimResults = false;
//         newRecognition.lang = "en-US";

//         newRecognition.onresult = (event) => {
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             if (event.results[i].isFinal) {
//               const transcript = event.results[i][0].transcript.trim();
//               handleUserTranscript(transcript);
//             }
//           }
//         };

//         newRecognition.onerror = (event) => {
//           console.error("Speech recognition error:", event.error);
//           setIsListening(false);
//         };

//         setRecognition(newRecognition);
//       }
//     }
//   }, []);

//   // Automatically scroll chat container to bottom whenever messages change
//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // On initial load, fetch the first interview question
//   useEffect(() => {
//     if (messages.length === 1 && interviewActive) {
//       askNextQuestion("Let's begin the mock interview. Please ask the first question.");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages, interviewActive]);

//   // Handles toggling speech recognition on/off
//   const toggleListening = () => {
//     if (!recognition || !interviewActive) return;
//     if (!isListening) {
//       recognition.start();
//     } else {
//       recognition.stop();
//     }
//     setIsListening((prev) => !prev);
//   };

//   // Handles user transcript once speech recognition finalizes
//   const handleUserTranscript = async (transcript) => {
//     if (!interviewActive) return;
//     // Add user's message to state
//     setMessages((prev) => [...prev, { type: "user", text: transcript }]);

//     // Stop listening momentarily while fetching AI response
//     recognition.stop();
//     setIsListening(false);

//     // Fetch AI's next question/response
//     const aiReply = await fetchAIResponse(transcript);
//     // Add AI's message to state
//     setMessages((prev) => [...prev, { type: "system", text: aiReply }]);
//     // Speak the AI's reply
//     speak(aiReply);
//     // Resume listening after speaking ends
//   };

//   // Uses Web Speech API to speak a given text string
//   const speak = (text) => {
//     setIsSpeaking(true);
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.onend = () => {
//       setIsSpeaking(false);
//       // Once the AI finishes speaking, resume listening automatically (if interview still active)
//       if (interviewActive && recognition) {
//         recognition.start();
//         setIsListening(true);
//       }
//     };
//     window.speechSynthesis.speak(utterance);
//   };

//   // Triggers fetching the next question from AI without user prompt (e.g., first question)
//   const askNextQuestion = async (prompt) => {
//     const aiReply = await fetchAIResponse(prompt);
//     setMessages((prev) => [...prev, { type: "system", text: aiReply }]);
//     speak(aiReply);
//   };

//   // Handles ending the interview session
//   const endInterview = () => {
//     setInterviewActive(false);
//     if (recognition) {
//       recognition.stop();
//     }
//     setIsListening(false);
//     // Add a final system message
//     setMessages((prev) => [
//       ...prev,
//       { type: "system", text: "The interview has ended. Thank you for participating!" },
//     ]);
//   };

//   return (
//     <main className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center">
//       <div className="text-center relative top-5">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//           AI Mock Interview
//         </h1>
//         <p className="text-gray-400 mt-2">
//           {interviewActive
//             ? isListening
//               ? "Listening..."
//               : isSpeaking
//               ? "Speaking..."
//               : "Ready to continue"
//             : "Interview concluded"}
//         </p>
//       </div>

//       <div className="mx-auto border-2 mt-5 border-white w-4/5 py-8 flex justify-evenly relative">
//         <AIAssistantAnimation isListening={isListening} isSpeaking={isSpeaking} />

//         <div className="bg-gray-800 rounded-2xl shadow-xl w-1/2 relative flex flex-col">
//           <div ref={containerRef} className="h-80 overflow-y-auto p-2">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`flex items-start space-x-3 ${
//                   msg.type === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 {msg.type === "system" && (
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
//                     <Brain className="w-4 h-4 text-white" />
//                   </div>
//                 )}
//                 <div
//                   className={`rounded-lg p-4 max-w-[80%] ${
//                     msg.type === "system"
//                       ? "bg-gray-700"
//                       : "bg-gradient-to-r from-cyan-500 to-purple-600"
//                   }`}
//                 >
//                   <p>{msg.text}</p>
//                 </div>
//                 {msg.type === "user" && (
//                   <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
//                     <Wand2 className="w-4 h-4 text-purple-400" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Controls: Listen button and status */}
//           <div className="border-t border-gray-700 p-4 bg-gray-800">
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={toggleListening}
//                 disabled={!interviewActive}
//                 className={`p-4 rounded-full transition-all duration-300 ${
//                   isListening
//                     ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
//                     : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
//                 } ${!interviewActive ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {isListening ? (
//                   <MicOff className="w-6 h-6 text-white" />
//                 ) : (
//                   <Mic className="w-6 h-6 text-white" />
//                 )}
//               </button>
//               {isListening && (
//                 <div className="flex items-center space-x-2">
//                   <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
//                   <span className="text-purple-400">Listening to you...</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={endInterview}
//         className="mt-10 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-cyan-400 hover:to-purple-500 transition-colors duration-300"
//         disabled={!interviewActive}
//       >
//         End Interview
//       </button>

//       <div className="mt-10 text-gray-400 text-sm text-center w-4/5">
//         <p>
//           This AI Mock Interview is designed to help you practice your interview
//           skills. The AI interviewer will ask questions via speech, and you can
//           respond by speaking. Press the mic button to start or stop listening.
//         </p>
//         <p className="mt-2">
//           <strong>Note:</strong> This is a mock interview system. Please do not
//           share any personal or sensitive information.
//         </p>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Mic, MicOff, Brain, Wand2, Sparkles } from "lucide-react";

// Replace with your actual Google Gemini (Text‐Bison) model endpoint and API key
const GEMINI_API_KEY = "AIzaSyCxqR3jzEUOvoOiCIN71-LmFOVySvMbO9M";
const GEMINI_ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Calls Google Gemini (Text‐Bison) to get the next interviewer's message.
 * We send a system message (the “you are an interviewer…” instruction)
 * plus the latest user transcript as a single call each time.
 */
async function fetchAIResponse(promptContent) {
  try {
    const body = {
      
        messages: [
          {
            author: "system",
            content:
              "You are an experienced technical interviewer conducting a mock interview. Ask one question at a time, wait for the user's spoken response, and then proceed to the next question. Keep the tone professional and concise.",
          },
          {
            author: "user",
            content: promptContent,
          },
        ],
      
     
    };

    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Gemini API error:", response.statusText);
      return "Sorry, I encountered an error. Let's try again.";
    }

    const data = await response.json();
    // Gemini’s reply is in data.candidates[0].message.content
    const aiMessage = data.candidates?.[0]?.message?.content;
    return aiMessage || "Sorry, I didn't get a response. Please try again.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}

function AIAssistantAnimation({ isListening, isSpeaking }) {
  return (
    <div className="relative w-1/4">
      <div
        className={
          `absolute inset-0 bg-gradient-to-b from-cyan-500 to-purple-600 blur-xl opacity-20 ` +
          `${isListening || isSpeaking ? "scale-110" : "scale-100"} transition-transform duration-500`
        }
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <div className="w-full h-full border-4 border-cyan-400 bg-gray-800 flex items-center justify-center">
            <Image
              src="/images/AI_Interviewer.png"
              alt="AI Logo"
              fill="cover"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="absolute inset-0 border-4 border-purple-500" />
          <div className="absolute inset-0 border-4 border-cyan-400" />
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl opacity-20" />
        </div>
      </div>

      {(isListening || isSpeaking) && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full animate-sound-wave"
              style={{
                height: `${Math.random() * 24 + 8}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "system",
      text: "Initializing interview session...",
    },
  ]);
  const [recognition, setRecognition] = useState(null);
  const [interviewActive, setInterviewActive] = useState(true);
  const containerRef = useRef(null);

  // Initialize speech recognition on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const newRecognition = new SpeechRecognition();
        newRecognition.continuous = true;
        newRecognition.interimResults = false;
        newRecognition.lang = "en-US";

        newRecognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              const transcript = event.results[i][0].transcript.trim();
              handleUserTranscript(transcript);
            }
          }
        };

        newRecognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        setRecognition(newRecognition);
      }
    }
  }, []);

  // Auto‐scroll chat container to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // On initial load, fetch the first interview question
  useEffect(() => {
    if (messages.length === 1 && interviewActive) {
      askNextQuestion("Let's begin the mock interview. Please ask the first question.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, interviewActive]);

  // Toggle speech recognition on/off
  const toggleListening = () => {
    if (!recognition || !interviewActive) return;
    if (!isListening) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.warn("Recognition start error:", e);
      }
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Handle final user transcript
  const handleUserTranscript = async (transcript) => {
    if (!interviewActive) return;

    // Show user text in chat
    setMessages((prev) => [...prev, { type: "user", text: transcript }]);

    // Stop listening while we fetch & speak
    recognition.stop();
    setIsListening(false);

    // Fetch the AI’s next question/response
    const aiReply = await fetchAIResponse(transcript);

    // Add AI’s message to chat
    setMessages((prev) => [...prev, { type: "system", text: aiReply }]);

    // Speak the AI’s reply
    speak(aiReply);
  };

  // Use Web Speech API to speak text
  const speak = (text) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
      // Once done speaking, resume listening if interview is still active
      if (interviewActive && recognition) {
        try {
          recognition.start();
          setIsListening(true);
        } catch (e) {
          console.warn("Recognition restart error:", e);
        }
      }
    };
    // Ensure recognition is stopped before we speak
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
    window.speechSynthesis.speak(utterance);
  };

  // Fetch “next question” when there’s no direct user prompt (e.g., on start)
  const askNextQuestion = async (prompt) => {
    const aiReply = await fetchAIResponse(prompt);
    setMessages((prev) => [...prev, { type: "system", text: aiReply }]);
    speak(aiReply);
  };

  // End the interview session
  const endInterview = () => {
    setInterviewActive(false);
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setMessages((prev) => [
      ...prev,
      { type: "system", text: "The interview has ended. Thank you for participating!" },
    ]);
  };

  return (
    <main className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="text-center relative top-5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          AI Mock Interview
        </h1>
        <p className="text-gray-400 mt-2">
          {interviewActive
            ? isListening
              ? "Listening..."
              : isSpeaking
              ? "Speaking..."
              : "Ready to continue"
            : "Interview concluded"}
        </p>
      </div>

      <div className="mx-auto border-2 mt-5 border-white w-4/5 py-8 flex justify-evenly relative">
        <AIAssistantAnimation isListening={isListening} isSpeaking={isSpeaking} />

        <div className="bg-gray-800 rounded-2xl shadow-xl w-1/2 relative flex flex-col">
          <div ref={containerRef} className="h-80 overflow-y-auto p-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "system" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    msg.type === "system" ? "bg-gray-700" : "bg-gradient-to-r from-cyan-500 to-purple-600"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                {msg.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Wand2 className="w-4 h-4 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Controls: Listen button */}
          <div className="border-t border-gray-700 p-4 bg-gray-800">
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleListening}
                disabled={!interviewActive}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isListening
                    ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                    : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
                } ${!interviewActive ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isListening ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>
              {isListening && (
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                  <span className="text-purple-400">Listening to you...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={endInterview}
        className="mt-10 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-cyan-400 hover:to-purple-500 transition-colors duration-300"
        disabled={!interviewActive}
      >
        End Interview
      </button>

      <div className="mt-10 text-gray-400 text-sm text-center w-4/5">
        <p>
          This AI Mock Interview is designed to help you practice your interview skills. The AI interviewer will ask questions via speech, and you can respond by speaking. Press the mic button to start or stop listening.
        </p>
        <p className="mt-2">
          <strong>Note:</strong> This is a mock interview system. Please do not share any personal or sensitive information.
        </p>
      </div>
    </main>
  );
}
