File Extractor UI
A simple React-based frontend for uploading files or pasting file links to extract and preview JSON fields, designed to work with a Flask backend.

Features
--------
- File Upload: Upload files directly from your computer to the backend for processing.
- Paste Link: Paste a URL to a file and submit it for backend extraction.
- JSON Preview: View the extracted JSON data in a user-friendly format.
- Toggle Upload Methods: Easily switch between file upload and link paste modes.

Admin Page:
-----------
- Add new fields to be extracted from uploaded or linked files.
- Delete existing fields from the extraction list.
- Manage the list of fields dynamically without code changes.

Getting Started
---------------
**Prerequisites**
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- A running instance of the Flask backend

Installation
------------
1. Clone the repository:
   Apply to App.js
   Run
   ui

2. Install dependencies:
   Apply to App.js
   Run
   install

3. Start the development server:
   Apply to App.js
   Run
   start

The app will run at http://localhost:3000.

Usage
-----
**Upload a File:**
- Click "Upload File to Extract Fields".
- Choose a file and click "Upload".
- View the extracted JSON preview.

**Paste a Link:**
- Click "Paste Link Instead".
- Paste your file URL and submit.
- View the extracted JSON preview.

**Switch Methods:**
- Use the toggle button to switch between file upload and link input.

**Admin Page:**
- Navigate to the Admin page (e.g., /admin).
- Add new fields to the extraction list.
- Delete fields you no longer want to extract.
- Changes take effect immediately for all uploads and link submissions.

Backend API
-----------
This UI expects a Flask backend running at http://127.0.0.1:5000 with the following endpoints:
- POST /upload — Accepts file uploads via multipart/form-data.
- POST /upload-link — Accepts a JSON body with a link field.
- GET /fields — Returns the current list of fields to extract.
- POST /fields — Adds a new field to the extraction list.
- DELETE /fields/<field_name> — Removes a field from the extraction list.

All endpoints should return appropriate JSON responses.

Project Structure
-----------------
Apply to App.js
.

Customization
-------------
- Update the backend URL in the fetch calls if your backend runs elsewhere.
- Style the UI by editing App.css and component styles.

License
-------
MIT
