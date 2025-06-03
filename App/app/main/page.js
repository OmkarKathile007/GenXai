// pages/index.js
import Link from 'next/link'
import { FiZap, FiCode } from 'react-icons/fi'
import { GiMicrochip, GiBrain } from 'react-icons/gi'
// import { AiOutlineComment, AiOutlineTarget } from 'react-icons/ai'

export default function HomePage() {
  return (
    <div className="min-h-screen relative top-20  px-6 py-12">
      {/* ===== Hero Section ===== */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          Welcome to the Future
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Discover powerful tools and AI-driven solutions that will transform your digital experience
        </p>
      </div>

   
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        <Link href="/onboarding">
          
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 p-6 shadow-xl transition-transform transform hover:scale-[1.02]">
              {/* Icon Row */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="flex items-center justify-center p-2 rounded-md bg-white/20 text-white">
                  <FiZap className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center p-2 rounded-md bg-white/20 text-white">
                  <FiCode className="h-5 w-5" />
                </span>
                <span className="flex items-center justify-center p-2 rounded-md bg-white/20 text-white">
                  <GiMicrochip className="h-5 w-5" />
                </span>
              </div>

            
              <h2 className="text-2xl font-semibold text-white mb-2">
                Enter GenXTools
              </h2>

              {/* Description */}
              <p className="text-white/90 mb-6">
                Discover powerful tools designed for the modern generation. Streamline your workflow with cutting-edge technology and innovative solutions.
              </p>

              {/* “Explore →” Link */}
              <span className="inline-flex items-center text-white font-medium">
                Explore&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          {/* </a> */}
        </Link>

       
        <Link href="/ai-mock-interview">
          
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-xl transition-transform transform hover:scale-[1.02]">
            
              <div className="flex items-center space-x-3 mb-4">
                <span className="flex items-center justify-center p-2 rounded-md bg-white/20 text-white">
                  <GiBrain className="h-5 w-5" />
                </span>
                
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-white mb-2">
                AI Powered Mock Interview
              </h2>

              {/* Description */}
              <p className="text-white/90 mb-6">
                Practice interviews with our advanced AI system. Get real-time feedback, improve your skills, and boost your confidence for any interview.
              </p>

              {/* “Explore →” Link */}
              <span className="inline-flex items-center text-white font-medium">
                Explore&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          {/* </a> */}
        </Link>
      </div>

     
    </div>
  )
}
