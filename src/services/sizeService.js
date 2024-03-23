import axios from "../axios";
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/size`

const getAllSizesByTypeService = (type) => {
    return axios.get(`${api}/type?type=${type}`)
}

export {
    getAllSizesByTypeService,
}