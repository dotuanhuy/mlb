const initState = {
    countProducts: 0,
    products: [],
    totalMoney: 0,
    isLoading: true
}

const cartReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.countProducts = 0
            state.products = []
            state.totalMoney = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTs_IN_CART_BY_USER_SUCCESS':
            state.products = action?.data
            state.countProducts = action?.count
            state.totalMoney = action?.totalMoney
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTs_IN_CART_BY_USER_FAILED':
            state.products = []
            state.countProducts = 0
            state.isLoading = true
            return {
                ...state
            }
        default:
            return state
    }
}

export default cartReducer
