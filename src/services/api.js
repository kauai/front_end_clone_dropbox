import axios from 'axios'

const api = axios.create({
    baseURL: "https://dropomni.herokuapp.com"
})

export default api