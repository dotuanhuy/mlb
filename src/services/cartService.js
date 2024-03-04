import axios from "../axios";
import {createAxios} from '../axiosJWT'

const axiosJWT = createAxios()

const getProductsInCartByUserService = (userId) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`/api/get-product-cart-by-user?userId=${userId}`)
    }
    return axios.get(`/api/get-product-cart-by-user?userId=${userId}`)
}

const addProductToCartService = (data) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.post('/api/add-product-to-cart', { data })
    }
}

const deleteProductInCartService = (data) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.post('/api/delet-products-cart', { data })
    }
} 

const deleteAProductInCartService = (data) => {
    const accessToken = window.localStorage.getItem('accessToken')
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