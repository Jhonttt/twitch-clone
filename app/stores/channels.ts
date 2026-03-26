import { defineStore } from 'pinia'
import type { NavCategory } from '~~/types/category'

export const useChannelsStore = defineStore('channels', () => {
  const isOpen = ref(true)
  const isOpenRight = ref(true)

  const navCategories = ref<NavCategory[]>([
    { id: 1, name: 'Games', icon: 'Gaming' },
    { id: 2, name: 'IRL', icon: 'Helmet' },
    { id: 3, name: 'Music & DJs', icon: 'Microphone' },
    { id: 4, name: 'Creative', icon: 'Creative' },
    { id: 5, name: 'Esports', icon: 'Trophy' },
  ])

  return { isOpen, isOpenRight, navCategories }
})
