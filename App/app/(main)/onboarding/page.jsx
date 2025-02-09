"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OnboardingForm = () => {
  return (
    <>
      <div className="flex  flex-wrap mx-auto items-center justify-center mt-52 ml-10 gap-5 px-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        <Card className="w-full max-w-[400px] p-5 border-yellow-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Summarize Your Text</CardTitle>
            <CardDescription>AI-powered instant text summaries</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/text-summarize">
              <Button className="w-4/5 px-10">Summarize</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[400px] p-5 border-pink-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Code Converter</CardTitle>
            <CardDescription>Instantly transform code between languages.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/code-converter">
              <Button className="w-4/5 px-10">Convert</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[400px] p-5 border-blue-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Cover Letter Generator</CardTitle>
            <CardDescription>Create professional cover letters in seconds</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/cover-letter">
              <Button className="w-4/5 px-10">Generate</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[400px] p-5 border-green-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Generate Career Roadmap</CardTitle>
            <CardDescription>AI-powered personalized career planning</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/generate-roadmap">
              <Button className="w-4/5 px-10">Create</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[400px] p-5 border-orange-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Improve Text</CardTitle>
            <CardDescription>Refine and optimize text with AI.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/improve-text">
              <Button className="w-4/5 px-10">Improve</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="w-full max-w-[400px] p-5 border-purple-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Email Writing</CardTitle>
            <CardDescription>Seamless AI email generation tool.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/email-writing">
              <Button className="w-4/5 px-10">Enter</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OnboardingForm;
