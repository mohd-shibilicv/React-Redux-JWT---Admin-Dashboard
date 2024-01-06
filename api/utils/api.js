import axios from 'axios';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('/api/user/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};
