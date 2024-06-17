import actionTypes from "./actionTypes";

import {
    createUserService,
    updateUserService,
    getCountUsersService,
    getAllUsers,
    getAllAddressService,
    getAllRolesService,
    deleteUserService,
    getUserByIdService,
    getLimitUserService,
    updateInfoUserService,
    searchUserService
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

export const refreshInfoResponse = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_INFO_RESPONSE
        })

    }
}

export const refreshIsloadingState = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.LOADING_SUCCESS
            })
        } catch (e) {
            console.log('refreshIsloadingState error: ', e)
            dispatch({
                type: actionTypes.LOADING_FAILED
            })
        }
    }
}

export const createNewUser = (newUser, page) => {
    return async (dispatch, getSate) => {
        try {
            const res = await createUserService(newUser)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CUD_USER,
                    message: res.errMessage
                })
                dispatch(getLimitUsers(page))
            }
            else {
                dispatch({
                    type: actionTypes.CUD_USER,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            console.log('createNewUser error: ', e)
            dispatch({
                type: actionTypes.CUD_USER,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const fetAllUsers = () => {
    return async (dispatch, getSate) => {
        try {
            const res = await getAllUsers()
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
        } catch (e) {
            console.log('fetAllUsers error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_USERS_FAILED
            })
        }
    }
}

export const getAllAddress = () => {
    return async (dispatch, getSate) => {
        try {
            const res = await getAllAddressService()
            if (res && res.errCode === 0) {
                let data = res.data.map(item => item.name)
                dispatch({
                    type: actionTypes.GET_ALL_ADDRESS_SUCCESS,
                    data,
                    address: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_ADDRESS_FAILED
                })
            }
        } catch (e) {
            console.log('getAllAddress error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_ADDRESS_FAILED
            })
        }
    }
}

export const getAllRoles = () => {
    return async (dispatch, getSate) => {
        try {
            const res = await getAllRolesService()
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
        } catch (e) {
            console.log('getAllRoles error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_ROLES_FAILED
            })
        }
    }
}


export const deleteUser = (id, page) => {
    return async (dispatch, getSate) => {
        try {
            const res = await deleteUserService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CUD_USER,
                    message: res.errMessage,
                })
                dispatch(getLimitUsers(page))
            }
            else {
                dispatch({
                    type: actionTypes.CUD_USER,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            console.log('deleteUser error: ', e)
            dispatch({
                type: actionTypes.CUD_USER,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const updateUser = (newUser, id, page) => {
    return async (dispatch, getSate) => {
        try {
            const res = await updateUserService(newUser, id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CUD_USER,
                    message: res.errMessage,
                })
                dispatch(getLimitUsers(page, page))
            }
            else {
                dispatch({
                    type: actionTypes.CUD_USER,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            console.log('updateUser error: ', e)
            dispatch({
                type: actionTypes.CUD_USER,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const getCountUsers = () => {
    return async (dispatch, getSate) => {
        try {
            const res = await getCountUsersService()
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
        } catch (e) {
            console.log('getUserById error: ', e)
            dispatch({
                type: actionTypes.GET_COUNT_USERS_FAILED
            })
        }
    }
}

export const getUserById = (id) => {
    return async (dispatch, getSate) => {
        try {
            const res = await getUserByIdService(id)
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
        } catch (e) {
            console.log('getUserById error: ', e)
            dispatch({
                type: actionTypes.GET_USER_BY_ID_FAILED
            })
        }
    }
}

export const getLimitUsers = (page,) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +page - 1
            const res = await getLimitUserService(newPage)
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

export const refreshStateMessage = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STATE_INFO_RESPONE
            })
        } catch (e) {
            console.log('refreshStateMessage error: ', e)
        }
    }
}

export const updateInfoUser = (infoUser) => {
    return async (dispatch, getState) => {
        try {
            const res = await updateInfoUserService(infoUser)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.UPDATE_NAME_USER_SUCCESS,
                    message: res?.errMessage,
                    errCode: res?.errCode
                })
            }
            else {
                dispatch({
                    type: actionTypes.UPDATE_NAME_USER_FAILED,
                    message: res?.errMessage,
                    errCode: res?.errCode
                })
            }
        } catch (e) {
            console.log('updateInfoUser error: ', e)
            dispatch({
                type: actionTypes.UPDATE_NAME_USER_FAILED,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode,
            })
        }
    }
}

export const searchUser = (userName, page) => {
    return async (dispatch, getState) => {
        try {
            const res = await searchUserService(userName, +page - 1)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FIND_USER_BY_NAME_SUCCESS,
                    users: res.data?.rows,
                    count: res.data?.count
                })
            }
            else {
                dispatch({
                    type: actionTypes.FIND_USER_BY_NAME_FAILED,
                    message: res?.errMessage,
                })
            }
        } catch (e) {
            console.log('searchUser error: ', e)
            dispatch({
                type: actionTypes.FIND_USER_BY_NAME_FAILED,
                message: e?.response?.data?.errMessage,
            })
        }
    }
}
