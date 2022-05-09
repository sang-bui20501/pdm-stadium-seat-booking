import React from "react";
import { useLocation } from "react-router-dom";


export default function CheckInfo() {
    const location = useLocation();

    return (
        <div className="container-fluid mt-5">
            <p> {location.state.cardNum} </p>
            <p> {location.state.expiry} </p>
            <p> {location.state.cvv} </p>
        </div>
    );
}