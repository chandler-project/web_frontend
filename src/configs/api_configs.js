import axios from 'axios'

export function rootUrl () {
  switch (process.env.APP_ENV) {
    case 'staging':
      return '/'
    case 'production':
      return '/'
    default:
      return 'localhost:3000/'
  }
}

export function rootApiUrl () {
  return rootUrl() + 'api'
}

export function configApi () {
  axios.defaults.baseURL = rootApiUrl()
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Accept'] = 'application/json; version=v1'
}
