import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/user`

const createUserService = (newUser) => {
    return axiosJWT.post(`${api}/create`, { newUser })
}

const updateUserService = (newUser, id) => {
    return axiosJWT.post(`${api}/update?id=${id}`, { newUser })
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

const updateInfoUserService = (infoUser) => {
    return axiosJWT.post(`${api}/update/info`, infoUser)
}

const searchUserService = (userName, page) => {
    return axiosJWT.get(`${api}/name?userName=${userName}&page=${page}`)
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
    updateInfoUserService,
    searchUserService
}