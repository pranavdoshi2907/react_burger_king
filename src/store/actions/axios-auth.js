import axios from 'axios'

const instanceOfAuth = axios.create({
    baseURL : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiylmp2DZcAvzNxv0VCvaRfbYqvzs64bk'
})

export default instanceOfAuth; 