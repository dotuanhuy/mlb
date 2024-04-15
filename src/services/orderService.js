import { createAxios } from "../axiosJWT";
import { API_VERSION } from "../utils";

const api = `api/${API_VERSION}/order`
const axiosJWT = createAxios()

const getLimitOrderService = (page, option) => {
    return axiosJWT.get(`${api}?page=${page}&option=${option}`)
}

const getOrderbyIdService = (id) => {
    return axiosJWT.get(`${api}/search?id=${id}`)
}

const confirmOrderService = (id) => {
    return axiosJWT.post(`${api}/confirm?id=${id}`)
}

const cancelOrderService = (id) => {
    return axiosJWT.post(`${api}/cancel?id=${id}`)
}

const getListOrderIdService = () => {
    return axiosJWT.get(`${api}/user`)
}

export {
    getLimitOrderService,
    getOrderbyIdService,
    confirmOrderService,
    cancelOrderService,
    getListOrderIdService
}
