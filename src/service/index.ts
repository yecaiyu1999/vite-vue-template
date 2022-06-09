import HttpRequest from './request'
import { BASE_URL, TIMEOUT } from './request/config'

const httpRequest = new HttpRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

export default httpRequest
