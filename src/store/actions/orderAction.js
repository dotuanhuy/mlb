import actionTypes from "./actionTypes";
import { 
    getLimitOrderService,
    getOrderbyIdService,
    confirmOrderService,
    cancelOrderService,
    getListOrderIdService
} from "../../services/orderService";

export const refreshStoreOrder = () => {
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

export const getLimitOrder  = (page, option) => {
    return async (dispatch, getState) => {
        try {
            const res = await getLimitOrderService(+page - 1, option)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_ORDER_SUCCESS,
                    count: res.data.count,
                    orders: res.data.rows
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_ORDER_FAILED
                })
            }
        } catch (e) {
            console.log('getLimitOrder error: ', e)
            dispatch({
                type: actionTypes.GET_LIMIT_ORDER_FAILED
            })
        }
    }
}

export const getOrderById  = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await getOrderbyIdService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_ORDER_SUCCESS,
                    count: 1,
                    orders: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_ORDER_FAILED
                })
            }
        } catch (e) {
            console.log('getLimitOrder error: ', e)
            dispatch({
                type: actionTypes.GET_LIMIT_ORDER_FAILED
            })
        }
    }
}

export const confirmOrder = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await confirmOrderService(id)
            if (res && res.errCode === 0) {
                dispatch(getOrderById(id))
            }
            else {
                dispatch({
                    type: actionTypes.COMFIRM_ORDER_FAILED,
                    error: res.errMessage
                })
            }
        } catch (e) {
            console.log('confirmOrder error: ', e)
        }
    }
}

export const cancelOrder = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await cancelOrderService(id)
            if (res && res.errCode === 0) {
                dispatch(getOrderById(id))
            }
            else {
                dispatch({
                    type: actionTypes.ORDER_FAILED,
                    error: res.errMessage
                })
            }
        } catch (e) {
            console.log('cancelOrder error: ', e)
        }
    }
}

export const getLostOrderId  = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getListOrderIdService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIST_ORDER_ID_SUCCESS,
                    listId: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIST_ORDER_ID_FAILED
                })
            }
        } catch (e) {
            console.log('getLimitOrder error: ', e)
            dispatch({
                type: actionTypes.GET_LIST_ORDER_ID_FAILED
            })
        }
    }
}
