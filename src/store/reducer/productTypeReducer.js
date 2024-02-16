const initState = {
    productTypes: [],
    count: 0,
    isLoading: true
}

const productTypeReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.productTypes = []
            state.count = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_ALL_PRODUCT_TYPES_SUCCESS': 
            state.productTypes = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_ALL_PRODUCT_TYPES_FAILED':
            state.productTypes = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCT_TYPES_SUCCESS': 
            state.productTypes = action.data.rows
            state.count = action.data.count
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCT_TYPES_FAILED':
            state.productTypes = []
            state.count = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_PRODUCT_TYPES_BY_CATEGORYID_SUCCESS': 
            state.productTypes = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_PRODUCT_TYPES_BY_CATEGORYID_FAILED':
            state.productTypes = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_PRODUCT_TYPES_BY_ID_SUCCESS': 
            state.productTypes = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_PRODUCT_TYPES_BY_ID_FAILED':
            state.productTypes = []
            state.isLoading = true
            return {
                ...state
            }
        default:
            return state
    }
}

export default productTypeReducer
