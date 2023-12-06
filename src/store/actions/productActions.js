import actionTypes from "./actionTypes";
import { 
    getAllProductsService, 
    getAllProductPublicService,
    getAllCategoriesService,
    getCategoriesByIdService,
    createNewProductService,
    deleteProductService,
    getProductByIdService,
    updateProductService,
    getAllImageProductService,
    addImageProductService,
    deleteImageProductService,
    addDescriptionProductService,
    fetchDescriptionProductService,
    getProductByCategoryService,
    getLimitProductService,
    getLimitProductByOptionSortService,
    searchProductByNameService,
    searchProductByNameServiceLimit

} from "../../services/productService";
import { getAllCodeByType } from "../../services/userService";
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
                    type: actionTypes.FETCH_ALL_PRODUCTS_PUBLIC_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PRODUCTS_PUBLIC_FAILED
                })
            }
        } catch (e) {
            console.log('getAllProductPublic error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_PRODUCTS_PUBLIC_FAILED
            })
        }
    }
}

export const fetchAllCodeByTypeProduct = (type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCodeByType(type)
            if (res && res.errCode === 0) {
                if (type === allCode.LOGO) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_LOGO_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.DISCOUNT) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_DISCOUNT_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.BRAND) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_BRAND_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.SIZEGIAY) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_SIZEGIAY_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.GENDER) {
                    dispatch({
                        type: actionTypes.FETCH_GENDER_PRODUCT_SUCCESS,
                        data: res.data
                    })
                }
                else if (type === allCode.SIZEAO) {
                    dispatch({
                        type: actionTypes.FETCH_ALL_SIZEAO_SUCCESS,
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

export const fetchAllColors = (type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCodeByType(type)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_COLOR_SUCCSESS,
                    data: res.data
                })
            }
        } catch (e) {
            console.log('fetchAllColors error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_COLOR_FAILED
            })
        }
    }
}

export const getCategoriesById = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getCategoriesByIdService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_BY_ID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
                })
            }
        } catch(e) {
            console.log('getCategoriesById error: ' ,e)
            dispatch({
                type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
            })
        }
    }
}

export const getAllCategories = (accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesService(accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CATEGORIES_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CATEGORIES_FAILED
                })
            }
        } catch (e) {
            console.log('getAllCategories error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_CATEGORIES_FAILED
            })
        }
    }
}

export const createNewProduct = (product, type, accessToken, page) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewProductService(product, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_PRODUCT_SUCCESS
                })
                // dispatch(getAllProducts(type, accessToken))
                dispatch(getLimitProducts(type, page, accessToken))
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
                // dispatch(getAllProducts(type, accessToken))
                dispatch(getLimitProducts(type, page, accessToken))
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
                    type: actionTypes.FETCH_PRODUCT_BY_ID_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
                })
            }
        } catch(e) {
            console.log('getProductById error: ', e) 
            dispatch({
                type: actionTypes.GET_CATEGORIES_BY_ID_FAILED
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
                dispatch(getLimitProducts(type, page, accessToken))
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

export const fetchAllImageProduct = (id, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllImageProductService(id, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_IMAGE_PRODUCT_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_IMAGE_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('fetchAllImageProduct error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_IMAGE_PRODUCT_FAILED
            })
        }
    }
}

export const addImageProduct = (data, accessToken) => {
    return async (dispatch, getSate) => {
        try {
            let res = await addImageProductService(data, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT_SUCCESS
                })
                dispatch(fetchAllImageProduct(data.productId, accessToken))
            }
            else {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('addImageProduct error: ', e)
            dispatch({
                type: actionTypes.ADD_IMAGE_PRODUCT_FAILED
            })
        }
    }
}

export const deleteImageProduct = (id, type, accessToken) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteImageProductService(id, accessToken)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELETE_IMAGE_PRODUCT_SUCCESS
                })
                dispatch(fetchAllImageProduct(type, accessToken))
            }
            else {
                dispatch({
                    type: actionTypes.DELETE_IMAGE_PRODUCT_FAILED
                })
            }
        } catch (e) {
            console.log('deleteImageProduct error: ', e)
            dispatch({
                type: actionTypes.DELETE_IMAGE_PRODUCT_FAILED
            })
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

export const getProductByCategory = (category) => {
    return async (dispatch, getState) => {
        try {
            let res = await getProductByCategoryService(category) 
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

export const getLimitProductByOption = (optionData, page, option, accessToken, optionTypeName) => {
    return async (dispatch, getState) => {
        try {
            const newPage = +page - 1 
            let res = await getLimitProductByOptionSortService(optionData, newPage, option, accessToken, optionTypeName)
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
        } catch(e) {
            console.log('searchProductByNameLimit error: ', e)
            dispatch({
                type: actionTypes.SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED
            })
        } 
    }
}