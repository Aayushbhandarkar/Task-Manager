import axios from 'axios';

const API_BASE_URL = 'https://task-manager-backend-5uwb.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Set token function
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Corrected API paths
export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  register: (username, email, password) =>
    api.post('/api/auth/register', { username, email, password })
};

export const tasksAPI = {
  getTasks: () => api.get('/api/tasks'),
  createTask: (taskData) => api.post('/api/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/api/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/api/tasks/${id}`)
};

export default api;
