import axios from "../axios";

const getAllSizesByTypeService = (type) => {
    return axios.get(`/api/get-all-sizes-by-type?type=${type}`)
}

export {
    getAllSizesByTypeService,
}