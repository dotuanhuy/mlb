const initState = {
    logos: [],
}

const logoReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.logos = []
            return {
                ...state
            }
        case 'GET_ALL_LOGOS_SUCCESS': 
            state.logos = action.data
            return {
                ...state
            }
        case 'GET_ALL_LOGOS_FAILED': 
            state.logos = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default logoReducer
