import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerAPI, progressAPI, achievementAPI } from '../services/api';
import { DashboardBackground } from '../components/3DBackgrounds';
import './Dashboard.css';

function Dashboard({ student, onLogout }) {
  const [stats, setStats] = useState({
    recommendedCareers: 0,
    milestonesCompleted: 0,
    achievementsEarned: 0,
    totalPoints: 0
  });
  const [recentCareers, setRecentCareers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [careersRes, progressRes, achievementsRes] = await Promise.all([
        careerAPI.getRecommended(student.id),
        progressAPI.getCompleted(student.id),
        achievementAPI.getByStudent(student.id)
      ]);

      setRecentCareers(careersRes.data.slice(0, 3));
      setAchievements(achievementsRes.data);

      const totalPoints = achievementsRes.data.reduce((sum, a) => sum + (a.pointsAwarded || 0), 0);

      setStats({
        recommendedCareers: careersRes.data.length,
        milestonesCompleted: progressRes.data.length,
        achievementsEarned: achievementsRes.data.length,
        totalPoints: totalPoints
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    }
  };

  return (
    <div className="dashboard-page">
      <DashboardBackground />
      
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome back, {student.name}! 👋</h1>
            <p>Continue your career exploration journey</p>
          </div>
          <button className="btn btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>{stats.recommendedCareers}</h3>
              <p>Career Matches</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{stats.milestonesCompleted}</h3>
              <p>Milestones Completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>{stats.achievementsEarned}</h3>
              <p>Achievements</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3>{stats.totalPoints}</h3>
              <p>Total Points</p>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-btn" onClick={() => navigate('/recommendations')}>
                <span className="action-icon">🎯</span>
                <span>View Career Recommendations</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/questionnaire')}>
                <span className="action-icon">📝</span>
                <span>Retake Questionnaire</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/progress')}>
                <span className="action-icon">📈</span>
                <span>Track Progress</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/profile-setup')}>
                <span className="action-icon">👤</span>
                <span>Update Profile</span>
              </button>
            </div>
          </div>

          <div className="section">
            <h2>Top Career Matches</h2>
            {recentCareers.length > 0 ? (
              <div className="careers-list">
                {recentCareers.map((career) => (
                  <div
                    key={career.id}
                    className="career-item"
                    onClick={() => navigate(`/career/${career.id}`)}
                  >
                    <div>
                      <h3>{career.title}</h3>
                      <p>{career.category}</p>
                    </div>
                    <span className="arrow">→</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Complete the questionnaire to get recommendations!</p>
            )}
          </div>

          <div className="section">
            <h2>Recent Achievements</h2>
            {achievements.length > 0 ? (
              <div className="achievements-list">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="achievement-item">
                    <span className="achievement-badge">{achievement.badgeType}</span>
                    <div>
                      <h3>{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Start your journey to earn achievements!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
