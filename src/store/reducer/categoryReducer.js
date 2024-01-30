const initState = {
    categories: [],
    categoriesDetail: []
}

const categoryReducer = (state=initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.categories = []
            state.categoriesDetail = []
            return {
                ...state
            }
        case 'FETCH_ALL_CATEGORIES_SUCCESS': 
            state.categories = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_CATEGORIES_FAILED':
            state.categories = []
            return {
                ...state
            }
        case 'GET_ALL_CATEGORIES_DETAIL_SUCCESS': 
            state.categoriesDetail = action.data
            return {
                ...state
            }
        case 'GET_ALL_CATEGORIES_DETAIL_FAILED':
            state.categoriesDetail = []
            return {
                ...state
            }
        case 'GET_ALL_CATEGORIES_DETAIL_BY_TYPE_SUCCESS': 
            state.categoriesDetail = action.data
            return {
                ...state
            }
        case 'GET_ALL_CATEGORIES_DETAIL_BY_TYPE_FAILED':
            state.categoriesDetail = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default categoryReducer
