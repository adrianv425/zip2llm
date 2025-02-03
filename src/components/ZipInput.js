import React from 'react';

function ZipInput({ onFileSelect }) {
    const handleChange = (event) => {
        const file = event.target.files[0];
        onFileSelect(file);
    };

    return (
        <div className="zip-input-container">
            <label htmlFor="zipFileInput" className="mb-4">
                Choose a .zip file to extract and format for LLMs:
            </label>
            <div className="upload-button">
                Upload Zip File
                <input type="file" id="zipFileInput" accept=".zip" onChange={handleChange} />
            </div>
        </div>
    );
}

export default ZipInput;