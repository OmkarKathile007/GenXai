"use client"
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {GoogleGenerativeAI,HarmCategory,  HarmBlockThreshold} from "@google/generative-ai";

const EmailWriter = () => {
  const [toEmail, setToEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  async function generateAns(e) {
    e.preventDefault();

    // Validate inputs
    if (!toEmail.trim() || !recipientName.trim() || !subject.trim()) return;

    setEmailContent("Loading...");

    try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `Please generate a professional email with the following details:
// To: ${toEmail}
// Recipient Name: ${recipientName}
// Subject: ${subject}
                
// The email should be well-structured, clear, and grammatically correct. Make sure to include a polite greeting and a proper closing.`,
//                 },
//               ],
//             },
//           ],
//         }
//       );
const apiKey=process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage( `Please generate a professional email with the following details:
      // To: ${toEmail}
      // Recipient Name: ${recipientName}
      // Subject: ${subject}
                      
      // The email should be well-structured, clear, and grammatically correct. Make sure to include a polite greeting and a proper closing.`);

      setEmailContent(
        result.response.text()
      );
    } catch (error) {
      console.error("API error:", error);
      setEmailContent("Error generating email. Please try again.");
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">
          AI Email Writer
        </h1>
        <form onSubmit={generateAns} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              To Email
            </label>
            <Input
              type="email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="mt-1 "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Recipient Name
            </label>
            <Input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Recipient Name"
              className="mt-1 "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Subject
            </label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email Subject"
              className="mt-1 "
            />
          </div>
          <Button type="submit" className="w-full">
            Generate Email
          </Button>
        </form>
        {emailContent && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              Generated Email:
            </h2>
            <Textarea
              value={emailContent}
              readOnly
              className="w-full "
              rows={8}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailWriter;
