<script setup>
import axios from 'axios';
import { useAxiosUsers, useAxiosPlanets } from '../composables/useAxios';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';


const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

const { userItems, saveUsersToStorage } = useAxiosUsers();
const { planetItems, savePlanetsToStorage } = useAxiosPlanets();

saveUsersToStorage();
savePlanetsToStorage();

console.log(getAllUsers.value);
console.log(getAllPlanets.value);


function columnContents(index) {
    const userRow = [];
    const lowercaseColNames = userItems.map(name => name.toLowerCase());
    const user = getAllUsers.value[index];
    for (const [key, value] of Object.entries(user)) {
        if (lowercaseColNames.includes(key)) {
            userRow.push(value);
        }
    }
    return userRow;
}

</script>


<template>

<div>

    <table class="w-[600px] table-auto border-solid border-2">
        <thead class="border-solid border-2">
            <tr class="border-solid border-2">
                <th v-for="column in userItems" class="border-solid border-2">{{ column }}</th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="i in getAllUsers.length" class="border-solid border-2">
                <td v-for="cell in columnContents(i-1)" class="border-solid border-2">{{ cell }}</td>
            </tr>
        </tbody>
    </table>


</div>


</template>

<style scoped>
.list-group-item {
    border-radius: 0;
}
</style>