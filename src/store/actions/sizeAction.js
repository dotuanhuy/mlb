import actionTypes from "./actionTypes";
import { 
    getAllSizesByTypeService,
} from "../../services/sizeService";

export const refreshStoreSizes = () => {
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

export const getAllSizesByType  = (accessToken, type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSizesByTypeService(accessToken, type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_SIZES_BY_TYPE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_SIZES_BY_TYPE_FAILED
                })
            }
        } catch (e) {
            console.log('getAllSizesByType error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_SIZES_BY_TYPE_FAILED
            })
        }
    }
}