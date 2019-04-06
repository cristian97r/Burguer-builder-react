import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_DB_URL
});

export default instance;