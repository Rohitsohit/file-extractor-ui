import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FieldEditor from './components/FileEditor';

function App() {
  return (
    <Router>
      <nav style={{ margin: '1em' }}>
        <Link to="/" style={{ marginRight: '1em' }}>File Upload</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/admin" element={<FieldEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
