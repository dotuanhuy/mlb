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

export const getAllProductsFavourite = (accessToken, userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsFavouriteService(accessToken, userId)
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

export const getAllProductsFavouriteLimit = (accessToken, userId, offset) => {
    return async (dispatch, getState) => {
        try {
            let newOffset = +offset - 1
            let res = await getAllProductsFavouriteLimitService(accessToken, userId, newOffset)
            if (res && res.errCode === 0) {
                let data = res.data.rows.map(item => {
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

export const changeProductFavourite = (accessToken, data, offset=null) => {
    return async (dispatch, getState) => {
        try {
            let res = await changeProductFavouriteService(accessToken, data)
            if (res && res.errCode === 0) {
                // Nếu là xóa
                if (res.status === 1 && offset) {
                    dispatch(getAllProductsFavouriteLimit(accessToken, data.userId, offset))
                    dispatch(getAllProductsFavourite(accessToken, data.userId))
                }
                else {
                    dispatch(getAllProductsFavourite(accessToken, data.userId))
                }
            }
        } catch (e) {
            console.log('changeProductFavourite error: ', e)
        }
    }
}
