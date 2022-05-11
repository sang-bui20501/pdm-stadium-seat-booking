import React, { useState, useEffect, useParams } from 'react'
import "./booking-page.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function BookingPage() {
  /* query info */
    const [seats, setSeats] = useState([]);
    const [bookingSeat, setBookingSeat] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [prices, setPrices] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);

  /* form info */
    const [seatType, setSeatType] = useState("Normal");
    const [seatId, setSeatId] = useState();
    const [bookingDate, setBookingDate] = useState(new Date());
    const [bookingHour, setBookingHour] = useState(6);
    const [bookingMinute, setBookingMinute] = useState(0);
    const [bookingTime, setBookingTime] = useState();
    const [bookingDuration, setBookingDuration] = useState(1);
    const [seatPrice, setSeatPrice] = useState(5);
    const [stadiumPrice, setStadiumPrice] = useState(500);

    /* show or hide display */
    const [showSeatType, setShowSeatType] = useState(false);
    const [showFormInput, setShowFormInput] = useState(false);

  
  /* additional info */
    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date(Date.now() + 60*60*24*30*1000).toISOString().split("T")[0];
    const navigate = useNavigate();

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

  useEffect(() => {

    getSeats();
    getBookingSeat();
    getBookings();
    getPrices();
    
  }, []);


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

  
  const getBookingTime = (hour, minute) => {
    if (hour < 10) {
      hour = "0".concat(hour);
    }
    if (minute < 10) {
      minute = "0".concat(minute);
    }
    return (hour + ":" + minute + ":00");
  }

  const getBookingDate = (time) => {
      var year = time.getUTCFullYear();
      var month = (time.getUTCMonth() + 1);
      var date = time.getUTCDate();
      if (month < 10) {
          month = "0".concat(month);
      }
      if (date < 10) {
          date = "0".concat(date);
      }
      return (year + "-" + month + "-" + date);
  }

  const checkOverlappingTime = (chosenStartTime, chosenEndTime, startTime, endTime) => {
        if (chosenStartTime >= startTime && (chosenEndTime <= endTime && chosenEndTime >= startTime || chosenEndTime > endTime)) {
            return true;
        }
        else if (chosenStartTime <= startTime && (chosenEndTime <= endTime && chosenEndTime >= startTime || chosenEndTime > endTime)) {
            return true;
        }
        else {
            return false;
        }
    }

    const getAvailableSeats = (date, duration, type) => {
        const arr = [];
        const chosenStartTime = new Date(bookingDate + "T" + getBookingTime(bookingHour, bookingMinute));
        const chosenEndTime = new Date(bookingDate + "T" + getBookingTime(parseInt(bookingHour) + parseInt(duration), bookingMinute));
        for (let i in bookings) {
            const obj = bookings[i];
            const startTime = new Date(obj.start_time);
            if (getBookingDate(startTime) === date) {
                const endTime = new Date(getBookingDate(startTime) + "T" + getBookingTime(startTime.getHours() + obj.duration, startTime.getMinutes()));
                for (let j in bookingSeat) {
                    if (bookingSeat[j].booking_id === obj.id) {
                        for (let k in seats) {
                            if (seats[k].id === bookingSeat[j].seat_id && seats[k].type === type) {
                                if (checkOverlappingTime(chosenStartTime, chosenEndTime, startTime, endTime)) {
                                    arr.push(seats[k].id);             
                                }
                            }
                        }
                    }
                }
            }  
        }
        const available = seats.filter((item) => {
            return arr.indexOf(item.id) === -1 && item.type === type;
        });

        console.log(available);
        //setAvailableSeats(available); -> doesn't set ?
        //console.log(availableSeats);
        return available;
    }


    const displayTimeOptions = (start, end) => {
        const arr = [];
        for (let i = start; i <= end; i++) {
            arr.push(<option key={i} value={i}>{i}</option>);
        }
        return arr;
    }


    const displaySeatOptions = () => {
        const arr = [];
        const availableSeats = getAvailableSeats(bookingDate, bookingDuration, seatType); // bc it doesn't set nên dùng cái này tạm :))
        for (let i in availableSeats) {
            const seat_id = availableSeats[i];
            arr.push(<button className="seat-selection-id" key={i} value={availableSeats[i]} onClick={(e) => {setSeatId(e.target.value)}}>
                        Seat {}
                    </button>);
        }

        return arr;
    }

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
    }
  
  return (
    <div className="form-wrapper">
      <h3 className="form-description">Make a Reservation</h3>
      <form>
          <table>
            <tbody>
              <div className="form-section">
                <tr>
                  <td>Booking Type</td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" name="booking-type" id='seat' value="seat" onChange={() => {setShowSeatType(true); setShowFormInput(true)}}/>
                    <label for="seat" className="booking-type">Seat</label>
                    <input type="radio" name="booking-type" id='stadium' value="stadium" onChange={() => {setShowFormInput(true); setShowSeatType(false)}}/>
                    <label for="stadium" className="booking-type">Stadium</label>
                  </td>
                </tr>
              </div>
              <div className="form-section" style={{display: showSeatType ? "block" : "none"}}>
                <tr>
                  <td>Seat Type</td>
                </tr>
                <tr>
                  <td>
                  <select onChange={(e) => {setSeatType(e.target.value); getSeatPrice(e.target.value)}}>
                    <option>Normal</option>
                    <option>Mid</option>
                    <option>VIP</option>
                  </select>
                  </td>
                </tr>
              </div>
              <div className="form-input-div" style={{display: showFormInput ? "block" : "none"}}>
                <div className="form-section">
                    <tr>
                    <td>Date</td>
                    </tr>
                    <tr>
                    <td>
                        <input type="date" name="date" min={today} max={maxDate} onChange={(e) => {setBookingDate(e.target.value)}}/>
                    </td>
                    </tr>
                </div>
                <div className="form-section">
                    <tr>
                    <td>Time</td>
                    </tr>
                    <tr>
                    <td>
                        <select onChange={(e) => {setBookingHour(e.target.value); setBookingTime(e.target.value, bookingMinute)}}>
                        {displayTimeOptions(6, 19)}
                        </select>
                    </td>
                    <td>
                        <select onChange={(e) => {setBookingMinute(e.target.value); setBookingTime(bookingHour, e.target.value)}}> 
                            {displayTimeOptions(0, 59)}
                        </select>
                    </td>
                    </tr>
                </div>
                <div className="form-section">
                    <tr>
                    <td>Duration</td>
                    </tr>
                    <tr>
                    <td>
                        <select onChange={(e) => {setBookingDuration(e.target.value); getAvailableSeats(bookingDate, e.target.value, seatType); setSeatPrice(prev => prev*parseInt(e.target.value))}}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        </select>
                    </td>
                    </tr>
                </div>
                <div className="form-section" style={{display: showSeatType ? "block" : "none"}}>
                    <tr>
                    <td>Choose a seat</td>
                    </tr>
                    <tr>
                    <td>
                        {displaySeatOptions()}
                    </td>
                    </tr>
                </div>
                <div className="form-section">
                    <tr>
                    <td>Price</td>
                    </tr>
                    <tr>
                    <td>
                        <input type="text" name="price" value={showSeatType ? seatPrice : stadiumPrice} readOnly={true}/>
                    </td>
                    </tr>
                </div>
              </div>
              
            </tbody>
          </table>
          <input className='submit-btn' type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default BookingPage
