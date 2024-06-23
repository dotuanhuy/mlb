import actionTypes from "./actionTypes";
import {
    getAllProductsFavouriteService,
    getAllProductsFavouriteLimitService,
    changeProductFavouriteService

} from "../../services/favouriteProductService";
import { DELETE } from "../../utils";

export const refreshIStateFavouriteProduct = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_STORE_SUCCESS
        })
    }
}

export const refreshIStatusFavouriteProduct = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_STATUS_FAVOURITE
        })
    }
}

export const getAllProductsFavourite = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllProductsFavouriteService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_FAILED
            })
        }
    }
}

export const getAllProductsFavouriteLimit = (offset) => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllProductsFavouriteLimitService(+offset - 1)
            if (res && res.errCode === 0) {
                const data = res.data.rows.map(item => {
                    return item.dataProductFavourite
                })
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_LIMIT_SUCCESS,
                    data,
                    count: res.data.count
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_LIMIT_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_LIMIT_FAILED
            })
        }
    }
}

export const changeProductFavourite = ({ productId }, offset = '') => {
    return async (dispatch, getState) => {
        try {
            const res = await changeProductFavouriteService({ productId })
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CHANGE_PRODUCT_FAVOURITE,
                    status: res.status
                })
                if (res.status === DELETE) {
                    if (offset !== '') {
                        dispatch(getAllProductsFavouriteLimit(offset))
                    }
                }
                dispatch(getAllProductsFavourite())
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CHANGE_PRODUCT_FAVOURITE,
            })
        }
    }
}
