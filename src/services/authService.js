import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
const api = `/api/${API_VERSION}/auth`

const refreshTokenService = () => {
    return axios.post(`${api}/refresh`)
}

const getRefreshToken = () => {
    return axios.get('/api/get-refresh-token')
}

const handleLoginAPI = (email, password) => {
    return axios.post(`${api}/login`, { email, password })
}

const loginWithGoogleService = (id, token) => {
    return axios.post(`${api}/google/success`, { id, token })
}

const handleLogoutAPI = () => {
    return axiosJWT.post(`${api}/logout`)
}

const resetPasswordService = (data) => {
    return axiosJWT.post(`${api}/password/reset`, data)
}

export {
    refreshTokenService,
    getRefreshToken,
    handleLoginAPI,
    loginWithGoogleService,
    handleLogoutAPI,
    resetPasswordService
}