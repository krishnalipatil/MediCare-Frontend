import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterChoice from './pages/RegisterChoice';
import DoctorRegister from './pages/DoctorRegister';
import PatientRegister from './pages/PatientRegister';
<<<<<<< HEAD
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

=======
>>>>>>> fe47e0c1f3b0ca8d50405698173b43f187ff4a3b

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<RegisterChoice />} />
      <Route path="/register/doctor" element={<DoctorRegister/>} />
      <Route path="/register/patient" element={<PatientRegister />} />

<<<<<<< HEAD
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
=======

>>>>>>> fe47e0c1f3b0ca8d50405698173b43f187ff4a3b
      </Routes>

    </BrowserRouter>
  );
}

export default App;