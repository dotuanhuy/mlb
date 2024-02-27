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

export const addImageProduct = (data) => {
    return async (dispatch, getSate) => {
        try {
            let res = await addImageProductService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT_SUCCESS
                })
                dispatch(getAllImagesByProductId(data.productId))
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

export const deleteImageProduct = (data) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteImageProductService(data)
            if (res && res.errCode === 0) {
                dispatch(getAllImagesByProductId(data.productId))
            }
        } catch (e) {
            console.log('deleteImageProduct error: ', e)
            dispatch({
                type: actionTypes.ADD_IMAGE_PRODUCT_FAILED
            })
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
