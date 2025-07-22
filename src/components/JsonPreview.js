import React from 'react';

function renderValue(value) {
    if (typeof value === 'object' && value !== null) {
        return (
            <div style={{ marginLeft: 16, background: '#f9f9f9', padding: 8, borderRadius: 4 }}>
                {Object.entries(value).map(([k, v]) => (
                    <div key={k}>
                        <span style={{ color: '#6c63ff', fontWeight: 500 }}>{k}:</span> <span style={{ color: '#333' }}>{v}</span>
                    </div>
                ))}
            </div>
        );
    }
    return <span style={{ color: '#333' }}>{value}</span>;
}

function downloadJson(jsonData) {
    const filename = (jsonData.file ? jsonData.file.replace(/\.[^/.]+$/, '') : 'data') + '.json';
    const jsonStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function JsonFromApi({ jsonData }) {
    if (!jsonData) return null;
    const { file, preview } = jsonData;
    return (
        <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            padding: 24,
            marginTop: 24,
            maxWidth: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
        }}>
            <button
                onClick={() => downloadJson(jsonData)}
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 24,
                    background: '#6c63ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
            >
                Download JSON
            </button>
            <div style={{
                textAlign: 'center',
                color: '#6c63ff',
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 24,
                letterSpacing: 1,
            }}>
                {file}
            </div>
            {Array.isArray(preview) && preview.length > 0 ? (
                <div>
                    {preview.map((item, idx) => (
                        <div key={idx} style={{
                            background: idx % 2 === 0 ? '#f4f8ff' : '#f9f9f9',
                            borderRadius: 8,
                            padding: 16,
                            marginBottom: 16,
                        }}>
                            {Object.entries(item).map(([field, details]) => (
                                <div key={field} style={{ marginBottom: 8 }}>
                                    <span style={{ color: '#6c63ff', fontWeight: 600 }}>{field}</span>
                                    {typeof details === 'object' && details !== null ? (
                                        <>
                                            {details.page_number !== undefined && (
                                                <span style={{ color: '#888', marginLeft: 8 }}>(Page: {details.page_number})</span>
                                            )}
                                            <div style={{ marginLeft: 16, marginTop: 2 }}>
                                                {renderValue(details.value)}
                                            </div>
                                        </>
                                    ) : (
                                        <span style={{ marginLeft: 8 }}>{renderValue(details)}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#888' }}>No preview data available.</p>
            )}
        </div>
    );
}

export default JsonFromApi;