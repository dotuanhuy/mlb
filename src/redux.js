import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducer/rootReducer'; // thay thế đường dẫn bằng đúng đường dẫn tới reducers của bạn
import { persistStore } from 'redux-persist';

const reduxStore = () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
    const persistor = persistStore(store)

    return { store, persistor }
}

export default reduxStore;

// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk)
// );

// export default store