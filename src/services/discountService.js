import axios from "../axios";
import { API_VERSION } from "../utils";
import axiosJWT from '../axiosJWT'

const api = `/api/${API_VERSION}/discount`

const getAllDiscountsService = () => {
    return axiosJWT.get(`${api}`)
}

const getLimitDiscountService = (page) => {
    return axiosJWT.get(`${api}/limit?page=${page}`)
}

const createDiscountService = ({ code, value, description }) => {
    return axiosJWT.post(`${api}/create`, { code, value, description })
}

const updateDiscountService = ({ id, code, value, description }) => {
    return axiosJWT.post(`${api}/update?id=${id}`, { code, value, description })
}

const deleteDiscountService = (id) => {
    return axiosJWT.delete(`${api}/delete?id=${id}`)
}

const getDiscountByIdService = (id) => {
    return axiosJWT.get(`${api}/id?id=${id}`)
}

export {
    getAllDiscountsService,
    getLimitDiscountService,
    createDiscountService,
    updateDiscountService,
    deleteDiscountService,
    getDiscountByIdService,
}