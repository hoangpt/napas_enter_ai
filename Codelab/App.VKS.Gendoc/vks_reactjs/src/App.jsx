import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CaseList from './pages/CaseList/index';
import CaseUpload from './pages/CaseUpload';

function App() {
  return (
    <Router>
      <nav style={{ padding: 16, background: '#f5f5f5', marginBottom: 24 }}>
        <Link to="/" style={{ marginRight: 16 }}>Danh sách vụ việc</Link>
        <Link to="/upload">Thêm vụ việc mới</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CaseList />} />
        <Route path="/upload" element={<CaseUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
