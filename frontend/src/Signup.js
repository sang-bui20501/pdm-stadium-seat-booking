import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setSession } from "./Utils/Common";


function SignUp () {
    const navigate = useNavigate();
    var errorMessage = '';

    useEffect(() => {
        if (getToken())
            navigate('/');          // If exist a token, redirect to Home (prevent goind back to Sign Up/Sign In)
    }, []);

    const [firstName, setFName] = useState(null);
    const [midName, SetMName] = useState(null);
    const [lastName, setLName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [checkPw, setCheckPw] = useState(null);

    const usernameList = () => {                        // Get all usernames from db
        axios.get('/api/getUsernames').then(res => {
            return res.data.usernames;
        })
    };
    
    const handleSignup = (event) => {
        var form = null;
        event.preventDefault();
        if (!usernameList.includes(username)) {         // If username is new, proceed
            if (password === checkPw) {                 // If password match re-type pw, proceed
                form = {
                    firstName:  firstName,
                    midName:    midName,
                    lastName:   lastName,
                    username:   username,
                    password:   password
                }
    
                axios.post('/api/signup', form).then(res => {   // Send sign up info to backend
                    if (res.data.token) {                       // Generate token at backend, then send it to frontend
                        setSession(res.data.token, username);   // Set new session with acquired token and username
                        navigate('/');                          // Redirect to Home
                    }
                });
            }
            else {
                setCheckPw(null);       // If password does not match re-type pw, clear both password re-type pw
                setPassword(null);      
                errorMessage = 'Re-type password must match your password!';
            }
        }
        else {
            setUsername(null);
            errorMessage = 'Username is already taken! Please choose another one.'
        }
    };

    return (
        <div>
            <form autoComplete='off' method="post" onSubmit={handleSignup}>
                <table>
                    <tr>
                        <td> <label for='first-name'>First name</label> </td>
                        <td>
                            <input
                                type='text'
                                name="first-name"
                                id="first-name"
                                onChange={e => setFName(e.target.value)}
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td> <label for='mid-name'>Middle name (optional)</label> </td>
                        <td>
                            <input  
                                type='text'
                                name="mid-name" 
                                id="mid-name"
                                onChange={e => SetMName(e.target.value)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td> <label for='last-name'>Last name</label> </td>
                        <td> 
                            <input  
                                type='text'
                                name="last-name" 
                                id="last-name" 
                                onChange={e => setLName(e.target.value)}
                                required
                            /> 
                        </td>
                    </tr>

                    <tr>
                        <td> <label for='username'>Username</label> </td>
                        <td> 
                            <input 
                                type='text' 
                                name="username" 
                                id="username" 
                                onChange={e => setUsername(e.target.value)}
                                required
                            /> 
                        </td>
                    </tr>

                    <tr>
                        <td> <label for='password'>Password</label> </td>
                        <td> 
                            <input 
                                type='password' 
                                name="password" 
                                id="password" 
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </td>
                    </tr>

                    <tr>
                        <td> <label for='check-pw'>Re-type your password</label> </td>
                        <td> 
                            <input 
                                type='password' 
                                name="check-pw" 
                                id="check-pw" 
                                onChange={e => setCheckPw(e.target.value)}
                                required/> 
                        </td>
                    </tr>

                    <tr> <td> <input type='submit' value='Submit'/> </td> </tr>
                </table>
            </form>

            <p>{errorMessage}</p>
        </div>
    );
};


export default SignUp;