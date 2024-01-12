const initState = {
    users: [],
    provinces: [],
    genders: [],
    roles: [],
    isLoadingUser: true,
    count: 0
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS': 
            return {
                ...initState
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
        case 'FETCH_ALL_PROVINCES_SUCCESS':
            state.provinces = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_PROVINCES_FAILED':
            state.provinces = []
            return {
                ...state
            }
        case 'FETCH_ALL_GENDER_SUCCESS':
            state.genders = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_ROLE_SUCCESS': 
            state.roles = action.data 
            return {
                ...state
            }
        case 'FETCH_ALL_CODE_BY_TYPE_FAILED':
            state.genders = []
            return {
                ...state
            }
        case 'FETCH_USER_ALLCODE_SUCCESS':
            state.users = action.data
            state.isLoadingUser = false
            return {
                ...state
            }
        case 'FETCH_USER_ALLCODE_FAILED':
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