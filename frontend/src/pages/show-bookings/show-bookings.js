import axios from "axios";
import React, { useEffect, useState } from "react";
import check from "../../assets/check-sign.png"
import { useNavigate, Link } from "react-router-dom";
import "./show-bookings.css"
import { useCookies } from './../../hooks/use-cookie/use-cookie';

function ShowBookings () {
    const navigate = useNavigate();
    

    const [bookingList, setBookingList] = useState([]);
    const [bookingId, setBookingId] = useState();

    const getBookingList = async () => {
        axios.get(`http://localhost:8080/customer//getBookings`).then((response) => {
            if (response.ok) {
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
        const year = time.getUTCYear();
        const month = time.getUTCMonth() + 1;
        const date = time.getUTCDate();
        return date + "/" + month + "/" + year;
    }

    const listBookings = () => {
        const arr = [];
        for (let i in bookingList) {
            const item = bookingList[i];
            if (!item.paid_status) {
                arr.push(
                    <div className="show-booking-item">
                        <div className="show-booking-item-general-info">
                            <p className="show-booking-item-title">Seat booking</p>
                            <button className="show-booking-pay-btn"><Link to="/proceed-payment">Pay for booking</Link></button>
                        </div>
                        <div className="show-booking-item-info">
                            <p className="show-booking-info-item">Seat info: Seat {item.id} {item.seat_type}</p>
                            <p className="show-booking-info-item">Time: {item.start_time} - {item.end_time}</p>
                            <p className="show-booking-info-item">Date: {getDate(item.start_time)}</p>
                            <p className="show-booking-info-item">Price: {item.price}</p>
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
                            <p className="show-booking-info-item">Seat info: Seat {item.id} {item.seat_type}</p>
                            <p className="show-booking-info-item">Time: {item.start_time} - {item.end_time}</p>
                            <p className="show-booking-info-item">Date: {getDate(item.start_time)}</p>
                            <p className="show-booking-info-item">Price: {item.price}</p>
                            <p className="show-booking-info-item">Status: Paid</p>
                        </div>
                    </div>
                )
            }
        }
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
            <div className="show-booking-item">
                        <div className="show-booking-item-general-info">
                            <p className="show-booking-item-title">Seat booking</p>
                          
                            <button className="show-booking-pay-btn">Delete</button>
                        </div>
                        <div className="show-booking-item-info">
                            <p className="show-booking-info-item">Seat info: Seat 2 Normal</p>
                            <p className="show-booking-info-item">Time: 19:00 - 21:00</p>
                            <p className="show-booking-info-item">Date: 22/05/2022</p>
                            <p className="show-booking-info-item">Price: 150</p>
                            <p className="show-booking-info-item">Status: Paid</p>
                        </div>
                    </div>
                {listBookings()}
            </div>
        </div>
    );
}

export default ShowBookings;