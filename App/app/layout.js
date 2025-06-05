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
            {/* <footer className="text-white bg-muted/50 py-12">
                <div className="container mx-auto  px-4 text-center text-gray-200">
                  <p>Made with 💗 by Omkar</p>
                </div>
            </footer> */}
      </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
