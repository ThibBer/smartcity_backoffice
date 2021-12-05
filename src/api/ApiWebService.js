import axios from "axios";
import axiosRetry from 'axios-retry';
axiosRetry(axios, {retries: process.env.REACT_APP_EXPONENTIAL_RETRY_COUNT, retryDelay: axiosRetry.exponentialDelay});

function getHeaderAuthorization(){
    return {'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`};
}

const ApiWebService = {};

ApiWebService.get = async (route) => {
    return await axios.get(process.env.REACT_APP_API_URL + route, {headers: getHeaderAuthorization()});
}

ApiWebService.patch = async (route, data) => {
    return await axios.patch(process.env.REACT_APP_API_URL + route, data, {headers: getHeaderAuthorization()});
}

ApiWebService.post = async (route, data) => {
    return await axios.post(process.env.REACT_APP_API_URL + route, data, {headers: getHeaderAuthorization()});
}

ApiWebService.delete = async (route, data) => {
    return await axios.delete(process.env.REACT_APP_API_URL + route, {
        headers: getHeaderAuthorization(),
        data: data
    });
}

export default ApiWebService;