const initState = {
    users: [],
    address: [],
    provinces: [],
    roles: [],
    isLoading: true,
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
            state.isLoading = true
            state.count = 0
            state.errMessage = ''
            state.errCode = null
            state.otp = ''
            state.address = []
            return {
                ...state
            }
        case 'FETCH_ALL_USERS_SUCCESS':
            state.users = action.data
            state.isLoading  = false
            return {
                ...state
            }
        case 'FETCH_ALL_USERS_FAILED':
            state.users = []
            state.isLoading  = true
            return {
                ...state
            }
        case 'GET_ALL_ADDRESS_SUCCESS':
            state.provinces = action.data
            state.address = action.address
            return {
                ...state
            }
        case 'GET_ALL_ADDRESS_FAILED':
            state.provinces = []
            state.address = []
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
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_USER_BY_ID_FAILED':
            state.users = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_COUNT_USERS_SUCCESS':
            state.count = action.data.count
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_COUNT_USERS_FAILED':
                state.count = 0
                state.isLoading = true
                return {
                    ...state
                }
        case 'LOADING_SUCCESS': 
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_LIMIT_USERS_SUCCESS': 
            state.users = action.data.rows
            state.count = action.data.count
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_LIMIT_USERS_FAILED': 
            state.users = []
            state.count = 0
            state.isLoading = true
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