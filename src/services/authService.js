import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

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

const changePasswordService = ({ newPassword, oldPassword }) => {
    return axiosJWT.post(`${api}/password/change`, { newPassword, oldPassword })
}

const forgotPasswordService = ({ email, password }) => {
    return axios.post(`${api}/password/forgot`, { email, password })
}

export {
    refreshTokenService,
    getRefreshToken,
    handleLoginAPI,
    loginWithGoogleService,
    handleLogoutAPI,
    changePasswordService,
    forgotPasswordService
}