'use client'

import React from 'react'


function page() {

    function apiresponse() {
      

        let response = fetch('/api/add',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: "Omkar Kathile",
                age: 20,
            }),

        })
        response.then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.error("Error:", err);
        });
    }
  return (
    <div>


       <h1 className='relative top-20 text-7xl'> I am Omkar Kathile Here</h1>

       <button onSubmit={apiresponse} className='bg-blue-500 text-white p-2 rounded-lg mt-10'>Click Me</button>
    </div>
  )
}

export default page