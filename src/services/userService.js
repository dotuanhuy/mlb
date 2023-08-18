import axios from "../axios";

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const handleCreateNewUer = (data) => {
    return axios.post('/api/create-new-user', data)
}

const handleUpdateUser = (data) => {
    return axios.post('/api/update-user', data)
}   

const getAllUsers = () => {
    return axios.get('/api/get-all-users')
}

const getAllProvinces = () => {
    return axios.get('/api/getAllProvinces')
}

const getAllCodeByType = (type) => {
    return axios.get(`/api/get-allcode-by-type?type=${type}`)
}

const handleDeleteUser = (id) => {
    return axios.post('/api/delete-user', {id})
}

const getUserAllcode = (id) => {
    return axios.get(`/api/get-user-allCode?id=${id}`)
}

const getCategoriesByIdService = (id) => {
    return axios.get('/api/get-categories-by-id', {id})
}

export {
    handleLoginAPI,
    handleCreateNewUer,
    handleUpdateUser,
    getAllUsers,
    getAllProvinces,
    getAllCodeByType,
    handleDeleteUser,
    getUserAllcode,
    getCategoriesByIdService
}