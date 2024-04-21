import actionTypes from "./actionTypes";
import { 
    getReviewProductService,
    createFeedbackService,
    updateFeedbackService,
    deleteFeedbackService,
    updateReviewService,
    deleteReviewService,
    createReviewService
} from "../../services/reviewService";

export const refreshStoreReview = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STORE_SUCCESS
            })
        } catch (e) {
            console.log('refreshStore error: ', e)
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}


export const getReviewProduct  = (productId) => {
    return async (dispatch, getState) => {
        try {
            const res = await getReviewProductService(productId)
            if (res && res.errCode === 0) {
                let totalRate = 0
                const objRate = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
                res?.data?.map(item => {
                    if (item?.rate) {
                        totalRate = item?.rate + totalRate
                        const temp = objRate[item?.rate] + 1
                        objRate[item?.rate] = temp
                    }
                })
                dispatch({
                    type: actionTypes.GET_REVIEW_PRODUCT_SUCCESS,
                    data: res.data,
                    rate: res?.data?.length !== 0 ? (totalRate/res?.data?.length).toFixed(1) : 0,
                    totalEachRating: objRate
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_REVIEW_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('getAllDiscounts error: ', e)
            dispatch({
                type: actionTypes.GET_REVIEW_PRODUCT_FAILED
            })
        }
    }
}

export const createFeedback  = ({reviewId, content, productId}) => {
    return async (dispatch, getState) => {
        try {
            const res = await createFeedbackService({reviewId, content})
            if (res && res.errCode === 0) {
                dispatch(getReviewProduct(productId))
            }
        } catch (e) {
            console.log('createFeedback error: ', e)
        }
    }
}

export const updateFeedback  = ({id, content, productId}) => {
    return async (dispatch, getState) => {
        try {
            const res = await updateFeedbackService({id, content})
            if (res && res.errCode === 0) {
                dispatch(getReviewProduct(productId))
            }
        } catch (e) {
            console.log('updateFeedback error: ', e)
        }
    }
}

export const deleteFeedback  = ({id, productId}) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteFeedbackService(id)
            if (res && res.errCode === 0) {
                dispatch(getReviewProduct(productId))
            }
        } catch (e) {
            console.log('deleteFeedback error: ', e)
        }
    }
}

export const updateReview  = ({id, userId, content, rate, productId}) => {
    return async (dispatch, getState) => {
        try {
            const res = await updateReviewService({id, userId, content, rate})
            if (res && res.errCode === 0) {
                dispatch(getReviewProduct(productId))
            }
        } catch (e) {
            console.log('updateReview error: ', e)
        }
    }
}

export const deleteReview  = ({id, productId}) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteReviewService(id)
            if (res && res.errCode === 0) {
                dispatch(getReviewProduct(productId))
            }
        } catch (e) {
            console.log('deleteReview error: ', e)
        }
    }
}

export const createReview  = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createReviewService(data)
            if (res && res.errCode === 0) {
                dispatch(getReviewProduct(data.productId))
            }
        } catch (e) {
            console.log('createFeedback error: ', e)
        }
    }
}
