import React from 'react';

function StatisticsDisplay({ fileCount, languageCounts }) {
    if (fileCount === 0) {
        return <p>No files processed yet.</p>;
    }

    return (
        <div className="statistics-container">
            <h3>Statistics:</h3>
            <p>Total files processed: {fileCount}</p>
            {Object.keys(languageCounts).length > 0 && (
                <div>
                    <p>Language Breakdown:</p>
                    <ul>
                        {Object.entries(languageCounts).map(([language, count]) => (
                            <li key={language}>
                                {language}: {count} files
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default StatisticsDisplay;