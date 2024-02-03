import actionTypes from "./actionTypes";
import { 
    getAllBrandsService,
} from "../../services/brandService";

export const refreshStoreBrands = () => {
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

export const getAllBrands  = (accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBrandsService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_BRANDS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_BRANDS_FAILED
                })
            }
        } catch (e) {
            console.log('getAllDiscounts error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_BRANDS_FAILED
            })
        }
    }
}