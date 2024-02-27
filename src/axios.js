import axios from 'axios';
import { handleLogoutAPI } from './services/userService';
import { getRefreshToken } from  './services/authService'

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

// instance.interceptors.request.use(
//     async (config) => {
//         if (config.url.indexOf('/api/login') >= 0 || config.url.indexOf('/api/get-refresh-token') >= 0) {
//             return config
//         }
//         // const token = document.cookie('token');
//         // const token = await 
//         console.log(document.cookie())
//         config.headers['token'] = 'Bearer ' + 'abc'
//         return config
//     },
//     (err) => {
//         console.log('error: ', err)
//         return Promise.reject(err);
//     }
// )

instance.interceptors.response.use(
    async (response) => {
        // if (config.url.indexOf('/api/login') >= 0 || config.url.indexOf('/api/get-refresh-token') >= 0) {
        //     return response.data
        // }
        // const {accessToken} = await getRefreshToken()
        // if (accessToken) {
        //     config.headers['token'] = 'Bearer ' + accessToken

        // }
        return response.data 
    },
    async (error) => {
        const status = error && error.response && error.response.status
        switch(status) {
            case 401: {
                window.location.href = '/'
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default instance