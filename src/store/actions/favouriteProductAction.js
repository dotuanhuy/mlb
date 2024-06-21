import actionTypes from "./actionTypes";
import {
    getAllProductsFavouriteService,
    getAllProductsFavouriteLimitService,
    changeProductFavouriteService

} from "../../services/favouriteProductService";

export const refreshIStateFavouriteProduct = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STORE_SUCCESS
            })
        } catch (e) {
            console.log('refreshIStateFavouriteProduct error: ', e)
        }
    }
}

export const getAllProductsFavourite = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsFavouriteService(userId)
            // let data = []
            // res?.data?.map(item => {
            //     data?.push(item.productFavourites)
            // })
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
            console.log('getAllProductsFavourite error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_FAILED
            })
        }
    }
}

export const getAllProductsFavouriteLimit = (userId, offset) => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllProductsFavouriteLimitService(userId, +offset - 1)
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
            console.log('getAllProductsFavourite error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_FAVOURITE_LIMIT_FAILED
            })
        }
    }
}

export const changeProductFavourite = (data, offset = null) => {
    return async (dispatch, getState) => {
        try {
            let res = await changeProductFavouriteService(data)
            if (res && res.errCode === 0) {
                // Nếu là xóa
                if (res.status === 1 && offset) {
                    dispatch(getAllProductsFavouriteLimit(data.userId, offset))
                    dispatch(getAllProductsFavourite(data.userId))
                }
                else {
                    dispatch(getAllProductsFavourite(data.userId))
                }
            }
        } catch (e) {
            console.log('changeProductFavourite error: ', e)
        }
    }
}
