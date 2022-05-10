import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setSession } from "Utils/Common";


function SignUp () {
    const navigate = useNavigate();
    var errorMessage = '';

    const [usernameList, setUsernameList] = useState(null);
    useEffect(() => {
        if (getToken())
            navigate('/');          // If exist a token, redirect to Home (prevent goind back to Sign Up/Sign In)

        setUsernameList(() => {                        // Get all usernames from db
            axios.get('http://localhost:8080/api/getUsernames').then(res => {
                console.log(res.data);
                return res.data.usernames;
            })
        });

    }, []);

    const [firstName, setFName] = useState(null);
    const [midName, SetMName] = useState(null);
    const [lastName, setLName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [checkPw, setCheckPw] = useState(null);
    
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
                
                axios.post('http://localhost:8080/signing/save', form).then(res => {   // Send sign up info to backend
                    console.log(res.data);
                    if (res.data.token) {                       // Generate token at backend, then send it to frontend
                        setSession(res.data.token, username);   // Set new session with acquired token and username
                        navigate('/');                          // Redirect to Home
                    }
                });
            }
            else {    
                errorMessage = 'Re-type password must match your password!';
            }
        }
        else {
            errorMessage = 'Username is already taken! Please choose another one.'
        }
    };

    return (
        <div className="container-fluid col-7 mt-5">
            <h3 className="mb-4 text-center">Create your account!</h3>
            <form autoComplete='off' method="post" onSubmit={handleSignup}>
                <div className="container-fluid text-start">
                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='first-name'>First name</label> </div>
                        <div className="col">
                            <input
                                type='text'
                                name="first-name"
                                id="first-name"
                                onChange={e => setFName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='mid-name'>Middle name (optional)</label> </div>
                        <div className="col">
                            <input  
                                type='text'
                                name="mid-name" 
                                id="mid-name"
                                onChange={e => SetMName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='last-name'>Last name</label> </div>
                        <div className="col">
                            <input  
                                type='text'
                                name="last-name" 
                                id="last-name" 
                                onChange={e => setLName(e.target.value)}
                                required
                            /> 
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='username'>Username</label> </div>
                        <div className="col">
                            <input 
                                type='text' 
                                name="username" 
                                id="username" 
                                onChange={e => setUsername(e.target.value)}
                                required
                            /> 
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='password'>Password</label> </div>
                        <div className="col">
                            <input 
                                type='password' 
                                name="password" 
                                id="password" 
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col"> <label htmlFor='check-pw'>Re-type your password</label> </div>
                        <div className="col">
                            <input 
                                type='password' 
                                name="check-pw" 
                                id="check-pw" 
                                onChange={e => setCheckPw(e.target.value)}
                                required
                            /> 
                        </div>
                    </div>

                    <div className="row mb-3"> <input className="btn" type='submit' value='Submit'/> </div>
                </div>
            </form>

            <p>{errorMessage}</p>
        </div>
    );
};


export default SignUp;