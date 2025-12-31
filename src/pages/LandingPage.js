import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ParticleBackground } from '../components/3DBackgrounds';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <ParticleBackground />
      
      <div className="landing-content">
        <header className="landing-header">
          <h1 className="landing-title">
            <span className="gradient-text">Career Path Finder</span>
          </h1>
          <p className="landing-subtitle">
            Discover your perfect career through AI-powered recommendations
          </p>
        </header>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Questionnaire</h3>
            <p>Answer personalized questions to help us understand your interests and skills</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>AI Recommendations</h3>
            <p>Get career suggestions tailored to your unique profile and personality</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Progress Tracking</h3>
            <p>Track your journey with milestones and achievements</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Education Guidance</h3>
            <p>Learn what education and skills you need for your dream career</p>
          </div>
        </div>

        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/signup')}>
            Get Started
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
