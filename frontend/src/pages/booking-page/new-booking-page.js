import React, { useState, useEffect, useParams } from 'react'
import "./booking-page.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
//import Payment from '../../components/payment/payment';
import { useCookies } from './../../hooks/use-cookie/use-cookie';

function BookingPage() {
    /* query info */
    const { cookies } = useCookies();
    const [availableSeats, setAvailableSeats] = useState([]);
    const customerId = cookies['userId'];

    /* form info */
    const [selectedSeat, setSelectedSeat] = useState({})
    const [bookingType, setBookingType] = useState("");
    const [seatType, setSeatType] = useState("Normal");
    const [seatId, setSeatId] = useState(null);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [bookingTime, setBookingTime] = useState("06:00");
    const [bookingDuration, setBookingDuration] = useState(1);
    const [seatPrice, setSeatPrice] = useState(90);
    const [stadiumPrice, setStadiumPrice] = useState(20000);
    const [priceId, setPriceId] = useState(null);

    /* show or hide display */
    const [showSeatType, setShowSeatType] = useState(false);
    const [showFormInput, setShowFormInput] = useState(false);
    const [showSeatChoices, setShowSeatChoices] = useState(false);

    /* additional info */
    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toISOString().split("T")[0];
    const navigate = useNavigate();

    useEffect(() => {


    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        const form = {
            seat_type: seatType,
            booking_date: bookingDate,
            start_time: getStartTime(bookingDate, bookingTime),
            end_time: getEndTime(bookingDate, bookingTime, bookingDuration),
            duration: bookingDuration
        }
        axios.post("http://localhost:8080/booking/getavailableseats", form).then((response) => {
            if (response.data) {
                setAvailableSeats(response.data);
                setShowSeatChoices(!showSeatChoices);
            }
        }).catch((error) => console.log(error.message));
    }

    const getStartTime = (date, time) => {
        return date + " " + time;
    }

    const getEndTime = (date, time, duration) => {
        let hour = time.split(":")[0];
        let min = time.split(":")[1];
        hour = parseInt(hour) + parseInt(duration);
        let end = hour + ":" + min;
        return date + " " + end;
    }

    const handleSubmit = async () => {
        const form = {
            customer_id: customerId,
            seat_id: selectedSeat.id,
            seat_type: selectedSeat.type,
            booking_date: new Date(),
            start_time: getStartTime(bookingDate, bookingTime),
            end_time: getEndTime(bookingDate, bookingTime, bookingDuration),
            duration: bookingDuration,
            price_id: selectedSeat.price_id,
            paid_status: false
        }

        axios.post(`http://localhost:8080/booking/save/${customerId}`, form).then((response) => {
            if (response.data) {
                navigate("/proceed-payment", { state: { booking_id: response.data } });
            }
        }).catch((error) => console.log(error.message));
    }

    const getSeatChoices = () => {
        const arr = [];
        for (let i in availableSeats) {
            arr.push(
                <td className="booking-page-td"><button value={availableSeats[i]} onClick = {() => setSelectedSeat(availableSeats[i])}>Seat {availableSeats[i].id}</button></td>
            );
        }
        return arr;
    }

    return (
        <div className="booking-page-body">
            <div className="booking-page-form-wrapper">
                <div className="booking-page-form">
                    <h3 className="booking-page-form-description">Make a Reservation</h3>
                    <table className="booking-page-table">
                        <tbody>
                            <div className="booking-page-form-section">
                                <tr>
                                    <td className="booking-page-td">Booking Type</td>
                                </tr>
                                <tr>
                                    <td className="booking-page-td">
                                        <input type="radio" name="booking-type" id='seat' value="seat" onChange={() => { setBookingType("Seat"); setShowSeatType(true); setShowFormInput(true) }} />
                                        <label for="seat" className="booking-page-booking-type">Seat</label>
                                        <input type="radio" name="booking-type" id='stadium' value="stadium" onChange={() => { setBookingType("Stadium"); setShowFormInput(true); setShowSeatType(false); setSeatId(null); setPriceId(3) }} />
                                        <label for="stadium" className="booking-page-booking-type">Stadium</label>
                                    </td>
                                </tr>
                            </div>
                            <div className="booking-page-form-section" style={{ display: showSeatType ? "block" : "none" }}>
                                <tr>
                                    <td className="booking-page-td">Seat Type</td>
                                </tr>
                                <tr>
                                    <td className="booking-page-td">
                                        <select onChange={(e) => { setSeatType(e.target.value) }}>
                                            <option>NORMAL</option>
                                            <option>VIP</option>
                                            <option>COUPLE</option>
                                        </select>
                                    </td>
                                </tr>
                            </div>
                            <div className="booking-page-form-input-div" style={{ display: showFormInput ? "block" : "none" }}>
                                <div className="booking-page-form-section">
                                    <tr>
                                        <td className="booking-page-td">Date</td>
                                    </tr>
                                    <tr>
                                        <td className="booking-page-td">
                                            <input type="date" name="date" min={today} max={maxDate} onChange={(e) => { setBookingDate(e.target.value) }} />
                                        </td>
                                    </tr>
                                </div>
                                <div className="booking-page-form-section">
                                    <tr>
                                        <td className="booking-page-td">Time</td>
                                    </tr>
                                    <tr>
                                        <td className="booking-page-td">
                                            <input type="time" onChange={(e) => setBookingTime(e.target.value)} />
                                        </td>
                                    </tr>
                                </div>
                                <div className="booking-page-form-section">
                                    <tr>
                                        <td className="booking-page-td">Duration</td>
                                    </tr>
                                    <tr>
                                        <td className="booking-page-td">
                                            <select onChange={(e) => { setBookingDuration(e.target.value) }}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
                                        </td>
                                    </tr>
                                </div>
                                <div className="booking-page-form-section" style={{ display: showSeatType ? "block" : "none" }}>
                                    <tr>
                                        <td className="booking-page-td"><button className="booking-page-choose-seat" onClick={(e) => handleClick(e)}>Choose a seat</button></td>
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
                                            <input type="text" className="booking-seat-price" name="price" value={showSeatType ? (seatPrice * bookingDuration) : (stadiumPrice * bookingDuration)} readOnly={true} />
                                        </td>
                                    </tr>
                                </div>
                            </div>
                        </tbody>
                    </table>
                    <input className="booking-page-submit-btn"  onClick = {handleSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default BookingPage
