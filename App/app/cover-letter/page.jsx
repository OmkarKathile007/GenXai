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
    if (!companyName.trim() || !jobTitle.trim() || !jobDescription.trim())
      return;

    // Show a loading state
    setCoverLetter("Loading...");

    try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `Please generate a professional cover letter for a job application with the following details:
// Company Name: ${companyName}
// Job Title: ${jobTitle}
// Job Description: ${jobDescription}

// Ensure the cover letter is well-structured, grammatically correct, and tailored to the provided information.`,
//                 },
//               ],
//             },
//           ],
//         }
//       );
const apiKey = "AIzaSyADh3WJQYUNU7T1n3vtNqtPwOsxCcoud-M";
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
  
    const result = await chatSession.sendMessage(`Please generate a professional cover letter for a job application with the following details:
// Company Name: ${companyName}
// Job Title: ${jobTitle}
// Job Description: ${jobDescription}

// Ensure the cover letter is well-structured, grammatically correct, and tailored to the provided information.`);

      // Assuming the API returns the generated cover letter in this format:
      setCoverLetter(result.response.text());
    } catch (error) {
      console.error("API error:", error);
      setCoverLetter("Error generating cover letter. Please try again.");
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
