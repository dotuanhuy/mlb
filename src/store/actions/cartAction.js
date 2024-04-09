import actionTypes from "./actionTypes";
import { 
    getProductsInCartByUserService,
    addProductToCartService,
    deleteProductInCartService,
    changeCartService

} from "../../services/cartService";

export const refreshStateCart = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REFRESH_STORE_SUCCESS
        })
    }
}

export const getProductsInCartByUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getProductsInCartByUserService()
            if (res && res?.errCode === 0) {
                let totalMoney = 0, count = 0
                let data = []
                res?.data?.map(item => {
                    data.push(item)
                    totalMoney += (+item.dataCartProduct.price - +item.dataCartProduct.price*item.dataCartProduct.dataDiscounts.value)*+item.dataCartProduct.CartDetail.quantity
                    count += +item.dataCartProduct.CartDetail.quantity
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
        } catch (e) {
            console.log('getProductsInCartByUser error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTs_IN_CART_BY_USER_FAILED
            })
        }
    }
}

export const addProductToCart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res
            if (data) {
                res = await addProductToCartService(data)
                if (res && res.errCode === 0) {
                    dispatch(getProductsInCartByUser())
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

export const changeCart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res
            if (data) {
                res = await changeCartService(data)
                if (res && res.errCode === 0) {
                    dispatch(getProductsInCartByUser())
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


export const deleteProductInCart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res
            if (data) {
                res = await deleteProductInCartService(data)
                if (res && res.errCode === 0) {
                    dispatch(getProductsInCartByUser())
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