import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
const api = `/api/${API_VERSION}/producttype`


const getAllProductTypesService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}`)
    }
    else {
        return axios.get(`${api}`)
    }
}

const getLimitProductTypesService = (page) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/limit?page=${page}`)
    }
    else {
        return axios.get(`${api}/limit?page=${page}`)
    }
}

const getProductTypeByCategoryIdService = (categoryId) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/categoryId?categoryId=${categoryId}`)
    }
    else {
        return axios.get(`${api}/categoryId?categoryId=${categoryId}`)
    }
}

const getProductTypeByIdService = (id) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/id?id=${id}`)
    }
    else {
        return axios.get(`${api}/id?id=${id}`)
    }
}

const createProductTypeService = (data) => {
    return axiosJWT.post(`${api}/create`, { data })
}

const deleteProductTypeService = (id) => {
    return axiosJWT.delete(`${api}/delete?id=${id}`)
}

const updateProductTypeService = (data) => {
    return axiosJWT.post(`${api}/update`, { data })
}

export {
    getAllProductTypesService,
    getLimitProductTypesService,
    getProductTypeByCategoryIdService,
    getProductTypeByIdService,
    createProductTypeService,
    deleteProductTypeService,
    updateProductTypeService
}