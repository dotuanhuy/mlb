import actionTypes from "./actionTypes";
import { 
    getProductsInCartByUserService,
    addProductToCartService,
    deleteProductInCartService,
    deleteAProductInCartService

} from "../../services/cartService";

export const getProductsInCartByUser = (accessToken, userId) => {
    return async (dispatch, getState) => {
        try {
            let res
            if (userId) {
                res = await getProductsInCartByUserService(accessToken, userId)
                if (res && res.errCode === 0) {
                    let totalMoney = 0, count = 0
                    let data = []
                    res?.data?.map(item => {
                        data.push(item)
                        totalMoney += +item.Product.price*+item.quantity
                        count += +item.quantity
                    })
                    dispatch({
                        type: actionTypes.GET_ALL_PRODUCTs_IN_CART_BY_USER_SUCCESS,
                        data,
                        totalMoney,
                        count
                    })
                }
                else {
                    dispatch({
                        type: actionTypes.GET_ALL_PRODUCTs_IN_CART_BY_USER_FAILED
                    })
                }
            }
            else {
                alert('Bạn cần đăng nhập để thêm giỏ hàng')
            }
        } catch (e) {
            console.log('getProductsInCartByUser error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTs_IN_CART_BY_USER_FAILED
            })
        }
    }
}

export const addProductToCart = (accessToken, data) => {
    return async (dispatch, getState) => {
        try {
            let res
            if (data) {
                res = await addProductToCartService(accessToken, data)
                if (res && res.errCode === 0) {
                    dispatch(getProductsInCartByUser(accessToken, data?.userId))
                }
                else {
                    alert('Thêm sản phẩm vào giỏ hàng thất bại')
                }
            }
            else {
                alert('Lỗi dữ liệu không tồn tại khi thêm vào giỏ hàng')
            }
        } catch (e) {
            console.log('addProductToCart error: ', e)
        }
    }
}

export const deleteAProductInCart = (accessToken, data) => {
    return async (dispatch, getState) => {
        try {
            let res
            if (data) {
                res = await deleteAProductInCartService(accessToken, data)
                if (res && res.errCode === 0) {
                    dispatch(getProductsInCartByUser(accessToken, data?.userId))
                }
                else {
                    alert('Xóa sản phẩm trong giỏ hàng thất bại')
                }
            }
            else {
                alert('Lỗi dữ liệu không tồn tại khi xóa sản phẩm trong giỏ hàng')
            }
        } catch (e) {
            console.log('deleteProductInCart error: ', e)
        }
    }
}


export const deleteProductInCart = (accessToken, data) => {
    return async (dispatch, getState) => {
        try {
            let res
            if (data) {
                res = await deleteProductInCartService(accessToken, data)
                if (res && res.errCode === 0) {
                    dispatch(getProductsInCartByUser(accessToken, data?.userId))
                }
                else {
                    alert('Xóa sản phẩm trong giỏ hàng thất bại')
                }
            }
            else {
                alert('Lỗi dữ liệu không tồn tại khi xóa sản phẩm trong giỏ hàng')
            }
        } catch (e) {
            console.log('deleteProductInCart error: ', e)
        }
    }
}