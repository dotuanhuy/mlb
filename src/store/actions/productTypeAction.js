import actionTypes from "./actionTypes";
import {
    getAllProductTypesService,
    getLimitProductTypesService,
    getProductTypeByCategoryIdService,
    getProductTypeByIdService,
    createProductTypeService,
    deleteProductTypeService,
    updateProductTypeService,
    getLimitProductTypesByNameService
} from "../../services/productTypeService";

export const refreshStoreProductType = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STORE_SUCCESS
            })
        } catch (e) {
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const refreshInfoProductType = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_INFO_PRODUCT_TYPE
        })

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
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_TYPES_FAILED
            })
        }
    }
}

export const getLimitProductTypes = (page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getLimitProductTypesService(+page - 1)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCT_TYPES_SUCCESS,
                    productTypes: res.data?.rows,
                    count: res.data?.count
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCT_TYPES_FAILED,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_LIMIT_PRODUCT_TYPES_FAILED,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
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
                dispatch({
                    type: actionTypes.CREATE_PRODUCT_TYPE,
                    message: res.errMessage,
                })
            }
            else {
                dispatch({
                    type: actionTypes.CREATE_PRODUCT_TYPE,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CREATE_PRODUCT_TYPE,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
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
        }
    }
}

export const updateProductType = (formData, id, page, type, found) => {
    return async (dispatch, getSate) => {
        try {
            let res = await updateProductTypeService(formData, id, type, found)
            if (res && res.errCode === 0) {
                dispatch(getLimitProductTypes(page))
            }
        } catch (e) {
        }
    }
}

export const getLimitProductTypesByName = (page, name) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getLimitProductTypesByNameService(+page - 1, name)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCT_TYPES_SUCCESS,
                    productTypes: res.data?.rows,
                    count: res.data?.count
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCT_TYPES_FAILED,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_LIMIT_PRODUCT_TYPES_FAILED,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}
