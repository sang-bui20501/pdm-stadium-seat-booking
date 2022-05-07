import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "./Utils/Common";


function Home () {
    const navigate = useNavigate();

    const Body = () => {
        const token = getToken();
        if (token) {
            return (
                <div>
                    <h1>Welcome Back!</h1>
                </div>
            );
        }
        return (
            <div>
                <h1>I suggest you sign in or sign up</h1>
            </div>
        );
    };
    return (
        <div>
            <Body></Body>
        </div>
    );
};


export default Home;