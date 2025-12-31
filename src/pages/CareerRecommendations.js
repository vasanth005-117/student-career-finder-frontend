import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerAPI } from '../services/api';
import { ParticleBackground } from '../components/3DBackgrounds';
import './CareerRecommendations.css';

function CareerRecommendations({ student }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await careerAPI.getRecommended(student.id);
      setCareers(response.data);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': '#6366f1',
      'Healthcare': '#10b981',
      'Business': '#f59e0b',
      'Engineering': '#8b5cf6',
      'Arts': '#ec4899',
      'Law': '#06b6d4',
    };
    return colors[category] || '#6366f1';
  };

  return (
    <div className="recommendations-page">
      <ParticleBackground />
      
      <div className="recommendations-container">
        <div className="recommendations-header">
          <h1 className="page-title">Your Career Recommendations</h1>
          <p className="page-subtitle">Based on your profile and questionnaire responses</p>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading recommendations...</div>
        ) : careers.length === 0 ? (
          <div className="no-results">
            <p>No recommendations found. Please complete your profile and questionnaire.</p>
            <button className="btn btn-primary" onClick={() => navigate('/questionnaire')}>
              Take Questionnaire
            </button>
          </div>
        ) : (
          <div className="careers-grid">
            {careers.map((career) => (
              <div
                key={career.id}
                className="career-card"
                onClick={() => navigate(`/career/${career.id}`)}
              >
                <div className="career-header">
                  <span
                    className="career-category"
                    style={{ backgroundColor: getCategoryColor(career.category) }}
                  >
                    {career.category}
                  </span>
                  {career.demandScore && (
                    <span className="demand-score">
                      🔥 {career.demandScore}% Demand
                    </span>
                  )}
                </div>

                <h2 className="career-title">{career.title}</h2>
                <p className="career-description">{career.description}</p>

                <div className="career-info">
                  <div className="info-item">
                    <span className="info-label">💰 Salary Range:</span>
                    <span className="info-value">
                      {career.salaryRangeMin} - {career.salaryRangeMax}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">📚 Education:</span>
                    <span className="info-value">{career.educationRequirements}</span>
                  </div>
                </div>

                <button className="btn btn-outline">View Details</button>
              </div>
            ))}
          </div>
        )}

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerRecommendations;
