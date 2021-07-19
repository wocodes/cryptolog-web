import axios from "axios";
import {getFromStorage} from "../helpers/storage";
// import NProgress from "nprogress/nprogress"
import 'nprogress/nprogress.css';
import {TOKEN_KEY} from "../helpers/constants";

let headers = {
    'Authorization': "Bearer " + getFromStorage(TOKEN_KEY)
};

const Axios = axios.create({
    baseURL: 'http://api.assetlog.wip/api',
    headers: headers
});


Axios.interceptors.request.use(request => {
    // NProgress.start()

    return request;
});
//
// Axios.interceptors.response.use(response => {
//     NProgress.done();
//     return response;
// });

export default Axios;