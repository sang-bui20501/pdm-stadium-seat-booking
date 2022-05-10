import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../utils/Common";


function ShowBookings () {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token == null)
            navigate('/signin');        // If token not exist, redirect back to sign in (prevent unauthorized person to access the page)
    }, []);


    const bookings = () => {
        const user = getUser();
        axios.post('/api/getBookings', user).then(res => {
            return res.data.bookings;       // Retrieve all bookings of user from db based on username (saved in session)
        });
    };

    const ListBookings = () => {
        if (bookings) {         // Display a list of bookings if the list has elements
            return (
                <>
                    {bookings.map(item => 
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> {item.name} </h5>
                                <p className="card-text">
                                    Date booked: {item.date} <br/>
                                    Number of seats: {item.seats} <br/>
                                </p>
                            </div>
                        </div>    
                    )}
                </>
            );
        }
        else            // Display this if the list is empty
            return ( <h3>Looks like you haven't booked anything, yet!</h3> );
    }
    return (
        <div>
            <ListBookings></ListBookings>
        </div>
    );
}



export default ShowBookings;