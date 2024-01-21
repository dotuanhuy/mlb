const initState = {
    countProducts: 0,
    product: [],
    productLimit: []
}

const fouriteProductReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.countProducts = 0
            state.product = []
            state.productLimit = []
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_SUCCESS': 
            state.product = action?.data
            state.countProducts = state.product.length
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_FAILED': 
            state.product = []
            state.countProducts = 0
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_LIMIT_SUCCESS':
            state.productLimit = action?.data
            state.countProducts = action?.count
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_LIMIT_FAILED':
            state.productLimit = []
            state.countProducts = 0
            return {
                ...state
            }
        default:
            return state
    }
}

export default fouriteProductReducer
