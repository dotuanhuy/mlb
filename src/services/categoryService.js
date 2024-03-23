import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
const api = `/api/${API_VERSION}/category`

const getAllCategoriesService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}`)
    }
    return axios.get(`${api}`)
}

const getAllCategoriesDetailService = () => {
    return axiosJWT.get(`${api}/detail`)
    // return axios.get('/api/get-all-categories')
}

const getAllCategoriesDetailByTypeService = (type) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/detail/type?type=${type}`)
    }
    return axios.get(`${api}/detail/type?type=${type}`)
}

const getCategoriesByTypeService = (type) => {
    return axios.get(`${api}/type?type=${type}`)
}

export {
    getAllCategoriesService,
    getAllCategoriesDetailService,
    getAllCategoriesDetailByTypeService,
    getCategoriesByTypeService,
}