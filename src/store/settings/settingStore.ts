// store/transactionEditStore.ts
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        selectedLenguage: 'es',
    }),
    actions: {
        setLenguage(lenguage: string) {
            this.selectedLenguage = lenguage
        },
    }
})
