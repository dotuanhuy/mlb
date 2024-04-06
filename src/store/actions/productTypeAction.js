import actionTypes from "./actionTypes";
import { 
    getAllProductTypesService,
    getLimitProductTypesService,
    getProductTypeByCategoryIdService,
    getProductTypeByIdService,
    createProductTypeService,
    deleteProductTypeService,
    updateProductTypeService,
} from "../../services/productTypeService";

export const refreshStoreProductType= () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STORE_SUCCESS
            })
        } catch (e) {
            console.log('refreshStoreProductType error: ', e)
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const getAllProductTypes = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllProductTypesService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCT_TYPES_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCT_TYPES_FAILED
                })
            }
        } catch (e) {
            console.log('getAllProductTypes error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_TYPES_FAILED
            })
        }
    }
}

export const getLimitProductTypes = (page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getLimitProductTypesService(+page-1)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCT_TYPES_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCT_TYPES_FAILED
                })
            }
        } catch (e) {
            console.log('getLimitProductTypes error: ', e)
            dispatch({
                type: actionTypes.GET_LIMIT_PRODUCT_TYPES_FAILED
            })
        }
    }
}

export const getProductTypeByCategoryId = (categoryId) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getProductTypeByCategoryIdService(categoryId)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRODUCT_TYPES_BY_CATEGORYID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRODUCT_TYPES_BY_CATEGORYID_FAILED
                })
            }
        } catch (e) {
            console.log('getProductTypeByCategoryId error: ', e)
            dispatch({
                type: actionTypes.GET_PRODUCT_TYPES_BY_CATEGORYID_FAILED
            })
        }
    }
}

export const getProductTypeById = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getProductTypeByIdService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRODUCT_TYPES_BY_ID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRODUCT_TYPES_BY_ID_FAILED
                })
            }
        } catch (e) {
            console.log('getProductTypeById error: ', e)
            dispatch({
                type: actionTypes.GET_PRODUCT_TYPES_BY_ID_FAILED
            })
        }
    }
}

export const createProductType = (formData, page, type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await createProductTypeService(formData, type)
            if (res && res.errCode === 0) {
                dispatch(getLimitProductTypes(page))
            }
            else {
                dispatch({
                    type: actionTypes.ERROR,
                    error: res.errMessage
                })
            }
        } catch (e) {
            console.log('createProductType error: ', e)
            dispatch({
                type: actionTypes.ERROR,
                error: e?.response?.data?.errMessage
            })
        }
    }
}

export const deleteProductType = (id, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteProductTypeService(id)
            if (res && res.errCode === 0) {
                dispatch(getLimitProductTypes(page))
            }
        } catch (e) {
            console.log('deleteProductType error: ', e)
        }
    }
}

export const updateProductType = (formData, id, page, type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await updateProductTypeService(formData, id, type)
            if (res && res.errCode === 0) {
                dispatch(getLimitProductTypes(page))
            }
        } catch (e) {
            console.log('updateProductType error: ', e)
        }
    }
}