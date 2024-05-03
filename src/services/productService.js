import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
const api = `/api/${API_VERSION}/product`

const getAllProductsService = (type) => {
    return axiosJWT.get(`/api/get-all-prducts?type=${type}`)
    // return axios.get(`/api/get-all-prducts?type=${type}`)
}

const getAllProductPublicService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/home_page`)
    }
    else return axios.get(`${api}/home_page`)
}

const getQuantityOfEachProductByCategoryService = () => {
    return axiosJWT.get(`${api}/category/count`)
}

const createNewProductService = (formData) => {
    return axiosJWT.post(`${api}/create?type=single`, formData, { headers : { 'Content-Type': 'multipart/form-data' } })
}

const deleteProductService = (id) => {
    return axiosJWT.delete(`${api}/delete?id=${id}&type=single`)
}

const getProductByIdService = (id) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/id?id=${id}`)
    }
    else {
        return axios.get(`${api}/id?id=${id}`)
    }
}

const getCountProductsService = () => {
    return axiosJWT.get(`${api}/count`)
} 

const updateProductService = (id, formData, type) => {
    return axiosJWT.post(`${api}/update?id=${id}&type=${type}`, formData, { headers : { 'Content-Type': 'multipart/form-data' } })
}

const changeImageProductByIdService = (id, formData, type) => {
    return axiosJWT.post(`${api}/image/change?id=${id}&type=${type}`, formData, { headers : { 'Content-Type': 'multipart/form-data' } })
}

const fetchDescriptionProductService = (id) => {
    return axiosJWT.get(`${api}/description?id=${id}`)
    // return axios.get(`/api/get-all-description-product?id=${id}`)
}

const addDescriptionProductService = (data) => {
    return axiosJWT.post(`${api}/description/create`, data)
}

const getProductByCategoryService = (type) => {
    return axios.get(`${api}/category?type=${type}`)
}

const getProductByCategoryDetailLimitService = (id, limit) => {
    return axios.get(`${api}/categoryDetail?id=${id}&limit=${limit}`)
}

const getProductByCategoryLimitService = (type, offset) => {
    return axios.get(`${api}/category/limit?type=${type}&offset=${offset}`)
}

const getLimitProductByOptionSortService = (optionData, page, option, limit) => {
    const accessToken = window.localStorage.getItem('accessToken')
    let url = `${api}/sort/limit?&limit=${+limit}&page=${page}&option=${option}`
    url = optionData?.optionType ? url + `&type=${optionData?.optionType}` : url
    url = optionData?.colors? url + `&colors=${optionData?.colors}` : url
    url = optionData?.logos? url + `&logos=${optionData?.logos}` : url
    url = optionData?.typeName ? url + `&optionTypeName=${optionData?.typeName}` : url
    if (accessToken) {
        return axiosJWT.get(url)
    }
    else
        return axios.get(url)
}

const searchProductByNameService = (productName, offset) => {
    return axios.get(`${api}/search/name?productName=${productName}&offset=${offset}`)
}

const searchProductByNameServiceLimit = (productName, offset) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/search/name/limit?productName=${productName}&offset=${offset}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    return axios.get(`${api}/search/name/limit?productName=${productName}&offset=${offset}`)
}

export {
    getAllProductsService,
    getAllProductPublicService,
    createNewProductService,
    getQuantityOfEachProductByCategoryService,
    deleteProductService,
    getProductByIdService,
    updateProductService,
    getCountProductsService,
    changeImageProductByIdService,
    addDescriptionProductService,
    fetchDescriptionProductService,
    getProductByCategoryService,
    getProductByCategoryDetailLimitService,
    getProductByCategoryLimitService,
    getLimitProductByOptionSortService,
    searchProductByNameService,
    searchProductByNameServiceLimit,
}