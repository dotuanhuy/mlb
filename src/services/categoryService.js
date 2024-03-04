import axios from "../axios";
import {createAxios} from '../axiosJWT'
const axiosJWT = createAxios()

const getAllCategoriesService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get('/api/get-all-categories')
    }
    return axios.get('/api/get-all-categories')
}

const getAllCategoriesDetailService = () => {
    return axiosJWT.get('/api/get-all-categories-detail')
    // return axios.get('/api/get-all-categories')
}

const getAllCategoriesDetailByTypeService = (type) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`/api/get-all-categories-detail-by-type?type=${type}`)
    }
    return axios.get(`/api/get-all-categories-detail-by-type?type=${type}`)
}

const getCategoriesByTypeService = (type) => {
    return axios.get(`/api/get-categories-by-type?type=${type}`)
}

export {
    getAllCategoriesService,
    getAllCategoriesDetailService,
    getAllCategoriesDetailByTypeService,
    getCategoriesByTypeService,
}