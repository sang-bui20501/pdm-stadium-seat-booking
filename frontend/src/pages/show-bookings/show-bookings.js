import axios from "axios";
import React, { useEffect, useState } from "react";
import check from "../../assets/check-sign.png"
import { useNavigate, Link } from "react-router-dom";
import "./show-bookings.css"
import { useCookies } from './../../hooks/use-cookie/use-cookie';

function ShowBookings () {
    const navigate = useNavigate();
    
    const { cookies } = useCookies()

    const [bookingList, setBookingList] = useState([]);

    const getBookingList = async () => {
        axios.get(`http://localhost:8080/customer/getBookings/${cookies.userId}`).then((response) => {
            if (response.data) {
                setBookingList(response.data);
            }
        }).catch((error) => console.log(error.message));
    }

    useEffect(() => {
        getBookingList();
    }, []);


    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/booking/remove/${id}`).then((response) => {
            if (response.data) {
                navigate("/your-bookings");
            }
        }).catch((error) => console.log(error.message));
    }

    
    const handlePayment = (e, id) => {
        e.preventDefault();
        navigate("/proceed-payment", {state: {bookingId: id}});
    }


    const getDate = (time) => {
        return time.split(" ")[0];
    }

    const getTime = (time) => {
        return time.split(" ")[1];
    }

    const listBookings = () => {
        const arr = [];
        for (let i in bookingList) {
            const item = bookingList[i];
            if (item.bookingStatus === "PENDING") {
                arr.push(
                    <div className="show-booking-item">
                        <div className="show-booking-item-general-info">
                            <p className="show-booking-item-title">Booking #{item.booking_id}</p>
                            <button className="show-booking-pay-btn" onClick={(e) => handlePayment(e, item.booking_id)}>Pay for booking</button>
                        </div>
                        <div className="show-booking-item-info">
                            <p className="show-booking-info-item">Seat info: Seat {item.id} {item.type}</p>
                            <p className="show-booking-info-item">Booking date: {getDate(item.start_time)}</p>
                            <p className="show-booking-info-item">Booking time: {getTime(item.start_time)} - {getTime(item.end_time)}</p>
                            <p className="show-booking-info-item">Price: {item.rate * item.duration}</p>
                            <p className="show-booking-info-item">Status: Unpaid</p>
                        </div>
                    </div>
                );
            }
            else {
                var now = new Date();
                now = now.getTime();
                arr.push(
                    <div className="show-booking-item">
                        <div className="show-booking-item-general-info">
                            <p className="show-booking-item-title">Booking #{item.booking_id}</p>
                            <button className="show-booking-pay-btn" style={{display: new Date(item.start_time).getTime() >= now ? "block" : "none"}} onClick={(e) => handleDelete(e, item.bookingId)}>Delete</button>
                        </div>
                        <div className="show-booking-item-info">
                            <p className="show-booking-info-item">Seat info: Seat {item.id} {item.type}</p>
                            <p className="show-booking-info-item">Booking date: {getDate(item.start_time)}</p>
                            <p className="show-booking-info-item">Booking time: {getTime(item.start_time)} - {getTime(item.end_time)}</p>
                            <p className="show-booking-info-item">Price: {item.rate * item.duration}</p>
                            <p className="show-booking-info-item">Status: Paid</p>
                        </div>
                    </div>
                )
            }
        }
        console.log(arr);
        return arr;
    }

    return (
        <div className="show-booking-wrapper">
            <h1 className="show-booking-title">Your bookings</h1>
            <div className="show-booking-list">
                {listBookings()}
            </div>
        </div>
    );
}

export default ShowBookings;