const initState = {
    discounts: [],
    count: 0,
    isLoading: true,
    discount: {}
}

const discountReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.discounts = []
            state.isLoading = true
            state.count = 0
            state.discount = {}
            return {
                ...state
            }
        case 'GET_ALL_DISCOUNTS_SUCCESS': 
            state.discounts = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_ALL_DISCOUNTS_FAILED': 
            state.discounts = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_LIMIT_DISCOUNT_SUCCESS': 
            state.discounts = action?.data?.rows
            state.count = action?.data?.count
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_LIMIT_DISCOUNT_FAILED': 
            state.discounts = []
            state.count = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_DISCOUNT_BY_ID_SUCCESS': 
            state.discount = action?.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_DISCOUNT_BY_ID_FAILED': 
            state.discount = {}
            state.isLoading = true
            return {
                ...state
            }
        default:
            return state
    }
}

export default discountReducer
