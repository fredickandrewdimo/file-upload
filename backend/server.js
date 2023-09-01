// Import required libraries and modules
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

// Create an Express application
const app = express();
const port = 3000;

// Configure Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
app.use(cors());

// Define a Mongoose model for PDF documents
const PdfModel = mongoose.model("Pdf", {
  title: String,
  author: String,
  data: Buffer, // Store binary data here (for GridFS)
});

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define an API endpoint for uploading a PDF
app.post("/upload", upload.single("pdf"), async (req, res) => {
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
});

// Define an API endpoint to retrieve PDFs
app.get("/pdfs", async (req, res) => {
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
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/uploads", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle MongoDB connection errors
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Once the MongoDB connection is open, start the Express server
db.once("open", () => {
  console.log("MongoDB connected successfully.");

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
