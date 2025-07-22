import React, { useState } from 'react';

function LinkInput({ onSubmit }) {
    const [link, setLink] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:5000/upload-link', {
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
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '2rem 0' }}>
            <label htmlFor="link-input">Paste Link:</label>
            <input
                id="link-input"
                type="url"
                value={link}
                onChange={handleChange}
                placeholder="https://example.com/file.json"
                style={{ marginLeft: '1rem', width: '300px' }}
                required
                disabled={loading}
            />
            <button type="submit" style={{ marginLeft: '1rem' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
    );
}

export default LinkInput; 