import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
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

const addImageProductService = (data) => {
    return axiosJWT.post(`${api}/change`, data)
}

const deleteImageProductService = (data) => {
    return axiosJWT.post(`${api}/delete`, data)
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