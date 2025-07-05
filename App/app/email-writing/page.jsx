"use client"
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import {GoogleGenerativeAI,HarmCategory,  HarmBlockThreshold} from "@google/generative-ai";

const EmailWriter = () => {
  const [toEmail, setToEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const  generateAns=async(e)=> {
    e.preventDefault();

    // Validate inputs
    if (!toEmail.trim() || !recipientName.trim() || !subject.trim()) return;

    setEmailContent("Loading...");




     
    console.log("📝 About to POST, text state:", JSON.stringify(subject));

    if (!toEmail.trim()||!recipientName.trim() || !subject.trim()) {
      console.warn("No text to send!");
      return;
    }
    // var res1='';
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail,recipientName,subject }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
     
      const text1 = data.candidates?.[0]?.content?.parts?.[0]?.text;
   
      console.log("🟢 Server responded with:", text1);
      setEmailContent(text1 || "No answer returned.");
    } catch (err) {
      console.error("🛑 Error generating answer:", err);
      setEmailContent("Error: " + err.message);
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
