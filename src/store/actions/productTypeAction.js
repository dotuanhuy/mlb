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

export const getAllProductTypes = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllProductTypesService(accessToken)
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

export const getLimitProductTypes = (accessToken, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getLimitProductTypesService(accessToken, +page-1)
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

export const getProductTypeByCategoryId = (accessToken, categoryId) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getProductTypeByCategoryIdService(accessToken, categoryId)
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

export const getProductTypeById = (accessToken, id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getProductTypeByIdService(accessToken, id)
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

export const createProductType = (accessToken, data, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await createProductTypeService(accessToken, data)
            if (res && res.errCode === 0) {
                dispatch(getLimitProductTypes(accessToken, page))
            }
        } catch (e) {
            console.log('createProductType error: ', e)
        }
    }
}

export const deleteProductType = (accessToken, id, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteProductTypeService(accessToken, id)
            if (res && res.errCode === 0) {
                dispatch(getLimitProductTypes(accessToken, page))
            }
        } catch (e) {
            console.log('deleteProductType error: ', e)
        }
    }
}

export const updateProductType = (accessToken, data, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await updateProductTypeService(accessToken, data)
            if (res && res.errCode === 0) {
                dispatch(getLimitProductTypes(accessToken, page))
            }
        } catch (e) {
            console.log('updateProductType error: ', e)
        }
    }
}