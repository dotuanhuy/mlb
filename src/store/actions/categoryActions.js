import actionTypes from "./actionTypes";
import { 
    getAllCategoriesService,
    getAllCategoriesDetailService,
    getCategoriesByTypeService,
    getAllCategoriesDetailByTypeService,
} from "../../services/categoryService";

export const refreshStoreCategory = () => {
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

export const getAllCategoriesDetail = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesDetailService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_CATEGORIES_DETAIL_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_CATEGORIES_DETAIL_FAILED
                })
            }
        } catch (e) {
            console.log('getAllCategories error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_CATEGORIES_DETAIL_FAILED
            })
        }
    }
}

export const getAllCategoriesDetailByType = (categoryType) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesDetailByTypeService(categoryType)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_CATEGORIES_DETAIL_BY_TYPE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_CATEGORIES_DETAIL_BY_TYPE_FAILED
                })
            }
        } catch (e) {
            console.log('getAllCategories error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_CATEGORIES_DETAIL_BY_TYPE_FAILED
            })
        }
    }
}

export const getCategoriesByType = (type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getCategoriesByTypeService(type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_BY_TYPE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_BY_TYPE_FAILED
                })
            }
        } catch(e) {
            console.log('getCategoriesByType error: ' ,e)
            dispatch({
                type: actionTypes.GET_CATEGORIES_BY_TYPE_FAILED
            })
        }
    }
}
