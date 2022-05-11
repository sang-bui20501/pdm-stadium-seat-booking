import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, setSession } from "utils/common";
import pic from "../../assets/signin-background.jpg"
import "./sign-in.css"


function SignIn () {
    const navigate = useNavigate();
    var errorMessage = '';

    useEffect(() => {
        if (getToken()) {
            navigate('/');          // If exist a token, redirect to Home (prevent goind back to Sign Up/Sign In)
        }
        
    }, []);

    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    
    const handleSignin = (event) => {
        event.preventDefault();
        var form = {
            phone: phone,
            password: password
        };
        axios.post('http://localhost:8080/api/sign-in', form).then(res => {       // Send Sign in info to backend
            const token = res.data["password"];       // Get the token
            if (token) {
                setSession(token, phone);    // If token exists, create new session with token and username
                navigate('/');                  // Redirect to Home
            }
            else {
                console.log("Fail!");
                errorMessage = 'Can\'t sign you in! Either you have entered the wrong credentials or something is wrong, please try again!'
            }
        });
    };

    const toSignup = () => {
        navigate('/sign-up');
    }

    return (
        <div className="sign-in-form-wrapper">
            <div className="sign-in-pic-wrapper">
                <img src={pic} className="sign-in-pic" alt=""/>
            </div>
            <form method="post" className="sign-in-form" onSubmit={handleSignin}>
                <div className="sign-in-form-description">
                    <p>Booking App Sign In</p>
                    <hr></hr>
                </div>
                <table>
                    <tbody>
                        <div className="sign-in-credentials">
                            <tr>
                                <td><label className="sign-in-label" htmlFor='phone'>Phone</label></td>
                            </tr>
                            <tr>
                                <td><input type='text' name="phone" id="phone" onChange={e => setPhone(e.target.value)} required/></td>
                            </tr>
                        </div>
                        <div className="sign-in-credentials">
                            <tr><label className="sign-in-label" htmlFor='password'>Password</label></tr>
                            <tr><input type='password' name="password" id="password" onChange={e => setPassword(e.target.value)} required/></tr>
                        </div>
                    </tbody>
                </table>
                <button className="sign-in-btn">Sign In</button>
                <hr></hr>
                <p>
                    <Link to="/sign-up">Register</Link>
                </p> 
            </form>
        </div>
    );
};

export default SignIn;