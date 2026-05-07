import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AssessmentLayout } from './pages/AssessmentLayout';
import { AssessmentIndex } from './pages/AssessmentIndex';
import { Step0BusinessType } from './pages/Step0BusinessType';
import { AssessmentStep } from './pages/AssessmentStep';
import { AssessmentResults } from './pages/AssessmentResults';

function App() {
  const loadSession = useAuthStore((s) => s.loadSession);
  const sessionLoading = useAuthStore((s) => s.sessionLoading);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-secondary text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assessment" element={<AssessmentLayout />}>
          <Route index element={<AssessmentIndex />} />
          <Route path="step" element={<Navigate to="/assessment" replace />} />
          <Route path="step/:step" element={<AssessmentStep />} />
          <Route path="results" element={<AssessmentResults />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
