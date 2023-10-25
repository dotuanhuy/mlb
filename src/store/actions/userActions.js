import actionTypes from "./actionTypes";
import { allCode } from "../../utils";

import { 
    handleCreateNewUer, 
    handleUpdateUser,
    getAllUsers,
    getAllProvinces,
    getAllCodeByType,
    handleDeleteUser,
    getUserAllcode,
    getLimitUserService,
    registerSevice
} from "../../services/userService";

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

export const fetchAllProvinces = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllProvinces(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PROVINCES_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PROVINCES_FAILED
                })
            }
        } catch(e) {
            console.log('fetchAllProvinces error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_PROVINCES_FAILED
            })
        }
    }   
}

export const fetchAllCodeByType = (type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCodeByType(type)
            if (res && res.errCode === 0) {
                if (type === allCode.GENDER) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_GENDER_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.ROLE) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_ROLE_SUCCESS,
                        data: res.data
                    })
                }
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_BY_TYPE_FAILED
                })
            }
        } catch(e) {
            console.log('fetchAllGenders error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_CODE_BY_TYPE_FAILED
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
            let res = await handleUpdateUser(data, accessToken ,page)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS
                })
                // dispatch(fetAllUsers(accessToken))
                dispatch(getLimitUsers(page, accessToken, page))
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

export const fetchUserAllcode = (id, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getUserAllcode(id, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_USER_ALLCODE_SUCCESS,
                    data: res.data
                })
            }
            else {  
                alert(res.errMessage)
                dispatch({
                    type: actionTypes.FETCH_USER_ALLCODE_FAILED
                })
            }
        } catch(e) {
            console.log('fetchUserAllcode error: ', e)
            dispatch({
                type: actionTypes.FETCH_USER_ALLCODE_FAILED
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