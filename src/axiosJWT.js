import axios from "axios";
import { logoutService, refreshTokenService } from "./services/authService";
import { API_VERSION, BACKEND_URL } from "./utils";
import { logout } from "./store/actions";

const api = `/api/${API_VERSION}`

const instance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    timeout: 8000, // 8s,
    // headers: {
    //     'Content-Type': 'application/json',
    // }
})

instance.interceptors.request.use(
    async (config) => {
        if (config.url.indexOf(`${api}/auth/refresh`) >= 0) {
            return config
        }
        const token = await instance.getLocalAccessToken()
        config.headers['X-Token'] = 'Bearer ' + token
        return config
    },
    (err) => {
        return Promise.reject(err);
    }
)
instance.interceptors.response.use(
    async (response) => {
        const config = response.config
        const { errCode, errMessage } = response?.data
        if (config.url.indexOf(`${api}/auth/login`) >= 0 || config.url.indexOf(`${api}/auth/refresh`) >= 0) {
            return response.data
        }
        if (errCode && errCode === 401) {
            if (errMessage && errMessage === 'jwt expired') {
                const { accessToken } = await refreshTokenService()
                console.log('check: ', accessToken);
                if (!accessToken) {
                    // const res = await logoutService()
                    // if (res && res.)
                    // window.localStorage.removeItem('accessToken')
                    // window.localStorage.removeItem('orderId')
                    // window.localStorage.removeItem('notifications')
                    // window.localStorage.removeItem('info')
                }
                else {
                    config.headers['X-Token'] = accessToken
                    await instance.setLocalAccessToken(accessToken)
                    return instance(config)
                }
            }
        }
        return response.data
    },
    async (error) => {
        const status = error && error.response && error.response.status
        if (status === 401) {
            window.location.href = '/'
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

instance.setLocalAccessToken = async (token) => {
    window.localStorage.setItem('accessToken', token)
}

instance.getLocalAccessToken = async () => {
    return window.localStorage.getItem('accessToken') ? window.localStorage.getItem('accessToken') : null
}

export default instance