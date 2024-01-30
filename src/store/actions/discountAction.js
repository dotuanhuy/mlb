import actionTypes from "./actionTypes";
import { 
    getAllDiscountsService,
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

export const getAllDiscounts  = (accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDiscountsService(accessToken)
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