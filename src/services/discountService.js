import axios from "../axios";
import {createAxios} from '../axiosJWT'
const axiosJWT = createAxios()

const getAllDiscountsService = () => {
    return axiosJWT.get('/api/get-all-discounts')
}

export {
    getAllDiscountsService,
}