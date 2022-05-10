import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function CheckInfo() {
    const location = useLocation();

    useEffect(() => {
        console.log(location.state)
    })

    const proceedPayment = () => {

    }

    return (
        <div className="d-flex mt-5 justify-content-center">
            <div className="card w-50 border border-primary shadow-0">
                <h2 className="card-header text-center">Check your Information</h2>
                <div className="card-body">
                    <h5 className="card-text">
                        Name: {}
                    </h5>

                    <h5 className="card-text">
                        Email: {}
                    </h5>

                    <h5 className="card-text">
                        Card number: {location.state.cardNum}
                    </h5>
                </div>
                <div className="card-footer">
                    <h3 className="mb-4">Price: {}</h3>
                    <div className="text-center">
                        <button className="btn btn-primary shadow-0 w-100" type={'button'} onClick={proceedPayment}>Pay</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}