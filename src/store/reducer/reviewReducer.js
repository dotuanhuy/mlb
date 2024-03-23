const initState = {
    reviews: [],
    rate: 0,
    totalEachRating: {}
}

const reviewReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.reviews = []
            state.rate = 0
            state.totalEachRating = {}
            return {
                ...state
            }
        case 'GET_REVIEW_PRODUCT_SUCCESS': 
            state.reviews = action.data
            state.rate = action.rate
            state.totalEachRating = action.totalEachRating
            return {
                ...state
            }
        case 'GET_REVIEW_PRODUCT_FAILED': 
            state.reviews = []
            state.rate = 0
            state.totalEachRating = {}
            return {
                ...state
            }
        default:
            return state
    }
}

export default reviewReducer
