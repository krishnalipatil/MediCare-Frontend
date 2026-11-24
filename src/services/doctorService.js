
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const registerDoctor = async (doctorData) => {

  const response = await axios.post(
    `${API_URL}/register/doctor`,
    doctorData
  );

  return response.data;
};
