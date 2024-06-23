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
    getProductByCategoryDetailLimitService,
    getLimitProductByOptionSortService,
    searchProductByNameService,
    searchProductByNameServiceLimit,
    findNameProductByCategoryService

} from "../../services/productService";

export const refreshIsloadingStateProduct = () => {
    return async (dispatch, getSate) => {
        try {
            dispatch({
                type: actionTypes.LOADING_PRODUCT_SUCCESS
            })
        } catch (e) {
            dispatch({
                type: actionTypes.LOADING_PRODUCT_FAILED
            })
        }
    }
}

export const refreshInfoReponseProduct = () => {
    return async (dispatch, getSate) => {
        dispatch({
            type: actionTypes.REFRESH_INFO_RESPONSE_PRODUCT
        })

    }
}

export const refreshStoreProduct = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.REFRESH_STORE_SUCCESS
            })
        } catch (e) {
            dispatch({
                type: actionTypes.REFRESH_STORE_FAILED
            })
        }
    }
}

export const getAllProducts = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsService(type)
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
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_PRODUCTS_FAILED
            })
        }
    }
}

export const getAllProductPublic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductPublicService()
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
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_PUBLIC_FAILED
            })
        }
    }
}

export const getQuantityOfEechProductByCategory = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getQuantityOfEachProductByCategoryService()
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
        } catch (e) {
            dispatch({
                type: actionTypes.GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_FAILED
            })
        }
    }
}

export const createNewProduct = (formData, type, found, categoryType, page) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewProductService(formData, type, found)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage
                })
                dispatch(getProductByCategoryLimit(categoryType, page))
            }
            else {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CUD_PRODUCT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const deleteProduct = (id, categoryType, page, type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteProductService(id, type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage
                })
                dispatch(getProductByCategoryLimit(categoryType, page))
            }
            else {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CUD_PRODUCT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const getProductById = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getProductByIdService(id)
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
        } catch (e) {
            dispatch({
                type: actionTypes.GET_PRODUCT_BY_ID_FAILED
            })
        }
    }
}

export const updateProduct = (id, fromData, categoryType, page, type, found) => {
    return async (dispatch, getState) => {
        try {
            const res = await updateProductService(id, fromData, type, found)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage,
                })
                dispatch(getProductByCategoryLimit(categoryType, page))
            }
            else {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CUD_PRODUCT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const getCountProducts = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getCountProductsService()
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
            dispatch({
                type: actionTypes.GET_COUNT_PRODUCTS_FAILED,
            })
        }
    }
}

export const changeImageProductById = (id, formData, type, found) => {
    return async (dispatch, getState) => {
        try {
            const res = await changeImageProductByIdService(id, formData, type, found)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage,
                })
                dispatch(getProductById(id))
            }
            else {
                dispatch({
                    type: actionTypes.CUD_PRODUCT,
                    message: res.errMessage,
                    errCode: res.errCode
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.CUD_PRODUCT,
                message: e?.response?.data?.errMessage,
                errCode: e?.response?.data?.errCode
            })
        }
    }
}

export const fetchDescriptionProduct = (productId) => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchDescriptionProductService(productId)
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
            dispatch({
                type: actionTypes.FETCH_DESCRIPTION_PRODUCT_FAILED
            })
        }
    }
}

export const addDescriptionProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await addDescriptionProductService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_DESCRIPTION_PRODUCT_SUCCESS
                })
                dispatch(fetchDescriptionProduct(data.productId))
            }
            else {
                dispatch({
                    type: actionTypes.ADD_DESCRIPTION_PRODUCT_FAILED
                })
            }
        } catch (e) {
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
            dispatch({
                type: actionTypes.GET_PRODUCT_BY_CATEGORY_LIMIT_FAILED
            })
        }
    }
}

export const getProductByCategoryDetailLimit = (id, limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getProductByCategoryDetailLimitService(id, limit)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_CATEGORY_DETAIL_SUCCESS,
                    productSlider: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRODUCT_BY_CATEGORY_DETAIL_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.GET_PRODUCT_BY_CATEGORY_DETAIL_FAILED
            })
        }
    }
}

export const getLimitProductByOption = (optionData, page, option, limit) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +page - 1
            let res = await getLimitProductByOptionSortService(optionData, newPage, option, limit)
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
            dispatch({
                type: 'REFRESH PRODUCT SEARCH'
            })
        }
    }
}

export const searchProductByNameLimit = (productName, offset) => {
    return async (dispatch, getState) => {
        try {
            let newOffset = +offset - 1
            let res = await searchProductByNameServiceLimit(productName, newOffset)
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
        } catch (e) {
            dispatch({
                type: actionTypes.SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED
            })
        }
    }
}

export const findNameProductByCategory = (productName, type, offset) => {
    return async (dispatch, getState) => {
        try {
            let res = await findNameProductByCategoryService(productName, type, +offset - 1)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FIND_PRODUCT_BY_NAME_SUCCESS,
                    data: res?.data?.rows,
                    count: res?.data?.count
                })
            }
            else {
                dispatch({
                    type: actionTypes.FIND_PRODUCT_BY_NAME_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FIND_PRODUCT_BY_NAME_FAILED
            })
        }
    }
}
