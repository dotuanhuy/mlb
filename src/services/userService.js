import axios from "../axios";

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const handleCreateNewUer = (data) => {
    return axios.post('/api/create-new-user', data)
}

export {
    handleLoginAPI,
    handleCreateNewUer
}