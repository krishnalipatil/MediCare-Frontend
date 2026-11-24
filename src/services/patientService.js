import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const registerPatient = async (patientData) => {
    const response = await axios.post(
        `${API_URL}/register/patient`,
        patientData
    );

    return response.data;
};