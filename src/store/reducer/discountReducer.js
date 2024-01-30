const initState = {
    discounts: [],
}

const discountReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.discounts = []
            return {
                ...state
            }
        case 'GET_ALL_DISCOUNTS_SUCCESS': 
            state.discounts = action.data
            return {
                ...state
            }
        case 'GET_ALL_DISCOUNTS_FAILED': 
            state.discounts = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default discountReducer
