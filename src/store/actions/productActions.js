import actionTypes from "./actionTypes";
import { 
    getAllProductsService, 
    getAllProductPublicService,
    getQuantityOfEachProductByCategoryService,
    createNewProductService,
    deleteProductService,
    getProductByIdService,
    updateProductService,
    getCountProductsService,
    changeImageProductByIdService,
    addDescriptionProductService,
    fetchDescriptionProductService,
    getProductByCategoryService,
    getProductByCategoryLimitService,
    getLimitProductService,
    getLimitProductByOptionSortService,
    searchProductByNameService,
    searchProductByNameServiceLimit,

} from "../../services/productService";
// import { getAllCodeByType } from "../../services/userService";
import { allCode } from "../../utils";

export const refreshIsloadingStateProduct = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.LOADING_PRODUCT_SUCCESS
            })
        } catch(e) {
            console.log('refreshIsloadingState error: ', e)
            dispatch({
                type: actionTypes.LOADING_PRODUCT_FAILED
            })
        }
    }
}

export const refreshStoreProduct = () => {
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

export const getAllProducts = (type, accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsService(type, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCTS_FAILED
                })
            }
        } catch(e) {
            console.log('getAllProducts error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_PRODUCTS_FAILED
            })
        }
    }
}

export const getAllProductPublic = (accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductPublicService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCTS_PUBLIC_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_ALL_PRODUCTS_PUBLIC_FAILED
                })
            }
        } catch (e) {
            console.log('getAllProductPublic error: ', e)
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_PUBLIC_FAILED
            })
        }
    }
}

//*
export const getQuantityOfEechProductByCategory = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getQuantityOfEachProductByCategoryService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_FAILED
                })
            }
        } catch(e) {
            console.log('getQuantityOfEechProductByCategory error: ' ,e)
            dispatch({
                type: actionTypes.GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_FAILED
            })
        }
    }
}

//*
export const createNewProduct = (product, type, accessToken, page) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewProductService(product, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_PRODUCT_SUCCESS
                })
                dispatch(getProductByCategoryLimit(type, page))
            }
            else if (res && res.errCode === 1) {
                alert('Sản phẩm đã tồn tại')
                dispatch({
                    type: actionTypes.CREATE_NEW_PRODUCT_FAILED
                })
            }
            else {
                dispatch({
                    type: actionTypes.CREATE_NEW_PRODUCT_FAILED
                })
            }
        } catch(e) {
            console.log('createNewProduct eror: ', e)
            dispatch({
                type: actionTypes.CREATE_NEW_PRODUCT_FAILED
            })
        }
    }
}

export const deleteProduct = (id, type, accessToken, page) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteProductService(id, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_SUCCESS
                })
                dispatch(getProductByCategoryLimit(type, page))
            }
            else {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_FAILED
                })
            }
        } catch(e) {
            console.log('deleteProduct error: ', e)
            dispatch({
                type: actionTypes.DELETE_PRODUCT_FAILED
            })
        }
    }
}

export const getProductById = (id, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getProductByIdService(id, accessToken) 
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_ID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_ID_FAILED
                })
            }
        } catch(e) {
            console.log('getProductById error: ', e) 
            dispatch({
                type: actionTypes.GET_PRODUCT_BY_ID_FAILED
            })
        }
    }
}

export const updateProduct = (data, type, accessToken, page) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateProductService(data, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.EDIT_PRODUCT_SUCCESS
                })
                // dispatch(getAllProducts(type, accessToken))
                dispatch(getProductByCategoryLimit(type, page))
            }
            else {
                dispatch({
                    type: actionTypes.EDIT_PRODUCT_SUCCESS
                })
            }
        } catch (e) {
            console.log('updateProduct error: ', e)
            dispatch({
                type: actionTypes.EDIT_PRODUCT_SUCCESS
            })
        } 
    }
}

export const getCountProducts = (accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await getCountProductsService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_COUNT_PRODUCTS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_COUNT_PRODUCTS_FAILED,
                })
            }
        } catch (e) {
            console.log('getCountProducts error: ', e)
            dispatch({
                type: actionTypes.GET_COUNT_PRODUCTS_FAILED,
            })
        }
    }
}

