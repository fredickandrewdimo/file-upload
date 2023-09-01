// Import React and your custom components
import DisplayFiles from "./DisplayFiles";
import UploadForm from "./UploadForm";

// Define the main App component
function App() {
  return (
    <>
      {/* Render the UploadForm component for uploading PDFs */}
      <UploadForm />

      {/* Add a horizontal line to separate the sections */}
      <hr />

      {/* Render the DisplayFiles component for listing and viewing PDFs */}
      <DisplayFiles />
    </>
  );
}

// Export the App component as the default export
export default App;
