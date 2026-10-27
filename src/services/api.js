import axios from 'axios';

const api = axios.create({
    baseURL: '', // This tells Axios to send requests relative to http://localhost:5174, letting Vite's proxy pick them up
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;