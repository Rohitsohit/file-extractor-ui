import React, { useEffect, useState } from 'react';

function JsonFromApi({ jsonData }) {
    const [error, setError] = useState(null);

    return (
        <div>
            <h2>API JSON Preview</h2>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {jsonData ? (
                <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
                    {JSON.stringify(jsonData, null, 2)}
                </pre>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    );
}

export default JsonFromApi;