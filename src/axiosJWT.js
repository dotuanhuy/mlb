import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshTokenService } from "./services/userService";

export const createAxios = (accessToken) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8080',
        withCredentials: true
    })
    instance.interceptors.request.use(
        async (config) => {
            let date = new Date()
            const decodedToken = jwtDecode(accessToken)
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshTokenService()
                config.headers['token'] = 'Bearer ' + data.accessToken
            }
            return config
        },
        (err) => {
            console.log('error: ', err)
            return Promise.reject(err);
        }
    )
    instance.interceptors.response.use(
        (response) => {
            const { data } = response
            return response.data 
        },
        (error) => {
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

    return instance
}