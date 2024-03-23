import axios from "../axios";
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/color`

const getAllColorsService = () => {
    return axios.get(`${api}`)
}

export {
    getAllColorsService,
}