import actionTypes from "./actionTypes";
import { 
    getAllOrdersByUserService,
    getLimitOrderService,
    getOrderbyIdService,
    confirmOrderService,
    cancelOrderService,
    getListOrderIdService,
    createOrderService,
    getTotalOrderService
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

export const getAllOrdersByUser  = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllOrdersByUserService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_ORDERS_BY_USER_SUCCESS,
                    data: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_ORDERS_BY_USER_FAILED
                })
            }
        } catch (e) {
            console.log('getAllOrdersByUser error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_ORDERS_BY_USER_FAILED
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
            console.log('getOrderById error: ', e)
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

export const getListOrderId  = () => {
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
            console.log('getListOrderId error: ', e)
            dispatch({
                type: actionTypes.GET_LIST_ORDER_ID_FAILED
            })
        }
    }
}

export const createOrder = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createOrderService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_ORDER_SUCCESS,
                    orderId: res.data.orderId
                })
            }
        } catch (e) {
            console.log('createOrder error: ', e)
            dispatch({
                type: actionTypes.CREATE_ORDER_FAILED,
                errMessage: e?.response?.data?.errMessage
            })
        }
    }
}

export const getTotalOrder = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getTotalOrderService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_TOTAL_ORDER_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_TOTAL_ORDER_FAILED
                })
            }
        } catch (e) {
            console.log('getTotalOrder error: ', e)
            dispatch({
                type: actionTypes.GET_TOTAL_ORDER_FAILED
            })
        }
    }
}
