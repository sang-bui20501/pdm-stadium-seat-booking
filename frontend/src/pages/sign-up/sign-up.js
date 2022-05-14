import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import pic from "../../assets/signin-background.jpg"
import "./sign-up.css"
import { useCookies } from "../../hooks/use-cookie/use-cookie";


function SignUp () {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameList, setUsernameList] = useState([]);


    const [firstName, setFName] = useState(null);
    const [lastName, setLName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);


    const handleSignup = async (event) => {
        const form = {
            firstName:  firstName,
            lastName:   lastName,
            midName: "",
            username:   username,
            password:   password
        }
        event.preventDefault();
        
        axios.post('http://localhost:8080/sign-up', form).then(response => {
            if (response.ok) {
                navigate("/");
            }
        }).catch((error) => console.log(error.message));

    };

    return (
        <div className="sign-up-form-wrapper">
            <div>
                <img src={pic} alt="" className="sign-up-pic"/>
            </div>
            <form autoComplete='off' className="sign-up-form" method="post" onSubmit={handleSignup}>
                <div className="sign-up-form-description">
                    <p>Booking App Sign Up</p>
                    <hr></hr>
                </div>
                <table>
                    <tbody>
                        <div className="sign-up-form-section">
                            <tr>
                                <td><label className="sign-up-label" htmlFor='first-name'>First name</label></td>
                                <td><label className="sign-up-label" htmlFor='last-name'>Last name</label></td>
                            </tr>
                            <tr>
                                <td><input type='text' className="sign-up-name-inputs" name="first-name" id="first-name" onChange={e => setFName(e.target.value)} required /></td>
                                <td><input type='text' className="sign-up-name-inputs" name="last-name" id="last-name" onChange={e => setLName(e.target.value)} required /></td>
                                
                            </tr>
                        </div>
                        <div className="sign-up-form-section">
                            <tr>
                                <td><label className="sign-up-label" htmlFor='username'>Username</label></td>
                            </tr>
                            <tr>
                                <td><input type='text' name="username" id="username" onChange={e => setUsername(e.target.value)}required /></td>
                            </tr>
                        </div>
                        <div className="sign-up-form-section">
                            <tr>
                                <td><label className="sign-up-label" htmlFor='password'>Password</label></td>
                            </tr>
                            <tr>
                                <td><input type='password' name="password" id="password" onChange={e => setPassword(e.target.value)} required /></td>
                            </tr>
                        </div>
                    </tbody>
                </table>
                <button className="sign-up-btn">Submit</button> 
            </form>
            {errorMessage === "" ? "" : 
                <p>{errorMessage}</p>
            }
        </div>
    );
};


export default SignUp;