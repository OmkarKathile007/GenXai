// "use client"

// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// // import { Icon } from "lucide-react";
// import React from "react";
// import Image from "next/image";
// import { CopyleftIcon } from "lucide-react";
// // import LogoIcon from "@/components/LogoIcon/LogoIcon";

// const AccurateResponse = () => {

//     function CopytoClipBoard(){
//         alert('Copy to Clipboard')
//     }
//   return (
//     <>
//     <h1 className="mt-28 text-center font-bold text-2xl">Get Best Results Buy Comparing  Top Trending AI</h1>
//     <div className=" w-full  space-y-10 m-auto">
//       <div className="w-5/6 h-[150px] space-y-3 m-auto flex flex-col  ">
//         <textarea
//           placeholder="Input your Query Here"
//           className="w-full p-4 h-full"
//         />
//         <Button className="mt-5 w-1/3 m-auto">Generate </Button>
//       </div>
//       <div className="w-5/6 flex m-auto">
//         <div className="w-1/3 ">
//           <div className="flex justify-center items-center gap-3">
//             <Image
//               src="/images/chatgpt.png"
//               alt="chatgpt logo"
//               width={40}
//               height={40}
//             />
//             <h1 className="text-center text-2xl font-bold">Chatgpt</h1>
//           </div>

//           <Textarea readOnly />
//         </div>
//         <div className="w-1/3">
//         <div className="flex justify-center  items-center gap-3">
//             <Image
//               src="/images/deepseek.png"
//               alt="chatgpt logo"
//               width={150}
//               height={100}
//             />
            
//           </div>
//           <Textarea readOnly />
//         </div>

//         <div className="w-1/3">
//         <div className="flex justify-center -mt-5 items-center gap-3">
//             <Image
//               src="/images/gemini.png"
//               alt="chatgpt logo"
//               width={100}
//               height={150}
//             />
            
//           </div>
//           <Textarea readOnly />
//         </div>

        
//       </div>
//       <div className="flex flex-col justify-center items-center gap-5"> 
          
//           <p className=" text-2xl">By comparing all three responses we found best result with deepseek</p>
//           <Button onSubmit={CopytoClipBoard} className="">Copy Deepseek Response</Button>
//         </div>
//     </div>
//     </> );
// };

// export default AccurateResponse;
"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { Icon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { CopyleftIcon } from "lucide-react";
// import LogoIcon from "@/components/LogoIcon/LogoIcon";

const AccurateResponse = () => {

    function CopytoClipBoard(){
        alert('Copy to Clipboard')
    }
  return (
    <>
    <h1 className="mt-28 text-center font-bold text-2xl">Get Best Results Buy Comparing  Top Trending AI</h1>
    <div className=" w-full  space-y-10 m-auto">
      <div className="w-5/6 h-[150px] space-y-3 m-auto flex flex-col  ">
        <textarea
          placeholder="Input your Query Here"
          className="w-full p-4 h-full"
        />
        <Button className="mt-5 w-1/3 m-auto">Generate </Button>
      </div>
      <div className="w-5/6 flex m-auto">
        <div className="w-1/3 ">
          <div className="flex justify-center items-center gap-3">
            <Image
              src="/images/chatgpt.png"
              alt="chatgpt logo"
              width={40}
              height={40}
            />
            <h1 className="text-center text-2xl font-bold">Chatgpt</h1>
          </div>

          <Textarea readOnly />
        </div>
        <div className="w-1/3">
        <div className="flex justify-center  items-center gap-3">
            <Image
              src="/images/deepseek.png"
              alt="chatgpt logo"
              width={150}
              height={100}
            />
            
          </div>
          <Textarea readOnly />
        </div>

        <div className="w-1/3">
        <div className="flex justify-center -mt-5 items-center gap-3">
            <Image
              src="/images/gemini.png"
              alt="chatgpt logo"
              width={100}
              height={150}
            />
            
          </div>
          <Textarea readOnly />
        </div>

        
      </div>
      <div className="flex flex-col sm:ml-10 justify-center items-center gap-5"> 
          
          <p className=" text-2xl">After comparing all three responses, we found that DeepSeek delivered the best result</p>
          <Button onClick={CopytoClipBoard} className="">Copy Deepseek Response</Button>
        </div>
    </div>
    </> );
};

export default AccurateResponse;
