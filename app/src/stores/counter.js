import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0
  }),
  //ให้ getter
  getters: {

    doubleCount: (state) => state.counter * 2 //ใช้เหมือนกับ parameter state
  },
  //ให้แก้ไข
  actions: {
    increment() {
      this.counter++
    }
  }
})
