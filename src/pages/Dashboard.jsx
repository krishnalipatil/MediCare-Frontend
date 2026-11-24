
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();

    // Get logged-in user details
    const user = JSON.parse(localStorage.getItem("user"));

    // Logout function
    function handleLogout() {
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        navigate("/login");
    }

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-primary">
                    Welcome to MediCare Dashboard
                </h2>

                {user ? (
                    <>
                        <h4 className="mt-4">
                            Hello, {user.name}!
                        </h4>

                        <p className="mt-3">
                            <strong>Email:</strong> {user.email}
                        </p>

                        <p>
                            <strong>Role:</strong> {user.role}
                        </p>

                        {user.role === "DOCTOR" && (
                            <div className="alert alert-success">
                                Welcome Doctor! You can manage your appointments here.
                            </div>
                        )}

                        {user.role === "PATIENT" && (
                            <div className="alert alert-info">
                                Welcome Patient! You can book your doctor appointments here.
                            </div>
                        )}
                    </>
                ) : (
                    <div className="alert alert-warning">
                        Please login first.
                        <button
                            className="btn btn-primary ms-3"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </div>
                )}

                <button
                    className="btn btn-danger mt-3"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;
