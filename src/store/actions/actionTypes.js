const actionTypes = Object.freeze({
    REFRESH_STORE_SUCCESS: 'REFRESH_STORE_SUCCESS',
    REFRESH_STORE_FAILED: 'REFRESH_STORE_FAILED',

    // login/logout
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILED: 'LOGOUT_SUCCESS',
    CHECK_PERMISSION_SUCCESS: 'CHECK_PERMISSION_SUCCESS',
    CHECK_PERMISSION_FAILED: 'CHECK_PERMISSION_FAILED',
    LOADING_SUCCESS: 'LOADING_SUCCESS',
    LOADING_FAILED: 'LOADING_FAILED',
    LOADING_PRODUCT_SUCCESS: 'LOADING_PRODUCT_SUCCESS',
    LOADING_PRODUCT_FAILED: 'LOADING_PRODUCT_FAILED',

    // user
    CREATE_NEW_USER_SUCCESS: 'CREATE_NEW_USER_SUCCESS',
    CREATE_NEW_USER_FAILED: 'CREATE_NEW_USER_FAILED',
    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',
    GET_ALL_ADDRESS_SUCCESS: 'GET_ALL_ADDRESS_SUCCESS',
    GET_ALL_ADDRESS_FAILED: 'GET_ALL_ADDRESS_FAILED',
    GET_ALL_ROLES_SUCCESS: 'GET_ALL_ROLES_SUCCESS',
    GET_ALL_ROLES_FAILED: 'GET_ALL_ROLES_FAILED',
    // FETCH_ALL_GENDER_SUCCESS: 'FETCH_ALL_GENDER_SUCCESS',
    // FETCH_ALL_GENDER_FAILED: 'FETCH_ALL_GENDER_FAILED',
    FETCH_ALL_ROLE_SUCCESS: 'FETCH_ALL_ROLE_SUCCESS',
    FETCH_ALL_ROLE_FAILED: 'FETCH_ALL_ROLE_FAILED',
    FETCH_ALL_CODE_BY_TYPE_FAILED: 'FETCH_ALL_CODE_BY_TYPE_FAILED',

    DELTE_USER_SUCCESS: 'DELTE_USER_SUCCESS',
    DELTE_USER_FAILED: 'DELTE_USER_FAILED',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',
    GET_USER_BY_ID_SUCCESS: 'GET_USER_BY_ID_SUCCESS',
    GET_USER_BY_ID_FAILED: 'GET_USER_BY_ID_FAILED',
    GET_LIMIT_USERS_SUCCESS: 'GET_LIMIT_USERS_SUCCESS',
    GET_LIMIT_USERS_FAILED: 'GET_LIMIT_USERS_FAILED',

    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILED: 'REGISTER_FAILED',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED',
    

    // product
    FETCH_ALL_COLOR_SUCCSESS: 'FETCH_ALL_COLOR_SUCCSESS',
    FETCH_ALL_COLOR_FAILED: 'FETCH_ALL_COLOR_FAILED',

    GET_CATEGORIES_BY_ID_SUCCESS: 'GET_CATEGORIES_BY_ID_SUCCESS',
    GET_CATEGORIES_BY_ID_FAILED: 'GET_CATEGORIES_BY_ID_FAILED',

    FETCH_ALL_LOGO_SUCCESS: 'FETCH_ALL_LOGO_SUCCESS',
    FETCH_ALL_SIZEGIAY_SUCCESS: 'FETCH_ALL_SIZEGIAY_SUCCESS',
    FETCH_ALL_SIZEAO_SUCCESS: 'FETCH_ALL_SIZEAO_SUCCESS',
    FETCH_GENDER_PRODUCT_SUCCESS: 'FETCH_GENDER_PRODUCT_SUCCESS',
    
    FETCH_ALL_CATEGORIES_SUCCESS: 'FETCH_ALL_CATEGORIES_SUCCESS',
    FETCH_ALL_CATEGORIES_FAILED: 'FETCH_ALL_CATEGORIES_FAILED',

    FETCH_ALL_DISCOUNT_SUCCESS: 'FETCH_ALL_DISCOUNT_SUCCESS',
    FETCH_ALL_BRAND_SUCCESS: 'FETCH_ALL_BRAND_SUCCESS',

    FETCH_ALL_PRODUCTS_SUCCESS: 'FETCH_ALL_PRODUCTS_SUCCESS',
    FETCH_ALL_PRODUCTS_FAILED: 'FETCH_ALL_PRODUCTS_FAILED',
    FETCH_ALL_PRODUCTS_PUBLIC_SUCCESS: 'FETCH_ALL_PRODUCTS_PUBLIC_SUCCESS',
    FETCH_ALL_PRODUCTS_PUBLIC_FAILED: 'FETCH_ALL_PRODUCTS_PUBLIC_FAILED',
    CREATE_NEW_PRODUCT_SUCCESS: 'CREATE_NEW_PRODUCT_SUCCESS',
    CREATE_NEW_PRODUCT_FAILED: 'CREATE_NEW_PRODUCT_FAILED',
    DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAILED: 'DELETE_PRODUCT_FAILED',
    FETCH_PRODUCT_BY_ID_SUCCESS: 'FETCH_PRODUCT_BY_ID_SUCCESS',
    FETCH_PRODUCT_BY_ID_FAILED: 'FETCH_PRODUCT_BY_ID_FAILED',
    EDIT_PRODUCT_SUCCESS: 'EDIT_PRODUCT_SUCCESS',
    EDIT_PRODUCT_FAILED: 'EDIT_PRODUCT_FAILED',
    FETCH_ALL_IMAGE_PRODUCT_SUCCESS: 'FETCH_ALL_IMAGE_PRODUCT_SUCCESS',
    FETCH_ALL_IMAGE_PRODUCT_FAILED: 'FETCH_ALL_IMAGE_PRODUCT_FAILED',
    ADD_IMAGE_PRODUCT_SUCCESS: 'ADD_IMAGE_PRODUCT_SUCCESS',
    ADD_IMAGE_PRODUCT_FAILED: 'ADD_IMAGE_PRODUCT_FAILED',
    DELETE_IMAGE_PRODUCT_SUCCESS: 'DELETE_IMAGE_PRODUCT_SUCCESS',
    DELETE_IMAGE_PRODUCT_FAILED: 'DELETE_IMAGE_PRODUCT_FAILED',
    FETCH_DESCRIPTION_PRODUCT_SUCCESS: 'FETCH_DESCRIPTION_PRODUCT_SUCCESS',
    FETCH_DESCRIPTION_PRODUCT_FAILED: 'FETCH_DESCRIPTION_PRODUCT_FAILED',
    ADD_DESCRIPTION_PRODUCT_SUCCESS: 'ADD_DESCRIPTION_PRODUCT_SUCCESS',
    ADD_DESCRIPTION_PRODUCT_FAILED: 'ADD_DESCRIPTION_PRODUCT_FAILED',
    GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_SUCCESS: 'GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_SUCCESS',
    GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_FAILED: 'GET_QUANTITY_OF_EACH_PRODUCT_BY_CATEGORY_FAILED',
    GET_PRODUCT_BY_CATEGORY_SUCCESS: 'GET_PRODUCT_BY_CATEGORY_SUCCESS',
    GET_PRODUCT_BY_CATEGORY_FAILED: 'GET_PRODUCT_BY_CATEGORY_FAILED',
    GET_LIMIT_PRODUCTS_SUCCESS: 'GET_LIMIT_PRODUCTS_SUCCESS',
    GET_LIMIT_PRODUCTS_FAILED: 'GET_LIMIT_PRODUCTS_FAILED',
    GET_LIMIT_PRODUCTS_BY_OPTION_SORT_SUCCESS: 'GET_LIMIT_PRODUCTS_BY_OPTION_SORT_SUCCESS',
    GET_LIMIT_PRODUCTS_BY_OPTION_SORT_FAILED: 'GET_LIMIT_PRODUCTS_BY_OPTION_SORT_FAILED',

    SEARCH_PRODUCT_BY_NAME_SUCCESS: 'SEARCH_PRODUCT_BY_NAME_SUCCESS',
    SEARCH_PRODUCT_BY_NAME_FAILED: 'SEARCH_PRODUCT_BY_NAME_FAILED',
    SEARCH_PRODUCT_BY_NAME_LIMIT_SUCCESS: 'SEARCH_PRODUCT_BY_NAME_LIMIT_SUCCESS',
    SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED: 'SEARCH_PRODUCT_BY_NAME_LIMIT_FAILED',
    SEARCH_PRODUCT_BY_NAME_LIMIT_ERROR_1: 'SEARCH_PRODUCT_BY_NAME_LIMIT_ERROR_1',

    GET_ALL_PRODUCTS_FAVOURITE_SUCCESS: 'GET_ALL_PRODUCTS_FAVOURITE_SUCCESS',
    GET_ALL_PRODUCTS_FAVOURITE_FAILED: 'GET_ALL_PRODUCTS_FAVOURITE_FAILED',
    GET_ALL_PRODUCTS_FAVOURITE_LIMIT_SUCCESS: 'GET_ALL_PRODUCTS_FAVOURITE_LIMIT_SUCCESS',
    GET_ALL_PRODUCTS_FAVOURITE_LIMIT_FAILED: 'GET_ALL_PRODUCTS_FAVOURITE_LIMIT_FAILED',
    CREATE_PRODUCT_FAVOURITE_SUCCESS: 'CREATE_PRODUCT_FAVOURITE_SUCCESS',
    CREATE_PRODUCT_FAVOURITE_FAILED: 'CREATE_PRODUCT_FAVOURITE_FAILED',

    GET_ALL_PRODUCTs_IN_CART_BY_USER_SUCCESS: 'GET_ALL_PRODUCTs_IN_CART_BY_USER_SUCCESS',
    GET_ALL_PRODUCTs_IN_CART_BY_USER_FAILED: 'GET_ALL_PRODUCTs_IN_CART_BY_USER_FAILED',
    ADD_PRODUCT_TO_CART_SUCCESS: 'ADD_PRODUCT_TO_CART_SUCCESS',
    ADD_PRODUCT_TO_CART_FAILED: 'ADD_PRODUCT_TO_CART_FAILED',
    DELETE_PRODUCT_IN_SUCCESS: 'DELETE_PRODUCT_IN_SUCCESS',
    DELETE_PRODUCT_IN_FAILED: 'DELETE_PRODUCT_IN_FAILED',

})

export default actionTypes
