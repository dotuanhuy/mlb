import authReducer from "./authReducer";
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import discountReducer from './discountReducer';
import brandReducer from "./brandReducer";
import sizeReducer from "./sizeReducer";
import colorReducer from './colorReducer'
import logoReducer from "./logoReducer";
import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import fouriteProductReducer from './favouriteProductReducer'
import cartReducer from "./cartReducer";
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
    whitelist: ['isLogin', 'token']  // chọn những state lưu vào storage
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),   // Lưu dưới storage
    user: userReducer,
    category: categoryReducer,
    discount: discountReducer,
    brand: brandReducer,
    size: sizeReducer,
    color: colorReducer,
    logo: logoReducer,
    product: productReducer,
    image: imageReducer,
    fouriteProduct: fouriteProductReducer,
    cart: cartReducer,
})

export default rootReducer