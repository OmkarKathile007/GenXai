import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header"; // Ensure this path matches your file structure
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/context/AuthContext"; // Import your custom provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "GenXai - One Platform for AI-tools",
  description: "Access the most powerful AI models and tools in a single workspace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">
              {children} 
              <Analytics />
            </main>
            <Toaster richColors />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}