import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../services/api';
import { ParticleBackground } from '../components/3DBackgrounds';
import './ProfileSetup.css';

function ProfileSetup({ student }) {
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    academicLevel: '',
    gpa: '',
    interests: '',
    skills: '',
    extracurriculars: '',
    favoriteSubjects: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await studentAPI.update(student.id, formData);
      navigate('/questionnaire');
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-page">
      <ParticleBackground />
      
      <div className="profile-setup-container">
        <div className="profile-setup-card">
          <h1 className="page-title">Complete Your Profile</h1>
          <p className="page-subtitle">Help us understand you better</p>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="academicLevel">Academic Level</label>
                <select
                  id="academicLevel"
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleChange}
                >
                  <option value="">Select Level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gpa">GPA (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  placeholder="4.0 scale"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="favoriteSubjects">Favorite Subjects</label>
              <input
                type="text"
                id="favoriteSubjects"
                name="favoriteSubjects"
                value={formData.favoriteSubjects}
                onChange={handleChange}
                placeholder="e.g., Mathematics, Science, Art"
              />
            </div>

            <div className="form-group">
              <label htmlFor="interests">Interests & Hobbies</label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Tell us about your interests and hobbies"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="List your skills (e.g., programming, communication, leadership)"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="extracurriculars">Extracurricular Activities</label>
              <textarea
                id="extracurriculars"
                name="extracurriculars"
                value={formData.extracurriculars}
                onChange={handleChange}
                placeholder="Clubs, sports, volunteer work, etc."
                rows="3"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Saving...' : 'Continue to Questionnaire'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
