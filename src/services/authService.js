import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
     "ngrok-skip-browser-warning": "true",
  },
});

// Add token to requests if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {

 
  /**
 * Login user with email and 4-digit PIN
 * @param {string} email - User's registered email address
 * @param {string} pin   - User's 4-digit PIN
 * @returns {Promise} Response containing access_token and user data
 */
login: async (email, pin) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      pin,   // Backend must expect "pin" field (not "password")
    });

    return response.data; // Expected: { access_token, user, message?, etc. }
  } catch (error) {
    // Better error handling for the user
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Invalid email or PIN. Please try again.';

    // Re-throw so your component can catch it
    throw new Error(errorMsg);
  }
},

  /**
     * Register new user (UPDATED for PIN + Phone)
     * @param {string} username 
     * @param {string} email 
     * @param {string} pin      
     * @param {string} phone     
     * @returns {Promise}
     */
  signup: async (username, email, pin, phone) => {
    try {
      const response = await apiClient.post('/auth/register', {
        username,
        email,
        pin,     
        phone,
      });
      return response.data;
    } catch (error) {
      console.log("Error inSignup",error?.response?.data?.detail)
      // const msg = error.response?.data?.message || error.response?.data?.error || 'Signup failed';
       const msg = error?.response?.data?.detail ||  error.response?.data?.message || error.response?.data?.error || 'Signup failed';
     throw new Error(msg);
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Get current user data
   * @returns {Promise} User data
   */
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user' };
    }
  },

  /**
 * Get all users
 * @returns {Promise} List of users
 */
getAllUsers: async () => {
  try {
    const response = await apiClient.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
},

/**
   * Delete a user (Admin only)
   * @param {string} userId - The _id of the user to delete
   * @returns {Promise<void>}
   */
  deleteUser: async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      await apiClient.delete(`/admin/users/${userId}`);

    } catch (error) {
      console.error('Error deleting user:', error);
      throw error.response?.data || { message: 'Failed to delete user' };
    }
  },

updateUser: async (id, data) => {
  try {
    const res = await apiClient.patch(`/admin/users/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Update failed" };
  }
},

};

export default authService;
