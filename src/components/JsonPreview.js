import React from 'react';

function renderValue(value) {
    if (typeof value === 'object' && value !== null) {
        return (
            <div style={{
                marginLeft: 16,
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: 12,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
            }}>
                {Object.entries(value).map(([k, v]) => (
                    <div key={k} style={{ marginBottom: 4 }}>
                        <span style={{ color: '#667eea', fontWeight: 600 }}>{k}:</span> <span style={{ color: '#374151' }}>{v}</span>
                    </div>
                ))}
            </div>
        );
    }
    return <span style={{ color: '#374151' }}>{value}</span>;
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
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: 20,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            padding: 32,
            marginTop: 32,
            maxWidth: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }} />
            
            <button
                onClick={() => downloadJson(jsonData)}
                style={{
                    position: 'absolute',
                    top: 24,
                    right: 32,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '12px 20px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
            >
                📥 Download JSON
            </button>
            
            <div style={{
                textAlign: 'center',
                color: '#667eea',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: 32,
                letterSpacing: 1,
                textShadow: '0 2px 4px rgba(102, 126, 234, 0.1)',
            }}>
                {file}
            </div>
            
            {Array.isArray(preview) && preview.length > 0 ? (
                <div>
                    {preview.map((item, idx) => (
                        <div key={idx} style={{
                            background: idx % 2 === 0 ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            borderRadius: 16,
                            padding: 24,
                            marginBottom: 20,
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        }}>
                            {Object.entries(item).map(([field, details]) => (
                                <div key={field} style={{ marginBottom: 16 }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: 8,
                                    }}>
                                        <span style={{
                                            color: '#667eea',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                        }}>
                                            {field}
                                        </span>
                                        {typeof details === 'object' && details !== null && details.page_number !== undefined && (
                                            <span style={{
                                                color: '#94a3b8',
                                                marginLeft: 12,
                                                fontSize: '0.9rem',
                                                background: '#f1f5f9',
                                                padding: '4px 8px',
                                                borderRadius: 6,
                                                fontWeight: 500,
                                            }}>
                                                Page {details.page_number}
                                            </span>
                                        )}
                                    </div>
                                    {typeof details === 'object' && details !== null ? (
                                        <div style={{ marginLeft: 8 }}>
                                            {renderValue(details.value)}
                                        </div>
                                    ) : (
                                        <div style={{ marginLeft: 8 }}>
                                            {renderValue(details)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#94a3b8',
                    fontSize: '1.1rem',
                }}>
                    No preview data available.
                </div>
            )}
        </div>
    );
}

export default JsonFromApi;