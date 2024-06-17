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

const LoginService = (email, password) => {
    return axios.post(`${api}/login`, { email, password })
}

const loginWithGoogleService = (id, token) => {
    return axios.post(`${api}/google/success`, { id, token })
}

const logoutService = () => {
    return axiosJWT.post(`${api}/logout`)
}

const registerSevice = (data) => {
    return axios.post(`${api}/register`, data)
}

const sendMailService = (email, type) => {
    return axios.post(`${api}/send-mail`, { email, type })
}

const verifyOtpService = ({ otp, email }) => {
    return axios.post(`${api}/verifyotp`, { otp, email })
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
    LoginService,
    loginWithGoogleService,
    logoutService,
    registerSevice,
    sendMailService,
    verifyOtpService,
    changePasswordService,
    forgotPasswordService
}