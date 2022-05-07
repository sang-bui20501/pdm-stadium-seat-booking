import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "./Utils/Common";


function Home () {
    const navigate = useNavigate();


    const showBookings = () => {
        navigate('/your-bookings');
    }
    const Body = () => {
        const token = getToken();
        if (1) {
            return (
                <div>
                    <h1>Welcome Back!</h1>
                    <input className="btn" type='button' onClick={showBookings} value='Show your bookings'/>
                </div>
            );
        }
        return (
            <div>
                <h1>I suggest you sign in or sign up</h1>
            </div>
        );
    };
    return (
        <div>
            <Body></Body>
        </div>
    );
};


export default Home;