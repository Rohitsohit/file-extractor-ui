import React, { useState, useEffect } from "react";

const FieldEditor = () => {
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    const [jsonData, setJsonData] = useState({});

    // Fetch JSON data on component load
    useEffect(() => {
        fetchFields();
    }, [jsonData]);

    const [highlightedField, setHighlightedField] = useState(null);

    const fetchFields = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/get_fields");
            const data = await response.json();
            setJsonData(data);
        } catch (err) {
            console.error("Error fetching fields", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!field || !value) return alert("Both fields are required");

        try {
            const response = await fetch("http://127.0.0.1:5000/add_field", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field, value }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Unknown error");
            }

            setHighlightedField(field); // Set for highlight
            setTimeout(() => setHighlightedField(null), 1500); // Clear highlight after 1.5s

            setField("");
            setValue("");
            fetchFields();
        } catch (err) {
            console.error("Error updating field", err);
        }
    };

    const handleDelete = async (fieldKey) => {
        if (!window.confirm(`Are you sure you want to delete "${fieldKey}"?`)) return;

        try {
            const response = await fetch(`http://127.0.0.1:5000/delete_field/${encodeURIComponent(fieldKey)}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to delete");
            }

            fetchFields(); // Refresh after delete
        } catch (err) {
            console.error("Error deleting field:", err);
        }
    };


    return (
        <div style={{ display: "flex", padding: "20px", height: "100vh" }}>
            {/* Left Side - Form */}
            <div style={{ flex: 1, paddingRight: "20px" }}>
                <h3>Update Field</h3>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "10px" }}>
                        <input
                            type="text"
                            placeholder="Field"
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <textarea
                            placeholder="Value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            rows={4}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>
                    <button type="submit" style={{ padding: "10px 20px" }}>
                        Submit
                    </button>
                </form>
            </div>

            {/* Right Side - JSON Viewer */}
            <div
                style={{
                    flex: 1,
                    borderLeft: "1px solid #ccc",
                    paddingLeft: "20px",
                    overflowY: "scroll",
                }}
            >
                <h3>Current Fields</h3>
                <pre
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "15px",
                        borderRadius: "5px",
                        height: "calc(100% - 40px)",
                        overflow: "auto",
                    }}
                >
                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {Object.keys(jsonData).map((key) => (
                            <li
                                key={key}
                                className={highlightedField === key ? "highlight-pop" : ""}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "6px 0",
                                    borderBottom: "1px solid #ddd",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.querySelector(".delete-icon").style.visibility = "visible")}
                                onMouseLeave={(e) => (e.currentTarget.querySelector(".delete-icon").style.visibility = "hidden")}
                            >
                                <span>{key}</span>
                                <span
                                    className="delete-icon"
                                    style={{
                                        visibility: "hidden",
                                        cursor: "pointer",
                                        color: "red",
                                        marginLeft: "10px",
                                    }}
                                    onClick={() => handleDelete(key)}
                                    title="Delete field"
                                >
                                    🗑️
                                </span>
                            </li>
                        ))}
                    </ul>
                </pre>
            </div>
            <style>
                {`
  .highlight-pop {
    background-color: #d4f5d4;
    animation: pop 0.3s ease-out;
    border-radius: 5px;
  }

  @keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`}
            </style>
        </div>

    );
};

export default FieldEditor;