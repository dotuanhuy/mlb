import axios from "../axios";
import {createAxios} from '../axiosJWT'
const axiosJWT = createAxios()

const getAllImageProductService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get('/api/get-all-images-product')
    }
    return axios.get('/api/get-all-images-product')
}

const getAllImagesByProductIdService = (id) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`/api/get-all-images-by-productId?id=${id}`)
    }
    else {
        return axios.get(`/api/get-all-images-by-productId?id=${id}`)
    }
}

const addImageProductService = (data) => {
    return axiosJWT.post('/api/change-image-product', data)
    // return axios.post('/api/add-image-product', data)
}

const deleteImageProductService = (data) => {
    return axiosJWT.post('/api/delete-image-product', data)
    // return axios.post('/api/add-image-product', data)
}

const getImageProductByCategoryService = (category) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`/api/get-image-product-by-category?category=${category}`)
    }
    return axios.get(`/api/get-image-product-by-category?category=${category}`)
}

export {
    getAllImageProductService,
    getAllImagesByProductIdService,
    addImageProductService,
    deleteImageProductService,
    getImageProductByCategoryService
}