import React, { useState } from 'react';
import JsonFromApi from './JsonPreview';
import LinkInput from './LinkInput';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [jsonData, setJsonData] = useState();
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('⚠️ Please select a file.');
            return;
        }
        setLoading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            setMessage('✅ File uploaded successfully!');
            setJsonData(data)
            console.log(data); // show response
        } catch (err) {
            console.error(err);
            setMessage('❌ Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>📤 Upload File to Flask Backend</h2>
            {!showLinkInput && (
                <>
                    <input type="file" onChange={handleChange} disabled={loading} />
                    <button onClick={handleUpload} style={{ marginLeft: '1rem' }} disabled={loading}>
                        Upload
                    </button>
                </>
            )}
            <button onClick={() => setShowLinkInput((prev) => !prev)} style={{ marginLeft: '1rem' }} disabled={loading}>
                {showLinkInput ? 'Upload File' : 'Paste Link Instead'}
            </button>
            {showLinkInput && (
                <LinkInput onSubmit={(data) => {
                    setJsonData(data);
                    setMessage('✅ Link submitted successfully!');
                }} parentLoading={loading} setParentLoading={setLoading} />
            )}
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
            {jsonData &&
                <>
                    <JsonFromApi jsonData={jsonData}></JsonFromApi>
                </>
            }
        </div>
    );
}

export default FileUpload;