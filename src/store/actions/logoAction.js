import actionTypes from "./actionTypes";
import { 
    getAllLogosService,
} from "../../services/logoService";

export const refreshStoreLogos = () => {
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

export const getAllLogos  = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllLogosService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_LOGOS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_LOGOS_FAILED
                })
            }
        } catch (e) {
            console.log('getAllLogos error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_LOGOS_FAILED
            })
        }
    }
}