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

export const refreshInfoResponseImage = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_INFO_RESPONSE_IMAGE
            })
        } catch (e) {
            console.log('refreshInfoResponseImage error: ', e)
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

export const addImageProduct = (formData, id, type, found) => {
    return async (dispatch, getSate) => {
        try {
            const res = await addImageProductService(formData, id, type, found)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CHANGE_IMAGE_PRODUCT,
                    message: res.errMessage,
                })
                dispatch(getAllImagesByProductId(id))
            }
            else {
                dispatch({
                    type: actionTypes.CHANGE_IMAGE_PRODUCT,
                    message: res.errMessage,
                    errCode: res.errCode,
                })
            }
        } catch (e) {
            console.log('addImageProduct error: ', e)
            dispatch({
                type: actionTypes.CHANGE_IMAGE_PRODUCT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode,
            })
        }
    }
}

export const deleteImageProduct = (formData, productId, type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteImageProductService(formData, type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CHANGE_IMAGE_PRODUCT,
                    message: res.errMessage,
                })
                dispatch(getAllImagesByProductId(productId))
            }
            else {
                dispatch({
                    type: actionTypes.CHANGE_IMAGE_PRODUCT,
                    message: res.errMessage,
                    errCode: res.errCode,
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CHANGE_IMAGE_PRODUCT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode,
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
