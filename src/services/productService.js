import axios from "../axios";
import {createAxios} from '../axiosJWT'
const accessToken = window.localStorage.getItem('accessToken')
const axiosJWT = createAxios()

const getAllProductsService = (type) => {
    return axiosJWT.get(`/api/get-all-prducts?type=${type}`)
    // return axios.get(`/api/get-all-prducts?type=${type}`)
}

const getAllProductPublicService = () => {
    if (accessToken) {
        return axiosJWT.get('/api/get-all-product-public')
    }
    else return axios.get('/api/get-all-product-public')
}

const getQuantityOfEachProductByCategoryService = () => {
    return axiosJWT.get('/api/get-quantity-ofeach-product-by-category')
}

const createNewProductService = (data) => {
    return axiosJWT.post('/api/create-new-product', data)
    // return axios.post('/api/create-new-product', data)
}

const deleteProductService = (id) => {
    return axiosJWT.post('/api/delete-product-by-id', { id })
    // return axios.post('/api/delete-product', { id })
}

const getProductByIdService = (id) => {
    if (accessToken) {
        return axiosJWT.get(`/api/get-product-by-id?id=${id}`)
    }
    else {
        return axios.get(`/api/get-product-by-id?id=${id}`)
    }
}

const getCountProductsService = () => {
    return axiosJWT.get('/api/get-count-products')
    // return axios.get(`/api/get-product-by-id?id=${id}`)
} 


const updateProductService = (data) => {
    return axiosJWT.post('/api/update-product', data)
    // return axios.post('/api/update-product', data)
}

const changeImageProductByIdService = (data) => {
    return axiosJWT.post('/api/change-image-product-by-id', { data })
    // return axios.post('/api/delete-image-product', { id })
}

const fetchDescriptionProductService = (id) => {
    return axiosJWT.get(`/api/get-all-description-product?id=${id}`)
    // return axios.get(`/api/get-all-description-product?id=${id}`)
}

const addDescriptionProductService = (data) => {
    return axiosJWT.post('/api/add-description-product', data)
    // return axios.post('/api/add-description-product', data)
}

const getProductByCategoryService = (type) => {
    return axios.get(`/api/get-product-by-category?type=${type}`)
}

const getProductByCategoryLimitService = (type, offset) => {
    return axios.get(`/api/get-product-by-category-limit?type=${type}&offset=${offset}`)
}

const getLimitProductService = (categore, page) => {
    if (accessToken) {
        return axiosJWT.get(`/api/get-limit-products?categore=${categore}&page=${page}`)
    }
    else
        return axios.get(`/api/get-limit-products?categore=${categore}&page=${page}`)
}

const getLimitProductByOptionSortService = (optionData, page, option) => {
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
    url = optionData?.typeName ? url + `&optionTypeName=${optionData?.typeName}` : url
    if (accessToken) {
        return axiosJWT.get(url)
    }
    else
        return axios.get(url)
}

const searchProductByNameService = (productName, offset) => {
    return axios.get(`/api/search-product-by-name?productName=${productName}&offset=${offset}`)
}

const searchProductByNameServiceLimit = (productName, offset) => {
    if (accessToken) {
        return axiosJWT.get(`/api/search-product-by-name-limit?productName=${productName}&offset=${offset}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    return axios.get(`/api/search-product-by-name-limit?productName=${productName}&offset=${offset}`)
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
    getProductByCategoryLimitService,
    getLimitProductService,
    getLimitProductByOptionSortService,
    searchProductByNameService,
    searchProductByNameServiceLimit,
}