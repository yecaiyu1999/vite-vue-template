let BASE_URL = ''
const TIMEOUT = 10000

if (process.env.NODE_ENV == 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = '127.0.0.1:8888'
}

export { BASE_URL, TIMEOUT }
