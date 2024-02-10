import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllProductTypesService = (accessToken, page) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-all-product-type-limit?page=${page}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    else {
        return axios.get(`/api/get-all-product-type-limit?page=${page}`)
    }
}

const getProductTypeByCategoryIdService = (accessToken, categoryId) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-product-type-by-categoryId?categoryId=${categoryId}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    else {
        return axios.get(`/api/get-product-type-by-categoryId?categoryId=${categoryId}`)
    }
}

const getProductTypeByIdService = (accessToken, id) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-product-type-by-id?id=${id}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    else {
        return axios.get(`/api/get-product-type-by-id?id=${id}`)
    }
}

const createProductTypeService = (accessToken, data) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/create-product-type', { data }, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get('/api/get-all-categories')
}

const deleteProductTypeService = (accessToken, id) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/delete-product-type-by-id', { id }, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get('/api/get-all-categories')
}

const updateProductTypeService = (accessToken, data) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/update-product-type', { data }, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get('/api/get-all-categories')
}

export {
    getAllProductTypesService,
    getProductTypeByCategoryIdService,
    getProductTypeByIdService,
    createProductTypeService,
    deleteProductTypeService,
    updateProductTypeService
}