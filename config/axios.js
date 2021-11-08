import axios from "axios";
import {getFromStorage} from "../helpers/storage";
import 'nprogress/nprogress.css';


const populateHeaders = function() {
    let vuexStore = getFromStorage('vuex');

    const USER_TOKEN = vuexStore ? JSON.parse(vuexStore).user.token : null;

    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    if (USER_TOKEN) {
        headers['Authorization'] = "Bearer " + USER_TOKEN;
    }

    return headers;
}

const Axios = axios.create({
    baseURL: process.env.API_URL,
    headers: populateHeaders(),
    validateStatus: function(status) {
        // console.log('status', status);
        // if (window.location.pathname === '/' && status === 401) {
        //     console.log('here');
        //     // window.location.reload(true);
        // } else
        // if (window.location.pathname !== '/' && status === 401) {
        //     console.log('there')
        //     // deleteFromStorage(USER_TOKEN);
        //     // window.location.reload();
        // }

        return status >= 200 && status < 300; // default
    }
});

Axios.interceptors.request.use(config => {
    if(!config.headers['Authorization']) {
        config.headers = populateHeaders()
    }

    return config;
});

Axios.interceptors.response.use(response => {
    return response;
});

export default Axios;