import actionTypes from "./actionTypes";
import { 
    getAllColorsService,
} from "../../services/colorService";

export const refreshStoreColors = () => {
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

export const getAllColors  = (accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllColorsService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_COLORS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_COLORS_FAILED
                })
            }
        } catch (e) {
            console.log('getAllColors error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_COLORS_FAILED
            })
        }
    }
}