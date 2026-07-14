import axios from "axios";

const API_URL = "http://localhost:5000/users";

/**
 * Log in a user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} The backend JSON response data
 */
export async function login(email, password) {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
}

/**
 * Register a new user.
 * @param {object} userData { name, email, password }
 * @returns {Promise<object>} The backend JSON response data
 */
export async function register(userData) {
  const response = await axios.post(`${API_URL}/CreateUser`, userData);
  return response.data;
}
