<template>
    <div class="w-full p-4 flex gap-4">
        <div class="w-full flex flex-col gap-4">
            <div class="flex gap-4">
                <ChangePassword />
                <AddTagBox v-model="categoryIncomes" title="Add New Income" placeholder="New Income" label="New Income"
                    buttonText="Add" />
                <AddTagBox v-model="categoryExpenses" title="Add New Expense" placeholder="New Expense"
                    label="New Expense" buttonText="Add" />
            </div>
            <div class="flex gap-4">
                <AddTagBox v-model="subCategoryExpenses" title="Add New Sub Category" placeholder="New Sub Category"
                    label="New Sub Category" buttonText="Add" />
                <ChangeTheme />
                <ChangeLenguage />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ChangePassword from '@/components/settings/changePassword.vue';
import ChangeTheme from '@/components/settings/changeTheme.vue';
import ChangeLenguage from '@/components/settings/changeLenguage.vue';
import AddTagBox from '@/components/settings/addTagBox.vue';

const categoryIncomes = ref<string[]>(['Salary']);
const categoryExpenses = ref<string[]>(['Food']);
const subCategoryExpenses = ref<string[]>(['Groceries']);

defineOptions({
    name: 'SettingsView'
})
</script>