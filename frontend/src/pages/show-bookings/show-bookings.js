import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken, getUser } from "Utils/Common";


function ShowBookings () {
    const navigate = useNavigate();
    const userId = 1;

    const [seatId, setSeatId] = useState(0);
    const [seatType, setSeatType] = useState("Normal");
    const [startTime, setStartTime] = useState(new Date().getHours() + new Date().getMinutes());
    const [endTime, setEndTime] = useState(new Date().getHours() + new Date().getMinutes());
    const [duration, setDuration] = useState(0);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(false);

    const [seats, setSeats] = useState([]);
    const [bookingSeat, setBookingSeat] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [prices, setPrices] = useState([]);

    const getSeats = async () => {
        axios.get("/data/seats.json").then((res) => {
          setSeats(res.data);
        }).catch((error) => console.log(error.message));
    }
    
    const getBookingSeat = () => {
        axios.get("/data/bookingseat.json").then((res) => {
            setBookingSeat(res.data);
        }).catch((error) => console.log(error.message));
    }
    
    const getBookings = () => {
        axios.get("/data/bookings.json").then((res) => {
            setBookings(res.data);
        }).catch((error) => console.log(error.message));
    }
    
    const getPrices = () => {
        axios.get("/data/price.json").then((res) => {
            setPrices(res.data);
        }).catch((error) => console.log(error.message));
    }

    const getSeatId = (userId) => {
        const arr = [];
        for (let i in bookings) {
            for (let j in bookingSeat) {
                const obj = bookings[i];
                if (obj.customer_id === userId) {
                    if (obj.id === bookingSeat[j].booking_id) {
                        arr.push(bookingSeat[j].seat_id);
                    }
                }
            }
        }
        return arr;
    }


    useEffect(() => {
        // const token = getToken();
        // if (token === null)
        //     navigate('/sign-in');        // If token not exist, redirect back to sign in (prevent unauthorized person to access the page)
        
        getSeats();
        getBookingSeat();
        getBookings();
        getPrices();

    }, []);

    const getTime = (datetime, duration) => {
        const startTime = datetime.getHours() + ":" + datetime.getMinutes();
        const endTime = (datetime.getHours() + parseInt(duration)) + ":" + datetime.getMinutes();
        return startTime + " - " + endTime;
    }

    const getBookingDate = (datetime) => {
        const year = datetime.getUTCYear();
        const month = (datetime.getUTCMonth() + 1);
        const date = datetime.getUTCDate();
        return year + " - " + month + " - " + date;
    }
     
    const getSeatType = (seat_id) => {
        for (let i in seats) {
            if (seats[i].id === seat_id) {
                setSeatType(seats[i].type);
            }
        }
    }

    

    const listBookings = () => {
        const arr = [];
        for (let i in bookings) {
            const obj = bookings[i];
            if (obj.customer_id === userId) {
                for (let j in bookingSeat) {
                    if (obj.id === bookingSeat[j].booking_id) {
                        for (let k in seats) {
                            if (bookingSeat[j].seat_id === seats[k].id) {
                                for (let l in price) {
                                    if (seats[k].price_id === price[l].id) {
                                        if (obj.paid_status === true) {
                                            arr.push(
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
                                            );
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
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
                        <img src={check} alt="" className="show-booking-item-status"/>
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