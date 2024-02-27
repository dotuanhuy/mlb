import axios from "../axios";

const getAllLogosService = () => {
    return axios.get('/api/get-all-logos')
}

export {
    getAllLogosService,
}