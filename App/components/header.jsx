import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronDown, LayoutDashboard, PenBox, StarIcon,PhoneIcon,LucideCloudLightning } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { PenBox } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { FileText } from "lucide-react";
// import { checkUser } from "@/lib/checkUser";

const Header=async ()=> {
  // await checkUser()
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link className="flex justify-center items-center" href="">
          {/* <Image
            src="/images/Gen.png"
            alt="logo"
            className="h-12 py-1 w-auto object-contain invert"
            width={200}
            height={60}
          />*/}
          <span className="text-5xl font-bold  text-gray-300">GenxAI</span> 
          {/* <span className="text-5xl font-bold text-yellow-400" >ai</span> */}
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href={"/onboarding"}>
              <Button variant="outline">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Enter GenXHub</span>
              </Button>
              
            </Link>
            <Link href={"/accurate_response"}>
              
              <Button className=' border-white border hover:' >
                <LucideCloudLightning className="h-6 w-6 " />
                <span className="hidden md:block">Get Most Accurate Response</span>
              </Button>
            </Link>
         

          
          </SignedIn>
          <SignedOut>
            <SignInButton >
                <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
                elements:{
                    avatarBox:'w-10 h-10',
                    userButtonPopoverCard:'shadow-xl',
                    userPreviewMainIdentifier:'font-semibolder'
                }
                
            }} afterSignOutUrl="/" />
            
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
