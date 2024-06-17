import actionTypes from "./actionTypes";
import {
    LoginService,
    loginWithGoogleService,
    logoutService,
    changePasswordService,
    forgotPasswordService,
    registerSevice,
    sendMailService,
    verifyOtpService
} from "../../services/authService";

export const refreshStateAuth = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_STATE_AUTH
        })
    }
}


export const login = (email, password) => {
    return async (dispatch, getSate) => {
        try {
            const res = await LoginService(email, password)
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
                console.log('check res: ', res);
                window.localStorage.setItem('accessToken', res.data?.accessToken)
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    data: res?.data
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

export const logout = () => {
    return async (dispatch, getSate) => {
        try {
            const res = await logoutService()
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
                    type: actionTypes.LOGOUT_FAILED,
                    errCode: res.errCode,
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.LOGOUT_FAILED,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const register = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await registerSevice(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.REGISTER,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
            else {
                dispatch({
                    type: actionTypes.REGISTER,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            console.log('register error: ', e)
            dispatch({
                type: actionTypes.REGISTER,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const sendMail = (email, type) => {
    return async (dispatch, getState) => {
        try {
            const res = await sendMailService(email, type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SEND_MAIL_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.SEND_MAIL_FAILED,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SEND_MAIL_FAILED,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const verifyOtp = ({ otp, email }) => {
    return async (dispatch, getState) => {
        try {
            const res = await verifyOtpService({ otp, email })
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.VERIFY_OTP_SUCCESS,
                    isVerify: res.isVerify,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.VERIFY_OTP_FAILED,
                    message: res.errMessage
                })
            }
        } catch (e) {
            console.log('verifyOtp error: ', e)
            dispatch({
                type: actionTypes.VERIFY_OTP_FAILED,
                message: e?.response?.data?.errMessage,
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
