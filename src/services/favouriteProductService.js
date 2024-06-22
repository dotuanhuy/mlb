import axios from "../axios";
import axiosJWT from '../axiosJWT'
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/favourite`

const getAllProductsFavouriteService = () => {
    return axiosJWT.get(api)
}

const getAllProductsFavouriteLimitService = (offset) => {
    return axiosJWT.get(`${api}/limit?offset=${offset}`)
}

const changeProductFavouriteService = ({ productId }) => {
    return axiosJWT.post(`${api}/change`, { productId })
}

export {
    getAllProductsFavouriteLimitService,
    getAllProductsFavouriteService,
    changeProductFavouriteService
}
