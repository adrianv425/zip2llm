import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ZipInput from './components/ZipInput';
import OutputDisplay from './components/OutputDisplay';
import StatisticsDisplay from './components/StatisticsDisplay';
import './App.css';
import { getLanguageFromFilename } from './utils';

function App() {
  const [output, setOutput] = useState('');
  const [fileCount, setFileCount] = useState(0);
  const [languageCounts, setLanguageCounts] = useState({});
  const [error, setError] = useState(null); // State for error messages
  const [isEnvFilteringEnabled, setIsEnvFilteringEnabled] = useState(true);

  const processZipFile = useCallback(async (file) => {
    setError(null); // Clear previous errors
    setOutput('');  //Clear previous output
    setFileCount(0);
    setLanguageCounts({});


    if (!file) {
      setError('No file selected.'); // Set error if no file
      return;
    }
    if (file.name && !file.name.endsWith('.zip')) {
      setError('Invalid file type. Please select a .zip file.'); //set error if wrong file type
      return;
    }

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);

      let processedOutput = '';
      let currentFileCount = 0;
      const currentLanguageCounts = {};

      const filePromises = [];

      // Iterate over the files using Object.entries
      for (const [relativePath, zipEntry] of Object.entries(loadedZip.files)) {
        if (zipEntry.dir) {
          continue; // Skip directories
        }

        if (isEnvFilteringEnabled && relativePath.split('/').pop() === '.env') {
          continue;  // Skip .env files if filtering is enabled
        }

        currentFileCount++;

        const fileExtension = relativePath.split('.').pop();
        currentLanguageCounts[fileExtension] = (currentLanguageCounts[fileExtension] || 0) + 1;

        filePromises.push(
          zipEntry.async('text').then((fileContent) => {
            processedOutput += relativePath + '\n```' + getLanguageFromFilename(relativePath) + "\n" + fileContent + '\n```\n\n';
          })
        );
      }


      await Promise.all(filePromises);


      setOutput(processedOutput);
      setFileCount(currentFileCount);
      setLanguageCounts(currentLanguageCounts);


    } catch (e) {
      setError(`Error processing zip file: ${e.message}`); // Set error for processing issues
      console.error(e); // Log the full error to console for debugging
    }
  }, [isEnvFilteringEnabled]);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      processZipFile(acceptedFiles[0]);
    }
  }, [processZipFile]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
    },
    maxFiles: 1, // Limit to a single file
    noClick: true, // Prevent click events on the dropzone itself
  });


  const handleFileSelect = (file) => {
    processZipFile(file);
  };

  const handleClearOutput = () => {
    setOutput('');
    setFileCount(0);
    setLanguageCounts({});
  };

  const handleToggleEnvFiltering = () => {
    setIsEnvFilteringEnabled(prev => !prev);
  };


  return (
    <div className="App">
      <h1>Zip File Extractor</h1>
      <p className="subtitle">Extract, format, and analyze the contents of your zip files.</p>

      <div
        {...getRootProps()}
        className={`zip-input-container ${isDragActive ? 'active' : ''} ${isDragAccept ? 'accept' : ''} ${isDragReject ? 'reject' : ''}`}
        style={{
          backgroundColor: isDragActive ? (isDragAccept ? '#d4f3ef' : '#f8d7da') : 'var(--surface-color)',
          borderColor: isDragActive ? (isDragAccept ? '#10b981' : '#dc2626') : 'var(--border-color)',
          cursor: 'pointer', // Ensure cursor is pointer for dropzone
          border: isDragActive ? "1px solid" : "1px solid var(--border-color)"
        }}
      >
        <input {...getInputProps()} />
        {isDragAccept && <p>Drop the files here ...</p>}
        {isDragReject && <p>File type not accepted, sorry!</p>}
        {!isDragActive && <p>Drag 'n' drop a .zip file here, or click to select a file</p>}

        {/*  Conditional rendering for upload button, only shown if not actively dragging */}
        {/*  Button for click-to-upload */}
        {!isDragActive && (
          <button
            className="upload-button"
            onClick={() => {
              document.getElementById('zipFileInput').click(); // Trigger file input
            }}
          >
            Upload Zip File
          </button>
        )}
        {/* Hidden file input for click-to-upload */}
        <input
          type="file"
          id="zipFileInput"
          accept=".zip"
          style={{ display: 'none' }} // Hide the input element
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />
        <div className="env-filter-toggle">
          <label htmlFor="envFilterToggle" className="env-filter-label">
            Ignore .env files:
          </label>
          <input
            type="checkbox"
            id="envFilterToggle"
            checked={isEnvFilteringEnabled}
            onChange={handleToggleEnvFiltering}
            className="env-filter-checkbox"
          />
        </div>
      </div>

      {/* Display Error message */}
      {error && <div className="error">{error}</div>}

      <StatisticsDisplay fileCount={fileCount} languageCounts={languageCounts} />
      <OutputDisplay text={output} onClear={handleClearOutput} />
    </div>
  );
}

export default App;