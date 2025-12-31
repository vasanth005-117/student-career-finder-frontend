import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfileSetup from './pages/ProfileSetup';
import Questionnaire from './pages/Questionnaire';
import CareerRecommendations from './pages/CareerRecommendations';
import CareerDetails from './pages/CareerDetails';
import Dashboard from './pages/Dashboard';
import ProgressTracker from './pages/ProgressTracker';

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
      </div>
    </Router>
  );
}

export default App;
