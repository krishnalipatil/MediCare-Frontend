
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Doctor Registration
export const registerDoctor = async (doctorData) => {
    const response = await axios.post(
        `${API_URL}/register/doctor`,
        doctorData
    );

    return response.data;
};

// Patient Registration
export const registerPatient = async (patientData) => {
    const response = await axios.post(
        `${API_URL}/register/patient`,
        patientData
    );

    return response.data;
};

// User Login
export const loginUser = async (loginData) => {
    const response = await axios.post(
        `${API_URL}/login`,
        loginData
    );

    return response.data;
};
