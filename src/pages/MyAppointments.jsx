
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    getPatientAppointments,
    cancelAppointment
} from '../services/appointmentService';

function MyAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));

    const loadAppointments = async () => {

        try {
            const response = await getPatientAppointments(user.patientId);
            setAppointments(response);
        } catch (error) {
            console.error(error);
            alert('Unable to load appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (!user || user.role !== 'PATIENT' || !user.patientId) {
            alert('Please login as a patient');
            navigate('/login');
            return;
        }

        loadAppointments();

    }, []);

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(
            'Are you sure you want to cancel this appointment?'
        );

        if (!confirmCancel) return;

        try {
            await cancelAppointment(id);
            alert('Appointment cancelled successfully!');
            loadAppointments();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Unable to cancel appointment'
            );
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading appointments...</div>;
    }

    return (
        <div className="container mt-5">

            <h2>My Appointments</h2>

            {appointments.length === 0 ? (

                <div className="alert alert-info mt-3">
                    No appointments found.
                </div>

            ) : (

                <div className="table-responsive mt-4">

                    <table className="table table-bordered table-striped">

                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Specialization</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((appointment) => (

                                <tr key={appointment.id}>

                                    <td>
                                        {appointment.doctor?.user?.name}
                                    </td>

                                    <td>
                                        {appointment.doctor?.specialization}
                                    </td>

                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.status}</td>

                                    <td>
                                        {['PENDING', 'APPROVED'].includes(
                                            appointment.status
                                        ) ? (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleCancel(appointment.id)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}

            <button
                className="btn btn-primary mt-3"
                onClick={() => navigate('/doctors')}
            >
                Book New Appointment
            </button>

        </div>
    );
}

export default MyAppointments;
