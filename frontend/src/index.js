import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cookies from 'js-cookie'
import axios from 'axios'
axios.interceptors.request.use(function (config) {
    const token = Cookies.get("jwt");

    config.headers.Authorization =  `Bearer ${token}`;

    return config;
});
//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById("root"));