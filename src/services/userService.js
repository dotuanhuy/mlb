import axios from "../axios";
import {createAxios} from '../axiosJWT'
const axiosJWT = createAxios()

const refreshTokenService = () => {
    return axios.post('/api/refresh')
}

const handleCreateNewUer = (data) => {
    return axiosJWT.post('/api/create-new-user', data)
}

const handleUpdateUser = (data) => {
    return axiosJWT.post('/api/update-user', data)
}   

const getCountUsersService = () => {
    return axiosJWT.get('/api/get-count-users')
}

const getAllUsers = () => {
    return axiosJWT.get('/api/get-all-users')
}

const getAllAddressService = () => {
    return axiosJWT.get('/api/get-all-address')
}

const getAllRolesService = () => {
    return axiosJWT.get('/api/get-all-roles')
}
 
const handleDeleteUser = (id) => {
    return axiosJWT.post('/api/delete-user', {id})
}

const getUserByIdService = (id) => {
    return axiosJWT.get(`/api/get-user-by-id?id=${id}`)
}

const getLimitUserService = (page) => {
    return axiosJWT.get(`/api/get-limit-users?page=${page}`)
}

const registerSevice = (data) => {
    return axios.post('/api/register', data)
}

const sendMailService = (email) => {
    return axios.post('/api/send-mail', { email })
}

const verifyOtpService = ({otp, email}) => {
    return axios.post('/api/verifyotp', {otp, email})
}

export {
    refreshTokenService,
    handleCreateNewUer,
    handleUpdateUser,
    getCountUsersService,
    getAllUsers,
    getAllAddressService,
    getAllRolesService,
    handleDeleteUser,
    getUserByIdService,
    getLimitUserService,
    registerSevice,
    sendMailService,
    verifyOtpService
}