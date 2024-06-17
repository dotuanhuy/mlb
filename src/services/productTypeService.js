import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

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

const createProductTypeService = (formData, type) => {
    return axiosJWT.post(`${api}/create?type=${type}&found=productType`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const deleteProductTypeService = (id) => {
    return axiosJWT.delete(`${api}/delete?id=${id}&type=single`)
}

const updateProductTypeService = (formData, id, type, found) => {
    return axiosJWT.post(`${api}/update?type=${type}&id=${id}&found=${found}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

const getLimitProductTypesByNameService = (page, name) => {
    return axiosJWT.get(`${api}/limit/name?page=${page}&name=${name}`)
}

export {
    getAllProductTypesService,
    getLimitProductTypesService,
    getProductTypeByCategoryIdService,
    getProductTypeByIdService,
    createProductTypeService,
    deleteProductTypeService,
    updateProductTypeService,
    getLimitProductTypesByNameService
}