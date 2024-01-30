const initState = {
    sizes: [],
}

const sizeReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.sizes = []
            return {
                ...state
            }
        case 'GET_ALL_SIZES_BY_TYPE_SUCCESS': 
            state.sizes = action.data
            return {
                ...state
            }
        case 'GET_ALL_SIZES_BY_TYPE_FAILED': 
            state.sizes = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default sizeReducer
