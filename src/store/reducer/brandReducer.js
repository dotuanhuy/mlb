const initState = {
    brands: [],
}

const brandReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.brands = []
            return {
                ...state
            }
        case 'GET_ALL_BRANDS_SUCCESS': 
            state.brands = action.data
            return {
                ...state
            }
        case 'GET_ALL_BRANDS_FAILED': 
            state.brands = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default brandReducer
