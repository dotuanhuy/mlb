const initState = {
    images: [],
    isLoadingImage: true,
    message: '',
    errCode: '',
}

const imageReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.images = []
            state.isLoadingImage = true
            state.message = ''
            state.errCode = ''
            return {
                ...state
            }
        case 'REFRESH_INFO_RESPONSE_IMAGE':
            state.message = ''
            state.errCode = ''
            return {
                ...state
            }
        case 'GET_ALL_IMAGES_PRODUCT_SUCCESS':
            state.images = action.data
            state.isLoadingImage = false
            return {
                ...state
            }
        case 'GET_ALL_IMAGES_PRODUCT_FAILED':
            state.images = []
            state.isLoadingImage = true
            return {
                ...state
            }
        case 'GET_ALL_IMAGES_BY_PRODUCTID_SUCCESS':
            state.images = action.data
            state.isLoadingImage = false
            return {
                ...state
            }
        case 'GET_ALL_IMAGES_BY_PRODUCTID_FAILED':
            state.images = []
            state.isLoadingImage = true
            return {
                ...state
            }
        case 'GET_IMAGES_PRODUCT_BY_CATEGORY_SUCCESS':
            state.images = action.data
            state.isLoadingImage = false
            return {
                ...state
            }
        case 'GET_IMAGES_PRODUCT_BY_CATEGORY_FAILED':
            state.images = []
            state.isLoadingImage = true
            return {
                ...state
            }
        case 'CHANGE_IMAGE_PRODUCT':
            state.message = action.message
            state.errCode = action.errCode || 0
            return {
                ...state
            }
        default:
            return state
    }
}

export default imageReducer
