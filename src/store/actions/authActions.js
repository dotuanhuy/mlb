import actionTypes from "./actionTypes";
import Cookies from 'universal-cookie';
import { 
    handleLoginAPI, 
} from "../../services/userService";

const cookies = new Cookies();

export const fetLogin = (email, password) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleLoginAPI(email, password)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    data: res
                })
                cookies.set('userLogin', res.token, { path: '/'});
            }
            else {
                dispatch({
                    type: actionTypes.LOGIN_FAILED
                })
            }   
        } catch (e) {
            console.log('fetLogin error: ', e)
            dispatch({
                type: actionTypes.LOGIN_FAILED
            })
        }
    }
}

export const fetLogout = () => {
    return (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.LOGOUT_SUCCESS
            })
        } catch(e) {
            dispatch({
                type: actionTypes.LOGOUT_FAILED
            })
        }
    }
}