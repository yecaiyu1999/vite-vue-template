export function resultSuccess<T = any>(result: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    data: result,
    message,
    type: 'success'
  }
}

export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    data: result,
    message,
    type: 'error'
  }
}
