import axios from 'axios';

export const fetchDeleteUser = async (userId) => {
  try {
    await axios.delete(`/api/user/delete/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
