const initState = {
    isLogin: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': 
            state.isLogin = true
            return {
                ...state
            }
        case 'LOGIN_FAILED': 
            state.isLogin = false
            return {
                ...state
            }
        case 'LOGOUT_SUCCESS': 
            state.isLogin = false
            return {
                ...state,
            }
        case 'LOGOUT_FAILED':
            state.isLogin = true 
            return {
                ...state
            }
        default:
            return state
    }
}

export default authReducer