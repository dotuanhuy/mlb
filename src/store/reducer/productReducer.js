const initState = {
    products: [],
    categorieById: [],
    colors: [],
    categories: [],
    logos: [],
    discounts: [],
    brands: []
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_ALL_CODE_BY_TYPE_FAILED':
            state.logos = []
            state.discounts = []
            state.brands = []
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_SUCCESS':
            state.products = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_FAILED': 
            state.products = []
            return {
                ...state
            }
        case 'FETCH_ALL_COLOR_SUCCSESS': 
            state.colors = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_COLOR_FAILED': 
            state.colors = []
            return {
                ...state
            }
        case 'GET_CATEGORIES_BY_ID_SUCCESS':
            state.categorieById = action.data
            return {
                ...state
            }
        case 'GET_categorieById_BY_ID_FAILED':
            state.categorieById = []
            return {
                ...state
            }
        case 'FETCH_ALL_LOGO_SUCCESS':
            state.logos = action.data 
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
        case 'FETCH_ALL_DISCOUNT_SUCCESS': 
            state.discounts = action.data
            return  {
                ...state
            }
        case 'FETCH_ALL_BRAND_SUCCESS': 
            state.brands = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_FAILED':
            state.products = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default productReducer