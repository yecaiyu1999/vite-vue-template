/**

 * https://github.com/anncwb/vite-plugin-mock

 */

import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    // 在开发环境 启用mock
    localEnabled: !isBuild // Set whether to enable the local mock .ts file, do not open it in the production environment
  })
}
