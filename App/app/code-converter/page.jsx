"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import axios from "axios";

const CodeConverter = () => {
  const [inputLanguage, setInputLanguage] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [text, setText] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAns() {
    if (!text.trim() || !inputLanguage || !outputLanguage) return;

    setLoading(true);
    setConvertedCode("Loading...");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: `Convert the following ${inputLanguage} code to ${outputLanguage}:\n\n${text}` },
              ],
            },
          ],
        }
      );

      setConvertedCode(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setConvertedCode("Error converting code. Please try again.");
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedCode).then(() => {
      alert("Converted code copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="mt-20 m-auto w-5/6 h-screen flex flex-col md:flex-row gap-10 md:gap-16">
      {/* Code Input Section */}
      <div className="w-11/12 md:w-2/5 flex mx-auto items-center flex-col gap-6">
        <Select onValueChange={setInputLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Input Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="C++">C++</SelectItem>
            <SelectItem value="Java">Java</SelectItem>
            <SelectItem value="Python">Python</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="Javascript">Javascript</SelectItem>
            <SelectItem value="Rust">Rust</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-pink-50 h-40"
          placeholder="Input your code here"
        />
        <Button className="px-10" onClick={generateAns} disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </Button>
      </div>

      <div className="hidden md:block text-2xl mt-20 font-bold">TO</div>

      {/* Converted Code Section */}
      <div className="w-11/12 md:w-2/5 flex mx-auto items-center flex-col gap-6">
        <Select onValueChange={setOutputLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Output Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="C++">C++</SelectItem>
            <SelectItem value="Java">Java</SelectItem>
            <SelectItem value="Python">Python</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="Javascript">Javascript</SelectItem>
            <SelectItem value="Rust">Rust</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          className="border border-pink-50 h-40"
          placeholder="Converted code will appear here"
          value={convertedCode}
          readOnly
        />
        <Button className="px-6 flex items-center gap-2" onClick={copyToClipboard}>
          <ClipboardCopy className="w-5 h-5" /> Copy
        </Button>
      </div>
    </div>
  );
};

export default CodeConverter;
