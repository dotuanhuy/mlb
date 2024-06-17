const initState = {
    users: [],
    address: [],
    provinces: [],
    roles: [],
    isLoading: true,
    count: 0,
    errCode: '',
    otp: '',
    isVerify: false,
    email: '',
    message: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            return {
                ...initState
            }
        case 'FETCH_ALL_USERS_SUCCESS':
            state.users = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'FETCH_ALL_USERS_FAILED':
            state.users = []
            state.isLoading = true
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
        case 'UPDATE_NAME_USER_SUCCESS':
            state.message = action.message
            state.errCode = action.errCode
            return {
                ...state
            }
        case 'UPDATE_NAME_USER_FAILED':
            state.message = action.message
            state.errCode = action.errCode
            return {
                ...state
            }
        case 'REFRESH_STATE_INFO_RESPONE':
            state.message = ''
            state.errCode = ''
            return {
                ...state
            }
        case 'FIND_USER_BY_NAME_SUCCESS':
            state.users = action.users
            state.count = action.count
            return {
                ...state
            }
        case 'FIND_USER_BY_NAME_FAILED':
            state.users = []
            state.message = action.message
            state.count = 0
            return {
                ...state
            }
        case 'CUD_USER':
            state.message = action.message
            state.errCode = action.errCode || 0
            return {
                ...state
            }
        case 'REFRESH_INFO_RESPONSE':
            state.message = ''
            state.errCode = ''
            return {
                ...state
            }
        default:
            return state
    }
}


export default userReducer