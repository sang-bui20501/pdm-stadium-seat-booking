import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setSession } from "./Utils/Common";


function SignIn () {
    const navigate = useNavigate();
    var errorMessage = '';

    useEffect(() => {
        if (getToken())
            navigate('/');          // If token exists, redirect to Home (prevent going back to Sign In/Sign Up)
    }, []);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const handleSignin = (event) => {
        event.preventDefault();
        var form = {
            username: username,
            password: password
        };
        axios.post('/api/signin', form).then(res => {       // Send Sign in info to backend
            const token = res.data.token;       // Get the token
            if (token) {
                setSession(token, username);    // If token exists, create new session with token and username
                navigate('/');                  // Redirect to Home
            }
            else {
                errorMessage = 'Can\'t sign you in! Either you have entered the wrong credentials or something is wrong, please try again!'
            }
        });
    };

    return (
        <div>
            <form method="post" onSubmit={handleSignin}>
                <table>
                    <tr>
                        <td> <label for='username'>Username</label> </td>
                        <td> <input type='text' name="username" id="username" onChange={e => setUsername(e.target.value)} required/> </td>
                    </tr>

                    <tr>
                        <td> <label for='password'>Password</label> </td>
                        <td> <input type='password' name="password" id="password" onChange={e => setPassword(e.target.value)} required/> </td>
                    </tr>

                    <tr> <td> <input type='submit' value='Sign In'/> </td> </tr>
                </table>
            </form>

            <h1>{errorMessage}</h1>
        </div>
    );
};


export default SignIn;