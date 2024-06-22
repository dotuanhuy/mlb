import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/firebase`

const getImageSizesService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/image/size`)
    }
    return axios.get(`${api}/image/size`)
}

const getImageLogoWebService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/image/logo`)
    }
    return axios.get(`${api}/image/logo`)
}

export {
    getImageSizesService,
    getImageLogoWebService
}
