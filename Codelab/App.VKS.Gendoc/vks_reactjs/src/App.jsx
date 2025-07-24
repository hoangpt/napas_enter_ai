import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CaseList from './pages/CaseList/index';
import CaseUpload from './pages/CaseUpload';
import CaseDetail from './pages/CaseDetail/index';
import UpdateDecision from './pages/UpdateDecision/index';
import UpdateDecisionClean from './pages/UpdateDecision/clean';
import UpdateDecisionTest from './pages/UpdateDecision/test';
import UpdateDecisionDebug from './pages/UpdateDecision/debug';
import UpdateDecisionFinal from './pages/UpdateDecisionFinal/index';
import PrintInspectionForm from './pages/PrintInspectionForm/index';
import AddCase from './pages/AddCase/index';
import ManualEntry from './pages/ManualEntry/index';
import PreviewDocument from './pages/PreviewDocument/index.jsx';
import PrintRecordScreen from './pages/PrintRecordScreen';
import TestPage from './pages/TestPage';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import { HoSoProvider } from './providers/HoSoProvider.jsx';

function App() {
  return (
    <HoSoProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<CaseList />} />
            <Route path="/add-case" element={<AddCase />} />
            <Route path="/upload" element={<CaseUpload />} />
            <Route path="/case/upload" element={<CaseUpload />} />
            <Route path="/case/manual-entry" element={<ManualEntry />} />
            <Route path="/case/preview" element={<PreviewDocument />} />
            <Route path="/case/print-record" element={<PrintRecordScreen />} />
            <Route path="/document-preview/:id" element={<TestPage />} />
            <Route path="/update-decision-final/:id" element={<UpdateDecisionFinal />} />
            <Route path="/case/:id" element={<CaseDetail />} />
            <Route path="/case/:id/update-decision" element={<UpdateDecisionClean />} />
            <Route path="/case/:id/update-decision-final" element={<UpdateDecisionFinal />} />
            <Route path="/case/:id/print-inspection" element={<PrintInspectionForm />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </HoSoProvider>
  );
}

export default App;
