import actionTypes from "./actionTypes";
import {
    getImageSizesService
} from '../../services/firebaseService'

export const refreshStoreFirebase = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_STORE_SUCCESS
        })
    }
}

export const getSizeFirebase = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getImageSizesService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_SIZES_FIREBASE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_SIZES_FIREBASE_FAILED
                })
            }
        } catch (e) {
            console.log('getSizeFirebase error: ', e)
            dispatch({
                type: actionTypes.GET_SIZES_FIREBASE_FAILED
            })
        }
    }
}