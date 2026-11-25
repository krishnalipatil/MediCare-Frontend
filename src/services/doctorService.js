
import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/api/auth';
const DOCTOR_URL = 'http://localhost:8080/api/doctors';

// Doctor Registration
export const registerDoctor = async (doctorData) => {
    const response = await axios.post(
        `${AUTH_URL}/register/doctor`,
        doctorData
    );

    return response.data;
};

// Get All Doctors
export const getAllDoctors = async () => {
    const response = await axios.get(DOCTOR_URL);
    return response.data;
};

// Get Doctor By ID
export const getDoctorById = async (id) => {
    const response = await axios.get(`${DOCTOR_URL}/${id}`);
    return response.data;
};

// Search Doctors By Specialization
export const searchDoctors = async (specialization) => {
    const response = await axios.get(`${DOCTOR_URL}/search`, {
        params: { specialization }
    });

    return response.data;
};

// Search Doctors By Location
export const searchDoctorsByLocation = async (location) => {
    const response = await axios.get(`${DOCTOR_URL}/location`, {
        params: { location }
    });

    return response.data;
};
