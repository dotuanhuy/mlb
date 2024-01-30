import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllBrandsService = (accessToken) => {
    if (accessToken) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get('/api/get-all-brands', { headers: {token: `Bearer ${accessToken}`}})
    }
    return axios.get('/api/get-all-brands')
}

export {
    getAllBrandsService,
}