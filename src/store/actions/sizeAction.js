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
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const getAllSizesByType = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSizesByTypeService(type)
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
            dispatch({
                type: actionTypes.GET_ALL_SIZES_BY_TYPE_FAILED
            })
        }
    }
}