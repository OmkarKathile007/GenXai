"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider"; 
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If we are done loading and the user is NOT logged in, redirect.
    if (!loading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, loading, router]);

  // 1. Show a loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  // 2. If not logged in, don't render anything (useEffect will redirect)
  if (!isLoggedIn) {
    return null;
  }

  // 3. If logged in, render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;