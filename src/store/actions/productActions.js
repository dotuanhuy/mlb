import actionTypes from "./actionTypes";
import { 
    getAllProductsService, 
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
    fetchDescriptionProductService

} from "../../services/productService";
import { getAllCodeByType } from "../../services/userService";
import { allCode } from "../../utils";

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
        } catch(e) {
            console.log('getAllProducts error: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_PRODUCTS_FAILED
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

export const getAllCategories = () => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllCategoriesService()
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

export const createNewProduct = (product, type) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewProductService(product)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_PRODUCT_SUCCESS
                })
                dispatch(getAllProducts(type))
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

export const deleteProduct = (id, type) => {
    return async (dispatch, getSate) => {
        try {
            let res = await deleteProductService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_SUCCESS
                })
                dispatch(getAllProducts(type))
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

export const getProductById = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getProductByIdService(id) 
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

export const updateProduct = (data, type) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateProductService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.EDIT_PRODUCT_SUCCESS
                })
                dispatch(getAllProducts(type))
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

export const fetchAllImageProduct = (id) => {
    return async (dispatch, getSate) => {
        try {
            let res = await getAllImageProductService(id)
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

export const addImageProduct = (data) => {
    return async (dispatch, getSate) => {
        try {
            let res = await addImageProductService(data)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.ADD_IMAGE_PRODUCT_SUCCESS
                })
                dispatch(fetchAllImageProduct(data.productId))
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

export const deleteImageProduct = (id, type) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteImageProductService(id)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.DELETE_IMAGE_PRODUCT_SUCCESS
                })
                dispatch(fetchAllImageProduct(type))
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
            console.log('fetchDescriptionProduct error: ', e)
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
            console.log('addDescriptionProduct error: ', e)
            dispatch({
                type: actionTypes.ADD_DESCRIPTION_PRODUCT_FAILED
            })
        }
    }
}