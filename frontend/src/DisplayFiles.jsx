// Import React and required libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Define the DisplayFiles component
function DisplayFiles() {
  // Define state variable to store the list of files
  const [files, setFiles] = useState([]);

  // Use useEffect to fetch the list of files from the backend when the component mounts
  useEffect(() => {
    // Fetch the list of files from your backend
    axios.get("http://localhost:3000/api/pdf").then((response) => {
      setFiles(response.data);
    });
  }, []);

  // Function to handle file download
  const handleDownload = (file) => {
    // Create a Blob object from the file's binary data
    const blob = new Blob([new Uint8Array(file.data.data)], {
      type: "application/pdf", // Set the appropriate content type
    });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.title}.pdf`; // Set the desired filename
    a.click();

    // Clean up by revoking the URL
    window.URL.revokeObjectURL(url);
  };

  // Function to handle viewing a file in a new tab
  const handleView = (file) => {
    // Create a Blob object from the file's binary data
    const blob = new Blob([new Uint8Array(file.data.data)], {
      type: "application/pdf", // Set the appropriate content type
    });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Open the file in a new tab
    window.open(url, "_blank");

    // Clean up by revoking the URL
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>List of Files</h2>
      <ul>
        {/* Map through the list of files and render each file entry */}
        {files.map((file) => (
          <li key={file._id}>
            <div>
              <strong>Title:</strong> {file.title}
            </div>
            <div>
              <strong>Author:</strong> {file.author}
            </div>
            <div>
              {/* Button to trigger file download */}
              <button onClick={() => handleDownload(file)}>Download</button>
            </div>
            <div>
              {/* Button to view the file in a new tab */}
              <button onClick={() => handleView(file)}>View</button>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export the DisplayFiles component as the default export
export default DisplayFiles;
