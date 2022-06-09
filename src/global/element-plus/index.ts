import { App } from 'vue'

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export function setupGlobalElementPlus(app: App) {
  // 国际化
  app.use(ElementPlus, { locale })
}
