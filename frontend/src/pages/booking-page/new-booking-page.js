import React, { useState, useEffect, useParams } from 'react'
import "./booking-page.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
//import Payment from '../../components/payment/payment';

function BookingPage() {
    /* query info */
    const [availableSeats, setAvailableSeats] = useState([]);
    const customerId = 1;

    /* form info */
    const [bookingType, setBookingType] = useState("");
    const [seatType, setSeatType] = useState("Normal");
    const [seatId, setSeatId] = useState();
    const [bookingDate, setBookingDate] = useState(new Date());
    const [bookingTime, setBookingTime] = useState("06:00");
    const [bookingDuration, setBookingDuration] = useState(1);
    const [seatPrice, setSeatPrice] = useState(5);
    const [stadiumPrice, setStadiumPrice] = useState(500);

    /* show or hide display */
    const [showSeatType, setShowSeatType] = useState(false);
    const [showFormInput, setShowFormInput] = useState(false);
    const [showSeatChoices, setShowSeatChoices] = useState(false);

    /* additional info */
    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date(Date.now() + 60*60*24*30*1000).toISOString().split("T")[0];
    const navigate = useNavigate();

    useEffect(() => {

        
    }, []);

    /*
    const displaySeatOptions = () => {
        const arr = [];
        const availableSeats = getAvailableSeats(bookingDate, bookingDuration, seatType); // bc it doesn't set nên dùng cái này tạm :))
        for (let i in availableSeats) {
            const seat_id = availableSeats[i];
            arr.push(<button className="booking-page-seat-selection-id" key={i} value={availableSeats[i]} onClick={(e) => {setSeatId(e.target.value)}}>Seat</button>)
        }

        return arr;
    }*/
    /*
    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingForm = {
            id: bookings.length,
            customer_id: 1,
            start_time: new Date(bookingDate + "T" + bookingTime),
            duration: bookingDuration,
            paid_status: false,
        }

        if (showSeatType) {
            const bookingSeatForm = {
                id: bookingSeat.length,
                booking_id: bookings.length,
                seat_id: seatId,
            }
        }
        
        axios.post("/api/book", bookingForm).then((response) => {
        if (response.ok) {
            navigate("/proceed-payment", {state: {booking: bookingForm}});
        }
        }).catch((error) => {console.log(error)});
    }*/
  
    const handleClick = async (e) => {
        e.preventDefault();
        const form = {
            seat_type: seatType,
            booking_date: bookingDate,
            start_time: bookingTime,
            duration: bookingDuration
        }
        console.log(form);
        axios.post("http://localhost:8080/getavailableseats", form).then((response) => {
            console.log(response.data);
            if (response.ok) {
                setAvailableSeats(response.data);
            }
        }).catch((error) => console.log(error.message));
    }

    const handleSubmit = async (e) => {
        const form = {
            customer_id: customerId,
            seat_id: seatId,
            seat_type: seatType,
            date: bookingDate,
            start_time: bookingTime,
            duration: bookingDuration,
            paid_status: false
        }
        console.log(form);
        axios.post(`http://localhost:8080/booking/${customerId}/save`, form).then((response) => {
            if (response.ok) { // db should pass down new booking id just created
                navigate("/proceed-payment", {state: {booking_id: response.data}});
            }
        }).catch((error) => console.log(error.message));
    }

    const getSeatChoices = () => {
        const arr = [];
        for (let i in availableSeats) {
            arr.push(
                <td className="booking-page-td"><button value={availableSeats[i]}>Seat {availableSeats[i]}</button></td>
            );
        }
        return arr;
    }

    return (
        <div className="booking-page-body">
            <div className="booking-page-form-wrapper">
            <form className="booking-page-form" onSubmit={handleSubmit()}>
                <h3 className="booking-page-form-description">Make a Reservation</h3>
                <table className="booking-page-table">
                <tbody>
                    <div className="booking-page-form-section">
                    <tr>
                        <td className="booking-page-td">Booking Type</td>
                    </tr>
                    <tr>
                        <td className="booking-page-td">
                        <input type="radio" name="booking-type" id='seat' value="seat" onChange={() => {setBookingType("Seat"); setShowSeatType(true); setShowFormInput(true)}}/>
                        <label for="seat" className="booking-page-booking-type">Seat</label>
                        <input type="radio" name="booking-type" id='stadium' value="stadium" onChange={() => {setBookingType("Stadium"); setShowFormInput(true); setShowSeatType(false); setSeatId(null)}}/>
                        <label for="stadium" className="booking-page-booking-type">Stadium</label>
                        </td>
                    </tr>
                    </div>
                    <div className="booking-page-form-section" style={{display: showSeatType ? "block" : "none"}}>
                    <tr>
                        <td className="booking-page-td">Seat Type</td>
                    </tr>
                    <tr>
                        <td className="booking-page-td">
                        <select onChange={(e) => {setSeatType(e.target.value)}}>
                            <option>Normal</option>
                            <option>Mid</option>
                            <option>VIP</option>
                        </select>
                        </td>
                    </tr>
                    </div>
                    <div className="booking-page-form-input-div" style={{display: showFormInput ? "block" : "none"}}>
                    <div className="booking-page-form-section">
                        <tr>
                            <td className="booking-page-td">Date</td>
                        </tr>
                        <tr>
                            <td className="booking-page-td">
                                <input type="date" name="date" min={today} max={maxDate} onChange={(e) => {setBookingDate(e.target.value)}}/>
                            </td>
                        </tr>
                    </div>
                    <div className="booking-page-form-section">
                        <tr>
                            <td className="booking-page-td">Time</td>
                        </tr>
                        <tr>
                            <td className="booking-page-td">
                            <input type="time" max="19:00" min="6:00" onChange={(e) => setBookingTime(e.target.value)}/>
                            </td>
                        </tr>
                    </div>
                    <div className="booking-page-form-section">
                        <tr>
                            <td className="booking-page-td">Duration</td>
                        </tr>
                        <tr>
                            <td className="booking-page-td">
                                <select onChange={(e) => {setBookingDuration(e.target.value)}}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                </select>
                            </td>
                        </tr>
                    </div>
                    <div className="booking-page-form-section" style={{display: showSeatType ? "block" : "none"}}>
                        <tr>
                            <td className="booking-page-td"><button className="booking-page-choose-seat" onClick={() => {handleClick(); setShowSeatChoices(!showSeatChoices)}}>Choose a seat</button></td>
                        </tr>
                        <tr>
                            {getSeatChoices()}
                        </tr>
                    </div>
                    <div className="booking-page-form-section">
                        <tr>
                            <td className="booking-page-td">Price</td>
                        </tr>
                        <tr>
                            <td className="booking-page-td">
                                <input type="text" className="booking-seat-price" name="price" value={showSeatType ? (seatPrice*bookingDuration) : (stadiumPrice*bookingDuration)} readOnly={true}/>
                            </td>
                        </tr>
                    </div>
                    </div>
                </tbody>
                </table>
                <input className="booking-page-submit-btn" type="submit" value="Submit"/>
            </form>
            </div>
        </div>
    )
}

export default BookingPage
