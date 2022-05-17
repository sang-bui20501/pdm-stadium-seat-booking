import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./proceed-payment.css";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingId = location.state.bookingId;

    useEffect(() => {
        console.log(bookingId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/booking/paying/${bookingId}`).then((response) => {
            if (response.data) {
                navigate("/your-bookings");
            }
        }).catch((error) => console.log(error.message));
    }

    return (
        <div className="proceed-payment">
            <div className="proceed-payment-form">
                <div className="proceed-payment-form-description">
                    <p className="proceed-payment-form-title">Pay for Booking</p>
                </div>
                <div className="proceed-payment-form-credentials">
                    <p>Card number: 123456789</p>
                    <p>Expires: 09/2025</p>
                    <p>CVV: 123</p>
                    <input type="submit" value="Submit" className="proceed-payment-submit-btn" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    );
}