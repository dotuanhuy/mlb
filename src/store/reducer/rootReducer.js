import authReducer from "./authReducer";
import userReducer from './userReducer';
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLogin']  // chọn những state lưu vào storage
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),   // Lưu dưới storage
    user: userReducer
})

export default rootReducer