
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getDoctorById } from '../services/doctorService';
import { bookAppointment } from '../services/appointmentService';

function BookAppointment() {

    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDoctor = async () => {
            try {
                const response = await getDoctorById(doctorId);
                setDoctor(response);
            } catch (error) {
                alert('Unable to load doctor details');
            } finally {
                setLoading(false);
            }
        };

        loadDoctor();

    }, [doctorId]);

    const handleBooking = async (e) => {

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || user.role !== 'PATIENT') {
            alert('Please login as a patient');
            navigate('/login');
            return;
        }

        // patientId must be the Patient entity ID
        if (!user.patientId) {
            alert('Patient ID is missing. Please check your login response.');
            return;
        }

        const appointmentData = {
            patientId: user.patientId,
            doctorId: Number(doctorId),
            appointmentDate: date,
            appointmentTime: time,
            reason: reason
        };

        try {

            await bookAppointment(appointmentData);

            alert('Appointment booked successfully!');
            navigate('/appointments');

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                'Unable to book appointment'
            );
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading doctor...</div>;
    }

    if (!doctor) {
        return <div className="container mt-5">Doctor not found</div>;
    }

    return (
        <div className="container mt-5">

            <h2>Book Appointment</h2>

            <div className="card p-4 mt-3">

                <h4>Doctor Details</h4>

                <p><strong>Name:</strong> {doctor.user?.name}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Qualification:</strong> {doctor.qualification}</p>
                <p><strong>Consultation Fee:</strong> ₹{doctor.consultationFee}</p>

                <hr />

                <form onSubmit={handleBooking}>

                    <div className="mb-3">
                        <label className="form-label">Appointment Date</label>
                        <input
                            type="date"
                            className="form-control"
                            min={new Date().toLocaleDateString('en-CA')}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Appointment Time</label>
                        <input
                            type="time"
                            className="form-control"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Reason for Appointment</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter your reason"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Confirm Appointment
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => navigate('/doctors')}
                    >
                        Back
                    </button>

                </form>
            </div>
        </div>
    );
}

export default BookAppointment;
