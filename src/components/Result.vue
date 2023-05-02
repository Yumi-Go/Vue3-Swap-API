<script setup>

import { onBeforeMount, onMounted, ref } from 'vue'
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';

import PlanetPopup from './PlanetPopup.vue';

const { personItems, fetchData } = useFetchData();
const allData = ref([]);

function capitalizeColumnNames(name) {
    const firstLetter = name[0].toUpperCase();
    const rest = name.slice(1);
    return firstLetter + rest;
}

const isModalOpened = ref(false);
const planetName = ref('');
const planetDiameter = ref('');
const planetClimate = ref('');
const planetPopulation = ref('');

const props = defineProps({
    search: String
});

console.log("search in Result.vue: ", props.search);

const { filterByName } = useSearch();

onBeforeMount(async () => {
    allData.value = await fetchData();
    console.log("allData: ", allData.value);
})

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

let prevColumn = "nothing";

function standardizeToCompare(value){
    if (value === 'unknown') return -1;
    if (value.includes(',')) {
        return value.replace(",", "");
    }
    else return value;
}

function sortTable(column) {
    console.log("column: ", column);
    if (column !== prevColumn) {
        allData.value.sort((a, b) => {
            console.log("a[column]: ", a[column]);
            console.log("b[column]: ", b[column]);
            // if (typeof a[column] === 'string' && typeof b[column] === 'string') {
            //     return a[column] - b[column];
            // }
            return standardizeToCompare(a[column]) - standardizeToCompare(b[column]);
        });
    } else {
        allData.value.reverse();
    }
    prevColumn = column;
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
                @click="sortTable(column)"
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
