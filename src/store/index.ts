import { createPinia } from 'pinia'
import { setupCounter } from './modules/counter'

const store = createPinia()

export function setupStore() {
  setupCounter()
}

export default store
