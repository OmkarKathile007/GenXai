"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, Type, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(""); // To show "Queued", "Processing..."

  // Helper to safely parse the raw Gemini JSON string
  const extractTextFromRawResponse = (rawString) => {
    try {
      const parsed = JSON.parse(rawString);
      return parsed.candidates?.[0]?.content?.parts?.[0]?.text || "No text found in response.";
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return rawString;
    }
  };

  const pollJobStatus = async (jobId) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/job/${jobId}`);
        const jobData = await response.json();

        console.log("polling status:", jobData.status);

        if (jobData.status === "COMPLETED") {
          clearInterval(pollInterval);
          const finalAnswer = extractTextFromRawResponse(jobData.responseData);
          setSummary(finalAnswer);
          setLoading(false);
          setStatusMessage("Completed!");
        } 
        else if (jobData.status === "FAILED") {
          clearInterval(pollInterval);
          setSummary("Error: Task failed on server.");
          setLoading(false);
          setStatusMessage("Failed");
        } 
        else {
          // Still CREATED or PROCESSING
          setStatusMessage(`Status: ${jobData.status}...`);
        }
      } catch (err) {
        clearInterval(pollInterval);
        setSummary("Error polling status: " + err.message);
        setLoading(false);
      }
    }, 2000); // Check every 2 seconds
  };

  const generateAns = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setSummary("");
    setStatusMessage("Queueing request...");

    try {
      // 1. Submit the Job
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      console.log("Job Created:", data.jobId);

      // 2. Start Polling for results
      if (data.jobId) {
        setStatusMessage("Request Queued. Waiting for AI worker...");
        pollJobStatus(data.jobId);
      } else {
        throw new Error("No Job ID received");
      }

    } catch (err) {
      console.error("Error:", err);
      setSummary("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="h-5/6 w-5/6 m-auto bg-gradient-to-br mt-14">
      <div className="m-auto py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 text-primary animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            AI Text Summarizer
          </h1>
          <p className="text-muted-foreground">
            Async AI Platform (Job-Based Architecture)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Input Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-[calc(100vh-400px)] min-h-[300px] resize-none"
                placeholder="Paste your text here..."
                required
              />
              <Button
                className="mt-4 w-full"
                onClick={generateAns}
                disabled={!text.trim() || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {statusMessage}
                  </>
                ) : (
                  <>
                    Summarize <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary ? (
                <div className="text-card-foreground leading-relaxed animate-typing h-[calc(100vh-400px)] min-h-[300px] overflow-auto whitespace-pre-wrap">
                  {summary}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] min-h-[300px] text-muted-foreground border-2 border-dashed rounded-lg">
                  {loading ? (
                     <p className="animate-pulse">{statusMessage}</p>
                  ) : (
                     <p>Your summary will appear here</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}

export default App;