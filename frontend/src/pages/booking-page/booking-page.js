import React, { useState, useEffect, useParams } from 'react'
import Nav from '../../components/Nav/Nav'
import "./booking-page.css"
import DatePicker from "react-date-picker";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { getBookings, getBookingSeat, getPrices, getSeats } from './resources';

function BookingPage() {
  /* query info */
  const [seats, setSeats] = useState([]);
  const [bookingSeat, setBookingSeat] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [prices, setPrices] = useState([]);

  /* display or hide info */
  const [showSeatType, setShowSeatType] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [unavailableTime, setUnavailableTime] = useState([]);

  /* form info */
  const [seatType, setSeatType] = useState("Normal");
  const [seatId, setSeatId] = useState();
  const [bookingDate, setBookingDate] = useState(new Date());
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [time, setTime] = useState();
  const [duration, setDuration] = useState(0);
  const [seatPrice, setSeatPrice] = useState(0);

  /* additional info */
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toISOString().split("T")[0];
  const [selectedHour, setSelectedHour] = useState(0);
  const navigate = useNavigate();



  useEffect(() => {

    getSeats(setSeats);
    getBookingSeat(setBookingSeat);
    getBookings(setBookings);
    getPrices(setPrices);

  }, []);


  const getAvailableSeats = (date, type) => {
    const arr = [];

    for (let i in bookings) {
      const obj = bookings[i];
      const startTime = new Date(obj.start_time);
      const bookingDate = startTime.getUTCFullYear() + "-0" + (startTime.getUTCMonth() + 1) + "-" + startTime.getUTCDate();
      if (bookingDate === date) {
        const booking_id = obj.id;
        for (let j in bookingSeat) {
          for (let k in seats) {
            if (booking_id === bookingSeat[j].booking_id) {
              if (bookingSeat[j].seat_id === seats[k].id && seats[k].type === type) {
                arr.push(seats[k].id);
              }
            }
          }
        }
      }
    }
    const available = seats.filter((item) => {
      return arr.indexOf(item.id) === -1 && item.type === type;
    })

    return available;
  }


  const getSeatPrice = (type) => {
    var price = 0;
    for (let i in seats) {
      if (seats[i].type === type) {
        for (let j in prices) {
          if (seats[i].price_id === prices[j].id) {
            price = prices[j].rate;
            break;
          }
        }
      }
    }
    console.log(price);
    setSeatPrice(price);
  }

  const getUnavailableTime = (date, type) => {
    const time = [];
    const arr = getAvailableSeats(date, type);
    for (let i in bookings) {
      const obj = bookings[i];
      const startTime = new Date(obj.start_time);
      const bookingDate = startTime.getUTCFullYear() + "-0" + (startTime.getUTCMonth() + 1) + "-" + startTime.getUTCDate();
      if (bookingDate === date) {
        // get booked seats on this date
        const booking_id = obj.id;
        for (let j in bookingSeat) {
          for (let k in seats) {
            if (booking_id === bookingSeat[j].booking_id) {
              if (bookingSeat[j].seat_id === seats[k].id && seats[k].type === type && arr.length > 0) {
                var hours = startTime.getHours();
                var minutes = startTime.getMinutes();
                var endHours = hours + obj.duration;
                if (hours < 10) {
                  hours = "0".concat(hours);
                }
                else if (minutes < 10) {
                  minutes = "0".concat(minutes);
                }
                else if (endHours < 10) {
                  endHours = "0".concat(endHours);
                }
                const start_time = hours + ":" + minutes;
                const end_time = endHours + ":" + minutes;
                if (!time.includes(start_time)) {
                  time.push(start_time);
                }
                if (!time.includes(end_time)) {
                  time.push(end_time);
                }
              }
            }
          }
        }
      }
    }
    console.log(time);
    setUnavailableTime(time);
  }

  const disableHour = () => {
    const hours = [];
    const arr = getAvailableSeats(bookingDate, seatType);
    if (arr.length > 0) {
      return [];
    }
    else if (unavailableTime.length === 0) {
      for (let i = 1; i <= 20; i++) {
        hours.push(i);
      }
      return hours;
    }
    else {
      for (let i in unavailableTime) {
        const arr = unavailableTime[i].split(":");
        hours.push(parseInt(arr[0]));
      }
      return hours.filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
      });
    }
  }

  const disableMinute = () => {
    const minutes = [];
    const arr = getAvailableSeats(bookingDate, seatType);
    if (arr.length > 0) {
      return [];
    }
    else if (unavailableTime.length === 0) {
      for (let i = 1; i <= 59; i++) {
        minutes.push(i);
      }
      return minutes;
    }
  }

  const selectHour = () => {
    const arr = [];
    for (let i = 1; i <= 20; i++) {
      arr.push(<option key={i} value={i} disabled={disableHour().includes(i) ? true : null}>{i}</option>)
    }
    return arr;
  }

  const selectMinute = () => {
    const arr = [];
    for (let i = 0; i <= 59; i++) {
      arr.push(<option key={i} value={i} disabled={disableMinute().includes(i) ? true : null}>{i}</option>)
    }
    return arr;
  }

  const getBookingTime = (hour, minute) => {
    if (hour < 10) {
      hour = "0".concat(hour);
    }
    if (minute < 10) {
      minute = "0".concat(minute);
    }
    return (hour + ":" + minute + ":00");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      id: bookings.length,
      customer_id: 1,
      start_time: new Date(bookingDate + "T" + time),
      duration: duration,
      paid_status: false,
    }
    axios.post("/api/book", form).then((response) => {
      if (response.ok) {
        navigate("/proceed-payment");
      }
    }).catch((error) => { console.log(error) });
  }

  return (
    <div className="form-wrapper">
      <h3 className="form-description">Make a Reservation</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <div className="form-section">
              <tr>
                <td>Booking Type</td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="booking-type" id='seat' value="seat" onClick={() => { setShowSeatType(true); setShowDateInput(true); getSeatPrice(seatType) }} />
                  <label for="seat" className="booking-type">Seat</label>
                  <input type="radio" name="booking-type" id='stadium' value="stadium" onClick={() => { setShowSeatType(false); setShowDateInput(true) }} />
                  <label for="stadium" className="booking-type">Stadium</label>
                </td>
              </tr>
            </div>
            <div className="form-section" style={{ display: showSeatType ? "block" : "none" }}>
              <tr>
                <td>Seat Type</td>
              </tr>
              <tr>
                <td>
                  <select onChange={(e) => { setSeatType(e.target.value); getSeatPrice(e.target.value) }}>
                    <option>Normal</option>
                    <option>Mid</option>
                    <option>VIP</option>
                  </select>
                </td>
              </tr>
            </div>
            <div className="form-section" style={{ display: showDateInput ? "block" : "none" }}>
              <tr>
                <td>Date</td>
              </tr>
              <tr>
                <td>
                  <input type="date" name="date" min={today} max={maxDate} onChange={e => { setBookingDate(e.target.value); getUnavailableTime(e.target.value, seatType); setShowTimeInput(true) }} />
                </td>
              </tr>
            </div>
            <div className="form-section" style={{ display: showTimeInput ? "block" : "none" }}>
              <tr>
                <td>Time</td>
              </tr>
              <tr>
                <td>
                  <select onChange={(e) => setHour(e.target.value)}>
                    {selectHour()}
                  </select>
                </td>
                <td>
                  <select onChange={(e) => { setMinute(e.target.value); setTime(() => getBookingTime(hour, e.target.value)); setShowDuration(true) }}>
                    {selectMinute()}
                  </select>
                </td>
              </tr>
            </div>
            <div className="form-section" style={{ display: showTimeInput ? "block" : "none" }}>
              <tr>
                <td>Duration</td>
              </tr>
              <tr>
                <td>
                  <select onChange={(e) => { setDuration(e.target.value); console.log(time); setShowPrice(true) }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </td>
              </tr>
            </div>
            <div className="form-section" style={{ display: showPrice ? "block" : "none" }}>
              <tr>
                <td>Price</td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="price" value={seatPrice} readOnly={true} />
                </td>
              </tr>
            </div>
          </tbody>
        </table>
        <input className='submit-btn' type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default BookingPage