
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getDoctorById } from '../services/doctorService';

import {
    createPaymentOrder,
    verifyPayment
} from '../services/appointmentService';

function BookAppointment() {

    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);

    // Load Razorpay Checkout script
    const loadRazorpay = () => {

        return new Promise((resolve) => {

            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');

            script.src = 'https://checkout.razorpay.com/v1/checkout.js';

            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);

            document.body.appendChild(script);
        });
    };

    // Load Doctor Details
    useEffect(() => {

        const loadDoctor = async () => {

            try {

                const response = await getDoctorById(doctorId);
                setDoctor(response);

            } catch (error) {

                console.error(error);
                alert('Unable to load doctor details');

            } finally {

                setLoading(false);
            }
        };

        loadDoctor();

    }, [doctorId]);

    // Handle Payment and Appointment Booking
    const handleBooking = async (e) => {

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        // Check Patient Login
        if (!user || user.role !== 'PATIENT') {

            alert('Please login as a patient');
            navigate('/login');
            return;
        }

        // Check Patient ID
        if (!user.patientId) {

            alert('Patient ID is missing. Please login again.');
            return;
        }

        // Prepare Appointment Data
        const appointmentData = {

            patientId: user.patientId,
            doctorId: Number(doctorId),
            appointmentDate: date,
            appointmentTime: time,
            reason: reason

        };

        try {

            setPaying(true);

            // Step 1: Load Razorpay
            const scriptLoaded = await loadRazorpay();

            if (!scriptLoaded) {

                alert('Unable to load Razorpay. Please try again.');
                setPaying(false);
                return;
            }

            // Step 2: Create Payment Order
            const order = await createPaymentOrder(doctorId);

            // Step 3: Configure Razorpay
            const options = {

                key: order.keyId,

                amount: order.amount,

                currency: order.currency,

                name: 'MediCare',

                description: 'Doctor Appointment Fee',

                order_id: order.orderId,

                // Step 4: Verify Payment
                handler: async function (response) {

                    try {

                        const paymentData = {

                            razorpayOrderId: response.razorpay_order_id,

                            razorpayPaymentId: response.razorpay_payment_id,

                            razorpaySignature: response.razorpay_signature,

                            appointmentRequest: appointmentData

                        };

                        // Send Payment Details to Backend
                        await verifyPayment(paymentData);

                        alert(
                            'Payment successful! Appointment booked successfully.'
                        );

                        navigate('/appointments');

                    } catch (error) {

                        console.error(error);

                        alert(
                            error.response?.data?.message ||
                            'Payment verification or appointment booking failed. Please contact support before retrying payment.'
                        );

                        setPaying(false);
                    }
                },

                // Patient Details
                prefill: {

                    name: user.name,
                    email: user.email

                },

                theme: {

                    color: '#0d6efd'

                },

                // When Patient Closes Payment Window
                modal: {

                    ondismiss: function () {

                        setPaying(false);

                    }

                }
            };

            // Step 5: Open Razorpay Checkout
            const razorpay = new window.Razorpay(options);

            // Handle Payment Failure
            razorpay.on('payment.failed', function (response) {

                console.error(response.error);

                alert(
                    response.error.description ||
                    'Payment failed. Please try again.'
                );

                setPaying(false);

            });

            razorpay.open();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                'Unable to initiate payment'
            );

            setPaying(false);
        }
    };

    // Loading Screen
    if (loading) {

        return (
            <div className="container mt-5">
                Loading doctor...
            </div>
        );
    }

    // Doctor Not Found
    if (!doctor) {

        return (
            <div className="container mt-5">
                Doctor not found
            </div>
        );
    }

    return (

        <div className="container mt-5">

            <h2>Book Appointment</h2>

            <div className="card p-4 mt-3">

                <h4>Doctor Details</h4>

                <p>
                    <strong>Name:</strong> {doctor.user?.name}
                </p>

                <p>
                    <strong>Specialization:</strong> {doctor.specialization}
                </p>

                <p>
                    <strong>Qualification:</strong> {doctor.qualification}
                </p>

                <p>
                    <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
                </p>

                <hr />

                <form onSubmit={handleBooking}>

                    {/* Appointment Date */}
                    <div className="mb-3">

                        <label className="form-label">
                            Appointment Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            min={new Date().toLocaleDateString('en-CA')}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                    </div>

                    {/* Appointment Time */}
                    <div className="mb-3">

                        <label className="form-label">
                            Appointment Time
                        </label>

                        <input
                            type="time"
                            className="form-control"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />

                    </div>

                    {/* Appointment Reason */}
                    <div className="mb-3">

                        <label className="form-label">
                            Reason for Appointment
                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter your reason"
                            required
                        />

                    </div>

                    {/* Payment Button */}
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={paying}
                    >

                        {paying
                            ? 'Processing...'
                            : `Pay ₹${doctor.consultationFee} & Book Appointment`}

                    </button>

                    {/* Back Button */}
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => navigate('/doctors')}
                        disabled={paying}
                    >
                        Back
                    </button>

                </form>

            </div>

        </div>
    );
}

export default BookAppointment;
