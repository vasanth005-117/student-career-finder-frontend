import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { careerAPI, progressAPI } from '../services/api';
import { ParticleBackground } from '../components/3DBackgrounds';
import './CareerDetails.css';

function CareerDetails({ student }) {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCareerDetails();
  }, [id]);

  const fetchCareerDetails = async () => {
    try {
      const response = await careerAPI.getById(id);
      setCareer(response.data);
    } catch (err) {
      console.error('Failed to fetch career details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTracking = async () => {
    try {
      await progressAPI.create(student.id, id, {
        milestone: 'Started Career Path',
        description: `Started tracking progress for ${career.title}`,
        progressPercentage: 0
      });
      navigate('/progress');
    } catch (err) {
      console.error('Failed to start tracking:', err);
    }
  };

  if (loading) {
    return (
      <div className="career-details-page">
        <ParticleBackground />
        <div className="loading-spinner">Loading career details...</div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="career-details-page">
        <ParticleBackground />
        <div className="error-message">Career not found</div>
      </div>
    );
  }

  return (
    <div className="career-details-page">
      <ParticleBackground />
      
      <div className="career-details-container">
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="career-header-section">
          <div className="career-badge">{career.category}</div>
          <h1 className="career-main-title">{career.title}</h1>
          <p className="career-main-description">{career.description}</p>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <h3>💰 Salary Range</h3>
            <p className="highlight">{career.salaryRangeMin} - {career.salaryRangeMax}</p>
          </div>

          <div className="detail-card">
            <h3>📊 Job Outlook</h3>
            <p>{career.jobOutlook}</p>
          </div>

          <div className="detail-card">
            <h3>🔥 Market Demand</h3>
            <div className="demand-meter">
              <div className="demand-bar" style={{ width: `${career.demandScore}%` }}></div>
            </div>
            <p>{career.demandScore}% High Demand</p>
          </div>

          <div className="detail-card">
            <h3>🏢 Work Environment</h3>
            <p>{career.workEnvironment || 'Varies by position'}</p>
          </div>
        </div>

        <div className="info-sections">
          <div className="info-section">
            <h2>📚 Education Requirements</h2>
            <p>{career.educationRequirements}</p>
          </div>

          <div className="info-section">
            <h2>💡 Skills Required</h2>
            <div className="skills-tags">
              {career.skillsRequired?.split(',').map((skill, index) => (
                <span key={index} className="skill-tag">{skill.trim()}</span>
              ))}
            </div>
          </div>

          <div className="info-section">
            <h2>🎓 Possible Majors</h2>
            <p>{career.possibleMajors}</p>
          </div>

          <div className="info-section">
            <h2>👤 Personality Traits</h2>
            <p>{career.personalityTraits}</p>
          </div>

          {career.certifications && (
            <div className="info-section">
              <h2>📜 Certifications</h2>
              <p>{career.certifications}</p>
            </div>
          )}

          {career.typicalDayDescription && (
            <div className="info-section">
              <h2>📅 A Typical Day</h2>
              <p>{career.typicalDayDescription}</p>
            </div>
          )}
        </div>

        <div className="action-section">
          <button className="btn btn-primary btn-large" onClick={handleStartTracking}>
            Start Tracking This Career Path
          </button>
          <button className="btn btn-secondary btn-large" onClick={() => navigate('/recommendations')}>
            View Other Careers
          </button>
        </div>
      </div>
    </div>
  );
}

export default CareerDetails;
