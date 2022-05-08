import React, { useState, useEffect, useParams } from 'react'
import Nav from '../../components/Nav/Nav'
import DatePicker from "react-date-picker";
import "./BookingPage.css"
import axios from "axios"

function BookingPage() {
  const [user, setUser] = useState();
  const [seats, setSeats] = useState([]);
  const [bookingSeat, setBookingSeat] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showSeatType, setShowSeatType] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [seatType, setSeatType] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [unavailableTime, setUnavailableTime] = useState([]);
  const [duration, setDuration] = useState(0);

  const getSeats = () => {
    axios.get("/data/seats.js").then((res) => {
      setSeats(res.data);
    }).catch((error) => console.log(error.message));
  }

  const getBookingSeat = () => {
    axios.get("/data/bookingseat.js").then((res) => {
      setBookingSeat(res.data);
      console.log(res.data);
    }).catch((error) => console.log(error.message));
  }

  const getBookings = () => {
    axios.get("/data/bookings.js").then((res) => {
      setBookings(res.data);
      console.log(res.data);
    }).catch((error) => console.log(error.message));
  }
  
  useEffect(() => {

    getSeats();
    getBookingSeat();  
    getBookings();

  }, []);

  
  const getBookedDateTime = () => {
    const dates = [];
    for (let i in bookings) {
      const date = bookings[i].start_time;
      dates.push(date);
    }
    return dates;
  }

  const getUnavailableTime = (date) => {
    const unavailable_time = [];
    const newDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    for (let i in bookings) {
      const obj = bookings[i];
      const bookingDate = obj.getFullYear() + "-" + (obj.getMonth() + 1) + "-" + obj.getDate();
      if (bookingDate === newDate) {
        for (let j = 0; j < duration; j++) {
          unavailable_time.push((obj.getHours() + j) + ":" + obj.getMinutes() + ":" + obj.getSeconds());
        }
      }
    }
    setUnavailableTime(unavailableTime);
  }

  /*
  const handleSubmit = (event) => {
    event.preventDefault();


  }*/
  
  return (
    <div>
      <Nav />
      <div className="form-wrapper">
        <div className="form-description">
          <p>Make a Reservation</p>
        </div>
        <form>
          <table>
            <div className="form-section">
              <tr>
                <td>Booking Type</td>
              </tr>
              <tr>
                <input type="radio" name="booking-type" value="seat" onClick={() => {setShowSeatType(true); setShowInput(true)}}/>
                <label for="seat">Seat</label>
                <input type="radio" name="booking-type" value="stadium" onClick={() => {setShowSeatType(false); setShowInput(true)}}/>
                <label for="stadium">Stadium</label>
              </tr>
            </div>
            <div className="form-section" style={{display: showSeatType ? "block"  : "none"}}>
              <tr>
                <td>Seat Type</td>
              </tr>
              <tr>
                <select onChange={(e) => {setSeatType(e.target.value)}}>
                  <option>Normal</option>
                  <option>Mid</option>
                  <option>VIP</option>
                </select>
              </tr>
            </div>
            <div className="form-section" style={{display: showInput ? "block"  : "none"}}>
              <tr>
                <td>Date</td>
              </tr>
              <tr>
                <DatePicker name="booking-date" onChange={(date) => {setDate(date); getUnavailableTime(date)}} value={date} minDate={new Date()} maxDate={new Date(Date.now() + 60*60*24*30*1000)}/>
              </tr>
            </div>
            <div className="form-section" style={{display: showInput ? "block"  : "none"}}>
              <tr>
                <td>Time</td>
              </tr>
              <tr>
                <select>
                  {unavailableTime.map((time) => <option value={time}>{time}</option>)}
                </select>
              </tr>
            </div>
            <div className="form-section">
              <tr>
                  <td>Duration (hours)</td>
              </tr>
              <tr>
                <select onChange={(e) => {setDuration(e.target.value)}}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </tr>
            </div>
            <div className="form-section">
              <tr>
                <td>Price</td>
              </tr>
              <tr>
                <input type="text" name="price" value="1"/>
              </tr>
            </div>
          </table>
          <button className="submit-btn">Submit</button>
        </form>
      </div>
      
    </div>
  )
}

export default BookingPage
