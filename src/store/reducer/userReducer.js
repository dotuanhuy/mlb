const initState = {
    users: [],
    provinces: [],
    roles: [],
    isLoadingUser: true,
    count: 0
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS': 
            state.users = []
            state.provinces = []
            state.roles = []
            state.isLoadingUser = true
            state.count = 0
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
        default: 
            return state
    }
}


export default userReducer