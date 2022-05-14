import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from './../../hooks/use-cookie/use-cookie';
import "./edit-info.css"


export default function EditInfo () {
    
    //const token = getToken();
    //const location = useLocation();
    //const customerId = location.state;
    const navigate = useNavigate();
    const { cookies } = useCookies();
    const customerId = cookies.userId;
    
    const [user, setUser] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [disableUsernameEdit, setDisableUsernameEdit] = useState(true);
    const [disablePasswordEdit, setDisablePasswordEdit] = useState(true);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    
    const getUser = async () => {
        axios.get(`http://localhost:8080/customer/edit/${customerId}`).then((response) => {
            if (response.data) {
                setUser(response.data);
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                setUsername(response.data.username);
                setPassword(response.data.password);
            }
        }).catch(error => console.log(error.message));
    }

    useEffect(() => {
        // placeholder values
        //setUser({username: "alo123", password: "123456", first_name: "Sang", last_name: "Bui"});

        // setFirstName("Sang");
        // setLastName("Bui");
        // setUsername("alo123");
        // setPassword("123456");

        getUser();

    }, []);
    /*
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

    };*/

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            username: user.username,
            password: user.password
        };
        if (username !== user.username) {
            form.username = username;
        }
        if (password !== user.password) {
            form.password = password;
        }
        axios.post(`http://localhost:8080/customer/edit/${customerId}/update`, form).then((response) => {
            if (response.data) {
                navigate("/edit-info")
            }
        }).catch((error) => console.log(error.message));
    }

    return (
        <div className="edit-info-body">
        <div className="edit-info-form-wrapper">
          <form className="edit-info-form" onSubmit={handleSubmit}>
            <h3 className="edit-info-form-description">Your info</h3>
            <table className="edit-info-table">
              <tbody>
                  <div className="edit-info-form-section">
                    <tr>
                        <td className="edit-info-td"><label for="first-name">First name</label></td>
                        <td className="edit-info-td"><label for="last-name">Last name</label></td>
                    </tr>
                    <tr>
                        <td className="edit-info-td"><input type='text' className="edit-info-name" name="first-name" value={firstName} readOnly={true}/></td>
                        <td className="edit-info-td"><input type='text' className="edit-info-name" name="last-name" value={lastName} readOnly={true}/></td>   
                    </tr>
                  </div>
                <div className="edit-info-form-section">
                    <tr>
                        <td className="edit-info-td"><label for="username">Username</label></td>
                    </tr>
                    <tr>
                        <td className="edit-info-td"><input type='text' className="edit-info-item" name="username" value={username} readOnly={disableUsernameEdit} onChange={(e) => setUsername(e.target.value)}/></td>
                        <td className="edit-info-td"><input type="button" className="edit-info-edit-btn" value={disableUsernameEdit ? "Edit" : "Ok"} onClick={() => setDisableUsernameEdit(!disableUsernameEdit)}/></td>
                    </tr>
                </div>
                <div className="edit-info-form-section">
                    <tr>
                        <td className="edit-info-td"><label for="password">Password</label></td>
                    </tr>
                    <tr>
                        <td className="edit-info-td"><input type='password' className="edit-info-item" name="password" value={password} readOnly={disablePasswordEdit} onChange={(e) => setPassword(e.target.value)}/></td>
                        <td className="edit-info-td"><input type="button" className="edit-info-edit-btn" value={disablePasswordEdit ? "Edit" : "Ok"} onClick={() => setDisablePasswordEdit(!disablePasswordEdit)}/></td>
                    </tr>
                </div>
              </tbody>
            </table>
            <input className="edit-info-submit-btn" type="submit" value="Submit"/>
          </form>
        </div>
      </div>
        /*
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
                                        value={username} 
                                        onChange = {e => setUsername(e.target.value)}
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
                                        onChange={e => setPassword(e.target.value)}
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
                                    onChange={e => setPassword(e.target.value)}
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
        */
    );
}