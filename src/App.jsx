import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterChoice from './pages/RegisterChoice';
import DoctorRegister from './pages/DoctorRegister';
import PatientRegister from './pages/PatientRegister';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<RegisterChoice />} />
      <Route path="/register/doctor" element={<DoctorRegister/>} />
      <Route path="/register/patient" element={<PatientRegister />} />


      </Routes>

    </BrowserRouter>
  );
}

export default App;