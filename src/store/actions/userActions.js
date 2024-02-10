import actionTypes from "./actionTypes";
import { allCode } from "../../utils";

import { 
    handleCreateNewUer, 
    handleUpdateUser,
    getCountUsersService,
    getAllUsers,
    getAllAddressService,
    getAllRolesService,
    handleDeleteUser,
    getUserByIdService,
    getLimitUserService,
    registerSevice
} from "../../services/userService";

export const refreshStoreUser = () => {
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

export const createNewUser = (data, accessToken, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleCreateNewUer(data, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_USER_SUCCESS
                })
                // dispatch(fetAllUsers(accessToken))
                dispatch(getLimitUsers(page, accessToken))
            }
            else {
                alert(res.errMessage)
                dispatch({
                    type: actionTypes.CREATE_NEW_USER_FAILED
                })
            }
        } catch(e) {
            console.log('createNewUser error: ', e)
            dispatch({
                type: actionTypes.CREATE_NEW_USER_FAILED
            })
        }
    }
}

export const fetAllUsers = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllUsers(accessToken)  
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_USERS_FAILED
                })
            }
        } catch(e) {
            console.log('fetAllUsers error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_USERS_FAILED
            })
        }
    }
}

export const getAllAddress = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllAddressService(accessToken)
            let data = res.data.map(item => item.name)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_ADDRESS_SUCCESS,
                    data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_ADDRESS_FAILED
                })
            }
        } catch(e) {
            console.log('getAllAddress error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_ADDRESS_FAILED
            })
        }
    }   
}

export const getAllRoles = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllRolesService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_ROLES_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_ROLES_FAILED
                })
            }
        } catch(e) {
            console.log('getAllRoles error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_ROLES_FAILED
            })
        }
    }
}


export const deleteUser = (id, accessToken, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleDeleteUser(id, accessToken, page)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELTE_USER_SUCCESS
                })
                // dispatch(fetAllUsers(accessToken))
                dispatch(getLimitUsers(page, accessToken))
            }
            else {
                dispatch({
                    type: actionTypes.DELTE_USER_FAILED
                })
            }
        } catch(e) {
            console.log('deleteUser error: ', e)
            dispatch({
                type: actionTypes.DELTE_USER_FAILED
            })
        }
    }
}

export const updateUser = (data, accessToken, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleUpdateUser(data, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS
                })
                // dispatch(fetAllUsers(accessToken))
                if (page) {
                    dispatch(getLimitUsers(page, accessToken, page))
                }
                else {
                    dispatch(getUserById(data?.id, accessToken))
                }
            }
            else {
                alert(res.errMessage)
                dispatch({
                    type: actionTypes.EDIT_USER_FAILED
                })
            }
        } catch(e) {
            console.log('deleteUser error: ', e)
            dispatch({
                type: actionTypes.EDIT_USER_FAILED
            })
        }
    }
}

export const getCountUsers = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getCountUsersService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_COUNT_USERS_SUCCESS,
                    data: res.data
                })
            }
            else {  
                dispatch({
                    type: actionTypes.GET_COUNT_USERS_FAILED
                })
            }
        } catch(e) {
            console.log('getUserById error: ', e)
            dispatch({
                type: actionTypes.GET_COUNT_USERS_FAILED
            })
        }
    }
}


export const getUserById = (id, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getUserByIdService(id, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_USER_BY_ID_SUCCESS,
                    data: res.data
                })
            }
            else {  
                alert(res.errMessage)
                dispatch({
                    type: actionTypes.GET_USER_BY_ID_FAILED
                })
            }
        } catch(e) {
            console.log('getUserById error: ', e)
            dispatch({
                type: actionTypes.GET_USER_BY_ID_FAILED
            })
        }
    }
}


export const refreshIsloadingState = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.LOADING_SUCCESS
            })
        } catch(e) {
            console.log('refreshIsloadingState error: ', e)
            dispatch({
                type: actionTypes.LOADING_FAILED
            })
        }
    }
}

export const getLimitUsers = (page, accessToken) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +page - 1
            let res = await getLimitUserService(newPage, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_USERS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_USERS_FAILED
                })
            }
        } catch (e) {
            console.log('getLimitUsers error: ', e)
            dispatch({
                type: actionTypes.GET_LIMIT_USERS_FAILED
            })
        }
    }
}

export const register = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await registerSevice(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.REGISTER_SUCCESS,
                })
            }
            else {
                dispatch({
                    type: actionTypes.REGISTER_FAILED
                })
            }
        } catch (e) {
            console.log('register error: ',e)
            dispatch({
                type: actionTypes.REGISTER_FAILED
            })
        }
    }
}