import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/brand`

const getAllBrandsService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        const axiosJWT = createAxios()
        return axiosJWT.get(`${api}`)
    }
    return axios.get(`${api}`)
}

export {
    getAllBrandsService,
}