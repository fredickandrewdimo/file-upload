const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getPdfs, uploadPdf } = require("../controllers/pdfControllers");

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getPdfs);

router.post("/", upload.single("pdf"), uploadPdf);

module.exports = router;
