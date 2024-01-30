import userReducer from "./userReducer"

const initState = {
    products: [],
    count: 0,
    images: [],
    descriptions: [],
    isLoadingProduct: true,
    countFavouriteProduct: 0,
    productSearch: [],
    productSearchLimit: [],
    quantityArr: []
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_PRODUCT_SUCCESS':
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'REFRESH_STORE_SUCCESS':
            state.products = []
            state.images = []
            state.descriptions = []
            state.isLoadingProduct = true
            state.count = 0
            state.countFavouriteProduct = 0
            state.productSearch = []
            state.productSearchLimit = []
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_SUCCESS':
            state.products = action.data
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_FAILED': 
            state.products = []
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_PUBLIC_SUCCESS':
            state.products = action.data
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_PUBLIC_FAILED':
            state.products = []
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_FAILED':
            state.products = []
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_ID_SUCCESS':
            state.products = action.data
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_ID_FAILED':
            state.products = []
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'FETCH_ALL_IMAGE_PRODUCT_SUCCESS':
            state.images = action.data
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'FETCH_ALL_IMAGE_PRODUCT_FAILED':
            state.images = []
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'FETCH_DESCRIPTION_PRODUCT_SUCCESS': 
            state.descriptions = action.data
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'FETCH_DESCRIPTION_PRODUCT_FAILED': 
            state.descriptions = []
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_SUCCESS':
            state.quantityArr = action.data
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_FAILED':
            state.quantity = []
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_CATEGORY_SUCCESS':
            state.products = action.data
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_CATEGORY_FAILED':
            state.products = []
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_CATEGORY_LIMIT_SUCCESS':
            state.products = action.data
            state.isLoadingProduct = false
            state.count = action.count
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_CATEGORY_LIMIT_FAILED':
            state.products = []
            state.isLoadingProduct = true
            state.count = 0
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCTS_SUCCESS':
            state.products = action.data.rows
            state.count = action.data.count
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCTS_FAILED':
            state.products = []
            state.count = 0
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCTS_BY_OPTION_SORT_SUCCESS': 
            state.products = action.data.rows
            state.count = action.data.count
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCTS_BY_OPTION_SORT_FAILED': 
            state.products = []
            state.count = 0
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'SEARCH_PRODUCT_BY_NAME_SUCCESS':
            state.isLoadingProduct = false
            state.productSearch = action.data
            return {
                ...state
            }
        case 'SEARCH_PRODUCT_BY_NAME_FAILED':
            state.isLoadingProduct = false
            state.productSearch = []
            return {
                ...state
            }
        case 'REFRESH PRODUCT SEARCH':
            state.productSearch = []
            return {
                ...state
            }
        case 'SEARCH_PRODUCT_BY_NAME_LIMIT_SUCCESS':
            state.isLoadingProduct = false
            state.productSearchLimit = action.data.rows
            state.count = action.data.count
            return {
                ...state
            }
        case 'SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED':
            state.productSearchLimit = []
            state.isLoadingProduct = true
            state.count = 0
            return {
                ...state
            }
        
        default:
            return state
    }
}

export default productReducer