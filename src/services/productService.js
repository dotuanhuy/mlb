import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllProductsService = (type, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get(`/api/get-all-prducts?type=${type}`, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get(`/api/get-all-prducts?type=${type}`)
}

const getAllProductPublicService = (accessToken) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get('/api/get-all-product-public', { headers: {token: `Bearer ${accessToken}`}})
    }
    else return axios.get('/api/get-all-product-public')
}

const getQuantityOfEachProductByCategoryService = (accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get('/api/get-quantity-ofeach-product-by-category', { headers: {token: `Bearer ${accessToken}`}})
}

const getCategoriesByIdService = (id) => {
    return axios.get(`/api/get-categories-by-id?id=${id}`)
}

const createNewProductService = (data, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/create-new-product', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/create-new-product', data)
}

const deleteProductService = (id, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/delete-product-by-id', { id }, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/delete-product', { id })
}

const getProductByIdService = (id, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get(`/api/get-product-by-id?id=${id}`, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get(`/api/get-product-by-id?id=${id}`)
}

const updateProductService = (data, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/update-product', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/update-product', data)
}

const getAllImageProductService = (id, accessToken) => {
    if (id) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-all-image-product?id=${id}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    else {
        return axios.get(`/api/get-all-image-product?id=${id}`)
    }
}

const addImageProductService = (data, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/add-image-product', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/add-image-product', data)
}

const deleteImageProductService = (id, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/delete-image-product', { id }, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/delete-image-product', { id })
}

const fetchDescriptionProductService = (id, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get(`/api/get-all-description-product?id=${id}`, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get(`/api/get-all-description-product?id=${id}`)
}

const addDescriptionProductService = (data, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/add-description-product', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/add-description-product', data)
}

const getProductByCategoryService = (type) => {
    return axios.get(`/api/get-product-by-category?type=${type}`)
}

const getProductByCategoryLimitService = (type, offset) => {
    return axios.get(`/api/get-product-by-category-limit?type=${type}&offset=${offset}`)
}

const getLimitProductService = (categore, page, accessToken) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-limit-products?categore=${categore}&page=${page}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    else
        return axios.get(`/api/get-limit-products?categore=${categore}&page=${page}`)
}

const getLimitProductByOptionSortService = (optionData, page, option, accessToken, optionTypeName) => {
    // if (accessToken) {
    //     const axiosJWT = createAxios(accessToken)
    //     return axiosJWT.get(`/api/get-limit-product-by-option-sort?categore=${categore}&page=${page}&option=${option}`, { headers: {token: `Bearer ${accessToken}`}})
    // }
    // else
    //     return axios.get(`/api/get-limit-product-by-option-sort?categore=${categore}&page=${page}&option=${option}`)

    let url = `/api/get-limit-product-by-option-sort?page=${page}&option=${option}`
    url = optionData?.optionType ? url + `&type=${optionData?.optionType}` : url
    url = optionData?.colors? url + `&colors=${optionData?.colors}` : url
    url = optionData?.logos? url + `&logos=${optionData?.logos}` : url
    url = optionTypeName ? url + `&optionTypeName=${optionTypeName}` : url
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(url, { headers: {token: `Bearer ${accessToken}`}})
    }
    else
        return axios.get(url)
}

const searchProductByNameService = (productName, offset) => {
    return axios.get(`/api/search-product-by-name?productName=${productName}&offset=${offset}`)
}

const searchProductByNameServiceLimit = (productName, offset, accessToken) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/search-product-by-name-limit?productName=${productName}&offset=${offset}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    return axios.get(`/api/search-product-by-name-limit?productName=${productName}&offset=${offset}`)
}

export {
    getAllProductsService,
    getAllProductPublicService,
    createNewProductService,
    getQuantityOfEachProductByCategoryService,
    getCategoriesByIdService,
    deleteProductService,
    getProductByIdService,
    updateProductService,
    getAllImageProductService,
    addImageProductService,
    deleteImageProductService,
    addDescriptionProductService,
    fetchDescriptionProductService,
    getProductByCategoryService,
    getProductByCategoryLimitService,
    getLimitProductService,
    getLimitProductByOptionSortService,
    searchProductByNameService,
    searchProductByNameServiceLimit,
}