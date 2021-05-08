import axios from 'axios';
const instance = axios.create({
     baseURL: 'https://mylisting-app-api.herokuapp.com/api/'
      //baseURL: 'http://localhost:9890/api/'
    
});

export default instance;

export const imgBaseUrl = 'https://mylisting-app-api.herokuapp.com/api/img/image/';
// export const imgBaseUrl = 'http://localhost:9890/api/img/image/';