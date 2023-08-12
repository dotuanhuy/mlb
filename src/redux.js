import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducer/rootReducer'; // thay thế đường dẫn bằng đúng đường dẫn tới reducers của bạn

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;