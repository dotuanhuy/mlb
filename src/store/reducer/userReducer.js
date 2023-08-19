const initState = {
    users: [],
    provinces: [],
    genders: [],
    roles: [],
    colors: [],
    categories: [],
    logos: []
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        // case 'LOGOUT_SUCCESS': 
        //     state.isLogout = true
        //     return {
        //         ...state,
        //     }
        // case 'LOGOUT_FAILED':
        //     state.isLogout = false 
        //     return {
        //         ...state
        //     }
        case 'FETCH_ALL_USERS_SUCCESS':
            state.users = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_USERS_FAILED':
            state.users = []
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
            state.roles = []
            state.logos = []
            return {
                ...state
            }
        case 'FETCH_USER_ALLCODE_SUCCESS':
            state.users = action.data
            return {
                ...state
            }
        case 'FETCH_USER_ALLCODE_FAILED':
            state.users = []
            return {
                ...state
            }
        case 'FETCH_ALL_COLOR_SUCCSESS': 
            state.colors = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_COLOR_FAILED': 
            state.colors = []
            return {
                ...state
            }
        case 'GET_CATEGORIES_BY_ID_SUCCESS':
            state.categories = action.data
            return {
                ...state
            }
        case 'GET_CATEGORIES_BY_ID_FAILED':
            state.categories = []
            return {
                ...state
            }
        case 'FETCH_ALL_LOGO_SUCCESS':
            state.logos = action.data 
            return {
                ...state
            }
        default: 
            return state
    }
}


export default userReducer