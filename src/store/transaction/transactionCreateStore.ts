// store/transactionEditStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalCreateStore = defineStore('transactionSidebar', () => {
    const isOpen = ref(false)

    const openSidebar = () => isOpen.value = true
    const closeSidebar = () => isOpen.value = false

    return { isOpen, openSidebar, closeSidebar }
})
