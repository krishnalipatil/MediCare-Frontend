import { Link } from 'react-router-dom';

function RegisterChoice() {

  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h1 className="text-primary fw-bold">MediCare</h1>

        <h5>Doctor Appointment Management System</h5>

        <h3 className="mt-4">Join MediCare</h3>

        <p>How would you like to register?</p>
      </div>

      <div className="row justify-content-center">

        <div className="col-md-4 mb-3">
          <div className="card shadow text-center p-4">

            <h3>Doctor</h3>

            <p>Register as a doctor and provide healthcare services.</p>

            <Link
              to="/register/doctor"
              className="btn btn-primary"
            >
              Register as Doctor
            </Link>

          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow text-center p-4">

            <h3>Patient</h3>

            <p>Register as a patient and book doctor appointments.</p>

            <Link
              to="/register/patient"
              className="btn btn-success"
            >
              Register as Patient
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default RegisterChoice;