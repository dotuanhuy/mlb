import actionTypes from "./actionTypes";
import { 
    getAllCategoriesService,
    getAllCategoriesDetailService,
    getCategoriesByIdService,
    getAllCategoriesDetailByTypeService
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

export const getAllCategories = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesService(accessToken)
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

export const getAllCategoriesDetail = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesDetailService(accessToken)
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

export const getAllCategoriesDetailByType = (accessToken, categoryType) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesDetailByTypeService(accessToken, categoryType)
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

// export const getCategoriesById = (id) => {
//     return async (dispatch, getSate) => {
//         try {
//             let res = await getCategoriesByIdService(id)
//             if (res && res.errCode === 0) {
//                 dispatch({
//                     type: actionTypes.GET_CATEGORIES_BY_ID_SUCCESS,
//                     data: res.data
//                 })
//             }
//             else {
//                 dispatch({
//                     type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
//                 })
//             }
//         } catch(e) {
//             console.log('getCategoriesById error: ' ,e)
//             dispatch({
//                 type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
//             })
//         }
//     }
// }
