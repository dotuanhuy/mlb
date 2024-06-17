const initState = {
    productTypes: [],
    count: 0,
    isLoading: true,
    message: '',
    errCode: null
}

const productTypeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.productTypes = []
            state.count = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'REFRESH_INFO_PRODUCT_TYPE':
            state.message = ''
            state.errCode = null
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
            state.productTypes = action.productTypes
            state.count = action.count
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCT_TYPES_FAILED':
            state.productTypes = []
            state.count = 0
            state.isLoading = true
            state.errCode = action.errCode
            state.message = action.message
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
        case 'CREATE_PRODUCT_TYPE':
            state.message = action.message
            state.errCode = action?.errCode || 0
            return {
                ...state
            }
        default:
            return state
    }
}

export default productTypeReducer
