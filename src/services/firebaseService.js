import axios from "../axios";
import {createAxios} from '../axiosJWT'
const accessToken = window.localStorage.getItem('accessToken')
const axiosJWT = createAxios()

const getImageSizesService = () => {
    if (accessToken) {
        return axiosJWT.get('api/get-tutorial-sizes')
    }
    return axios.get('api/get-tutorial-sizes')
}

export {
    getImageSizesService,
}
