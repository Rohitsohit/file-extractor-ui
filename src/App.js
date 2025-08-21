import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FieldEditor from './components/FileEditor';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={{
      background: '#E3E8EF',
      padding: '1rem 2rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <img
              src="/RH_Typeface_clean.png"
              alt="Logo"
              style={{ height: '16px' }}
            />

          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
        }}>
          <Link
            to="/"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 12,
              textDecoration: 'none',
              color: isActive('/') ? '#1f2937' : '#1f2937',
              background: isActive('/') ? '#cbd5e1' : 'transparent',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              border: isActive('/') ? '1px solid #94a3b8' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              if (!isActive('/')) {
                e.target.style.background = '#e2e8f0';
                e.target.style.color = '#1f2937';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/')) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#1f2937';
              }
            }}
          >
            📤 Upload Files
          </Link>

          <Link
            to="/admin"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 12,
              textDecoration: 'none',
              color: isActive('/admin') ? '#1f2937' : '#1f2937',
              background: isActive('/admin') ? '#cbd5e1' : 'transparent',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              border: isActive('/admin') ? '1px solid #94a3b8' : '1px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              if (!isActive('/admin')) {
                e.target.style.background = '#e2e8f0';
                e.target.style.color = '#1f2937';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/admin')) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#1f2937';
              }
            }}
          >
            ⚙️ Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <Navigation />
        <main style={{
          paddingTop: '1rem',
        }}>
          <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/admin" element={<FieldEditor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
