import axios from "../axios";
import {createAxios} from '../axiosJWT'
const axiosJWT = createAxios()

const getRefreshToken = () => {
    return axios.get('/api/get-refresh-token')
}

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const loginWithGoogleService = (id, token) => {
    return axios.post('/api/login-google-success', { id, token })
}

const handleLogoutAPI = () => {
    return axiosJWT.post('/api/logout')
}

const resetPasswordService = (data) => {
    return axios.post('/api/reset-password', data)
}

export {
    getRefreshToken,
    handleLoginAPI,
    loginWithGoogleService,
    handleLogoutAPI,
    resetPasswordService
}