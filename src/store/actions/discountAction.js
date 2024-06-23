import actionTypes from "./actionTypes";
import {
    getAllDiscountsService,
    getLimitDiscountService,
    createDiscountService,
    updateDiscountService,
    deleteDiscountService,
    getDiscountByIdService,
} from "../../services/discountService";

export const refreshStoreDiscount = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STORE_SUCCESS
            })
        } catch (e) {
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const refreshInfoResDiscount = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_INFO_RES_DISCOUNT
        })
    }
}

export const getAllDiscounts = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDiscountsService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_DISCOUNTS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_DISCOUNTS_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_DISCOUNTS_FAILED
            })
        }
    }
}

export const getLimitDiscount = (page) => {
    return async (dispatch, getState) => {
        try {
            let res = await getLimitDiscountService(page - 1)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_DISCOUNT_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_DISCOUNT_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_LIMIT_DISCOUNT_FAILED
            })
        }
    }
}

export const createDiscount = ({ code, value, description, page }) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDiscountService({ code, value, description })
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                    message: res.errMessage
                })
                dispatch(getLimitDiscount(page))
            }
            else {
                dispatch({
                    type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                    errCode: res.errCode,
                    message: res.errMessage
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const updateDiscount = ({ id, code, value, description, page }) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateDiscountService({ id, code, value, description })
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                    message: res.errMessage
                })
                dispatch(getLimitDiscount(page))
            }
            else {
                dispatch({
                    type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const deleteDiscount = ({ id, page }) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteDiscountService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                    message: res.errMessage
                })
                dispatch(getLimitDiscount(page))
            }
            else {
                dispatch({
                    type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.RESPONSE_INFO_DISSCOUNT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const getDiscountById = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDiscountByIdService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DISCOUNT_BY_ID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_DISCOUNT_BY_ID_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_DISCOUNT_BY_ID_FAILED
            })
        }
    }
}
