import axios from "axios";
import {deleteFromStorage, getFromStorage} from "../helpers/storage";
import 'nprogress/nprogress.css';

let vuexStore = getFromStorage('vuex');
console.log(vuexStore);
if(vuexStore) {
    console.log('i dey')
} else console.log('i no dey')

const USER_TOKEN = vuexStore ? JSON.parse(vuexStore).user.token : null;

let headers = {};

if (USER_TOKEN) {
    headers['Authorization'] = "Bearer " + USER_TOKEN;
}

const Axios = axios.create({
    baseURL: process.env.API_URL,
    headers: headers,
    validateStatus: function(status) {
        console.log('status', status);
        // if (window.location.pathname === '/' && status === 401) {
        //     window.location.reload();
        // } else
        if (window.location.pathname !== '/' && status === 401) {
            deleteFromStorage(USER_TOKEN);
            window.location.reload();
        }

        return status >= 200 && status < 300; // default
    }
});

Axios.interceptors.request.use(config => {
    return config;
});

Axios.interceptors.response.use(response => {
    return response;
});

export default Axios;