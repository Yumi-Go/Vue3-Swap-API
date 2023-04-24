<script setup>
import { useFetchUsers, useFetchPlanets } from '../composables/useFetch';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const { userItems, saveUsersToStorage, currentPageNo, newlyLoadedPageData, getPageNums } = useFetchUsers();
const { planetItems, savePlanetsToStorage } = useFetchPlanets();

const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

// getPageNums();
const pageNums = [1,2,3,4,5,6,7,8,9]; // this should be replaced with getPageNums()

async function initialize() {
    console.log("currentPageNo(first loading): ", currentPageNo.value)
    await saveUsersToStorage(currentPageNo.value);

}

initialize();


console.log(getAllUsers.value);
console.log(getAllPlanets.value);



async function changeTableData(pageNum) {
    await saveUsersToStorage(pageNum);
    console.log("users number:", newlyLoadedPageData.value.length);
    const users = newlyLoadedPageData.value;
    console.log("users: ", users);
    for (const [key, value] of Object.entries(users)) {
        if (userItems.includes(key)) {
            result.push(value);
        }
    }
    console.log("changed currentPageNo: ", currentPageNo.value);
    console.log("Last newlyLoadedPageData: ", newlyLoadedPageData.value);
    return newlyLoadedPageData.value;
}

function pageButtonClick(pageNum) {
    currentPageNo.value = pageNum;
    changeTableData(currentPageNo.value);
}

</script>


<template>

<div class="">

    <table v-if="getAllUsers.length > 0" class="w-[600px] table-auto border-solid border-2">
        <thead class="border-solid border-2">
            <tr class="border-solid border-2">
                <th v-for="column in userItems" class="border-solid border-2">{{ column }}</th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="(user, key, index) in Object.values(getAllUsers[currentPageNo-1])[0]" :key="index" class="border-solid border-2">
                <td v-for="column in userItems" class="border-solid border-2">{{ user[column] }}</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="flex flex-row">
    <div v-for="pNum in pageNums">
        <!-- should be changed to radio buttons -->
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