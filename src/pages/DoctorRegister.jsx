
import { useForm } from 'react-hook-form';
import { registerDoctor } from '../services/doctorService';

function DoctorRegister() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Form submission
  async function onSubmit(data) {

    try {

      console.log("Doctor Data:", data);

      const response = await registerDoctor(data);

      alert('Doctor registered successfully!');

      console.log("Registration Response:", response);

    } catch (error) {

      console.log("FULL ERROR:", error);
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR REQUEST:", error.request);

      if (error.response) {

        alert(
          "Backend Error: " +
          JSON.stringify(error.response.data)
        );

      } else if (error.request) {

        alert(
          "No response received from backend. Check server and API URL."
        );

      } else {

        alert("Request Error: " + error.message);

      }

    }

  }

  return (
    <div className="container mt-5 mb-5">

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '650px' }}>

        <h2 className="text-center text-primary mb-4">
          Doctor Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter your name"
              {...register('name', {
                required: 'Name is required',
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: 'Name should contain only letters'
                }
              })}
            />

            <div className="invalid-feedback">
              {errors.name?.message}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address'
                }
              })}
            />

            <div className="invalid-feedback">
              {errors.email?.message}
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must contain at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                  message: 'Include uppercase, lowercase, number and special character'
                }
              })}
            />

            <div className="invalid-feedback">
              {errors.password?.message}
            </div>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone</label>

            <input
              type="tel"
              maxLength="10"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              placeholder="Enter 10-digit mobile number"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Enter a valid 10-digit Indian mobile number'
                }
              })}
            />

            <div className="invalid-feedback">
              {errors.phone?.message}
            </div>
          </div>

          {/* Specialization */}
          <div className="mb-3">
            <label className="form-label">Specialization</label>

            <input
              type="text"
              className={`form-control ${errors.specialization ? 'is-invalid' : ''}`}
              placeholder="e.g. Cardiologist"
              {...register('specialization', {
                required: 'Specialization is required'
              })}
            />

            <div className="invalid-feedback">
              {errors.specialization?.message}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-3">
            <label className="form-label">Experience (Years)</label>

            <input
              type="number"
              className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
              placeholder="Enter experience"
              {...register('experience', {
                required: 'Experience is required',
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'Experience cannot be negative'
                },
                max: {
                  value: 70,
                  message: 'Experience cannot exceed 70 years'
                },
                validate: value =>
                  Number.isInteger(value) || 'Enter whole years only'
              })}
            />

            <div className="invalid-feedback">
              {errors.experience?.message}
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="mb-3">
            <label className="form-label">Consultation Fee</label>

            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.consultationFee ? 'is-invalid' : ''}`}
              placeholder="Enter consultation fee"
              {...register('consultationFee', {
                required: 'Consultation fee is required',
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: 'Fee must be greater than zero'
                }
              })}
            />

            <div className="invalid-feedback">
              {errors.consultationFee?.message}
            </div>
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label">Location</label>

            <input
              type="text"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              placeholder="Enter location"
              {...register('location', {
                required: 'Location is required'
              })}
            />

            <div className="invalid-feedback">
              {errors.location?.message}
            </div>
          </div>

          {/* Qualification */}
          <div className="mb-3">
            <label className="form-label">Qualification</label>

            <input
              type="text"
              className={`form-control ${errors.qualification ? 'is-invalid' : ''}`}
              placeholder="e.g. MBBS, MD"
              {...register('qualification', {
                required: 'Qualification is required'
              })}
            />

            <div className="invalid-feedback">
              {errors.qualification?.message}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default DoctorRegister;
