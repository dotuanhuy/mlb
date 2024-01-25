import axios from "../axios";
import {createAxios} from '../axiosJWT'

const refreshTokenService = () => {
    return axios.post('/api/refresh')
}

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const handleLogoutAPI = () => {
    return axios.post('/api/logout')
}

const handleCreateNewUer = (data, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/create-new-user', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/create-new-user', data)
}

const handleUpdateUser = (data, accessToken, page) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/update-user', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/update-user', data)
}   

const getAllUsers = (accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get('/api/get-all-users', { headers: {token: `Bearer ${accessToken}`}})
}

const getAllAddressService = (accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get('/api/get-all-address', { headers: {token: `Bearer ${accessToken}`}})
}

const getAllRolesService = (accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get('/api/get-all-roles', { headers: {token: `Bearer ${accessToken}`}})
}
 
const handleDeleteUser = (id, accessToken, page) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/delete-user', {id}, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/delete-user', {id})
}

const getUserByIdService = (id, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get(`/api/get-user-by-id?id=${id}`, { headers: {token: `Bearer ${accessToken}`}})
}

const getLimitUserService = (page, accessToken) => {
    const axiosJWT = createAxios(accessToken) 
    return axiosJWT.get(`/api/get-limit-users?page=${page}`, { headers: {token: `Bearer ${accessToken}`}})
}

const registerSevice = (data) => {
    return axios.post('/api/register', data)
}

const resetPasswordService = (data) => {
    return axios.post('/api/reset-password', data)
}

export {
    refreshTokenService,
    handleLoginAPI,
    handleLogoutAPI,
    handleCreateNewUer,
    handleUpdateUser,
    getAllUsers,
    getAllAddressService,
    getAllRolesService,
    handleDeleteUser,
    getUserByIdService,
    getLimitUserService,
    registerSevice,
    resetPasswordService
}