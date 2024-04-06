import axios from "../axios";
import {createAxios} from '../axiosJWT'
import { API_VERSION } from "../utils";

const axiosJWT = createAxios()
const api = `/api/${API_VERSION}/review`

const getReviewProductService = (productId) => {
    return axios.get(`${api}/product?productId=${productId}`)
}

const createFeedbackService = ({reviewId, content}) => {
    return axiosJWT.post(`${api}/feedback/create`, {reviewId, content})
}

const updateFeedbackService = ({id, content}) => {
    return axiosJWT.post(`${api}/feedback/update`, {id, content})
}

const deleteFeedbackService = ({id}) => {
    return axiosJWT.delete(`${api}/feedback/delete/${id}`)
}

const updateReviewService = ({id, userId, content, rate}) => {
    return axiosJWT.post(`${api}/update`, {id, userId, content, rate})
}

const deleteReviewService = ({id, userId}) => {
    return axiosJWT.delete(`${api}/delete?id=${id}&userId=${userId}`)
}

export {
    getReviewProductService,
    createFeedbackService,
    updateFeedbackService,
    deleteFeedbackService,
    updateReviewService,
    deleteReviewService
}
