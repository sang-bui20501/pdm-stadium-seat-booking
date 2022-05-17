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
    const [bookingId, setBookingId] = useState();

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

    const handleClick = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/booking/remove/`).then((response) => {
            if (response.ok) {
                navigate("/your-bookings");
            }
        }).catch((error) => console.log(error.message));
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
            /*
            if (!item.status) {
                arr.push(
                    <div className="show-booking-item">
                        <div className="show-booking-item-general-info">
                            <p className="show-booking-item-title">Seat booking</p>
                            <button className="show-booking-pay-btn"><Link to="/proceed-payment">Pay for booking</Link></button>
                        </div>
                        <div className="show-booking-item-info">
                            <p className="show-booking-info-item">Seat info: Seat {item.id} {item.type}</p>
                            <p className="show-booking-info-item">Start time: {item.start_time}</p>
                            <p className="show-booking-info-item">End time: {item.end_time}</p>
                            <p className="show-booking-info-item">Price: {item.rate}</p>
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
                            <p className="show-booking-item-title">Seat booking</p>
                            <button className="show-booking-pay-btn" style={{display: item.start_time.getTime() >= now ? "block" : "none"}} onClick={() => {setBookingId(item.booking_id); handleClick()}}>Delete</button>
                        </div>
                        <div className="show-booking-item-info">
                            <p className="show-booking-info-item">Seat info: Seat {item.id} {item.type}</p>
                            <p className="show-booking-info-item">Start time: {item.start_time}</p>
                            <p className="show-booking-info-item">End time: {item.end_time}</p>
                            <p className="show-booking-info-item">Price: {item.rate}</p>
                            <p className="show-booking-info-item">Status: Paid</p>
                        </div>
                    </div>
                )
            }*/
            arr.push(
                <div className="show-booking-item">
                    <div className="show-booking-item-general-info">
                        <p className="show-booking-item-title">Seat booking</p>
                        <button className="show-booking-pay-btn"><Link to="/proceed-payment">Pay for booking</Link></button>
                    </div>
                    <div className="show-booking-item-info">
                        <p className="show-booking-info-item">Seat info: Seat {item.id} {item.type}</p>
                        <p className="show-booking-info-item">Booking date: {getDate(item.start_time)}</p>
                        <p className="show-booking-info-item">Booking time: {getTime(item.start_time)} - {getTime(item.end_time)}</p>
                        <p className="show-booking-info-item">Price: {item.rate * item.duration}</p>
                        <p className="show-booking-info-item">Status: {item.status}</p>
                    </div>
                </div>
            );
        }
        console.log(arr);
        return arr;
    }


    /*
    const ListBookings = () => {
        console.log(bookingList)
        return (Array(bookingList).length)
        if (Array(bookingList).length === 0) {
            return (<h1>There is nothing here, yet</h1>)
        }
        else {
            for (let index = 0; index < bookingList.length; index++) {
                const element = bookingList[index];
                return (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"> {element.name} </h5>
                            <p className="card-text">
                                Date booked: {element.date} <br/>
                                Number of seats: {element.seats} <br/>
                            </p>
                        </div>
                    </div> 
                )
            }
        }
    };*/

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