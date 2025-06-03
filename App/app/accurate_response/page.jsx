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
import React, { use } from "react";
import Image from "next/image";
import { CopyleftIcon } from "lucide-react";
// import LogoIcon from "@/components/LogoIcon/LogoIcon";

const AccurateResponse = () => {

    function CopytoClipBoard(){
        alert('Copy to Clipboard')
    }
    const [text, setText] = useState("");
    const [res, setRes] = useState("");
    async function generateAns(e) {
     e.preventDefault();
  

     try {
       const response = await axios.post(
         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
         {
           contents: [
             {
               parts: [                {
                   text: `Please rewrite the following text to improve its grammar and overall clarity while preserving the original meaning. Correct any punctuation, sentence structure, and word usage errors. Here is the text:${text}`,
                 },
               ],
             },
           ],
         }
       );
       
          
           const model = genAI.getGenerativeModel({
             model: "gemini-2.0-flash",
           });
          
           const generationConfig = {
             temperature: 1,
             topP: 0.95,
             topK: 40,
             maxOutputTokens: 8192,
             responseMimeType: "text/plain",
           };
           const chatSession = model.startChat({
             generationConfig,
             history: [
             ],
           });
        
           const result = await chatSession.sendMessage( `Generate most accurate response for the following  query

  ${text}`);
//console.log(result.response.text());
      
           // Simulate delay for modern feel and UX
           // setTimeout(() => {
           //   setAnswer(result.response.text());
           //   setLoader(false);
           //   setDisplayquiz(true);
           //   setHidden("hidden");
           // }, 3000);
        

      //  setCode(result.response.text());
     } catch (error) {
      //  setCode("Error generating summary. Please try again.");
       console.error("API error:", error);
     } finally {
       //setLoading(false);
     }
   }
  return (
    <>
    <h1 className="mt-28 text-center font-bold text-2xl">Get Best Results Buy Comparing  Top Trending AI</h1>
    <div className=" w-full  space-y-10 m-auto">
      <div className="w-5/6 h-[150px] space-y-3 m-auto flex flex-col  ">
        <textarea
          placeholder="Input your Query Here"
          className="w-full p-4 h-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={generateAns} className="mt-5 w-1/3 m-auto">Generate </Button>
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
