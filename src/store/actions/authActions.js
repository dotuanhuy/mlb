import actionTypes from "./actionTypes";
import {
    handleLoginAPI,
    loginWithGoogleService,
    handleLogoutAPI,
    changePasswordService,
    forgotPasswordService
} from "../../services/authService";

export const fetchLogin = (email, password) => {
    return async (dispatch, getSate) => {
        try {
            const res = await handleLoginAPI(email, password)
            if (res && res.errCode === 0) {
                window.localStorage.setItem('accessToken', res?.data?.accessToken)
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    data: res.data
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.LOGIN_FAILED,
                message: e?.response?.data?.errMessage
            })
        }
    }
}

export const loginWithGoogle = (id, token) => {
    return async (dispatch, getSate) => {
        try {
            const res = await loginWithGoogleService(id, token)
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
            const res = await handleLogoutAPI()
            if (res && res.errCode === 0) {
                window.localStorage.removeItem('accessToken')
                window.localStorage.removeItem('orderId')
                window.localStorage.removeItem('notifications')
                dispatch({
                    type: actionTypes.LOGOUT_SUCCESS
                })
            }
            else {
                dispatch({
                    type: actionTypes.LOGOUT_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.LOGOUT_FAILED
            })
        }
    }
}

export const changePassword = ({ newPassword, oldPassword }) => {
    return async (dispatch, getState) => {
        try {
            const res = await changePasswordService({ newPassword, oldPassword })
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
                    message: res.errMessage
                })
            }
            else {
                dispatch({
                    type: actionTypes.CHANGE_PASSWORD_FAILED,
                    message: res.errMessage
                })
            }
        } catch (e) {
            console.log('resetPassword error: ', e)
            dispatch({
                type: actionTypes.CHANGE_PASSWORD_FAILED
            })
        }
    }
}

export const forgotPassword = ({ email, password }) => {
    return async (dispatch, getState) => {
        try {
            const res = await forgotPasswordService({ email, password })
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FORGOT_PASSWORD,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            console.log('forgotPassword error: ', e)
            dispatch({
                type: actionTypes.FORGOT_PASSWORD,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode,
            })
        }
    }
}

export const refreshStateAuth = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_STATE_AUTH
        })
    }
}
