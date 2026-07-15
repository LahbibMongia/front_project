import axios from 'axios';

// Assuming you have a base API instance configured elsewhere (e.g., apiClient.js)
// If not, you can replace 'axios' with your configured instance.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Creates a new reservation.
 * @POST /reservations
 * @param {Object} reservationData - The details of the reservation (e.g., parentId, babysitterId, date, times).
 * @returns {Promise<Object>} The created reservation object.
 */
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, reservationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Retrieves all reservations associated with a specific parent.
 * @GET /reservations/parent/:parentId
 * @param {string|number} parentId - The unique identifier of the parent.
 * @returns {Promise<Array>} List of reservations for the parent.
 */
export const getParentReservations = async (parentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations/parent/${parentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Retrieves all reservations associated with a specific babysitter.
 * @GET /reservations/babysitter/:babysitterId
 * @param {string|number} babysitterId - The unique identifier of the babysitter.
 * @returns {Promise<Array>} List of reservations for the babysitter.
 */
export const getBabysitterReservations = async (babysitterId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations/babysitter/${babysitterId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Cancels an existing reservation.
 * @PATCH /reservations/:id/cancel
 * @param {string|number} id - The reservation ID.
 * @returns {Promise<Object>} The updated reservation details.
 */
export const cancelReservation = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/reservations/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Confirms a pending reservation.
 * @PATCH /reservations/:id/confirm
 * @param {string|number} id - The reservation ID.
 * @returns {Promise<Object>} The updated reservation details.
 */
export const confirmReservation = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/reservations/${id}/confirm`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Rejects a pending reservation.
 * @PATCH /reservations/:id/reject
 * @param {string|number} id - The reservation ID.
 * @returns {Promise<Object>} The updated reservation details.
 */
export const rejectReservation = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/reservations/${id}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};