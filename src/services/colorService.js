import axios from "../axios";

const getAllColorsService = () => {
    return axios.get('/api/get-all-colors')
}

export {
    getAllColorsService,
}