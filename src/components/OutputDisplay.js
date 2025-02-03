import React, { useCallback } from 'react';

function OutputDisplay({ text, onClear }) {
    const handleCopyClick = useCallback(() => {
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    alert('Output copied to clipboard!'); // Optional: provide user feedback
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert('Failed to copy output to clipboard.'); // Optional: error feedback
                });
        } else {
            alert('No output to copy.'); // Optional: feedback when there's no text to copy
        }
    }, [text]); // Dependency on 'text' to ensure the correct text is copied

    return (
        <div className="output-container">
            <h2>Output:</h2>
            <textarea
                readOnly
                value={text}
                placeholder="Zip contents will be displayed here"
                className="output-textarea"
            />
            <div className="output-buttons"> {/* Container for buttons for better styling */}
                <button onClick={onClear}>Clear</button>
                <button onClick={handleCopyClick}>Copy</button>
            </div>
        </div>
    );
}

export default OutputDisplay;