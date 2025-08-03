import React, { useState, useEffect } from "react";
import { getApiUrl } from '../config/api';

const FieldEditor = () => {
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    const [jsonData, setJsonData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [highlightedField, setHighlightedField] = useState(null);

    // Fetch JSON data on component load
    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        setLoading(true);
        try {
            const response = await fetch(getApiUrl("/get_fields"));
            const data = await response.json();
            setJsonData(data);
        } catch (err) {
            console.error("Error fetching fields", err);
            setMessage("❌ Error fetching fields");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!field || !value) {
            setMessage("⚠️ Both fields are required");
            return;
        }

        setLoading(true);
        setMessage("");
        
        try {
            const response = await fetch(getApiUrl("/add_field"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field, value }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Unknown error");
            }

            setHighlightedField(field);
            setTimeout(() => setHighlightedField(null), 1500);

            setField("");
            setValue("");
            setMessage("✅ Field added successfully!");
            fetchFields();
        } catch (err) {
            console.error("Error updating field", err);
            setMessage("❌ Error adding field");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fieldKey) => {
        if (!window.confirm(`Are you sure you want to delete "${fieldKey}"?`)) return;

        setLoading(true);
        setMessage("");
        
        try {
            const response = await fetch(getApiUrl(`/delete_field/${encodeURIComponent(fieldKey)}`), {
                method: "DELETE",
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to delete");
            }

            setMessage("✅ Field deleted successfully!");
            fetchFields();
        } catch (err) {
            console.error("Error deleting field:", err);
            setMessage("❌ Error deleting field");
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                    }}>
                        Admin Panel
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        margin: 0,
                        fontWeight: 300,
                    }}>
                        Manage extraction fields and configuration
                    </p>
                </div>

                <div style={{ padding: '3rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '3rem',
                        minHeight: '500px',
                    }}>
                        {/* Left Side - Form */}
                        <div style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            borderRadius: 16,
                            padding: '2rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#1e293b',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                ➕ Add New Field
                            </h3>
                            
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Field Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter field name"
                                        value={field}
                                        onChange={(e) => setField(e.target.value)}
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
                                
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: '#374151',
                                        marginBottom: '0.5rem',
                                    }}>
                                        Field Value
                                    </label>
                                    <textarea
                                        placeholder="Enter field value"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        rows={4}
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
                                            resize: 'vertical',
                                        }}
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
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        background: loading ? '#e2e8f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: loading ? '#94a3b8' : 'white',
                                        border: 'none',
                                        borderRadius: 12,
                                        padding: '1rem',
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)',
                                    }}
                                >
                                    {loading ? 'Adding...' : 'Add Field'}
                                </button>
                            </form>
                        </div>

                        {/* Right Side - Fields List */}
                        <div style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            borderRadius: 16,
                            padding: '2rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#1e293b',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                📋 Current Fields
                                {loading && (
                                    <div style={{
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid #f3f4f6',
                                        borderTop: '2px solid #667eea',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite',
                                        marginLeft: '0.5rem',
                                    }} />
                                )}
                            </h3>
                            
                            <div style={{
                                maxHeight: '400px',
                                overflowY: 'auto',
                                background: 'white',
                                borderRadius: 12,
                                border: '1px solid #e2e8f0',
                            }}>
                                {Object.keys(jsonData).length === 0 ? (
                                    <div style={{
                                        padding: '2rem',
                                        textAlign: 'center',
                                        color: '#94a3b8',
                                        fontSize: '1rem',
                                    }}>
                                        No fields configured yet
                                    </div>
                                ) : (
                                    <div style={{ padding: '1rem' }}>
                                        {Object.keys(jsonData).map((key) => (
                                            <div
                                                key={key}
                                                className={highlightedField === key ? "highlight-pop" : ""}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '1rem',
                                                    marginBottom: '0.5rem',
                                                    background: highlightedField === key ? '#f0fdf4' : 'white',
                                                    borderRadius: 8,
                                                    border: '1px solid #e2e8f0',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#f8fafc';
                                                    e.currentTarget.querySelector(".delete-icon").style.opacity = '1';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = highlightedField === key ? '#f0fdf4' : 'white';
                                                    e.currentTarget.querySelector(".delete-icon").style.opacity = '0';
                                                }}
                                            >
                                                <div>
                                                    <div style={{
                                                        fontWeight: 600,
                                                        color: '#1e293b',
                                                        marginBottom: '0.25rem',
                                                    }}>
                                                        {key}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '0.875rem',
                                                        color: '#64748b',
                                                    }}>
                                                        {jsonData[key]}
                                                    </div>
                                                </div>
                                                <button
                                                    className="delete-icon"
                                                    style={{
                                                        opacity: 0,
                                                        cursor: 'pointer',
                                                        background: 'none',
                                                        border: 'none',
                                                        fontSize: '1.2rem',
                                                        color: '#ef4444',
                                                        transition: 'all 0.3s ease',
                                                        padding: '0.5rem',
                                                        borderRadius: 6,
                                                    }}
                                                    onClick={() => handleDelete(key)}
                                                    title="Delete field"
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = '#fef2f2';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = 'transparent';
                                                    }}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div style={{
                            textAlign: 'center',
                            padding: '1rem',
                            marginTop: '2rem',
                            borderRadius: 12,
                            background: message.includes('✅') ? '#f0fdf4' : message.includes('❌') ? '#fef2f2' : '#fef3c7',
                            color: message.includes('✅') ? '#059669' : message.includes('❌') ? '#dc2626' : '#d97706',
                            fontWeight: 500,
                        }}>
                            {message}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .highlight-pop {
                    animation: pop 0.3s ease-out;
                }

                @keyframes pop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default FieldEditor;