// Import React and required libraries
import { useState } from "react";
import axios from "axios";

// Define the UploadForm component
function UploadForm() {
  // Define state variables for selected file, title, and author
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Handle file input change and update selectedFile state
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload when the "Upload" button is clicked
  const handleFileUpload = async () => {
    try {
      // Check if a file is selected
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }
      // Create a FormData object to send the file and form data to the server
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("pdf", selectedFile);

      // Send a POST request to upload the file to the server
      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Display a success alert when the upload is successful
      alert("File uploaded successfully.");

      console.log(formData);
    } catch (error) {
      // Handle errors and display an error alert
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <>
      {/* Render the file upload form */}
      <div>
        <h2>Upload a PDF</h2>
        <div className="">
          <p>Title</p>
          {/* Input field for entering the title */}
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
          <p>Author</p>
          {/* Input field for entering the author */}
          <input type="text" onChange={(e) => setAuthor(e.target.value)} />
        </div>
        {/* File input field for selecting a PDF file */}
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        {/* Button to trigger the file upload */}
        <button onClick={handleFileUpload}>Upload</button>
      </div>
    </>
  );
}

// Export the UploadForm component as the default export
export default UploadForm;
