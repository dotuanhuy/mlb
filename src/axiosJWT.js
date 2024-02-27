import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshTokenService, getRefreshToken, handleLogoutAPI } from "./services/userService";

export const createAxios = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8080',
        withCredentials: true,
        timeout: 3*1000, // 3s,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    instance.interceptors.request.use(
        async (config) => {
            // let date = new Date()
            // const decodedToken = jwtDecode(accessToken)
            // if (decodedToken.exp < date.getTime() / 1000) {
            //     const data = await refreshTokenService()
            //     config.headers['token'] = 'Bearer ' + data.accessToken
            // }

            
            // if (config.url.indexOf('/login') >= 0 || config.url.indexOf('/refreshToken') >= 0) {
            //     return config
            // }
            if (config.url.indexOf('/api/get-refresh-token') >= 0) {
                return config
            }
            const token = await instance.getLocalAccessToken()
            config.headers['X-Token'] = 'Bearer ' + token
            return config
        },
        (err) => {
            console.log('error: ', err)
            return Promise.reject(err);
        }
    )
    instance.interceptors.response.use(
        async (response) => {
            const config = response.config
            if (config.url.indexOf('/api/login') >= 0 || config.url.indexOf('/api/get-refresh-token') >= 0) {
                return response.data
            }
            const {errCode, errMessage} = response?.data
            if (errCode && errCode === 401) {
                if (errMessage && errMessage === 'jwt expired') {
                    const {accessToken} = await refreshTokenService()
                    if (accessToken) {
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
            switch(status) {
                case 401: {
                    window.location.href = '/'
                    return Promise.reject(error)
                }
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

    return instance
}