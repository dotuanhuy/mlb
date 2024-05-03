import actionTypes from "./actionTypes";
import { 
    getNotificationsService,
    createNotificationsService,
    updateIsReadService,
} from "../../services/notificationService";

export const refreshStoreNotification = () => {
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

export const getNotifications  = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getNotificationsService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_NOTIFICATIONS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_NOTIFICATIONS_FAILED
                })
            }
        } catch (e) {
            console.log('getAllDiscounts error: ', e)
            dispatch({
                type: actionTypes.GET_NOTIFICATIONS_FAILED
            })
        }
    }
}

export const createNotification  = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNotificationsService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NOTIFICATION_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.CREATE_NOTIFICATION_FAILED
                })
            }
        } catch (e) {
            console.log('createNotification error: ', e)
            dispatch({
                type: actionTypes.CREATE_NOTIFICATION_FAILED
            })
        }
    }
}

export const updateIsRead  = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateIsReadService(id)
            if (res && res.errCode === 0) {
                dispatch(getNotifications())
            }
            
        } catch (e) {
            console.log('updateIsRead error: ', e)
        }
    }
}

