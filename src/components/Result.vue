<script setup>

import { onBeforeMount, ref } from 'vue'
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';
import { useSort } from '../composables/useSort';
import PlanetPopup from './PlanetPopup.vue';

const { personItems, fetchData } = useFetchData();
const { filterByName } = useSearch();
const { sortTable } = useSort();

const allData = ref([]);

onBeforeMount(async () => {
    allData.value = await fetchData();
    console.log("allData: ", allData.value);
})

const isModalOpened = ref(false);
const planetName = ref('');
const planetDiameter = ref('');
const planetClimate = ref('');
const planetPopulation = ref('');

function closeModal() {
    isModalOpened.value = false;
}

function openModal(pName, pDiameter, pClimate, pPopulation) {
    planetName.value = pName;
    planetDiameter.value = pDiameter;
    planetClimate.value = pClimate;
    planetPopulation.value = pPopulation;
    isModalOpened.value = true;
}

function capitalizeColumnNames(name) {
    const firstLetter = name[0].toUpperCase();
    const rest = name.slice(1);
    return firstLetter + rest;
}

</script>


<template>

<div class="">

    <PlanetPopup v-if="isModalOpened"
    :planetName="planetName"
    :planetDiameter="planetDiameter"
    :planetClimate="planetClimate"
    :planetPopulation="planetPopulation"
    @closeModal="closeModal"/>

    <table class="w-[600px] table-auto border-solid border-2">
        <thead class="border-solid border-2">
            <tr class="border-solid border-2">
                <th
                v-for="column in personItems"
                @click="sortTable(allData, column)"
                class="border-solid border-2 cursor-pointer">
                {{ capitalizeColumnNames(column) }}
            </th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="(person, index) in filterByName(allData)" :key="index" class="border-solid border-2">
                <!-- <td class="border-solid border-2">{{ index + 1 }}</td> -->
                <td class="border-solid border-2">{{ index+1 }}. {{ person.name }}</td>
                <td class="border-solid border-2">{{ person.height }}</td>
                <td class="border-solid border-2">{{ person.mass }}</td>
                <td class="border-solid border-2">{{ person.created }}</td>
                <td class="border-solid border-2">{{ person.edited }}</td>
                <td class="border-solid border-2">
                    <button
                    @click="openModal(person.homeworld.name, person.homeworld.diameter, person.homeworld.climate, person.homeworld.population)"
                    class="cursor-pointer">
                        {{ person.homeworld.name }}
                    </button>
                </td>

            </tr>
        </tbody>
    </table>
</div>

<div class="flex flex-row">

</div>

</template>
