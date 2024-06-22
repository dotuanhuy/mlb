const initState = {
    imageSizes: [],
    isLoading: true,
    imageLogoWeb: ''
}

const firebaseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REFRESH_STORE_SUCCESS':
            state.imageSizes = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_SIZES_FIREBASE_SUCCESS':
            state.imageSizes = action?.data
            state.isLoading = false
            return {
                ...state
            }
        case 'GET_SIZES_FIREBASE_FAILED':
            state.imageSizes = []
            state.isLoading = true
            return {
                ...state
            }
        case 'GET_LOGO_WEB_FIREBASE_SUCCESS':
            state.imageLogoWeb = action?.data
            return {
                ...state
            }
        case 'GET_LOGO_WEB_FIREBASE_FAILED':
            state.imageLogoWeb = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default firebaseReducer
