import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://react-burger-king-5bd39.firebaseio.com/'
})

export default instance; 