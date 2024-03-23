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
            console.log('refreshStore error: ', e)
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const getAllDiscounts  = () => {
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
            console.log('getAllDiscounts error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_DISCOUNTS_FAILED
            })
        }
    }
}

export const getLimitDiscount  = (page) => {
    return async (dispatch, getState) => {
        try {
            let res = await getLimitDiscountService(page-1)
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
            console.log('getLimitDiscount error: ', e)
            dispatch({
                type: actionTypes.GET_LIMIT_DISCOUNT_FAILED
            })
        }
    }
}

export const createDiscount = ({code, value, description, page}) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDiscountService({code, value, description})
            if (res && res.errCode === 0) {
                dispatch(getLimitDiscount(page))
            }
        } catch (e) {
            console.log('createDiscount error: ', e)
        }
    }
}

export const updateDiscount = ({id, code, value, description, page}) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateDiscountService({id, code, value, description})
            if (res && res.errCode === 0) {
                dispatch(getLimitDiscount(page))
            }
        } catch (e) {
            console.log('updateDiscount error: ', e)
        }
    }
}

export const deleteDiscount = ({id, page}) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteDiscountService(id)
            if (res && res.errCode === 0) {
                dispatch(getLimitDiscount(page))
            }
        } catch (e) {
            console.log('deleteDiscount error: ', e)
        }
    }
}

export const getDiscountById  = (id) => {
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
            console.log('getDiscountById error: ', e)
            dispatch({
                type: actionTypes.GET_DISCOUNT_BY_ID_FAILED
            })
        }
    }
}
