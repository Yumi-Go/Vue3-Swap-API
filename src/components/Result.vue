<script setup>
import { useFetchUsers, useFetchPlanets } from '../composables/useFetch';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

const { userItems, saveUsersToStorage, currentPage, currentPageData, alreadyLoadedPages } = useFetchUsers();
const { planetItems, savePlanetsToStorage } = useFetchPlanets();

console.log(getAllUsers.value);
console.log(getAllPlanets.value);

const pageNums = [1,2,3,4,5,6,7,8,9];
saveUsersToStorage(currentPage.value);
// currentPageData.value = getAllUsers.value;
console.log(currentPageData.value);
alreadyLoadedPages.value.push(1);

async function changeTableData(pageNum) {
    await saveUsersToStorage(pageNum);
    console.log("users number:", currentPageData.value.length);
    const users = currentPageData.value;
    console.log("users: ", users);
    for (const [key, value] of Object.entries(users)) {
        if (userItems.includes(key)) {
            result.push(value);
        }
    }
    console.log("currentPageData: ", currentPageData.value);
    return currentPageData.value;
}

function pageButtonClick(pageNum) {
    currentPage.value = pageNum;
    changeTableData(currentPage.value);
}

</script>


<template>

<div class="">

    <table class="w-[600px] table-auto border-solid border-2">
        <thead class="border-solid border-2">
            <tr class="border-solid border-2">
                <th v-for="column in userItems" class="border-solid border-2">{{ column }}</th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="user in currentPageData" class="border-solid border-2">
                <td v-for="item in userItems">{{ user[item] }}</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="flex flex-row">
    <div v-for="pNum in pageNums">
        <button
        @click="pageButtonClick(pNum)"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none 
        bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700
        focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
        dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
            {{ pNum }}
        </button>

    </div>
</div>

</template>

<style scoped>
.list-group-item {
    border-radius: 0;
}
</style>