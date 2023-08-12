import actionTypes from "./actionTypes";
import { handleLoginAPI } from "../../services/userService";

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