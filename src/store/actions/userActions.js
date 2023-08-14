import actionTypes from "./actionTypes";
import { 
    handleLoginAPI, 
    handleCreateNewUer, 
    handleUpdateUser,
    getAllUsers,
    getAllProvinces,
    getAllCodeByType,
    handleDeleteUser,
    getUserAllcode
} from "../../services/userService";

export const fetLogin = (email, password) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleLoginAPI(email, password)
            if (res.data && res.data === 0) {
                
            }
        } catch (e) {
            console.log('fetLogin error: ', e)
            dispatch({
                type: actionTypes.LOGIN_FAILED
            })
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleCreateNewUer(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_USER_SUCCESS
                })
                dispatch(fetAllUsers())
            }
            else {
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

export const fetAllUsers = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllUsers()
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

export const fetchAllProvinces = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllProvinces()
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
                if (type === 'GENDER') {
                    dispatch({
                        type: actionTypes.FETCH_ALL_GENDER_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === 'ROLE') {
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

export const deleteUser = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await handleDeleteUser(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELTE_USER_SUCCESS
                })
                dispatch(fetAllUsers())
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

export const updateUser = (data) => {
    return async (dispatch, getSate) => {
        try {
            console.log('check data: ', data)
            let res = await handleUpdateUser(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS
                })
                dispatch(fetAllUsers())
            }
            else {
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

export const fetchUserAllcode = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getUserAllcode(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_USER_ALLCODE_SUCCESS,
                    data: res.data
                })
            }
            else {
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