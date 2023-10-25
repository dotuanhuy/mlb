const initState = {
    user: {},
    isLogin: false,
    token: '',
    isResetPassword: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': 
            state.isLogin = true
            state.token = action?.data?.data?.accessToken
            let {email, firstName, lastName, phoneNumber, gender, address, roleId} = action?.data?.data
            state.user = {
                email,
                firstName,
                lastName,
                phoneNumber,
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
            return {
                ...state
            }
        case 'LOGOUT_SUCCESS': 
            state.isLogin = false
            state.token = ''
            state.isResetPassword = false
            return {
                ...state,
            }
        case 'LOGOUT_FAILED':
            state.isLogin = true
            state.isResetPassword = true
            return {
                ...state
            }
        case 'RESET_PASSWORD_SUCCESS':
            state.isResetPassword = true
            return {
                ...state
            }
        case 'RESET_PASSWORD_FAILED':
            state.isResetPassword = false
            return {
                ...state
            }
        default:
            return state
    }
}

export default authReducer