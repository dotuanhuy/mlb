import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/cart`

const getProductsInCartByUserService = () => {
    return axiosJWT.get(`${api}/user`)
}

const addProductToCartService = (data) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.post(`${api}/create`, { data })
    }
}

const deleteProductInCartService = (data) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.post(`${api}/delete`, { data })
    }
}

const changeCartService = (data) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.post(`${api}/change`, { data })
    }
}

export {
    getProductsInCartByUserService,
    addProductToCartService,
    deleteProductInCartService,
    changeCartService
}