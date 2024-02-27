import axios from "../axios";
import {createAxios} from '../axiosJWT'
const accessToken = window.localStorage.getItem('accessToken')

const getAllBrandsService = () => {
    if (accessToken) {
        const axiosJWT = createAxios()
        // return axiosJWT.get('/api/get-all-brands', { headers: {token: `Bearer ${accessToken}`}})
        return axiosJWT.get('/api/get-all-brands')
    }
    return axios.get('/api/get-all-brands')
}

export {
    getAllBrandsService,
}