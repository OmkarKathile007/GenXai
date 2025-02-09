"use client";

import React, { useState } from "react";
import axios from "axios";
import { Bot, Send, Sparkles, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAns() {
    if (!text.trim()) return; // Prevent empty requests

    setLoading(true);
    setSummary("Loading...");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: `Summarize the following text while maintaining technical accuracy: ${text}` },
              ],
            },
          ],
        }
      );

      setSummary(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setSummary("Error generating summary. Please try again.");
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
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
            Transform long text into concise summaries with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Your Text
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
                {loading ? "Summarizing..." : "Summarize"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary ? (
                <div className="text-card-foreground leading-relaxed animate-typing h-[calc(100vh-400px)] min-h-[300px] overflow-auto">
                  {summary}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[calc(100vh-400px)] min-h-[300px] text-muted-foreground border-2 border-dashed rounded-lg">
                  <p>Your summary will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
