
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    getAllAppointments,
    approveAppointment,
    rejectAppointment
} from '../services/appointmentService';

function DoctorAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));

    const loadAppointments = async () => {

        try {
            const response = await getAllAppointments();

            // Show only appointments belonging to this doctor
            const doctorAppointments = response.filter(
                (appointment) =>
                    Number(appointment.doctor?.user?.id) === Number(user.id)
            );

            setAppointments(doctorAppointments);

        } catch (error) {
            console.error(error);
            alert('Unable to load appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (!user || user.role !== 'DOCTOR') {
            alert('Please login as a doctor');
            navigate('/login');
            return;
        }

        loadAppointments();

    }, []);

    const handleApprove = async (id) => {

        try {
            await approveAppointment(id);
            alert('Appointment approved successfully!');
            loadAppointments();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Unable to approve appointment'
            );
        }
    };

    const handleReject = async (id) => {

        try {
            await rejectAppointment(id);
            alert('Appointment rejected successfully!');
            loadAppointments();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Unable to reject appointment'
            );
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading appointments...</div>;
    }

    return (
        <div className="container mt-5">

            <h2>Patient Appointments</h2>

            {appointments.length === 0 ? (

                <div className="alert alert-info mt-3">
                    No appointments received yet.
                </div>

            ) : (

                <div className="table-responsive mt-4">

                    <table className="table table-bordered table-striped">

                        <thead>
                            <tr>
                                <th>Patient</th>
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
                                        {appointment.patient?.user?.name}
                                    </td>

                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.status}</td>

                                    <td>
                                        {appointment.status === 'PENDING' ? (
                                            <>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() =>
                                                        handleApprove(appointment.id)
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleReject(appointment.id)
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
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

        </div>
    );
}

export default DoctorAppointments;
