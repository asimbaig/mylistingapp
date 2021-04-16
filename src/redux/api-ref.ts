import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://mylisting-app-api.herokuapp.com/api/'
});

export default instance;