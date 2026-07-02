import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth, ProtectedRoute } from './contexts/AuthContext';
import { HomePage } from './Components/HomePage';
import CertificatePage from './Components/CertificatePage.jsx';
import GeneratedCertificate from './Components/GeneratedCertificate.jsx';
import DocumentGenerator from './Components/documentgenerator.jsx';
import GeneratedLetter from './Components/GeneratedLetter.jsx';
import OfferLetterPreview from './Components/OfferLetterPreview';
import NewOfferLetterForm from './Components/NewOfferLetterForm';
import { RelievingLetterPreview } from './Components/RelievingLetterPreview';
import { NewRelievingLetterForm } from './Components/NewRelievingLetterForm';
import LoginPage from './Components/LoginPage';
import ReceiptForm from './Components/ReceiptForm';
import VerifyPage from './Components/VerifyPage';
import './App.css';
import './index.css';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      
      <Route path="/" element={<HomePage />} />
      <Route path="/verify/:id" element={<VerifyPage />} />
      
      {/* Protected Routes */}
      <Route path="/certificate" element={
        <ProtectedRoute>
          <CertificatePage />
        </ProtectedRoute>
      } />
      
      <Route path="/generate-certificate" element={
        <ProtectedRoute>
          <GeneratedCertificate />
        </ProtectedRoute>
      } />
      
      {/* Experience Certificate */}
            
            
      {/* Offer Letter Routes */}
      <Route path="/offer-letter/form" element={
        <ProtectedRoute>
          <NewOfferLetterForm />
        </ProtectedRoute>
      } />
      
      <Route path="/preview" element={
        <ProtectedRoute>
          <OfferLetterPreview />
        </ProtectedRoute>
      } />
      
      {/* Offer Letter */}
      <Route path="/offer-letter/form" element={
        <ProtectedRoute>
          <NewOfferLetterForm />
        </ProtectedRoute>
      } />
      
      <Route path="/offer-letter/preview" element={
        <ProtectedRoute>
          <OfferLetterPreview />
        </ProtectedRoute>
      } />
      
      {/* Relieving Letter */}
      <Route path="/relieving-letter/form" element={
        <ProtectedRoute>
          <NewRelievingLetterForm />
        </ProtectedRoute>
      } />
      
      <Route path="/relieving-letter/preview" element={
        <ProtectedRoute>
          <RelievingLetterPreview />
        </ProtectedRoute>
      } />
      
      {/* Receipt Generator */}
      <Route path="/receipt" element={
        <ProtectedRoute>
          <ReceiptForm />
        </ProtectedRoute>
      } />
      
      {/* Redirects for backward compatibility */}
      <Route path="/new-experience-certificate" element={<Navigate to="/experience-certificate/form" replace />} />
      <Route path="/offer-letter" element={<Navigate to="/offer-letter/form" replace />} />
      <Route path="/relieving-letter" element={<Navigate to="/relieving-letter/form" replace />} />
      
      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
