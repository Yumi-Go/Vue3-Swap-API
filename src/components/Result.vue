<script setup>

import { onBeforeMount, ref } from 'vue'
import { useFetchData } from '../composables/useFetch';
const { fetchData } = useFetchData();

const allData = ref([]);
const people = ref([]);
const planets = ref([]);
const personItems = ['name', 'height', 'mass', 'created', 'edited', 'planet_name'];

onBeforeMount(async () => {
    allData.value = await fetchData();
    people.value = allData.value["people"];
    planets.value = allData.value["planets"];
    console.log("people: ", people.value);
    console.log("planets: ", planets.value);
});

</script>

<template>
<div class="">
    <!-- {{ people }} -->
<table class="w-[600px] table-auto border-solid border-2">
    <thead class="border-solid border-2">
        <tr class="border-solid border-2">
            <th v-for="column in personItems" class="border-solid border-2">{{ column }}</th>
        </tr>
    </thead>
    <tbody class="border-solid border-2">
        <tr v-for="(person, index) in people" :key="index" class="border-solid border-2">
            <td class="border-solid border-2">{{ person.name }}</td>
                <td class="border-solid border-2">{{ person.height }}</td>
                <td class="border-solid border-2">{{ person.mass }}</td>
                <td class="border-solid border-2">{{ person.created }}</td>
                <td class="border-solid border-2">{{ person.edited }}</td>
                <td class="border-solid border-2"><span @click="">{{ person.homeworld }}</span></td>

        </tr>
    </tbody>
</table>
</div>

<div class="flex flex-row">

</div>

</template>
