const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const port = 3000; // or your desired port

// cors
const cors = require("cors");

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to the correct origin
  })
);

// Create a mongoose model for your PDF documents
const PdfModel = mongoose.model("Pdf", {
  title: String,
  author: String,
  data: Buffer, // Store binary data here (for GridFS)
});

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint for uploading a PDF
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { title, author } = req.body; // Extract title and author from the request body

    // Create a new PDF document in MongoDB with title, author, and data
    const pdf = new PdfModel({
      title,
      author,
      data: req.file.buffer,
    });
    await pdf.save();

    return res.status(201).json({ message: "PDF uploaded successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this route to your backend code to retrieve PDFs
app.get("/pdfs", async (req, res) => {
  try {
    const pdfs = await PdfModel.find(); // Fetch all documents from the 'Pdf' collection
    return res.status(200).json(pdfs);
  } catch (error) {
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

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connected successfully.");

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
