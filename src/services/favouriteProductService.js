import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
const api = `/api/${API_VERSION}/favourite`

const getAllProductsFavouriteService = (userId) => {
    let accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}?userId=${userId}`, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.get(`${api}?userId=${userId}`)
}

const getAllProductsFavouriteLimitService = (userId, offset) => {
    let accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/limit?userId=${userId}&offset=${offset}`, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.get(`${api}/limit-limit?userId=${userId}&offset=${offset}`)
}

const changeProductFavouriteService = (data) => {
    let accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.post(`${api}/change`, data, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.post(`${api}/change`, data)
}

export {
    getAllProductsFavouriteLimitService,
    getAllProductsFavouriteService,
    changeProductFavouriteService
}
