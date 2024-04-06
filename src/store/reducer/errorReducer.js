const initState = {
    error: '',
}

const errorReducer = (state=initState, action) => {
    switch (action.type) {
        case 'ERROR':
            state.error = action.error
            return {
                ...state
            }
        default:
            return state
    }
}

export default errorReducer
