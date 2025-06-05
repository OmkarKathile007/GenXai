"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {GoogleGenerativeAI,HarmCategory,  HarmBlockThreshold} from "@google/generative-ai";

const CoverLetterGenerator = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  async function generateAns(e) {
    e.preventDefault();

    // Ensure no field is empty
    

    // Show a loading state
    setCoverLetter("Loading...");


e.preventDefault();
    if (!companyName.trim() || !jobTitle.trim() || !jobDescription.trim())
      return;


    setCoverLetter("Loading...");




     
    console.log("📝 About to POST, text state:", JSON.stringify(jobDescription));

    // var res1='';
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, jobTitle, jobDescription }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
     
      const text1 = data.candidates?.[0]?.content?.parts?.[0]?.text;
   
      console.log("🟢 Server responded with:", text1);
      setCoverLetter(text1 || "No answer returned.");
    } catch (err) {
      console.error("🛑 Error generating answer:", err);
      setCoverLetter("Error: " + err.message);
    }

  }

  

  return (
    <div className="min-h-screen   flex flex-col items-center p-6">
      <div className="w-full max-w-lg mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          AI Cover Letter Generator
        </h1>
        <form onSubmit={generateAns} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Company Name
            </label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="mt-1 "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Job Title
            </label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter job description"
              className="mt-1 h-[150px] w-full p-5"
            />
          </div>
          <Button type="submit" className="w-full">
            Generate Cover Letter
          </Button>
        </form>
        {coverLetter && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              Generated Cover Letter:
            </h2>
            <Textarea value={coverLetter} readOnly className="w-full " />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
