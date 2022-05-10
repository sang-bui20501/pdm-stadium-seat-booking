import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, setSession } from "../../utils/Common";


function SignIn () {
    const navigate = useNavigate();
    var errorMessage = '';

    useEffect(() => {
        if (getToken())
            navigate('/');          // If token exists, redirect to Home (prevent going back to Sign In/Sign Up)
    }, []);

    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    
    const handleSignin = (event) => {
        event.preventDefault();
        var form = {
            phone: phone,
            password: password
        };
        axios.post('/api/signin', form).then(res => {       // Send Sign in info to backend
            const token = res.data.token;       // Get the token
            if (token) {
                setSession(token, phone);    // If token exists, create new session with token and username
                navigate('/');                  // Redirect to Home
            }
            else {
                errorMessage = 'Can\'t sign you in! Either you have entered the wrong credentials or something is wrong, please try again!'
            }
        });
    };

    const toSignup = () => {
        navigate('/sign-up');
    }

    return (
        <div className="container-fluid col-5 mt-5">
            <h3 className="mb-4 text-center">Sign In</h3>
            <form method="post" onSubmit={handleSignin}>
                <div className="container-fluid text-start">
                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='phone'>Phone</label> </div>
                        <div className="col">
                            <input type='text' name="phone" id="phone" onChange={e => setPhone(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='password'>Password</label> </div>
                        <div className="col">
                            <input type='password' name="password" id="password" onChange={e => setPassword(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="row mb-3"> <input className="btn" type='submit' value='Sign In'/> </div>
                    <div className="row"> <input className="btn" type='button' value='Sign up' onClick={toSignup}/> </div>
                </div>
            </form>

            <h1>{errorMessage}</h1>
        </div>
    );
};

export default SignIn;