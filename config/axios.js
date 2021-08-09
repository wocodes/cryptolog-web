import axios from "axios";
import {deleteFromStorage, getFromStorage} from "../helpers/storage";
import 'nprogress/nprogress.css';
import {USER_TOKEN_KEY} from "../helpers/constants";

let headers = {
    'Authorization': "Bearer " + getFromStorage(USER_TOKEN_KEY)
};

const Axios = axios.create({
    baseURL: process.env.API_URL,
    headers: headers,
    validateStatus: function(status) {
        console.log('status', status);
        // if (window.location.pathname === '/' && status === 401) {
        //     window.location.reload();
        // } else
        if (window.location.pathname !== '/' && status === 401) {
            deleteFromStorage(USER_TOKEN_KEY);
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