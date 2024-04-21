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


export {
    getNotificationsService,
    createNotificationsService
}