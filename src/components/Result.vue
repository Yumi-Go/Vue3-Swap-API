<script setup>
import axios from 'axios';
import { useAxiosUsers, useAxiosPlanets } from '../composables/useAxios';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';


const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

useAxiosUsers();
useAxiosPlanets();

// console.log(getAllUsers.value);
// console.log(getAllPlanets.value);

// const columnNames = ['Name', 'Height', 'Mass', 'Created', 'Edited', 'Planet Name'];

// function columnContents(index) {

//     const userRow = [];
//     const lowercaseColNames = columnNames.map(name => name.toLowerCase());
//     const user = Object.values(getAllUsers.value)[index];
//     console.log(user);
    
//     for (const [key, value] of Object.entries(user)) {
//         if (lowercaseColNames.includes(key)) {
//             userRow.push(value);
//         }
//     }

//     console.log("userRow: ", userRow);
//     return userRow;

// }


</script>


<template>

<div>

    <!-- <table class="w-[600px] table-auto border-solid border-2">
        <thead class="border-solid border-2">
            <tr class="border-solid border-2">
                <th v-for="column in columnNames" class="border-solid border-2">{{ column }}</th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="i in getAllUsers.length" class="border-solid border-2">
                <td v-for="cell in columnContents(i-1)" class="border-solid border-2">{{ cell }}</td>
            </tr>
        </tbody>
    </table> -->


</div>


</template>

<style scoped>
.list-group-item {
    border-radius: 0;
}
</style>