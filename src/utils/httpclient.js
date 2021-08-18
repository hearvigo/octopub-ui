import axios from 'axios'
import { getToken } from '@/utils/auth'

const httpclient = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 25000 // request timeout
})

httpclient.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default httpclient
