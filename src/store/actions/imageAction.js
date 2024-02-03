import actionTypes from "./actionTypes";
import { 
    getAllImagesByProductIdService,
    addImageProductService,
    deleteImageProductService
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

export const refreshIsLoadingImages = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: 'REFRESH_ISLOADING_IMAGES_SUCCESS'
            })
        } catch (e) {
            console.log('refreshStore error: ', e)
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const getAllImagesByProductId = (id, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllImagesByProductIdService(id, accessToken)
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

export const addImageProduct = (data, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await addImageProductService(data, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT_SUCCESS
                })
                dispatch(getAllImagesByProductId(data.productId, accessToken))
            }
            else {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('addImageProduct error: ', e)
            dispatch({
                type: actionTypes.ADD_IMAGE_PRODUCT_FAILED
            })
        }
    }
}

export const deleteImageProduct = (data, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteImageProductService(data, accessToken)
            if (res && res.errCode === 0) {
                dispatch(getAllImagesByProductId(data.productId, accessToken))
            }
        } catch (e) {
            console.log('deleteImageProduct error: ', e)
            dispatch({
                type: actionTypes.ADD_IMAGE_PRODUCT_FAILED
            })
        }
    }
}