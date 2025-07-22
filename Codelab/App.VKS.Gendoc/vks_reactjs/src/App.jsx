import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CaseList from './pages/CaseList/index';
import CaseUpload from './pages/CaseUpload';
import CaseDetail from './pages/CaseDetail/index';
import UpdateDecision from './pages/UpdateDecision/index';
import UpdateDecisionClean from './pages/UpdateDecision/clean';
import UpdateDecisionTest from './pages/UpdateDecision/test';
import UpdateDecisionDebug from './pages/UpdateDecision/debug';
import PrintInspectionForm from './pages/PrintInspectionForm/index';
import ErrorBoundary from './components/ErrorBoundary';
import { HoSoProvider } from './providers/HoSoProvider.jsx';

function App() {
  return (
    <HoSoProvider>
      <Router>
        <nav style={{ padding: 16, background: '#f5f5f5', marginBottom: 24 }}>
          <Link to="/" style={{ marginRight: 16 }}>Danh sách vụ việc</Link>
          <Link to="/upload">Thêm vụ việc mới</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CaseList />} />
          <Route path="/upload" element={<CaseUpload />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/case/:id/update-decision" element={<UpdateDecisionClean />} />
          <Route path="/case/:id/print-inspection" element={<PrintInspectionForm />} />
        </Routes>
      </Router>
    </HoSoProvider>
  );
}

export default App;
