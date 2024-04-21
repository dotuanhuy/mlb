const initState = {
    notifications: [],
    isError: false
}

const notificationReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.notifications = []
            state.isError = false
            return {
                ...state
            }
        case 'GET_NOTIFICATIONS_SUCCESS': 
            state.notifications = action.data
            return {
                ...state
            }
        case 'GET_NOTIFICATIONS_FAILED': 
            state.notifications = []
            return {
                ...state
            }
        case 'CREATE_NOTIFICATION_SUCCESS': 
            state.notifications = action.data
            state.isError = true
            return {
                ...state
            }
        case 'CREATE_NOTIFICATION_FAILED': 
            state.notifications = []
            state.isError = false
            return {
                ...state
            }
        default:
            return state
    }
}

export default notificationReducer
