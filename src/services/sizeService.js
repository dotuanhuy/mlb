import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllSizesByTypeService = (accessToken, type) => {
    // if (accessToken) {
    //     const axiosJWT = createAxios(accessToken)
    //     return axiosJWT.get('/api-get-all-sizes-by-type', { headers: {token: `Bearer ${accessToken}`}})
    // }
    return axios.get(`/api/get-all-sizes-by-type?type=${type}`)
}

export {
    getAllSizesByTypeService,
}