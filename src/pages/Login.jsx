
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

function Login() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    async function onSubmit(data) {

        console.log("Entered Email:", data.email);

        try {

            const response = await loginUser(data);

            console.log("Login Response:", response);

            // Save user details
            localStorage.setItem("user", JSON.stringify(response));

            alert("Login successful!");

            navigate('/dashboard');

        } catch (error) {

            console.log("Login Error:", error.response?.data);

            console.log("Status Code:", error.response?.status);

            if (error.response) {

                alert(
                    error.response.data.message ||
                    "Invalid email or password"
                );

            } else {

                alert("Unable to connect to backend");

            }
        }
    }

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            MediCare Login
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Email Field */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required"
                                    })}
                                />

                                <small className="text-danger">
                                    {errors.email?.message}
                                </small>

                            </div>

                            {/* Password Field */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                />

                                <small className="text-danger">
                                    {errors.password?.message}
                                </small>

                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;