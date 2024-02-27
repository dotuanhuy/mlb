const initState = {
    users: [],
    provinces: [],
    roles: [],
    isLoadingUser: true,
    count: 0,
    errMessage: '',
    errCode: null,
    otp: '',
    isVerify: false,
    email: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS': 
            state.users = []
            state.provinces = []
            state.roles = []
            state.isLoadingUser = true
            state.count = 0
            state.errMessage = ''
            state.errCode = null
            state.otp = ''
            return {
                ...state
            }
        case 'FETCH_ALL_USERS_SUCCESS':
            state.users = action.data
            state.isLoadingUser  = false
            return {
                ...state
            }
        case 'FETCH_ALL_USERS_FAILED':
            state.users = []
            state.isLoadingUser  = true
            return {
                ...state
            }
        case 'GET_ALL_ADDRESS_SUCCESS':
            state.provinces = action.data
            return {
                ...state
            }
        case 'GET_ALL_ADDRESS_FAILED':
            state.provinces = []
            return {
                ...state
            }
        case 'GET_ALL_ROLES_SUCCESS':
            state.roles = action.data
            return {
                ...state
            }
        case 'GET_ALL_ROLES_FAILED': 
            state.roles = []
            return {
                ...state
            }
        case 'GET_USER_BY_ID_SUCCESS':
            state.users = action.data
            state.isLoadingUser = false
            return {
                ...state
            }
        case 'GET_USER_BY_ID_FAILED':
            state.users = []
            state.isLoadingUser = true
            return {
                ...state
            }
        case 'GET_COUNT_USERS_SUCCESS':
            state.count = action.data.count
            state.isLoadingUser = false
            return {
                ...state
            }
        case 'GET_COUNT_USERS_FAILED':
                state.count = 0
                state.isLoadingUser = true
                return {
                    ...state
                }
        case 'LOADING_SUCCESS': 
            state.isLoadingUser = true
            return {
                ...state
            }
        case 'GET_LIMIT_USERS_SUCCESS': 
            state.users = action.data.rows
            state.count = action.data.count
            state.isLoadingUser = false
            return {
                ...state
            }
        case 'GET_LIMIT_USERS_FAILED': 
            state.users = []
            state.count = 0
            state.isLoadingUser = true
            return {
                ...state
            }
        case 'REGISTER':
            state.errMessage = action?.data?.errMessage
            state.errCode = action?.data?.errCode
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
            state.errMessage = action?.data?.errMessage
            state.errCode = action?.data?.errCode
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
            state.isVerify = false
            state.email = ''
            return {
                ...state
            }
        default: 
            return state
    }
}


export default userReducer