import axios from "../axios";
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/logo`

const getAllLogosService = () => {
    return axios.get(`${api}`)
}

export {
    getAllLogosService,
}