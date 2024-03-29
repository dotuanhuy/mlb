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
        return axiosJWT.get(`${api}/public`)
    }
    else return axios.get(`${api}/public`)
}

const getQuantityOfEachProductByCategoryService = () => {
    return axiosJWT.get(`${api}/category/count`)
}

const createNewProductService = (formData) => {
    return axiosJWT.post(`${api}/create?type=single`, formData, { headers : { 'Content-type': 'multipart/form-data' } })
}

const deleteProductService = (id) => {
    return axiosJWT.delete(`${api}/delete?id=${id}`)
    // return axios.post('/api/delete-product', { id })
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


const updateProductService = (id, product) => {
    console.log(product)
    return axiosJWT.post(`${api}/update?id=${id}`, product)
}

const updateProductAndImageService = (id, formData, type) => {
    return axiosJWT.post(`${api}/update/image?id=${id}&type=${type}`, formData, { headers : { 'Content-Type': 'multipart/form-data' } })
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

const getProductByCategoryLimitService = (type, offset) => {
    return axios.get(`${api}/category/limit?type=${type}&offset=${offset}`)
}

const getLimitProductService = (categore, page) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get(`${api}/limit?categore=${categore}&page=${page}`)
    }
    else
        return axios.get(`${api}/limit?categore=${categore}&page=${page}`)
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
    updateProductAndImageService,
    getCountProductsService,
    changeImageProductByIdService,
    addDescriptionProductService,
    fetchDescriptionProductService,
    getProductByCategoryService,
    getProductByCategoryLimitService,
    getLimitProductService,
    getLimitProductByOptionSortService,
    searchProductByNameService,
    searchProductByNameServiceLimit,
}