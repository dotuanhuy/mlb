import actionTypes from "./actionTypes";
import { 
    getAllImageProductService,
    getAllImagesByProductIdService,
    addImageProductService,
    deleteImageProductService,
    getImageProductByCategoryService,
} from "../../services/imageService";

export const refreshStoreImages = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STORE_SUCCESS
            })
        } catch (e) {
            console.log('refreshStore error: ', e)
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const refreshErrorImage = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_ERROR_IMAGE
            })
        } catch (e) {
            console.log('refreshErrorImage error: ', e)
        }
    }
}

export const getAllImagesProduct = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllImageProductService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_IMAGES_PRODUCT_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_IMAGES_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('getAllImagesProduct error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_IMAGES_PRODUCT_FAILED
            })
        }
    }
}

export const getAllImagesByProductId = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllImagesByProductIdService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_IMAGES_BY_PRODUCTID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_IMAGES_BY_PRODUCTID_FAILED
                })
            }
        } catch (e) {
            console.log('getAllImagesByProductId error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_IMAGES_BY_PRODUCTID_FAILED
            })
        }
    }
}

export const addImageProduct = (formData, id, type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await addImageProductService(formData, id, type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT,
                    infoResponse: res
                })
                dispatch(getAllImagesByProductId(id))
            }
            else {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT,
                    infoResponse: res
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.ADD_IMAGE_PRODUCT,
                infoResponse: e?.response?.data?.errMessage ? e?.response?.data?.errMessage : e.message
            })
            console.log('addImageProduct error: ', e?.response?.data?.errMessage)
        }
    }
}

export const deleteImageProduct = (formData, productId, type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteImageProductService(formData, type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT,
                    infoResponse: res
                })
                dispatch(getAllImagesByProductId(productId))
            }
            else {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT,
                    infoResponse: res
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.ADD_IMAGE_PRODUCT,
                infoResponse: e?.response?.data?.errMessage ? e?.response?.data?.errMessage : e.message
            })
            console.log('deleteImageProduct error: ', e)
        }
    }
}

export const getImageProductByCategory = (category) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getImageProductByCategoryService(category)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_IMAGES_PRODUCT_BY_CATEGORY_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_IMAGES_PRODUCT_BY_CATEGORY_FAILED
                })
            }
        } catch (e) {
            console.log('getImageProductByCategory error: ', e)
            dispatch({
                type: actionTypes.GET_IMAGES_PRODUCT_BY_CATEGORY_FAILED
            })
        }
    }
}
