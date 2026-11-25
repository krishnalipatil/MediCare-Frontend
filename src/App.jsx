
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Authentication pages
import Login from './pages/Login';
import DoctorRegister from './pages/DoctorRegister';
import PatientRegister from './pages/PatientRegister';

// Dashboard pages
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

// Doctor pages
import DoctorList from './pages/DoctorList';

// Appointment pages
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import DoctorAppointments from './pages/DoctorAppointments';

function App() {

    return (
        <BrowserRouter>
            <Routes>

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register/doctor" element={<DoctorRegister />} />
                <Route path="/register/patient" element={<PatientRegister />} />

                {/* Dashboard Routes */}
                <Route
                    path="/patient-dashboard"
                    element={<PatientDashboard />}
                />

                <Route
                    path="/doctor-dashboard"
                    element={<DoctorDashboard />}
                />

                <Route
                    path="/admin-dashboard"
                    element={<h2>Admin Dashboard</h2>}
                />

                {/* Doctor Routes */}
                <Route path="/doctors" element={<DoctorList />} />

                {/* Appointment Routes */}
                <Route
                    path="/book-appointment/:doctorId"
                    element={<BookAppointment />}
                />

                <Route
                    path="/appointments"
                    element={<MyAppointments />}
                />

                <Route
                    path="/doctor-appointments"
                    element={<DoctorAppointments />}
                />

                {/* Invalid Route */}
                <Route path="*" element={<Navigate to="/login" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
