import userReducer from "./userReducer"

const initState = {
    products: [],
    categorieById: [],
    colors: [],
    categories: [],
    logos: [],
    discounts: [],
    brands: [],
    sizes: [],
    genders: [],
    images: [],
    descriptions: [],
    isLoadingProduct: true,
    count: 0,
    countFavouriteProduct: 0,
    productSearch: [],
    productSearchLimit: [],
}

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_PRODUCT_SUCCESS':
            state.isLoadingProduct = true
            return {
                ...state
            }
        case 'REFRESH_STORE_SUCCESS':
            return {
                ...initState
            }
        case 'FETCH_ALL_CODE_BY_TYPE_FAILED':
            state.logos = []
            state.discounts = []
            state.brands = []
            state.sizes = []
            state.genders = []
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
        case 'FETCH_ALL_SIZEGIAY_SUCCESS': 
            state.sizes = action.data 
            return {
                ...state
            }
        case 'FETCH_ALL_SIZEAO_SUCCESS': 
            state.sizes = action.data
            return {
                ...state
            }
        case 'FETCH_GENDER_PRODUCT_SUCCESS':
            state.genders = action.data
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
        case 'FETCH_PRODUCT_BY_ID_SUCCESS':
            state.products = action.data
            state.sizes = action?.data?.listSize?.split(',')
            state.isLoadingProduct = false
            return {
                ...state
            }
        case 'FETCH_PRODUCT_BY_ID_FAILED':
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