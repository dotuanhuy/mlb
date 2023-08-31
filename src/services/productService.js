import axios from "../axios";

const getAllProductsService = (type) => {
    return axios.get(`/api/get-all-prducts?type=${type}`)
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

const getAllImageProductService = (id) => {
    return axios.get(`/api/get-all-image-product?id=${id}`)
}

const addImageProductService = (data) => {
    return axios.post('/api/add-image-product', data)
}

const deleteImageProductService = (id) => {
    return axios.post('/api/delete-image-product', { id })
}

const fetchDescriptionProductService = (id) => {
    return axios.get(`/api/get-all-description-product?id=${id}`)
}

const addDescriptionProductService = (data) => {
    return axios.post('/api/add-description-product', data)
}

export {
    getAllProductsService,
    createNewProductService,
    getAllCategoriesService,
    getCategoriesByIdService,
    deleteProductService,
    getProductByIdService,
    updateProductService,
    getAllImageProductService,
    addImageProductService,
    deleteImageProductService,
    addDescriptionProductService,
    fetchDescriptionProductService
}