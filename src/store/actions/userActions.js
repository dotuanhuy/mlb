import actionTypes from "./actionTypes";
import { handleLoginAPI, handleCreateNewUer } from "../../services/userService";

export const fetLogin = (email, password) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleLoginAPI(email, password)
            if (res.data && res.data === 0) {

            }
        } catch (e) {
            console.log('fetLogin error: ', e)
            dispatch({
                type: actionTypes.LOGIN_FAILED
            })
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleCreateNewUer(data)
            console.log('check data: ', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_USER_SUCCESS
                })
            }
            else {
                dispatch({
                    type: actionTypes.CREATE_NEW_USER_FAILED
                })
            }
        } catch(e) {
            console.log('createNewUser error: ', e)
            dispatch({
                type: actionTypes.CREATE_NEW_USER_FAILED
            })
        }
    }
}