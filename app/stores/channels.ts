import { defineStore } from 'pinia'

export const useChannelsStore = defineStore('channels', () => {
  const isOpen = ref(true)
  const isOpenRight = ref(true)

  return { isOpen, isOpenRight }
})
