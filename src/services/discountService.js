import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllDiscountsService = (accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.get('/api/get-all-discounts', { headers: {token: `Bearer ${accessToken}`}})
    // return axios.get('/api/get-all-categories')
}

export {
    getAllDiscountsService,
}