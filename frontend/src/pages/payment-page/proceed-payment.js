import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Payment() {
    const navigate = useNavigate();

    const [cardNum, setCardNum] = useState(null);
    const [expiry, setExpiry] = useState(null);
    const [cvv, setCVV] = useState(null);
    const toNextPage = () => {
        if (cardNum && expiry && cvv) {
            return navigate('/check-info', {state: {
                cardNum:    cardNum,
                expiry:     expiry,
                cvv:        cvv
            }});
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="container-fluid col-7">
                <h3 className="text-center mb-4">Proceed Payment</h3>
                <div className="row mb-3">
                    <div className="col"> <label htmlFor="card-number">Card number</label> </div>
                    <div className="col">
                        <input 
                            type={'text'}
                            id='card-number' 
                            onChange={e => setCardNum(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col"> <label htmlFor="expiry">Expiry</label> </div>
                    <div className="col">
                        <input 
                            type={'text'} 
                            id='expiry' 
                            onChange={e => setExpiry(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col"> <label htmlFor="cvv">CVV</label> </div>
                    <div className="col"> 
                        <input 
                            type={'number'} 
                            id='cvv' 
                            onChange={e => setCVV(e.target.value)}
                            required
                        /> 
                    </div>
                </div>

                <div className="mt-5 text-end">
                    <input 
                        className="btn" 
                        type={'button'} 
                        value='Next'
                        onClick={toNextPage}
                    />
                </div>
            </div>
        </div>
    );
}