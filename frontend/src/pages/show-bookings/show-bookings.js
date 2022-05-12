import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken, getUser } from "utils/common";


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
                console.log(res.data)
                return res.data;       // Retrieve all bookings of user from db based on username (saved in session)
            });
        })
    }, []);


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
    };

    return (
        <div>
            <>
                {/* {Array(bookingList).map(item => 
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"> {item.name} </h5>
                            <p className="card-text">
                                Date booked: {item.date} <br/>
                                Number of seats: {item.seats} <br/>
                            </p>
                        </div>
                    </div>    
                )} */}

                <ListBookings></ListBookings>
            </>
        </div>
    );
}



export default ShowBookings;