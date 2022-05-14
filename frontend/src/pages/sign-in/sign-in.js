import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, setSession } from "utils/common";
import pic from "../../assets/signin-background.jpg"
import "./sign-in.css"


function SignIn () {
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()) {
            navigate('/');          // If exist a token, redirect to Home (prevent goind back to Sign Up/Sign In)
        }
        
    }, []);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    
    const handleSignin = (event) => {
        event.preventDefault();
        const form = {
            username: username,
            password: password
        };

        axios.post('http://localhost:8080/customer/sign-in', form).then(response => {
            //setCustomerId(response.data);
            setCustomerId(1); // placeholder 
            /*    
            const token = res.data["password"];       // Get the token
            if (token) {
                setSession(token, username);    // If token exists, create new session with token and username
                navigate('/');                  // Redirect to Home
            }
            else {
                console.log("Fail!");
                errorMessage = 'Can\'t sign you in! Either you have entered the wrong credentials or something is wrong, please try again!'
            }*/
            if (response.ok) {
                navigate("/", {state: {customerId: customerId}});
            }
        }).catch(error => console.log(error.message));
    };

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
                                <td><label className="sign-in-label" htmlFor='username'>Username</label></td>
                            </tr>
                            <tr>
                                <td><input type='text' name="username" id="username" onChange={e => setUsername(e.target.value)} required/></td>
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