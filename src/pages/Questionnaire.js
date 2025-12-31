import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionnaireAPI, studentAPI, careerAPI } from '../services/api';
import { ParticleBackground } from '../components/3DBackgrounds';
import './Questionnaire.css';

const questions = [
  {
    id: 1,
    category: 'Interests',
    text: 'Do you prefer working with numbers, people, or creative tasks?',
    options: ['Numbers & Data', 'People & Communication', 'Creative & Artistic', 'Hands-on & Technical']
  },
  {
    id: 2,
    category: 'Skills',
    text: 'How would you rate your communication skills?',
    options: ['Excellent', 'Good', 'Average', 'Need Improvement']
  },
  {
    id: 3,
    category: 'Skills',
    text: 'How would you rate your problem-solving skills?',
    options: ['Excellent', 'Good', 'Average', 'Need Improvement']
  },
  {
    id: 4,
    category: 'Skills',
    text: 'How would you rate your analytical thinking?',
    options: ['Excellent', 'Good', 'Average', 'Need Improvement']
  },
  {
    id: 5,
    category: 'Skills',
    text: 'How would you rate your creativity?',
    options: ['Excellent', 'Good', 'Average', 'Need Improvement']
  },
  {
    id: 6,
    category: 'Skills',
    text: 'How would you rate your leadership skills?',
    options: ['Excellent', 'Good', 'Average', 'Need Improvement']
  },
  {
    id: 7,
    category: 'Personality',
    text: 'Do you prefer working independently or in a team?',
    options: ['Independently', 'In a Team', 'Both Equally', 'It Depends']
  },
  {
    id: 8,
    category: 'Personality',
    text: 'Are you more introverted or extroverted?',
    options: ['Very Introverted', 'Somewhat Introverted', 'Somewhat Extroverted', 'Very Extroverted']
  },
  {
    id: 9,
    category: 'Career',
    text: 'What type of work environment do you prefer?',
    options: ['Office', 'Remote', 'Field Work', 'Laboratory/Studio', 'Flexible/Hybrid']
  },
  {
    id: 10,
    category: 'Career',
    text: 'What motivates you most in a career?',
    options: ['High Salary', 'Job Satisfaction', 'Helping Others', 'Innovation & Creativity', 'Job Security']
  }
];

function Questionnaire({ student }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion];
    setAnswers({
      ...answers,
      [question.id]: {
        questionText: question.text,
        answer: answer,
        questionCategory: question.category
      }
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Save questionnaire responses
      const responses = Object.values(answers);
      await questionnaireAPI.saveBulk(student.id, responses);

      // Update student profile with skill ratings
      const communicationAnswer = answers[2]?.answer || 'Average';
      const problemSolvingAnswer = answers[3]?.answer || 'Average';
      const analyticalAnswer = answers[4]?.answer || 'Average';
      const creativityAnswer = answers[5]?.answer || 'Average';
      const leadershipAnswer = answers[6]?.answer || 'Average';

      await studentAPI.update(student.id, {
        communicationSkill: communicationAnswer,
        problemSolvingSkill: problemSolvingAnswer,
        analyticalSkill: analyticalAnswer,
        creativitySkill: creativityAnswer,
        leadershipSkill: leadershipAnswer
      });

      // Generate career recommendations
      await careerAPI.recommend(student.id);

      navigate('/recommendations');
    } catch (err) {
      console.error('Failed to submit questionnaire:', err);
    } finally {
      setLoading(false);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswer = answers[question.id] !== undefined;

  return (
    <div className="questionnaire-page">
      <ParticleBackground />
      
      <div className="questionnaire-container">
        <div className="questionnaire-card">
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{currentQuestion + 1} / {questions.length}</span>
          </div>

          <div className="question-section">
            <h2 className="question-category">{question.category}</h2>
            <h1 className="question-text">{question.text}</h1>
          </div>

          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${answers[question.id]?.answer === option ? 'selected' : ''}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="navigation-buttons">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            {isLastQuestion && hasAnswer ? (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Get Recommendations'}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!hasAnswer || isLastQuestion}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
