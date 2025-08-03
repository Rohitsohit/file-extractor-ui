import React, { useState } from 'react';
import { getApiUrl, API_CONFIG } from '../config/api';

function LinkInput({ onSubmit, parentLoading, setParentLoading }) {
    const [link, setLink] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setLink(e.target.value);
        setError('');
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!link.trim()) {
            setError('⚠️ Please paste a link.');
            return;
        }
        if (setParentLoading) setParentLoading(true);
        try {
            const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_LINK), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link: link.trim() }),
            });
            if (!res.ok) throw new Error('Link upload failed');
            const data = await res.json();
            setMessage('✅ Link submitted successfully!');
            setLink('');
            if (onSubmit) {
                onSubmit(data);
            }
        } catch (err) {
            setError('❌ Link upload failed. Please try again.');
        } finally {
            if (setParentLoading) setParentLoading(false);
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: 16,
            padding: '2rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        }}>
            <form onSubmit={handleSubmit}>
                <div style={{
                    marginBottom: '1.5rem',
                }}>
                    <label htmlFor="link-input" style={{
                        display: 'block',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        marginBottom: '0.5rem',
                    }}>
                        File URL
                    </label>
                    <input
                        id="link-input"
                        type="url"
                        value={link}
                        onChange={handleChange}
                        placeholder="https://example.com/file.json"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: 12,
                            background: 'white',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box',
                            outline: 'none',
                        }}
                        required
                        disabled={parentLoading}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={parentLoading}
                    style={{
                        width: '100%',
                        background: parentLoading ? '#e2e8f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: parentLoading ? '#94a3b8' : 'white',
                        border: 'none',
                        borderRadius: 12,
                        padding: '1rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: parentLoading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: parentLoading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)',
                    }}
                >
                    {parentLoading ? 'Submitting...' : 'Submit Link'}
                </button>
                
                {error && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#fef2f2',
                        color: '#dc2626',
                        borderRadius: 8,
                        border: '1px solid #fecaca',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                    }}>
                        {error}
                    </div>
                )}
                
                {message && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#f0fdf4',
                        color: '#059669',
                        borderRadius: 8,
                        border: '1px solid #bbf7d0',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                    }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default LinkInput; 