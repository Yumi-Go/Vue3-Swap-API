<script setup>

import { onBeforeMount, ref } from 'vue'
import { useFetchData } from '../composables/useFetch';
const { fetchData } = useFetchData();

const allData = ref([]);

const personItems = ['No', 'Name', 'Height', 'Mass', 'Created', 'Edited', 'Planet Name'];

onBeforeMount(async () => {
    allData.value = await fetchData();
    console.log("allData: ", allData.value);

});

</script>

<template>
<div class="">
<table class="w-[600px] table-auto border-solid border-2">
    <thead class="border-solid border-2">
        <tr class="border-solid border-2">
            <th v-for="column in personItems" class="border-solid border-2">{{ column }}</th>
        </tr>
    </thead>
    <tbody class="border-solid border-2">
        <tr v-for="(person, index) in allData" :key="index" class="border-solid border-2">
            <td class="border-solid border-2">{{ index + 1 }}</td>
            <td class="border-solid border-2">{{ person.name }}</td>
            <td class="border-solid border-2">{{ person.height }}</td>
            <td class="border-solid border-2">{{ person.mass }}</td>
            <td class="border-solid border-2">{{ person.created }}</td>
            <td class="border-solid border-2">{{ person.edited }}</td>
            <td class="border-solid border-2"><span @click="">{{ person.homeworld.name }}</span></td>

        </tr>
    </tbody>
</table>
</div>

<div class="flex flex-row">

</div>

</template>
