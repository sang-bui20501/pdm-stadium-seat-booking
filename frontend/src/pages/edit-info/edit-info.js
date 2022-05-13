import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken, getUser } from "Utils/Common";



export default function EditInfo () {
    const token = getToken();
    const [phone, setPhone] = useState();
    const [newPass, setNewPass] = useState();
    const [password, setPassword] = useState();
    const [rePass, setRePass] = useState();
    const [oldPass, setOldPass] = useState();
    const [newInfo, setNewInfo] = useState();
    
    useEffect(() => {
        setPhone(() => {
            axios.post('api/getPhone', {token: token}).then(res => {
                return res.data;
            });
        });

        setOldPass(() => {
            axios.post('api/getPass', {token: token}).then(res => {
                return res.data;
            });
        })
    });

    const handleSubmit = () => {
        if (password === rePass && newPass != oldPass) {
            if (newPass === '') {
                setNewInfo({
                    phone: phone
                });
            }
            else {
                setNewInfo({
                    phone: phone,
                    newPass: newPass
                })
                
            }
            axios.post('api/updateInfo', newInfo).then(res => {
                console.log('Success!');
            });
        }
        else
            console.log('Failed! Either re-type password is wrong or new password is already used');
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card w-50">
                <div className="list-group">
                    <div className="list-group-item">
                        <h2 className="text-center">Your Information</h2>
                    </div>
                    
                    <div className="list-group-item">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <label for='phone'>Phone number</label>
                                </div>
                                
                                <div className="col">
                                    <input
                                        type={'number'} 
                                        id='phone' 
                                        name='phone' 
                                        value={phone} 
                                        onChange = {e => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col">
                                    <label for='new-password'>New password</label>
                                </div>

                                <div className="col">
                                    <input 
                                        type={'password'} 
                                        id='new-password' 
                                        name='new-password'
                                        onChange={e => setNewPass(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="list-group-item">
                        <div className="row">
                            <div className="col">
                                <label for='password'>Password</label>
                            </div>

                            <div className="col">
                                <input 
                                    type={'password'} 
                                    id='password' 
                                    name='password'
                                    onChange={e => setPassword(e.target.value)}
                                    required    
                                />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col">
                                <label for='re-password'>Re-type password</label>
                            </div>

                            <div className="col">
                                <input 
                                    type={'password'} 
                                    id='re-password' 
                                    name='re-password'
                                    onChange={e => setRePass(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="list-group-item text-center">
                        <input className="btn btn-primary shadow-0 w-100" type={'submit'} value='Change your info'/>
                    </div>
                </div>
            </div>
        </div>
    );
}