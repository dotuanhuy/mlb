const initState = {
    products: [],
    count: 0,
    totalSold: 0,
    descriptions: [],
    isLoading: true,
    countFavouriteProduct: 0,
    productSearch: [],
    productSearchLimit: [],
    statisticalListProductType: [],
    productSlider: [],
    message: '',
    errCode: null
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_PRODUCT_SUCCESS':
            state.isLoading = true
            return {
                ...state
            }
        case 'REFRESH_STORE_SUCCESS':
            state.products = []
            state.descriptions = []
            state.isLoading = true
            state.count = 0
            state.totalSold = 0
            state.countFavouriteProduct = 0
            state.productSearch = []
            state.productSearchLimit = []
            state.productSlider = []
            state.message = ''
            state.errCode = null
            return {
                ...state
            }
        case 'REFRESH_INFO_RESPONSE_PRODUCT':
            state.message = ''
            state.errCode = null
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_SUCCESS':
            state.products = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'FETCH_ALL_PRODUCTS_FAILED':
            state.products = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_PUBLIC_SUCCESS':
            state.products = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_ALL_PRODUCTS_PUBLIC_FAILED':
            state.products = []
            state.isLoading = true
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
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_ID_FAILED':
            state.products = []
            state.isLoading = true
            return {
                ...state
            }
        case 'FETCH_DESCRIPTION_PRODUCT_SUCCESS':
            state.descriptions = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'FETCH_DESCRIPTION_PRODUCT_FAILED':
            state.descriptions = []
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_COUNT_PRODUCTS_SUCCESS':
            state.count = action.data?.totalProducts
            state.totalSold = action.data?.totalProductsSold
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_COUNT_PRODUCTS_FAILED':
            state.count = 0
            state.totalSold = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_SUCCESS':
            state.statisticalListProductType = action.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_FAILED':
            state.quantity = []
            state.isLoading = true
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
            state.isLoading = false
            state.count = action.count
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_CATEGORY_LIMIT_FAILED':
            state.products = []
            state.isLoading = true
            state.count = 0
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_CATEGORY_DETAIL_SUCCESS':
            state.productSlider = action.productSlider
            return {
                ...state
            }
        case 'GET_PRODUCT_BY_CATEGORY_DETAIL_FAILED':
            state.productSlider = []
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCTS_BY_OPTION_SORT_SUCCESS':
            state.products = action.data.rows
            state.count = action.data.count
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_LIMIT_PRODUCTS_BY_OPTION_SORT_FAILED':
            state.products = []
            state.count = 0
            state.isLoading = true
            return {
                ...state
            }
        case 'SEARCH_PRODUCT_BY_NAME_SUCCESS':
            state.isLoading = false
            state.productSearch = action.data
            return {
                ...state
            }
        case 'SEARCH_PRODUCT_BY_NAME_FAILED':
            state.isLoading = false
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
            state.isLoading = false
            state.productSearchLimit = action.data.rows
            state.count = action.data.count
            return {
                ...state
            }
        case 'SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED':
            state.productSearchLimit = []
            state.isLoading = true
            state.count = 0
            return {
                ...state
            }
        case 'FIND_PRODUCT_BY_NAME_SUCCESS':
            state.products = action.data
            state.count = action.count
            return {
                ...state
            }
        case 'FIND_PRODUCT_BY_NAME_FAILED':
            state.products = []
            state.count = 0
            return {
                ...state
            }
        case 'CUD_PRODUCT':
            state.message = action.message
            state.errCode = action.errCode || 0
            return {
                ...state
            }
        default:
            return state
    }
}

export default productReducer