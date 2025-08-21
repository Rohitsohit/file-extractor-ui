import React, { useState } from 'react';
import JsonFromApi from './JsonPreview';
import LinkInput from './LinkInput';
import { getApiUrl, API_CONFIG } from '../config/api';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [jsonData, setJsonData] = useState();
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const selected = event.target.files[0];
        setFile(selected);
        // Auto-start upload when a file is selected
        if (selected) {
            handleUpload(selected);
        }
    };

    const handleUpload = async (selectedFile = file) => {
        console.log('Uploading file:', selectedFile);
        if (!selectedFile) {
            setMessage('⚠️ Please select a file.');
            return;
        }
        setLoading(true);
        setShowLinkInput(false);
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.EXTRACT), {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            setJsonData(data)
            console.log(data); // show response
        } catch (err) {
            console.error(err);
            setMessage('❌ failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '2rem',
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 20,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                overflow: 'hidden',
            }}>
                <div style={{
                    background: '#E3E8EF',
                    padding: '2rem',
                    textAlign: 'center',
                    color: 'white',
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        margin: 0,
                        marginBottom: '0.5rem',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        color: '#1f2937',
                    }}>
                        Contract Data Extract
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        margin: 0,
                        fontWeight: 300,
                        color: '#1f2937'
                    }}>
                        Upload files or paste links to extract contract details
                    </p>
                </div>

                <div style={{ padding: '3rem' }}>
                    {!showLinkInput ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            border: '2px dashed #e1e5e9',
                            borderRadius: 16,
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                                transform: 'translateX(-100%)',
                                transition: 'transform 0.6s ease',
                            }} />

                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                opacity: 0.7,
                            }}>
                                📁
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#1e293b',
                                marginBottom: '1rem',
                            }}>
                                Choose a file to upload
                            </h3>
                            <p style={{
                                color: '#64748b',
                                marginBottom: '2rem',
                                fontSize: '1rem',
                            }}>
                                Drag and drop your file here, or click to browse
                            </p>
                            <input
                                type="file"
                                onChange={handleChange}
                                disabled={loading}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer',
                                }}
                            />
                            <button
                                onClick={handleUpload}
                                disabled={loading || !file}
                                style={{
                                    background: file ? '#1f2937' : '#e2e8f0',
                                    color: file ? 'white' : '#94a3b8',
                                    border: 'none',
                                    borderRadius: 12,
                                    padding: '1rem 2rem',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: file ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.3s ease',
                                    boxShadow: file ? '0 4px 12px rgba(31, 41, 55, 0.4)' : 'none',
                                }}
                            >
                                {loading ? 'Extracting Contract Details......' : 'Upload File'}
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                opacity: 0.7,
                            }}>
                                🔗
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#1e293b',
                                marginBottom: '1rem',
                            }}>
                                Paste your file link
                            </h3>
                            <LinkInput
                                onSubmit={(data) => {
                                    setJsonData(data);
                                    setMessage('✅ Link submitted successfully!');
                                }}
                                parentLoading={loading}
                                setParentLoading={setLoading}
                            />
                        </div>
                    )}

                    <div style={{
                        textAlign: 'center',
                        marginTop: '2rem',
                    }}>
                        <button
                            onClick={() => setShowLinkInput((prev) => !prev)}
                            disabled={loading}
                            style={{
                                background: 'transparent',
                                color: '#667eea',
                                border: '2px solid #667eea',
                                borderRadius: 12,
                                padding: '0.75rem 1.5rem',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                marginTop: '1rem',
                            }}
                        >
                            {showLinkInput ? '📁 Upload File Instead' : '🔗 Paste Link Instead'}
                        </button>
                    </div>

                    {loading && (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                        }}>
                            <div style={{
                                display: 'inline-block',
                                width: '40px',
                                height: '40px',
                                border: '4px solid #e2e8f0',
                                borderTop: '4px solid #1f2937',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                            }} />
                            <p style={{
                                marginTop: '1rem',
                                color: '#1f2937',
                                fontWeight: 500,
                            }}>
                                Extracting Details from the Contract...
                            </p>
                        </div>
                    )}

                    {message && (
                        <div style={{
                            textAlign: 'center',
                            padding: '1rem',
                            marginTop: '1rem',
                            borderRadius: 12,
                            background: message.includes('✅') ? '#f0fdf4' : '#fef2f2',
                            color: message.includes('✅') ? '#059669' : '#dc2626',
                            fontWeight: 500,
                        }}>
                            {message}
                        </div>
                    )}

                    {jsonData && (
                        <div style={{ marginTop: '2rem' }}>
                            <JsonFromApi jsonData={jsonData} />
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default FileUpload;