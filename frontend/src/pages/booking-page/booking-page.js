import React, { useState, useEffect, useParams } from 'react'
import Nav from '../../components/Nav/Nav'
import DatePicker from "react-date-picker";
import axios from "axios"

function BookingPage() {
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
    <div className='container-fluid mt-5 col-6'>
      <h3 className='text-center mb-4'>Make a Reservation</h3>
      <form>
        <div className='row mb-3'>
          <div className='col'> <label>Booking Type</label> </div>

          <div className='col'>
            <input type="radio" name="booking-type" id='seat' value="seat" onClick={() => {setShowSeatType(true); setShowInput(true)}}/>
            <label for="seat">Seat</label>
            &nbsp;&nbsp;
            <input type="radio" name="booking-type" id='stadium' value="stadium" onClick={() => {setShowSeatType(false); setShowInput(true)}}/>
            <label for="stadium">Stadium</label>
          </div>
        </div>

        <div className="form-section" style={{display: showSeatType ? "block"  : "none"}}>
          <div className='row mb-3'>
            <div className='col'> <label>Seat Type</label> </div>

            <div className='col'>
              <select onChange={(e) => {setSeatType(e.target.value)}}>
                <option>Normal</option>
                <option>Mid</option>
                <option>VIP</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section" style={{display: showInput ? "block"  : "none"}}>
          <div className='row mb-3'>
            <div className='col'> <label>Date</label> </div>

            <div className='col'>
              <DatePicker 
                name="booking-date" 
                onChange={(date) => {setDate(date); getUnavailableTime(date)}} 
                value={date} 
                minDate={new Date()} 
                maxDate={new Date(Date.now() + 60*60*24*30*1000)}
              />
            </div>
          </div>
        </div>

        <div className="form-section" style={{display: showInput ? "block"  : "none"}}>
          <div className='row mb-3'>
            <div className='col'> <label>Time</label> </div>

            <div className='col'>
              <select>
                {unavailableTime.map((time) => <option value={time}>{time}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className='row mb-3'>
            <div className='col'> <label>Duration (hours)</label> </div>

            <div className='col'>
              <select onChange={(e) => {setDuration(e.target.value)}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className='row mb-3'>
            <div className='col'> <label>Price</label> </div>

            <div className='col'>
              <input type="text" name="price" value="1" readOnly='true'/>
            </div>
          </div>
        </div>

        <div className='row text-center mt-4'>
          <input className='btn' type={'submit'} value='Submit'/>
        </div>
      </form>
    </div>
  )
}

export default BookingPage
