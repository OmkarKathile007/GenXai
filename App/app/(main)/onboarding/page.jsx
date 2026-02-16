

// export default OnboardingForm;
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const cards = [
  {
    title: "Summarize Your Text",
    description: "AI-powered instant text summaries",
    href: "/text-summarize",
    action: "Summarize",
    gradient: "from-emerald-400 to-teal-500",
  },
  
  
  {
    title: "Generate Career Roadmap",
    description: "AI-powered personalized career planning",
    href: "/generate-roadmap",
    action: "Create",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    title: "Improve Text",
    description: "Refine and optimize text with AI.",
    href: "/improve-text",
    action: "Improve",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Email Writing",
    description: "Seamless AI email generation tool.",
    href: "/email-writing",
    action: "Enter",
    gradient: "from-cyan-400 to-purple-600",
  },
  {
    title: "Code Converter",
    description: "Instantly transform code between languages.",
    href: "/code-converter",
    action: "Convert",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    title: "Cover Letter Generator",
    description: "Create professional cover letters in seconds",
    href: "/cover-letter",
    action: "Generate",
    gradient: "from-rose-400 to-amber-400",
  },
];

export default function OnboardingForm() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div
        className="
          grid
          gap-6
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-3
          2xl:grid-cols-3
          max-w-7xl
          mx-auto
          mt-20
          
        "
      >
        {cards.map(({ title, description, href, action, gradient }) => (
          <Card
            key={href}
            className={`
              w-full
              rounded-xl
              overflow-hidden
              bg-gradient-to-br ${gradient}
              p-6
              shadow-xl
              flex
              flex-col
              justify-between
            `}
          >
            <CardHeader className="text-center mb-4">
              <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
              <CardDescription className="text-white text-sm sm:text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href={href}>
                <Button className="w-full max-w-xs px-6 py-2">
                  {action}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
