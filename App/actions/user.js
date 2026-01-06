// "use server"

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;

// app.post("/openai", async (req, res) => {
//     try {
//         const { prompt } = "generate a quote";

//         const response = await axios.post(
//             "https://api.openai.com/v1/chat/completions",
//             {
//                 model: "gpt-3.5-turbo",
//                 messages: [{ role: "user", content: prompt }],
//             },
//             {
//                 headers: {
//                     "Authorization": `Bearer ${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
//                     }`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         res.json({ response: response.data.choices[0].message.content });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Failed to fetch OpenAI response" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
