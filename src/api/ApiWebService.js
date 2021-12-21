import axios from "axios";
import axiosRetry from 'axios-retry';
axiosRetry(axios, {
    retries: process.env.REACT_APP_EXPONENTIAL_RETRY_COUNT,
    retryDelay: axiosRetry.exponentialDelay
});

const API_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION+ "/";

function getHeaderAuthorization(){
    return {'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`};
}

const ApiWebService = {};

ApiWebService.get = async (route) => {
    return await axios.get(API_URL + route, {headers: getHeaderAuthorization()});
}

ApiWebService.patch = async (route, data, useFormData) => {
    const headers = getHeaderAuthorization();

    if(useFormData){
        headers["Content-Type"] = "multipart/form-data";
    }

    return await axios.patch(API_URL + route, data, {headers});
}

ApiWebService.post = async (route, data, useFormData) => {
    const headers = getHeaderAuthorization();

    if(useFormData){
        headers["Content-Type"] = "multipart/form-data";
    }

    console.log(headers)

    return await axios.post(API_URL + route, data, {headers});
}

ApiWebService.delete = async (route, data) => {
    return await axios.delete(API_URL + route, {
        headers: getHeaderAuthorization(),
        data: data
    });
}

export default ApiWebService;