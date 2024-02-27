import axios from "../axios";
import {createAxios} from '../axiosJWT'
const accessToken = window.localStorage.getItem('accessToken')
const axiosJWT = createAxios()

const getAllProductsFavouriteService = (userId) => {
    if (accessToken) {
        return axiosJWT.get(`/api/get-all-favourite-products?userId=${userId}`, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.get(`/api/get-all-favourite-products?userId=${userId}`)
}

const getAllProductsFavouriteLimitService = (userId, offset) => {
    if (accessToken) {
        return axiosJWT.get(`/api/get-all-favourite-products-limit?userId=${userId}&offset=${offset}`, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.get(`/api/get-all-favourite-products-limit-limit?userId=${userId}&offset=${offset}`)
}

const changeProductFavouriteService = (data) => {
    if (accessToken) {
        return axiosJWT.post(`/api/add-product-favourite`, data, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.post(`/api/add-product-favourite`, data)
}

export {
    getAllProductsFavouriteLimitService,
    getAllProductsFavouriteService,
    changeProductFavouriteService
}
