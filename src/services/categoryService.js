import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllCategoriesService = (accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get('/api/get-all-categories', { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get('/api/get-all-categories')
}

const getAllCategoriesDetailService = (accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get('/api/get-all-categories-detail', { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get('/api/get-all-categories')
}

const getAllCategoriesDetailByTypeService = (accessToken, type) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-all-categories-detail-by-type?type=${type}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    return axios.get(`/api/get-all-categories-detail-by-type?type=${type}`)
}
export {
    getAllCategoriesService,
    getAllCategoriesDetailService,
    getAllCategoriesDetailByTypeService
}