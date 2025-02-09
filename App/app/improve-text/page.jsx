"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { ClipboardCopy } from "lucide-react";

const InterviewPage = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Improved Query copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  async function generateAns(e) {
    e.preventDefault();
    if (!text.trim()) return; // Prevent empty requests

    // setLoading(true);
    setCode("Loading...");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Please rewrite the following text to improve its grammar and overall clarity while preserving the original meaning. Correct any punctuation, sentence structure, and word usage errors. Here is the text:${text}`,
                },
              ],
            },
          ],
        }
      );

      setCode(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setCode("Error generating summary. Please try again.");
      console.error("API error:", error);
    } finally {
      //setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-16">
      <div className="w-full max-w-2xl space-y-8 ">
        
        <form
          onSubmit={generateAns}
          className="border p-4 rounded  shadow-md flex flex-col gap-4"
        >
          <p className="text-white text-center text-xl">
            Input your response here
          </p>
          <Textarea
            className="w-full min-h-[150px] p-3 rounded border focus:outline-none"
            onChange={(e) => setText(e.target.value)}
            placeholder="Input your query"
            name="text"
          />
          <Button type="submit" className="w-full sm:w-1/2 m-auto">
            Improve
          </Button>
        </form>

        {/* Output Section */}
        <div className="border p-4 rounded shadow-md flex flex-col   gap-4">
          <p className="text-white text-center text-xl">
            Your Improved Text Goes Here
          </p>
          <Textarea
            className="w-full min-h-[150px] p-3 rounded border focus:outline-none"
            name="text"
            value={code}
            readOnly
          />
          <Button
            className="px-6 flex items-center gap-2"
            onClick={copyToClipboard}
          >
            <ClipboardCopy className="w-5 h-5" /> Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
