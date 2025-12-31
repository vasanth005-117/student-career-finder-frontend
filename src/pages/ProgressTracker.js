import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { progressAPI, careerAPI } from '../services/api';
import { ParticleBackground } from '../components/3DBackgrounds';
import './ProgressTracker.css';

function ProgressTracker({ student }) {
  const [progressItems, setProgressItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await progressAPI.getByStudent(student.id);
      
      // Fetch career details for each progress item
      const itemsWithCareers = await Promise.all(
        response.data.map(async (item) => {
          try {
            const careerRes = await careerAPI.getById(item.career.id);
            return { ...item, careerDetails: careerRes.data };
          } catch (err) {
            return item;
          }
        })
      );
      
      setProgressItems(itemsWithCareers);
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (item) => {
    try {
      await progressAPI.update(item.id, {
        ...item,
        completed: !item.completed,
        progressPercentage: item.completed ? item.progressPercentage : 100
      });
      fetchProgress();
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  return (
    <div className="progress-tracker-page">
      <ParticleBackground />
      
      <div className="progress-tracker-container">
        <header className="tracker-header">
          <button className="btn btn-back" onClick={() => navigate('/dashboard')}>
            ← Dashboard
          </button>
          <div>
            <h1 className="page-title">Career Path Progress</h1>
            <p className="page-subtitle">Track your journey toward your dream career</p>
          </div>
        </header>

        {loading ? (
          <div className="loading-spinner">Loading progress...</div>
        ) : progressItems.length === 0 ? (
          <div className="empty-state-section">
            <p>No progress tracked yet. Start by selecting a career path!</p>
            <button className="btn btn-primary" onClick={() => navigate('/recommendations')}>
              View Career Recommendations
            </button>
          </div>
        ) : (
          <div className="progress-roadmap">
            {progressItems.map((item, index) => (
              <div
                key={item.id}
                className={`progress-milestone ${item.completed ? 'completed' : 'pending'}`}
              >
                <div className="milestone-marker">
                  <div className="marker-circle">
                    {item.completed ? '✓' : index + 1}
                  </div>
                  {index < progressItems.length - 1 && <div className="connector-line"></div>}
                </div>

                <div className="milestone-content">
                  <div className="milestone-header">
                    <div>
                      <h3>{item.milestone}</h3>
                      <p className="career-title">
                        {item.careerDetails?.title || item.career?.title || 'Career Path'}
                      </p>
                    </div>
                    <span className={`status-badge ${item.completed ? 'completed' : 'in-progress'}`}>
                      {item.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>

                  {item.description && (
                    <p className="milestone-description">{item.description}</p>
                  )}

                  <div className="milestone-progress">
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${item.progressPercentage || 0}%` }}
                      ></div>
                    </div>
                    <span className="progress-percentage">
                      {item.progressPercentage || 0}%
                    </span>
                  </div>

                  {item.skillDeveloped && (
                    <div className="skill-developed">
                      <strong>Skill Developed:</strong> {item.skillDeveloped}
                    </div>
                  )}

                  {item.resources && (
                    <div className="resources">
                      <strong>Resources:</strong> {item.resources}
                    </div>
                  )}

                  {item.notes && (
                    <div className="notes">
                      <strong>Notes:</strong> {item.notes}
                    </div>
                  )}

                  <div className="milestone-actions">
                    <button
                      className={`btn ${item.completed ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => handleToggleComplete(item)}
                    >
                      {item.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressTracker;
