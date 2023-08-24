import actionTypes from "./actionTypes";
import { 
    getAllProductsService, 
    getAllCategoriesService,
    getCategoriesByIdService,
    createNewProductService,

} from "../../services/productService";
import { getAllCodeByType } from "../../services/userService";
import { allCode } from "../../utils";

export const getAllProducts = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCTS_FAILED
                })
            }
        } catch(e) {
            console.log('getAllProducts error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_PRODUCTS_FAILED
            })
        }
    }
}

export const fetchAllCodeByTypeProduct = (type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCodeByType(type)
            if (res && res.errCode === 0) {
                if (type === allCode.LOGO) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_LOGO_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.DISCOUNT) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_DISCOUNT_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.BRAND) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_BRAND_SUCCESS,
                        data: res.data
                    })
                }
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_BY_TYPE_FAILED
                })
            }
        } catch(e) {
            console.log('fetchAllGenders error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_CODE_BY_TYPE_FAILED
            })
        }
    }
}

export const fetchAllColors = (type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCodeByType(type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_COLOR_SUCCSESS,
                    data: res.data
                })
            }
        } catch (e) {
            console.log('fetchAllColors error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_COLOR_FAILED
            })
        }
    }
}

export const getCategoriesById = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getCategoriesByIdService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_BY_ID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
                })
            }
        } catch(e) {
            console.log('getCategoriesById error: ' ,e)
            dispatch({
                type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
            })
        }
    }
}

export const getAllCategories = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CATEGORIES_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CATEGORIES_FAILED
                })
            }
        } catch (e) {
            console.log('getAllCategories error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_CATEGORIES_FAILED
            })
        }
    }
}

export const createNewProduct = (product) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewProductService(product)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_PRODUCT_SUCCESS
                })
                getAllProducts()
            }
            else {
                dispatch({
                    type: actionTypes.CREATE_NEW_PRODUCT_FAILED
                })
            }
        } catch(e) {
            console.log('createNewProduct eror: ', e)
            dispatch({
                type: actionTypes.CREATE_NEW_PRODUCT_FAILED
            })
        }
    }
}