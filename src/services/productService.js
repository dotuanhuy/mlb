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

export {
    getAllProductsService,
    createNewProductService,
    getAllCategoriesService,
    getCategoriesByIdService
}