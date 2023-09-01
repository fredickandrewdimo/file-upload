import { useState } from "react";
import axios from "axios";
import DisplayFiles from "./DisplayFiles";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("pdf", selectedFile);

      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Display a success alert when the upload is successful
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <>
      <div>
        <h2>Upload a PDF</h2>
        <div className="">
          <p>Title</p>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
          <p>Author</p>
          <input type="text" onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>

      <hr />

      <div className="">
        <DisplayFiles />
      </div>
    </>
  );
}

export default App;
