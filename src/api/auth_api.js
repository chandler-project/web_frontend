import axios from 'axios'

const AuthApi = {
  authFacebook (auth) {
    return axios.post('/sessions/facebook', { auth })
  }
}

export default AuthApi
