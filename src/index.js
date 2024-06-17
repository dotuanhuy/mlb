import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/style.scss'
import reduxStore from './redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const { store, persistor } = reduxStore()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
            <ToastContainer />
        </PersistGate>
    </Provider>
    // </React.StrictMode>
);
reportWebVitals();
