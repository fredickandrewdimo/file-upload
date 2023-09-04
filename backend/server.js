// Import required libraries and modules
const express = require("express");
const mongoose = require("mongoose");

// Routes
const pdfRoutes = require("./routes/pdfRoutes");

// Create an Express application
const app = express();
const port = 3000;

// Configure Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
app.use(cors());

// Custom middleware to log requests
app.use((req, res, next) => {
  // Log the path and HTTP method of incoming requests
  console.log(req.path, req.method);
  next(); // Continue to the next middleware or route handler
});

// Define routes for the '/api/pdf' endpoint
app.use("/api/pdf", pdfRoutes);

// Connect to the local MongoDB database
mongoose
  .connect("mongodb://localhost:27017/uploads", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to local MongoDB");
    // Listen for requests only if the database connection is successful
    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to local MongoDB:", error);
    // Optionally, handle the error gracefully and exit the application
    process.exit(1);
  });
