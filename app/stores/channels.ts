import { defineStore } from 'pinia'

export const useChannelsStore = defineStore('channels', () => {
  const channels = ref([
    {
      id: 1,
      name: 'Ibai',
      category: 'Just Chatting',
      viewers: 132000,
      isLive: true,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 2,
      name: 'AuronPlay',
      category: 'GTA V',
      viewers: 89400,
      isLive: true,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 3,
      name: 'TheGrefg',
      category: 'Fortnite',
      viewers: 41000,
      isLive: false,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 4,
      name: 'Gaymer_Chris',
      category: 'Just Chatting',
      viewers: 8700,
      isLive: true,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 5,
      name: 'Knekro',
      category: 'Resident Evil',
      viewers: 3200,
      isLive: true,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 6,
      name: 'Outconsumer',
      category: 'Software & Game Dev',
      viewers: 980,
      isLive: false,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 7,
      name: 'Midudev',
      category: 'Coding Live',
      viewers: 420,
      isLive: true,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 8,
      name: 'Spok',
      category: 'Valorant',
      viewers: 210,
      isLive: true,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 9,
      name: 'Rojuu',
      category: 'League of Legends',
      viewers: 87,
      isLive: false,
      avatar: 'https://placehold.co/32x32',
    },
    {
      id: 10,
      name: 'Rivers_gg',
      category: 'Chess',
      viewers: 12,
      isLive: true,
      avatar: 'https://placehold.co/32x32',
    },
  ])

  return { channels }
})
