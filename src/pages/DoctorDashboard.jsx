
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        alert('Logged out successfully');
        navigate('/login');
    };

    if (!user || user.role !== 'DOCTOR') {
        return (
            <div className="container mt-5">
                <h3>Please login as a doctor.</h3>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">

            <h2>Doctor Dashboard</h2>

            <div className="card p-4 mt-3">

                <h4>Welcome, {user.name}!</h4>

                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>

                <hr />

                <button
                    className="btn btn-primary mb-3"
                    onClick={() => navigate('/doctor-appointments')}
                >
                    View Patient Appointments
                </button>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default DoctorDashboard;
