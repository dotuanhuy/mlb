import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllProductsFavouriteService = (accessToken, userId,) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-all-favourite-products?userId=${userId}`, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.get(`/api/get-all-favourite-products?userId=${userId}`)
}

const getAllProductsFavouriteLimitService = (accessToken, userId, offset) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-all-favourite-products-limit?userId=${userId}&offset=${offset}`, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.get(`/api/get-all-favourite-products-limit-limit?userId=${userId}&offset=${offset}`)
}

const addProductFavouriteService = (accessToken, data) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.post(`/api/add-product-favourite`, data, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.post(`/api/add-product-favourite`, data)
}

export {
    getAllProductsFavouriteLimitService,
    getAllProductsFavouriteService,
    addProductFavouriteService
}
