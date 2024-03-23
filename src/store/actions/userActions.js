import actionTypes from "./actionTypes";
import { allCode } from "../../utils";

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
    registerSevice,
    sendMailService,
    verifyOtpService
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

export const createNewUser = (data, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await createUserService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_USER_SUCCESS
                })
                dispatch(getLimitUsers(page))
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

export const getAllAddress = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllAddressService()
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

export const getAllRoles = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllRolesService()
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


export const deleteUser = (id, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteUserService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELTE_USER_SUCCESS
                })
                // dispatch(fetAllUsers())
                dispatch(getLimitUsers(page))
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

export const updateUser = (data, id, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await updateUserService(data, id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS
                })
                if (page) {
                    dispatch(getLimitUsers(page, page))
                }
                else {
                    dispatch(getUserById(data?.id))
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

export const getCountUsers = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getCountUsersService()
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


export const getUserById = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getUserByIdService(id)
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

export const getLimitUsers = (page, ) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +page - 1
            let res = await getLimitUserService(newPage)
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
                    type: actionTypes.REGISTER,
                    data: res
                })
            }
            else {
                dispatch(refreshStoreUser())
            }
        } catch (e) {
            console.log('register error: ',e)
            dispatch(refreshStoreUser())
        }
    }
}

export const sendMail = (email) => {
    return async (dispatch, getState) => {
    try {
        let res = await sendMailService(email)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.SEND_MAIL_SUCCESS,
                data: res.data
            })
        }
        else {
            dispatch({
                type: actionTypes.SEND_MAIL_FAILED,
                data: res
            })
        }
    } catch (e) {
        console.log('sendMail error: ',e)
        dispatch({
            type: actionTypes.SEND_MAIL_FAILED,
        })
    }
    }
}

export const verifyOtp = ({otp, email}) => {
    return async (dispatch, getState) => {
    try {
        let res = await verifyOtpService({otp, email})
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.VERIFY_OTP_SUCCESS,
                isVerify: true,
                data: res.data 
            })
        }
        else {
            dispatch({
                type: actionTypes.VERIFY_OTP_FAILED,
            })
            alert(res.errMessage)
        }
    } catch (e) {
        console.log('verifyOtp error: ',e)
        dispatch({
            type: actionTypes.VERIFY_OTP_FAILED,
        })
    }
    }
}
