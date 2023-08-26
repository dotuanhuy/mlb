import axios from "../axios";

const getAllProductsService = () => {
    return axios.get('/api/get-all-prducts')
}

const getAllCategoriesService = () => {
    return axios.get('/api/get-all-categories')
}

const getCategoriesByIdService = (id) => {
    return axios.get(`/api/get-categories-by-id?id=${id}`)
}

const createNewProductService = (data) => {
    return axios.post('/api/create-new-product', data)
}

const deleteProductService = (id) => {
    return axios.post('/api/delete-product', { id })
}

const getProductByIdService = (id) => {
    return axios.get(`/api/get-product-by-id?id=${id}`)
}

const updateProductService = (data) => {
    return axios.post('/api/update-product', data)
}

export {
    getAllProductsService,
    createNewProductService,
    getAllCategoriesService,
    getCategoriesByIdService,
    deleteProductService,
    getProductByIdService,
    updateProductService
}