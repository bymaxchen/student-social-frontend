import axios from 'axios';
import { AuthContext } from '../AuthContext';

const api = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      // Add other headers here
    },
});

api.interceptors.response.use(response => {
  // Successful response, return it directly
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.setItem('isAuthenticated', false);
    window.location.reload();
  }
  return Promise.reject(error);
});


// Login Function
export const login = async ({email, password}) => {
  try {
    const response = await api.post('/users/signin', {
      email,
      password,
    });

    localStorage.setItem('id', response.data.id);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('gender', response.data.gender);
    localStorage.setItem('birthdate', response.data.birthdate);

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Logout Function
export const logout = async () => {
  try {
    await api.post('/users/logout');
  } catch (error) {
    console.error('Logout error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// get home post list
export const getHomePostList = async (page) => {
  const response = await api.get(`/posts/homeposts?page=${page}`);
  return response.data; 
};

export default api;
