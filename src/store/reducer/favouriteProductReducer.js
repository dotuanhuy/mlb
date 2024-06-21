const initState = {
    countProducts: 0,
    product: [],
    productLimit: [],
    isLoading: true
}

const fouriteProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.countProducts = 0
            state.product = []
            state.productLimit = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_SUCCESS':
            state.product = action?.data
            state.countProducts = action?.data?.length
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_FAILED':
            state.product = []
            state.countProducts = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_LIMIT_SUCCESS':
            state.productLimit = action?.data
            console.log('check ress: ', action?.data);

            state.countProducts = action?.count
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_FAVOURITE_LIMIT_FAILED':
            state.productLimit = []
            state.countProducts = 0
            state.isLoading = true
            return {
                ...state
            }
        default:
            return state
    }
}

export default fouriteProductReducer
