import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
const api = `/api/${API_VERSION}/cart`

const getProductsInCartByUserService = (userId) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/user?userId=${userId}`)
    }
    return axios.get(`${api}/user?userId=${userId}`)
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