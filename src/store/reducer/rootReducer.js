const initState = {
    isLogout: false,
    users: [],
    provinces: [],
    genders: [],
    roles: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGOUT_SUCCESS': 
            state.isLogout = true
            return {
                ...state,
            }
        case 'LOGOUT_FAILED':
            state.isLogout = false 
            return {
                ...state
            }
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
        default: 
            console.log('abc: ', state)
            return state
    }
}


export default rootReducer