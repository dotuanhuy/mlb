import axios from 'axios';

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

instance.interceptors.request.use(
    async (config) => {
        return config
    },
    (err) => {
        return Promise.reject(err);
    }
)

instance.interceptors.response.use(
    async (response) => {
        return response.data
    },
    async (error) => {
        const status = error && error.response && error.response.status
        switch (status) {
            case 401: {
                window.location.href = '/'
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default instance