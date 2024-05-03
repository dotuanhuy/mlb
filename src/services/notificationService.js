import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/notification`
const axiosJWT = createAxios()

const getNotificationsService = () => {
    return axiosJWT.get(`${api}`)
}

const createNotificationsService = (data) => {
    return axiosJWT.post(`${api}/create`, data)
}

const updateIsReadService = (id) => {
    return axiosJWT.post(`${api}/update/read?id=${id}`)
}

export {
    getNotificationsService,
    createNotificationsService,
    updateIsReadService
}