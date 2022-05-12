import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { getToken, getUser } from "utils/common";
import check from "../../assets/check-sign.png";
import "./show-bookings.css";


function ShowBookings () {
    const navigate = useNavigate();
    const [bookingList, setBookingList] = useState(null);

    useEffect(() => {
        // const token = getToken();
        // if (token === null)
        //     navigate('/sign-in');        // If token not exist, redirect back to sign in (prevent unauthorized person to access the page)
        
        setBookingList(() => {
            const user = getUser();
            axios.post('http://localhost:8080/api/getBookings', {
                username: user
            }).then(res => {
                return res.data;       // Retrieve all bookings of user from db based on username (saved in session)
            });
        })
    }, []);

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
                        <button className="show-booking-pay-btn"><Link to="/proceed-payment">Pay for booking</Link></button>
                    </div>
                    <div className="show-booking-item-info">
                        <p className="show-booking-info-item">Seat info: Seat 2 type normal</p>
                        <p className="show-booking-info-item">Time: 19:00 - 21:00 </p>
                        <p className="show-booking-info-item">Date: 22 - 05 - 2022</p>
                        <p className="show-booking-info-item">Price: 150</p>
                        <p className="show-booking-info-item">Status: Unpaid</p>
                    </div>
                </div>
                <div className="show-booking-item">
                    <div className="show-booking-item-general-info">
                        <p className="show-booking-item-title">Seat booking</p>
                        <img src={check} style={{width: 50, height: 50}} alt="" className="show-booking-item-status"/>
                    </div>
                    <div className="show-booking-item-info">
                        <p className="show-booking-info-item">Seat info: Seat 1 type VIP</p>
                        <p className="show-booking-info-item">Time: 08:30 - 10:30 </p>
                        <p className="show-booking-info-item">Date: 20 - 05 - 2022</p>
                        <p className="show-booking-info-item">Price: 300</p>
                        <p className="show-booking-info-item">Status: Paid</p>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ShowBookings;