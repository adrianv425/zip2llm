import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import './App.css';
import { getLanguageFromFilename } from './utils';
import ZipInput from './components/ZipInput';
import OutputDisplay from './components/OutputDisplay';
import StatisticsDisplay from './components/StatisticsDisplay';

function App() {
  const [outputText, setOutputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileStatistics, setFileStatistics] = useState({
    fileCount: 0,
    languageCounts: {},
  });
  const [isEnvFilteringEnabled, setIsEnvFilteringEnabled] = useState(true);

  const handleFileSelect = useCallback(async (file) => {
    setErrorMessage('');
    setOutputText('');
    setFileStatistics({ fileCount: 0, languageCounts: {} });

    if (!file) {
      return;
    }

    if (file.type !== 'application/zip' && file.type !== 'application/x-zip-compressed') {
      setErrorMessage("Invalid file type. Please select a '.zip' file.");
      return;
    }

    let currentFileCount = 0;
    const currentLanguageCounts = {};

    try {
      const zip = await JSZip.loadAsync(file);
      let output = '';

      for (const relativePath in zip.files) {
        if (!zip.files[relativePath].dir) {
          // **Enhanced .env filtering and Toggle Logic**
          if (isEnvFilteringEnabled && relativePath.startsWith('.env')) {
            console.warn(`Ignoring .env file: "${relativePath}"`);
            continue;
          }

          try {
            const fileData = await zip.files[relativePath].async('text');
            const language = getLanguageFromFilename(relativePath);

            currentFileCount++;
            currentLanguageCounts[language] = (currentLanguageCounts[language] || 0) + 1;

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
      setFileStatistics({ fileCount: currentFileCount, languageCounts: currentLanguageCounts });

    } catch (zipError) {
      console.error("Error processing zip file:", zipError);
      setErrorMessage("Error processing zip file. It might be corrupted or invalid.");
      setFileStatistics({ fileCount: 0, languageCounts: {} });
    }
  }, [isEnvFilteringEnabled]); // Dependency on isEnvFilteringEnabled

  const handleClearOutput = useCallback(() => {
    setOutputText('');
    setFileStatistics({ fileCount: 0, languageCounts: {} });
  }, []);

  const handleToggleEnvFiltering = useCallback((event) => {
    setIsEnvFilteringEnabled(event.target.checked); // Update state based on toggle
  }, []);

  return (
    <div className="App">
      <h1>Zip to Text for LLMs</h1>
      <ZipInput
        onFileSelect={handleFileSelect}
        isEnvFilteringEnabled={isEnvFilteringEnabled} // Pass state
        onToggleEnvFiltering={handleToggleEnvFiltering} // Pass setter handler
      />
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