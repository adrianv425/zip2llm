import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import './App.css';
import { getLanguageFromFilename } from './utils';
import ZipInput from './components/ZipInput';
import OutputDisplay from './components/OutputDisplay';
import StatisticsDisplay from './components/StatisticsDisplay'; // Import StatisticsDisplay

function App() {
  const [outputText, setOutputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileStatistics, setFileStatistics] = useState({ // State for statistics
    fileCount: 0,
    languageCounts: {},
  });

  const handleFileSelect = useCallback(async (file) => {
    setErrorMessage('');
    setOutputText('');
    setFileStatistics({ fileCount: 0, languageCounts: {} }); // Reset statistics on new file

    if (!file) {
      return;
    }

    if (file.type !== 'application/zip' && file.type !== 'application/x-zip-compressed') {
      setErrorMessage("Invalid file type. Please select a '.zip' file.");
      return;
    }

    let currentFileCount = 0; // Track counts within this processing
    const currentLanguageCounts = {};

    try {
      const zip = await JSZip.loadAsync(file);
      let output = '';

      for (const relativePath in zip.files) {
        if (!zip.files[relativePath].dir) {
          try {
            const fileData = await zip.files[relativePath].async('text');
            const language = getLanguageFromFilename(relativePath);

            currentFileCount++; // Increment file count
            currentLanguageCounts[language] = (currentLanguageCounts[language] || 0) + 1; // Increment language count

            output += `${relativePath}\n`;
            output += `\`\`\`${language}\n`;
            output += fileData;
            output += `\n\`\`\`\n\n`;
          } catch (fileError) {
            console.warn(`Error reading file "${relativePath}":`, fileError);
            output += `${relativePath}\n`;
            output += `⚠️ Error reading file content. See console for details.\n\n`;
          }
        }
      }
      setOutputText(output);
      setFileStatistics({ fileCount: currentFileCount, languageCounts: currentLanguageCounts }); // Update statistics state

    } catch (zipError) {
      console.error("Error processing zip file:", zipError);
      setErrorMessage("Error processing zip file. It might be corrupted or invalid.");
      setFileStatistics({ fileCount: 0, languageCounts: {} }); // Reset statistics on error
    }
  }, []);

  const handleClearOutput = useCallback(() => {
    setOutputText('');
    setFileStatistics({ fileCount: 0, languageCounts: {} }); // Clear statistics on clear
  }, []);

  return (
    <div className="App">
      <h1>Zip to Text for LLMs</h1>
      <ZipInput onFileSelect={handleFileSelect} />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <StatisticsDisplay
        fileCount={fileStatistics.fileCount}
        languageCounts={fileStatistics.languageCounts}
      />
      <OutputDisplay
        text={outputText}
        onClear={handleClearOutput}
      />
    </div>
  );
}

export default App;