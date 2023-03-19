import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

axios.defaults.baseURL = 'https://sweep-line-points-in-circles.herokuapp.com/'

axios.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        ...{
            'Content-Type': 'application/json',
        },

    };
    return config;
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
