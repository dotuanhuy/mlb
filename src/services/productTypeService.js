import axios from "../axios";
import {createAxios} from '../axiosJWT'
const axiosJWT = createAxios()

const getAllProductTypesService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get('/api/get-all-product-type')
    }
    else {
        return axios.get('/api/get-all-product-type')
    }
}

const getLimitProductTypesService = (page) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`/api/get-product-type-limit?page=${page}`)
    }
    else {
        return axios.get(`/api/get-product-type-limit?page=${page}`)
    }
}

const getProductTypeByCategoryIdService = (categoryId) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`/api/get-product-type-by-categoryId?categoryId=${categoryId}`)
    }
    else {
        return axios.get(`/api/get-product-type-by-categoryId?categoryId=${categoryId}`)
    }
}

const getProductTypeByIdService = (id) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`/api/get-product-type-by-id?id=${id}`)
    }
    else {
        return axios.get(`/api/get-product-type-by-id?id=${id}`)
    }
}

const createProductTypeService = (data) => {
    return axiosJWT.post('/api/create-product-type', { data })
    // return axios.get('/api/get-all-categories')
}

const deleteProductTypeService = (id) => {
    return axiosJWT.post('/api/delete-product-type-by-id', { id })
    // return axios.get('/api/get-all-categories')
}

const updateProductTypeService = (data) => {
    return axiosJWT.post('/api/update-product-type', { data })
    // return axios.get('/api/get-all-categories')
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