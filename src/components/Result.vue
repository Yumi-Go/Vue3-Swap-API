<script setup>
import { useFetchUsers, useFetchPlanets } from '../composables/useFetch';
const { allUsers, userItems, saveUsersToStorage, currentPageNo, newlyLoadedPageData, getPageNums } = useFetchUsers();
const { allPlanets, planetItems, savePlanetsToStorage } = useFetchPlanets();


// getPageNums();
const pageNums = [1,2,3,4,5,6,7,8,9]; // this should be replaced with getPageNums()

async function initialize() {
    saveUsersToStorage(currentPageNo.value);
    console.log("allUsers: ", Object.values(allUsers.value));

}

initialize();



async function changeTableData(pageNum) {
    await saveUsersToStorage(pageNum);
    const users = newlyLoadedPageData.value;
    for (const [key, value] of Object.entries(users)) {
        if (userItems.includes(key)) {
            result.push(value);
        }
    }
    return newlyLoadedPageData.value;
}

function pageButtonClick(pageNum) {
    currentPageNo.value = pageNum;
    changeTableData(currentPageNo.value);
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
            <tr v-for="(users, key, index) in Object.values(allUsers)" :key="index" class="border-solid border-2">
                <td v-for="column in userItems" class="border-solid border-2">{{ users[currentPageNo][column] }}</td>
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