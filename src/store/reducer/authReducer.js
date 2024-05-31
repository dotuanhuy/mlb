const initState = {
    user: {},
    isLogin: false,
    token: '',
    isChangePassword: false,
    message: '',
    errCode: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STATE_AUTH':
            state.message = ''
            state.isChangePassword = false
            state.errCode = ''
            return {
                ...state
            }
        case 'LOGIN_SUCCESS':
            state.isLogin = true
            state.token = action?.data?.accessToken
            const { email, firstName, lastName, phone, gender, address, roleId } = action?.data
            state.user = {
                email,
                firstName,
                lastName,
                phone,
                gender,
                address,
                roleId
            }
            return {
                ...state
            }
        case 'LOGIN_FAILED':
            state.isLogin = false
            state.token = ''
            state.user = {}
            state.message = action.message
            return {
                ...state
            }
        case 'LOGOUT_SUCCESS':
            state.isLogin = false
            state.token = ''
            state.isChangePassword = false
            return {
                ...state,
            }
        case 'LOGOUT_FAILED':
            state.isLogin = true
            state.isChangePassword = true
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
            console.log(action.message);
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