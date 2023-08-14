const actionTypes = Object.freeze({
    // login
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',

    // user
    CREATE_NEW_USER_SUCCESS: 'CREATE_NEW_USER_SUCCESS',
    CREATE_NEW_USER_FAILED: 'CREATE_NEW_USER_FAILED',
    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',
    FETCH_ALL_PROVINCES_SUCCESS: 'FETCH_ALL_PROVINCES_SUCCESS',
    FETCH_ALL_PROVINCES_FAILED: 'FETCH_ALL_PROVINCES_FAILED',
    FETCH_ALL_GENDER_SUCCESS: 'FETCH_ALL_GENDER_SUCCESS',
    FETCH_ALL_GENDER_FAILED: 'FETCH_ALL_GENDER_FAILED',
    FETCH_ALL_ROLE_SUCCESS: 'FETCH_ALL_ROLE_SUCCESS',
    FETCH_ALL_ROLE_FAILED: 'FETCH_ALL_ROLE_FAILED',
    FETCH_ALL_CODE_BY_TYPE_FAILED: 'FETCH_ALL_CODE_BY_TYPE_FAILED',
    DELTE_USER_SUCCESS: 'DELTE_USER_SUCCESS',
    DELTE_USER_FAILED: 'DELTE_USER_FAILED',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',
    FETCH_USER_ALLCODE_SUCCESS: 'FETCH_USER_ALLCODE_SUCCESS',
    FETCH_USER_ALLCODE_FAILED: 'FETCH_USER_ALLCODE_FAILED',

})

export default actionTypes
