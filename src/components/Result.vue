<script setup>
import { ref } from 'vue';
import { useFetchUsers, useFetchPlanets, currentPage } from '../composables/useFetch';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';


const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

const { userItems, saveUsersToStorage } = useFetchUsers();
const { planetItems, savePlanetsToStorage } = useFetchPlanets();

// const currentPage = ref();

// saveUsersToStorage(1);
// savePlanetsToStorage(1);

console.log(getAllUsers.value);
console.log(getAllPlanets.value);

const pageNums = [1,2,3,4,5,6,7,8,9];
const tableData = ref([]);


function getTableData(pNum) {
    const userRow = [];
    const user = getAllUsers.value.length;
    console.log("user:", user);
    console.log("userRow: ", userRow);
    return userRow;
}

function pageButtonClick(pNum) {
    saveUsersToStorage(pNum);
    getTableData(pNum);
}








// function columnContents(index) {
//     const userRow = [];
//     const lowercaseColNames = userItems.map(name => name.toLowerCase());
//     const user = getAllUsers.value.length;
//     console.log("user:", user);
//     console.log("userRow: ", userRow);
//     return userRow;
// }

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
            <!-- <tr v-for="(item,index) in getAllUsers" class="border-solid border-2">
                <td v-for="cell in columnContents(index)" class="border-solid border-2">{{ cell }}</td>
            </tr> -->
            <tr v-for="user in getAllUsers" class="border-solid border-2">
                <td v-for="item in userItems">{{ user[item] }}</td>
            </tr>
        </tbody>
    </table>
</div>

<div class="flex flex-row">
    <div v-for="pNum in pageNums">
        <button
        @click="pageButtonClick(pNum)"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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