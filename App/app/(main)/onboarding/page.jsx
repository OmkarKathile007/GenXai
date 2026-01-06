// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const OnboardingForm = () => {
//   return (
//     <>
//       <div className="flex  flex-wrap mx-auto sm:items-center items-center justify-center mt-52 ml-10 gap-5 px-4 md:grid md:grid-cols-2 lg:grid-cols-3">
//         <Card className="w-full max-w-[400px]  relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 p-6 shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Summarize Your Text</CardTitle>
//             <CardDescription  className='text-white'>AI-powered instant text summaries</CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-center">
//             <Link href="/text-summarize">
//               <Button className="w-4/5 px-10">Summarize</Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card className="w-full max-w-[400px]  relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-6 shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Code Converter</CardTitle>
//             <CardDescription  className='text-white'>Instantly transform code between languages.</CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-center">
//             <Link href="/code-converter">
//               <Button className="w-4/5 px-10">Convert</Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card className="w-full max-w-[400px]  relative overflow-hidden rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 p-6 shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Cover Letter Generator</CardTitle>
//             <CardDescription  className='text-white'>Create professional cover letters in seconds</CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-center">
//             <Link href="/cover-letter">
//               <Button className="w-4/5 px-10">Generate</Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card className="w-full max-w-[400px]  relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 p-6 shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Generate Career Roadmap</CardTitle>
//             <CardDescription  className='text-white'>AI-powered personalized career planning</CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-center">
//             <Link href="/generate-roadmap">
//               <Button className="w-4/5 px-10">Create</Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card className="w-full max-w-[400px] relative overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 p-6 shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Improve Text</CardTitle>
//             <CardDescription  className='text-white'>Refine and optimize text with AI.</CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-center">
//             <Link href="/improve-text">
//               <Button className="w-4/5 px-10">Improve</Button>
//             </Link>
//           </CardContent>
//         </Card>

//         <Card className="w-full max-w-[400px] relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-6 shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl">Email Writing</CardTitle>
//             <CardDescription className='text-white'>Seamless AI email generation tool.</CardDescription>
//           </CardHeader>
//           <CardContent className="flex justify-center">
//             <Link href="/email-writing">
//               <Button className="w-4/5 px-10">Enter</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// };

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
