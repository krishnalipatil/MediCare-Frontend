import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterChoice from './pages/RegisterChoice';
import DoctorRegister from './pages/DoctorRegister';
import PatientRegister from './pages/PatientRegister';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<RegisterChoice />} />
      <Route path="/register/doctor" element={<DoctorRegister/>} />
      <Route path="/register/patient" element={<PatientRegister />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;