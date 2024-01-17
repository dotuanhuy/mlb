import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getProductsInCartByUserService = (accessToken, userId) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-product-cart-by-user?userId=${userId}`, { headers: { token: `Bearer ${accessToken}` }})
    }
    return axios.get(`/api/get-product-cart-by-user?userId=${userId}`)
}

const addProductToCartService = (accessToken, data) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.post('/api/add-product-to-cart', { data }, { headers: { token: `Bearer ${accessToken}` }})
    }
}

const deleteProductInCartService = (accessToken, data) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.post('/api/delet-products-cart', { data }, { headers: { token: `Bearer ${accessToken}` }})
    }
} 

const deleteAProductInCartService = (accessToken, data) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.post('/api/delete-a-product-cart', { data }, { headers: { token: `Bearer ${accessToken}` }})
    }
} 

export {
    getProductsInCartByUserService,
    addProductToCartService,
    deleteProductInCartService,
    deleteAProductInCartService
}