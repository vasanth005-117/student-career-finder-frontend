import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProfileSetup = lazy(() => import('./pages/ProfileSetup'));
const Questionnaire = lazy(() => import('./pages/Questionnaire'));
const CareerRecommendations = lazy(() => import('./pages/CareerRecommendations'));
const CareerDetails = lazy(() => import('./pages/CareerDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProgressTracker = lazy(() => import('./pages/ProgressTracker'));

function App() {
     const [student, setStudent] = useState(null);

  useEffect(() => {
    // Check if student is logged in from localStorage
    const savedStudent = localStorage.getItem('student');
    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
  }, []);

  const handleLogin = (studentData) => {
    setStudent(studentData);
    localStorage.setItem('student', JSON.stringify(studentData));
  };

  const handleLogout = () => {
    setStudent(null);
    localStorage.removeItem('student');
  };

  return (
    <Router>
      <div className="App">
        <Suspense fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
            color: 'white',
            fontSize: '1.5rem'
          }}>
            Loading...
          </div>
        }>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
            <Route 
              path="/profile-setup" 
              element={student ? <ProfileSetup student={student} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/questionnaire" 
              element={student ? <Questionnaire student={student} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/recommendations" 
              element={student ? <CareerRecommendations student={student} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/career/:id" 
              element={student ? <CareerDetails student={student} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={student ? <Dashboard student={student} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/progress" 
              element={student ? <ProgressTracker student={student} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
