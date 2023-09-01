import { useState, useEffect } from "react";
import axios from "axios";

function DisplayFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of files from your backend
    axios.get("http://localhost:3000/pdfs").then((response) => {
      setFiles(response.data);
    });
  }, []);

  // Function to handle file download
  const handleDownload = (file) => {
    const blob = new Blob([new Uint8Array(file.data.data)], {
      type: "application/pdf", // Set the appropriate content type
    });

    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.title}.pdf`; // Set the desired filename
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>List of Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <div>
              <strong>Title:</strong> {file.title}
            </div>
            <div>
              <strong>Author:</strong> {file.author}
            </div>
            <div>
              <button onClick={() => handleDownload(file)}>Download</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayFiles;
