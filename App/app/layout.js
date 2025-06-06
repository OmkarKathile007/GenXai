import {Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"

const inter=Inter({subsets:['latin']});

export const metadata = {
  title: "GenXai-One Platform for AI-tools",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
       baseTheme:dark,
    }}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* {headers} */}
            <Header/>
            <main className="min-h-screen">{children} <Analytics /></main>
            <Toaster richColors/>
        
      </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
