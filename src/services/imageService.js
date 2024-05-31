import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/image`

const getAllImageProductService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}`)
    }
    return axios.get(`${api}`)
}

const getAllImagesByProductIdService = (id) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/product/id?id=${id}`)
    }
    else {
        return axios.get(`${api}/product/id?id=${id}`)
    }
}

const addImageProductService = (formData, id, type) => {
    return axiosJWT.post(`${api}/change?productId=${id}&type=${type}`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
}

const deleteImageProductService = (formData, type) => {
    return axiosJWT.post(`${api}/delete?type=${type}`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
}

const getImageProductByCategoryService = (category) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/category?category=${category}`)
    }
    return axios.get(`${api}/category?category=${category}`)
}

export {
    getAllImageProductService,
    getAllImagesByProductIdService,
    addImageProductService,
    deleteImageProductService,
    getImageProductByCategoryService
}