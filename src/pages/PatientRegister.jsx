
import { useForm } from 'react-hook-form';
import { registerPatient } from '../services/patientService';

function PatientRegister() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function onSubmit(data) {

        try {

            const response = await registerPatient(data);

            alert("Patient registered successfully!");

            console.log(response);

        } catch (error) {

            console.log(error);

            if (error.response) {
                alert(error.response.data.message || "Registration failed");
            } else {
                alert("Unable to connect to backend");
            }
        }
    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Patient Registration
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    {...register("name", { required: "Name is required" })}
                                />
                                <small className="text-danger">{errors.name?.message}</small>
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    {...register("email", { required: "Email is required" })}
                                />
                                <small className="text-danger">{errors.email?.message}</small>
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Minimum 8 characters required"
                                        }
                                    })}
                                />
                                <small className="text-danger">{errors.password?.message}</small>
                            </div>

                            <div className="mb-3">
                                <label>Phone</label>
                                <input
                                    className="form-control"
                                    {...register("phone", {
                                        required: "Phone is required",
                                        pattern: {
                                            value: /^[6-9]\d{9}$/,
                                            message: "Enter a valid 10-digit phone number"
                                        }
                                    })}
                                />
                                <small className="text-danger">{errors.phone?.message}</small>
                            </div>

                            <div className="mb-3">
                                <label>Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register("age", {
                                        required: "Age is required",
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "Age must be at least 1"
                                        },
                                        max: {
                                            value: 120,
                                            message: "Enter a valid age"
                                        }
                                    })}
                                />
                                <small className="text-danger">{errors.age?.message}</small>
                            </div>

                            <div className="mb-3">
                                <label>Gender</label>
                                <select
                                    className="form-select"
                                    {...register("gender", { required: "Select gender" })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <small className="text-danger">{errors.gender?.message}</small>
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    {...register("address", { required: "Address is required" })}
                                ></textarea>
                                <small className="text-danger">{errors.address?.message}</small>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Register
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PatientRegister;