export const changeImageProductById = (data, accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await changeImageProductByIdService(data, accessToken)
            if (res && res.errCode === 0) {
                dispatch(getProductById(data.id, accessToken))
            }
        } catch (e) {
            console.log('deleteImageProduct error: ', e)
        }
    }
}

export const fetchDescriptionProduct = (productId, accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchDescriptionProductService(productId, accessToken) 
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DESCRIPTION_PRODUCT_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_DESCRIPTION_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('fetchDescriptionProduct error: ', e)
            dispatch({
                type: actionTypes.FETCH_DESCRIPTION_PRODUCT_FAILED
            })
        }
    }
}

export const addDescriptionProduct = (data, accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await addDescriptionProductService(data, accessToken) 
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_DESCRIPTION_PRODUCT_SUCCESS
                })
                dispatch(fetchDescriptionProduct(data.productId, accessToken))
            }
            else {
                dispatch({
                    type: actionTypes.ADD_DESCRIPTION_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('addDescriptionProduct error: ', e)
            dispatch({
                type: actionTypes.ADD_DESCRIPTION_PRODUCT_FAILED
            })
        }
    }
}

export const getProductByCategory = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getProductByCategoryService(type) 
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_CATEGORY_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_CATEGORY_FAILED
                })
            }
        } catch (e) {
            console.log('getProductByCategory error: ', e)
            dispatch({
                type: actionTypes.GET_PRODUCT_BY_CATEGORY_FAILED
            })
        }
    }
}

export const getProductByCategoryLimit = (type, offset) => {
    return async (dispatch, getState) => {
        try {
            let res = await getProductByCategoryLimitService(type, +offset - 1) 
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_CATEGORY_LIMIT_SUCCESS,
                    data: res.data.rows,
                    count: res.data.count
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_CATEGORY_LIMIT_FAILED
                })
            }
        } catch (e) {
            console.log('getProductByCategory error: ', e)
            dispatch({
                type: actionTypes.GET_PRODUCT_BY_CATEGORY_LIMIT_FAILED
            })
        }
    }
}

export const getLimitProducts = (categore, page, accessToken) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +page - 1 
            let res = await getLimitProductService(categore, newPage, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCTS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCTS_FAILED
                })
            }
        } catch (e) {
            console.log('getLimitProducts error: ', e) 
            dispatch({
                type: actionTypes.GET_LIMIT_PRODUCTS_FAILED
            })
        }
    }
}

export const getLimitProductByOption = (optionData, page, option, accessToken) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +page - 1 
            let res = await getLimitProductByOptionSortService(optionData, newPage, option, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCTS_BY_OPTION_SORT_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_LIMIT_PRODUCTS_BY_OPTION_SORT_FAILED
                })
            }
        } catch (e) {
            console.log('getLimitProductByOption error: ', e) 
            dispatch({
                type: actionTypes.GET_LIMIT_PRODUCTS_BY_OPTION_SORT_FAILED
            })
        }
    }
}

export const searchProductByName = (productName, offset) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +offset - 1 
            let res = await searchProductByNameService(productName, newPage)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SEARCH_PRODUCT_BY_NAME_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.SEARCH_PRODUCT_BY_NAME_FAILED
                })
            }
        } catch (e) {
            console.log('searchProductByName error: ', e)
            dispatch({
                type: actionTypes.SEARCH_PRODUCT_BY_NAME_FAILED
            })
        }
    }
}

export const refreshProductSearch = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: 'REFRESH PRODUCT SEARCH'
            })
        } catch (e) {
            console.log('refreshProductSearch error: ', e)
            dispatch({
                type: 'REFRESH PRODUCT SEARCH'
            })
        }
    }
}

export const searchProductByNameLimit = (productName, offset, accessToken) => {
    return async (dispatch, getState) => {
        try {
            let newOffset = +offset - 1
            let res = await searchProductByNameServiceLimit(productName, newOffset, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SEARCH_PRODUCT_BY_NAME_LIMIT_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED
                })
            }
        } catch(e) {
            console.log('searchProductByNameLimit error: ', e)
            dispatch({
                type: actionTypes.SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED
            })
        } 
    }
}
