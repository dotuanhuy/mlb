const initState = {
    orders: [],
    count: 0,
    isLoading: true,
    message: '',
    listId: [],
    orderId: '',
    total: 0,
    errCode: ''
}

const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.orders = []
            state.count = 0
            state.isLoading = true
            state.message = ''
            state.listId = []
            state.orderId = ''
            state.errCode = ''
            return {
                ...state
            }
        case 'ORDER_FAILED':
            state.message = action.error
            return {
                ...state
            }
        case 'GET_ALL_ORDERS_BY_USER_SUCCESS':
            state.orders = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_ALL_ORDERS_BY_USER_FAILED':
            state.orders = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_LIMIT_ORDER_SUCCESS':
            state.orders = action.orders
            state.count = action.count
            state.isLoading = false
            state.message = ''
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
            return {
                ...state
            }
        case 'CREATE_ORDER_SUCCESS':
            state.message = action.errMessage
            state.orderId = action.orderId
            state.errCode = action.errCode
            return {
                ...state
            }
        case 'CREATE_ORDER_FAILED':
            state.message = action.errMessage
            state.orderId = ''
            state.errCode = ''
            return {
                ...state
            }
        case 'GET_TOTAL_ORDER_SUCCESS':
            state.total = action.data
            return {
                ...state
            }
        case 'GET_TOTAL_ORDER_FAILED':
            state.total = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default orderReducer
