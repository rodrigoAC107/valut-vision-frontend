<!-- components/ui/BaseModal.vue -->
<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
            @click.self="onClose">
            <div
                class="bg-[#001d3d] text-[#e0e1dd] rounded-xl shadow-2xl p-8 relative w-[90%] max-w-[40rem] max-h-[90vh] overflow-y-auto">
                <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl hover:cursor-pointer"
                    @click="onClose">
                    &times;
                </button>
                <slot />
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">

defineProps<{
    isOpen: boolean
    onClose: () => void
}>()

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
