import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/user`

const createUserService = (data) => {
    return axiosJWT.post(`${api}/create`, data)
}

const updateUserService = (data, id) => {
    return axiosJWT.post(`${api}/update?id=${id}`, data)
}

const getCountUsersService = () => {
    return axiosJWT.get(`${api}/count`)
}

const getAllUsers = () => {
    return axiosJWT.get(`${api}`)
}

const getAllAddressService = () => {
    return axiosJWT.get(`${api}/address`)
}

const getAllRolesService = () => {
    return axiosJWT.get(`${api}/roles`)
}

const deleteUserService = (id) => {
    return axiosJWT.delete(`${api}/delete?id=${id}`)
}

const getUserByIdService = (id) => {
    return axiosJWT.get(`${api}/get/id?id=${id}`)
}

const getLimitUserService = (page) => {
    return axiosJWT.get(`${api}/limit?page=${page}`)
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

const updateInfoUserService = (infoUser) => {
    return axiosJWT.post(`${api}/update/info`, infoUser)
}

const searchUserService = (userName) => {
    return axiosJWT.get(`${api}/name?userName=${userName}`)
}

export {
    createUserService,
    updateUserService,
    getCountUsersService,
    getAllUsers,
    getAllAddressService,
    getAllRolesService,
    deleteUserService,
    getUserByIdService,
    getLimitUserService,
    registerSevice,
    sendMailService,
    verifyOtpService,
    updateInfoUserService,
    searchUserService
}