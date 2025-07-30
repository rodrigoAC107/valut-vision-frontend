<template>
    <div class="w-full p-4 flex gap-4">
        <div class="w-full flex flex-col gap-4">
            <div class="flex gap-4">
                <ChangePassword />
                <AddTagBox v-model="categoryIncomes" title="Add New Income" placeholder="New Income" label="New Income"
                    buttonText="Add" @added="reloadAll" type="income" />
                <AddTagBox v-model="categoryExpenses" title="Add New Expense" placeholder="New Expense"
                    label="New Expense" buttonText="Add" @added="reloadAll" type="expense" />
            </div>
            <div class="flex gap-4">
                <AddTagBox v-model="subCategoryExpenses" title="Add New Sub Category" placeholder="New Sub Category"
                    label="New Sub Category" buttonText="Add" @added="reloadAll" type="subcategory" />
                <ChangeTheme />
                <ChangeLenguage />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCategories, GetCategoriesResponse, getSubCategory, GetSubCategoryResponse } from '@/services/settings/categories';
import ChangePassword from '@/components/settings/changePassword.vue';
import ChangeTheme from '@/components/settings/changeTheme.vue';
import ChangeLenguage from '@/components/settings/changeLenguage.vue';
import AddTagBox from '@/components/settings/addTagBox.vue';

const categoryIncomes = ref<{ id: string; name: string }[]>([]);
const categoryExpenses = ref<{ id: string; name: string }[]>([]);
const subCategoryExpenses = ref<{ id: string; name: string }[]>([]);

async function reloadAll() {
    const incomes: GetCategoriesResponse[] = await getCategories('income');
    categoryIncomes.value = incomes.map(cat => ({
        id: cat._id,
        name: cat.name,
    }));

    const expenses: GetCategoriesResponse[] = await getCategories('expense');
    categoryExpenses.value = expenses.map(cat => ({
        id: cat._id,
        name: cat.name,
    }));

    const subcategory: GetSubCategoryResponse[] = await getSubCategory();
    subCategoryExpenses.value = subcategory.map(cat => ({
        id: cat._id,
        name: cat.name,
    }));
}

onMounted(async () => {
    await reloadAll();
});

defineOptions({
    name: 'SettingsView'
})
</script>