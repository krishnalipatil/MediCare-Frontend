
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/appointments';

// Book appointment
export const bookAppointment = async (appointmentData) => {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
};

// Get all appointments
export const getAllAppointments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get appointments of a patient
export const getPatientAppointments = async (patientId) => {
    const response = await axios.get(
        `${API_URL}/patient/${patientId}`
    );
    return response.data;
};

// Approve appointment
export const approveAppointment = async (id) => {
    const response = await axios.put(
        `${API_URL}/${id}/status`,
        null,
        { params: { status: 'APPROVED' } }
    );
    return response.data;
};

// Reject appointment
export const rejectAppointment = async (id) => {
    const response = await axios.put(
        `${API_URL}/${id}/status`,
        null,
        { params: { status: 'REJECTED' } }
    );
    return response.data;
};

// Cancel appointment
export const cancelAppointment = async (id) => {
    const response = await axios.put(
        `${API_URL}/${id}/cancel`
    );
    return response.data;
};
