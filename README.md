# File Extractor UI

A premium React-based frontend for uploading files or pasting file links to extract and preview JSON fields, designed to work with a Flask backend.

## Features

- **File Upload:** Upload files directly from your computer to the backend for processing.
- **Paste Link:** Paste a URL to a file and submit it for backend extraction.
- **JSON Preview:** View the extracted JSON data in a user-friendly format.
- **Toggle Upload Methods:** Easily switch between file upload and link paste modes.
- **Admin Page:**  
  - Add new fields to be extracted from uploaded or linked files.  
  - Delete existing fields from the extraction list.  
  - Manage the list of fields dynamically without code changes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running instance of the [Flask backend](#backend-api)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/file-extractor-ui.git
   cd file-extractor-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   REACT_APP_API_URL=http://127.0.0.1:5000
   ```
   
   **Note:** For React apps, environment variables must start with `REACT_APP_` to be accessible in the browser.

4. **Start the development server:**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://127.0.0.1:5000` |

### Environment Setup Examples

**Development:**
```bash
REACT_APP_API_URL=http://localhost:5000
```

**Production:**
```bash
REACT_APP_API_URL=https://your-api-domain.com
```

**Staging:**
```bash
REACT_APP_API_URL=https://staging-api.your-domain.com
```

## Usage

1. **Upload a File:**
   - Click "Upload File to Extract Fields".
   - Choose a file and click "Upload".
   - View the extracted JSON preview.

2. **Paste a Link:**
   - Click "Paste Link Instead".
   - Paste your file URL and submit.
   - View the extracted JSON preview.

3. **Switch Methods:**
   - Use the toggle button to switch between file upload and link input.

4. **Admin Page:**
   - Navigate to the Admin page (e.g., `/admin`).
   - Add new fields to the extraction list.
   - Delete fields you no longer want to extract.
   - Changes take effect immediately for all uploads and link submissions.

## Backend API

This UI expects a Flask backend running with the following endpoints:

- `POST /upload` — Accepts file uploads via `multipart/form-data`.
- `POST /upload-link` — Accepts a JSON body with a `link` field.
- `GET /fields` — Returns the current list of fields to extract.
- `POST /fields` — Adds a new field to the extraction list.
- `DELETE /fields/<field_name>` — Removes a field from the extraction list.

All endpoints should return appropriate JSON responses.

## Project Structure

```
src/
  components/
    FileUpload.js      # Main upload component
    LinkInput.js       # Paste link component
    JsonPreview.js     # JSON preview display
    FileEditor.js      # (Optional) File editing
    AdminPage.js       # Admin page for managing fields
  config/
    api.js            # API configuration and endpoints
  App.js
  index.js
  ...
```

## Customization

- Update the backend URL in the `.env` file for different environments.
- Style the UI by editing component styles.
- Add new API endpoints in `src/config/api.js`.

## Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Set environment variables for your deployment platform:**
   - **Netlify:** Add `REACT_APP_API_URL` in Site Settings > Environment Variables
   - **Vercel:** Add `REACT_APP_API_URL` in Project Settings > Environment Variables
   - **Heroku:** Use `heroku config:set REACT_APP_API_URL=your-api-url`

## License

[MIT](LICENSE)
