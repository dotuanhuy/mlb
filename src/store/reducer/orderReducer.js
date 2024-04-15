const initState = {
    orders: [],
    count: 0,
    isLoading: true,
    errorOrder: '',
    listId: []
}

const orderReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.orders = []
            state.count = 0
            state.isLoading = true
            state.errorOrder = ''
            state.listId = []
            return {
                ...state
            }
        case 'ORDER_FAILED':
            state.errorOrder = action.error
            return {
                ...state
            }
        case 'GET_LIMIT_ORDER_SUCCESS': 
            state.orders = action.orders
            state.count = action.count
            state.isLoading = false
            state.errorOrder = ''
            return {
                ...state
            }
        case 'GET_LIMIT_ORDER_FAILED': 
            state.orders = []
            state.count = 0
            return {
                ...state
            }
        case 'GET_LIST_ORDER_ID_SUCCESS': 
            state.listId = action.listId
            return {
                ...state
            }
        case 'GET_LIST_ORDER_ID_FAILED':
            state.listId = []
        default:
            return state
    }
}

export default orderReducer
