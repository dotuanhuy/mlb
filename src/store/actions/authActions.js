import actionTypes from "./actionTypes";
import { 
    handleLoginAPI, 
    loginWithGoogleService,
    handleLogoutAPI,
    resetPasswordService
} from "../../services/authService";

export const fetLogin = (email, password) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleLoginAPI(email, password)
            if (res && res.errCode === 0) {
                window.localStorage.setItem('accessToken', res.accessToken)
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    data: res
                })
            }
            else {
                dispatch({
                    type: actionTypes.LOGIN_FAILED
                })
                alert('Tài khoản hoặc mật khẩu chưa đúng, Vui lòng nhập lại')
            }   
        } catch (e) {
            console.log('fetLogin error: ', e)
            dispatch({
                type: actionTypes.LOGIN_FAILED
            })
        }
    }
}

export const loginWithGoogle = (id, token) => {
    return async (dispatch, getSate) => {
        try {
            let res = await loginWithGoogleService(id, token)
            if (res && res.errCode === 0) {
                console.log(res)
                window.localStorage.setItem('accessToken', res.accessToken)
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    data: res
                })
            }
            else {
                dispatch({
                    type: actionTypes.LOGIN_FAILED
                })
            }   
        } catch (e) {
            console.log('handleLoginWithGoogle error: ', e)
            dispatch({
                type: actionTypes.LOGIN_FAILED
            })
        }
    }
}

export const fetLogout = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleLogoutAPI() 
            if (res && res.errCode === 0) {
                window.localStorage.removeItem('accessToken')
                dispatch({
                    type: actionTypes.LOGOUT_SUCCESS
                })
            }
            else {
                dispatch({
                    type: actionTypes.LOGOUT_FAILED
                })
            }
        } catch(e) {
            dispatch({
                type: actionTypes.LOGOUT_FAILED
            })
        }
    }
}

export const resetPassword = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await resetPasswordService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.RESET_PASSWORD_SUCCESS
                })
            }
            else {
                alert(res.errMessage)
                dispatch({
                    type: actionTypes.RESET_PASSWORD_FAILED
                })
            }
        } catch (e) {
            console.log('resetPassword error: ', e)
            dispatch({
                type: actionTypes.RESET_PASSWORD_FAILED
            })
        }
    }
}