const PdfModel = require("../models/pdfModel");

const getPdfs = async (req, res) => {
  try {
    // Fetch all PDF documents from the 'Pdf' collection
    const pdfs = await PdfModel.find();

    // Respond with the PDF documents
    return res.status(200).json(pdfs);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadPdf = async (req, res) => {
  try {
    // Check if a file was provided in the request
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Extract title and author from the request body
    const { title, author } = req.body;

    // Create a new PDF document in MongoDB with title, author, and data
    const pdf = new PdfModel({
      title,
      author,
      data: req.file.buffer,
    });
    await pdf.save();

    // Respond with a success message
    return res.status(201).json({ message: "PDF uploaded successfully." });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPdfs,
  uploadPdf,
};
