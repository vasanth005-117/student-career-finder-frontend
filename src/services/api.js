import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student APIs
export const studentAPI = {
  register: (studentData) => api.post('/students/register', studentData),
  login: (credentials) => api.post('/students/login', credentials),
  getById: (id) => api.get(`/students/${id}`),
  update: (id, studentData) => api.put(`/students/${id}`, studentData),
  delete: (id) => api.delete(`/students/${id}`),
};

// Career APIs
export const careerAPI = {
  getAll: () => api.get('/careers'),
  getById: (id) => api.get(`/careers/${id}`),
  getByCategory: (category) => api.get(`/careers/category/${category}`),
  search: (keyword) => api.get(`/careers/search?keyword=${keyword}`),
  recommend: (studentId) => api.get(`/careers/recommend/${studentId}`),
  getRecommended: (studentId) => api.get(`/careers/recommended/${studentId}`),
  create: (careerData) => api.post('/careers', careerData),
  update: (id, careerData) => api.put(`/careers/${id}`, careerData),
  delete: (id) => api.delete(`/careers/${id}`),
};

// Questionnaire APIs
export const questionnaireAPI = {
  getAll: () => api.get('/questionnaire'),
  getById: (id) => api.get(`/questionnaire/${id}`),
  getByStudent: (studentId) => api.get(`/questionnaire/student/${studentId}`),
  create: (studentId, responseData) => api.post(`/questionnaire/student/${studentId}`, responseData),
  saveBulk: (studentId, responses) => api.post(`/questionnaire/student/${studentId}/bulk`, responses),
  update: (id, responseData) => api.put(`/questionnaire/${id}`, responseData),
  delete: (id) => api.delete(`/questionnaire/${id}`),
};

// Progress APIs
export const progressAPI = {
  getAll: () => api.get('/progress'),
  getById: (id) => api.get(`/progress/${id}`),
  getByStudent: (studentId) => api.get(`/progress/student/${studentId}`),
  getByStudentAndCareer: (studentId, careerId) => 
    api.get(`/progress/student/${studentId}/career/${careerId}`),
  getCompleted: (studentId) => api.get(`/progress/student/${studentId}/completed`),
  create: (studentId, careerId, progressData) => 
    api.post(`/progress/student/${studentId}/career/${careerId}`, progressData),
  update: (id, progressData) => api.put(`/progress/${id}`, progressData),
  delete: (id) => api.delete(`/progress/${id}`),
};

// Achievement APIs
export const achievementAPI = {
  getAll: () => api.get('/achievements'),
  getById: (id) => api.get(`/achievements/${id}`),
  getByStudent: (studentId) => api.get(`/achievements/student/${studentId}`),
  create: (studentId, achievementData) => api.post(`/achievements/student/${studentId}`, achievementData),
  delete: (id) => api.delete(`/achievements/${id}`),
};

export default api;
