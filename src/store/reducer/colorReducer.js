const initState = {
    colors: [],
}

const colorReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.colors = []
            return {
                ...state
            }
        case 'GET_ALL_COLORS_SUCCESS': 
            state.colors = action.data
            return {
                ...state
            }
        case 'GET_ALL_COLORS_FAILED': 
            state.colors = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default colorReducer
