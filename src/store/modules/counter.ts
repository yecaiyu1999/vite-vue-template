import { defineStore } from 'pinia'

interface MainState {
  count: number
}

export function setupCounter() {
  const counterStore = useCounterStore()
  // TODO 做一系列动作
}

export const useCounterStore = defineStore({
  id: 'counter',
  state: (): MainState => ({
    count: 1
  }),
  getters: {},
  actions: {
    add(num: number) {
      this.count += num
    }
  }
})
