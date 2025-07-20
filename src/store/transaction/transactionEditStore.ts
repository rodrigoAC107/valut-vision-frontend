import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
    const isOpen = ref(false)
    const currentItem = ref<any>(null)

    function openSidebar(item: any) {
        currentItem.value = item
        isOpen.value = true
    }

    function closeSidebar() {
        currentItem.value = null
        isOpen.value = false
    }

    return { isOpen, currentItem, openSidebar, closeSidebar }
})
