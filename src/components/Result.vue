<script setup>
import { useFetchUsers, useFetchPlanets } from '../composables/useFetch';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

const { userItems, saveUsersToStorage, currentPage: currentPageNo, currentPageData: newlyLoadedPageData, alreadyLoadedPages } = useFetchUsers();
const { planetItems, savePlanetsToStorage } = useFetchPlanets();


// 페이지 새로고침했을때 첫페이지 포함 이미 새로고침전에 로드됐었던 페이지 내용이 표시되지 않음 (스토리지에 데이터는 남아있음.)
console.log(getAllUsers.value);
console.log(getAllPlanets.value);

const pageNums = [1,2,3,4,5,6,7,8,9];
console.log("currentPageNo(first loading): ", currentPageNo.value[0])
saveUsersToStorage(currentPageNo.value[0]);
// newlyLoadedPageData.value = getAllUsers.value;
console.log("currentPageData", newlyLoadedPageData.value);
// alreadyLoadedPages.value.push(1);

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

    <table class="w-[600px] table-auto border-solid border-2">
        <thead class="border-solid border-2">
            <tr class="border-solid border-2">
                <th v-for="column in userItems" class="border-solid border-2">{{ column }}</th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="user in newlyLoadedPageData" class="border-solid border-2">
                <td v-for="item in userItems" class="border-solid border-2">{{ user[item] }}</td>
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