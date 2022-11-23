import axios from 'axios'
 
const api = axios.create({
    baseURL: 'https://gestar-vida-back.herokuapp.com/'
})
 
export default api;