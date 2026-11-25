
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors } from '../services/doctorService';

function DoctorList() {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const response = await getAllDoctors();
            setDoctors(response);
        } catch (error) {
            alert('Unable to load doctors');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h3>Loading doctors...</h3>;
    }

    return (
        <div>
            <h2>Available Doctors</h2>

            {doctors.length === 0 ? (
                <p>No doctors available.</p>
            ) : (
                doctors.map((doctor) => (
                    <div key={doctor.id}>
                        <h3>{doctor.user?.name}</h3>
                        <p>Specialization: {doctor.specialization}</p>
                        <p>Qualification: {doctor.qualification}</p>
                        <p>Experience: {doctor.experience} years</p>
                        <p>Location: {doctor.location}</p>
                        <p>Consultation Fee: ₹{doctor.consultationFee}</p>

                        <button
                            onClick={() =>
                                navigate(`/book-appointment/${doctor.id}`)
                            }
                        >
                            Book Appointment
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default DoctorList;
