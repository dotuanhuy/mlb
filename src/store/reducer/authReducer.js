const initState = {
    roleId: '',
    isLogin: false,
    isChangePassword: false,
    message: '',
    errCode: '',
    otp: '',
    isVerify: '',
    email: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STATE_AUTH':
            state.message = ''
            state.isChangePassword = false
            state.errCode = ''
            state.isVerify = ''
            state.email = ''
            state.otp = ''
            return {
                ...state
            }
        case 'LOGIN_SUCCESS':
            state.isLogin = true
            state.roleId = action?.data?.roleId
            return {
                ...state
            }
        case 'LOGIN_FAILED':
            state.isLogin = false
            state.message = action.message
            state.roleId = ''
            return {
                ...state
            }
        case 'LOGOUT_SUCCESS':
            state.isLogin = false
            state.isChangePassword = false
            state.errCode = action.errCode || 0
            return {
                ...state,
            }
        case 'LOGOUT_FAILED':
            state.isLogin = true
            state.isChangePassword = true
            state.errCode = action.errCode
            return {
                ...state
            }
        case 'REGISTER':
            state.message = action?.message
            state.errCode = action?.errCode
            return {
                ...state
            }
        case 'SEND_MAIL_SUCCESS':
            state.otp = action.data
            return {
                ...state
            }
        case 'SEND_MAIL_FAILED':
            state.otp = ''
            state.message = action?.message
            state.errCode = action?.errCode
            return {
                ...state
            }
        case 'VERIFY_OTP_SUCCESS':
            state.isVerify = action.isVerify
            state.email = action.data
            return {
                ...state
            }
        case 'VERIFY_OTP_FAILED':
            state.email = ''
            state.message = action.message
            return {
                ...state
            }
        case 'CHANGE_PASSWORD_SUCCESS':
            state.isChangePassword = true
            state.message = action.message
            return {
                ...state
            }
        case 'CHANGE_PASSWORD_FAILED':
            state.isChangePassword = false
            state.message = action.message
            return {
                ...state
            }
        case 'FORGOT_PASSWORD':
            state.message = action.message
            state.errCode = action.errCode
            return {
                ...state
            }
        default:
            return state
    }
}

export default authReducer