
// pages/api/extract.js
'use server';
import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

// Disable default body parser, since we're using formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // Parse the incoming multipart/form-data
  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).send("Error parsing the file.");
    }

    const file = files.resume;
    if (!file) {
      return res.status(400).send("No file uploaded under field 'resume'.");
    }

    const { filepath, originalFilename, mimetype } = file;

    try {
      let extractedText = "";

      // Read the file into a Buffer
      const fileBuffer = await fs.promises.readFile(filepath);

      if (mimetype === "application/pdf") {
        // Use pdf-parse for PDFs
        const pdfData = await pdfParse(fileBuffer);
        extractedText = pdfData.text;
      } else if (
        mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        originalFilename.endsWith(".docx")
      ) {
        // Use mammoth for DOCX
        const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = value;
      } else {
        return res
          .status(400)
          .send("Unsupported file type. Please upload a PDF or DOCX.");
      }

      // Return extracted text
      res.status(200).json({ text: extractedText });
    } catch (e) {
      console.error("Extraction error:", e);
      res.status(500).send("Failed to extract text from the resume.");
    } finally {
      // Optional: clean up the temporary file
      fs.unlink(filepath, () => {});
    }
  });
}
