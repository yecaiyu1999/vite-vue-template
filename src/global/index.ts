import { App } from 'vue'

import { setupGlobalElementPlus } from './element-plus'

export function setupGlobalProperties(app: App) {
  setupGlobalElementPlus(app)
}
