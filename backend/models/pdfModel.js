const mongoose = require("mongoose");

// Define a Mongoose model for PDF documents
const pdfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    data: {
      type: Buffer,
      required: true,
    },
  },
  { timestamps: true }
);

const PdfModel = mongoose.model("Pdf", pdfSchema);

module.exports = PdfModel;
