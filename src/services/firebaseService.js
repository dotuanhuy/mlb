import axios from "../axios";
import {createAxios} from '../axiosJWT'
const axiosJWT = createAxios()

const getImageSizesService = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
        return axiosJWT.get('api/get-tutorial-sizes')
    }
    return axios.get('api/get-tutorial-sizes')
}

export {
    getImageSizesService,
}
