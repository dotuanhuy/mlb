import axios from "../axios";
import {createAxios} from '../axiosJWT'

const getAllImagesByProductIdService = (id, accessToken) => {
    if (id) {
        const axiosJWT = createAxios(accessToken)
        return axiosJWT.get(`/api/get-all-images-by-productId?id=${id}`, { headers: {token: `Bearer ${accessToken}`}})
    }
    else {
        return axios.get(`/api/get-all-images-by-productId?id=${id}`)
    }
}

const addImageProductService = (data, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/change-image-product', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/add-image-product', data)
}

const deleteImageProductService = (data, accessToken) => {
    const axiosJWT = createAxios(accessToken)
    return axiosJWT.post('/api/delete-image-product', data, { headers: {token: `Bearer ${accessToken}`}})
    // return axios.post('/api/add-image-product', data)
}

export {
    getAllImagesByProductIdService,
    addImageProductService,
    deleteImageProductService,
}