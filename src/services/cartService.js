import axios from "../axios";
import {createAxios} from '../axiosJWT'
const accessToken = window.localStorage.getItem('accessToken')
const axiosJWT = createAxios()

const getProductsInCartByUserService = (userId) => {
    if (accessToken) {
        return axiosJWT.get(`/api/get-product-cart-by-user?userId=${userId}`)
    }
    return axios.get(`/api/get-product-cart-by-user?userId=${userId}`)
}

const addProductToCartService = (data) => {
    if (accessToken) {
        return axiosJWT.post('/api/add-product-to-cart', { data })
    }
}

const deleteProductInCartService = (data) => {
    if (accessToken) {
        return axiosJWT.post('/api/delet-products-cart', { data })
    }
} 

const deleteAProductInCartService = (data) => {
    if (accessToken) {
        return axiosJWT.post('/api/delete-a-product-cart', { data })
    }
} 

export {
    getProductsInCartByUserService,
    addProductToCartService,
    deleteProductInCartService,
    deleteAProductInCartService
}