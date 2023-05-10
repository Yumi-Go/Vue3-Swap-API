<script setup>

import { onBeforeMount, ref, watch } from 'vue';
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';
import { useSort } from '../composables/useSort';
import { useFormat } from '../composables/useFormat';
import PlanetPopup from './PlanetPopup.vue';
import Page from './Page.vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import Draggable from 'vuedraggable';

const { personItems, saveData } = useFetchData();

const storeData = useLocalStorage('all', []);

const { searchResult, search, checkedColumns, filterByColumns } = useSearch();
const { sortResult, sortTable } = useSort();
const { convertColumnNames, convertDateFormat, convertPopulationFormat, convertDiameterFormat } = useFormat();

const entireSortResult = ref([]);

onBeforeMount(async () => {
    await saveData(1);
    filterByColumns(storeData.value);
    entireSortResult.value = storeData.value;
});

const isModalOpened = ref(false);
const personName = ref('');
const planetName = ref('');
const planetDiameter = ref('');
const planetClimate = ref('');
const planetPopulation = ref('');

watch(search, () => {
    filterByColumns(entireSortResult.value);
    sortResult.value = searchResult.value;
});
watch(checkedColumns, () => {
    sortResult.value = entireSortResult.value;
});

function holdEntireSortResult(column) {
    sortTable(storeData.value, column);
    entireSortResult.value = sortResult.value;
}

function closeModal() {
    isModalOpened.value = false;
}

function openModal(person_name, planet_name, planet_diameter, planet_climate, planet_population) {
    personName.value = person_name;
    planetName.value = planet_name;
    planetDiameter.value = planet_diameter;
    planetClimate.value = planet_climate;
    planetPopulation.value = planet_population;
    isModalOpened.value = true;
}

async function pageButtonClick(pageNum) {
    await saveData(pageNum);
    filterByColumns(storeData.value);
    entireSortResult.value = storeData.value;
}


</script>

<template>

<PlanetPopup v-if="isModalOpened"
:personName="personName"
:planetName="planetName"
:planetDiameter="planetDiameter"
:planetClimate="planetClimate"
:planetPopulation="planetPopulation"
@closeModal="closeModal"/>

<div class="flex flex-row justify-center overflow-x-auto">

    <table class="w-[1200px] table-fixed">
        <thead class="nth-2n:bg-red-400">
            <draggable v-model="personItems" tag="tr" :item-key="key => key"
                @end="filterByColumns(sortResult)" ghost-class="ghost">
                <template #item="{ element: column }">
                    <th scope="col"
                    class="cursor-move border-solid border-gray-300 border-b-[1px] bg-[#ecf2f9] py-5">
                        <span class="">{{ convertColumnNames(column) }}</span>
                        <span @click="holdEntireSortResult(column)" class="pl-2 cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-sort"/>
                        </span>
                    </th>
                </template>
            </draggable>
        </thead>
        <tbody class="">
            <tr v-for="(person, index) in sortResult" :key="index"
            class="bg-white shadow odd:bg-gray-100 hover:bg-red-200 border-y-[1px]">
                <td v-for="column in personItems" class=" p-5">
                    <span v-if="column === 'homeworld'" class="">
                        <label for="my-modal-4" class="cursor-pointer text-indigo-900"
                        @click="openModal(
                            person['name'],
                            person[column]['name'],
                            convertDiameterFormat(person[column]['diameter']),
                            person[column]['climate'],
                            convertPopulationFormat(person[column]['population']))">
                            <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" size="2xs" class="pr-2"/>
                            {{ person[column]['name'] }}
                        </label>
                    </span>
                    <span v-else-if="column === 'created' || column === 'edited'">
                        {{ convertDateFormat(person[column]) }}</span>
                    <span v-else class="">{{ person[column] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div class="flex flex-row">
    <Page @pageButtonClick="pageButtonClick"/>

</div>

</template>


<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

tr:hover {
    background-color: #0ea5e9;
}

th:nth-child(1) {
    background-color: rgb(254 202 202);
}
td:nth-child(1) {
    background-color: rgb(254 242 242);
}

th:nth-child(2) {
    background-color: rgb(251 207 232);
}
td:nth-child(2) {
    background-color: rgb(253 242 248);
}

th:nth-child(3) {
    background-color: rgb(254 215 170);
}
td:nth-child(3) {
    background-color: rgb(255 247 237);
}

th:nth-child(4) {
    background-color: rgb(217 249 157);
}
td:nth-child(4) {
    background-color: rgb(247 254 231);
}

th:nth-child(5) {
    background-color: rgb(153 246 228);
}
td:nth-child(5) {
    background-color: rgb(240 253 250);
}

th:nth-child(6) {
    background-color: rgb(199 210 254);
}
td:nth-child(6) {
    background-color: rgb(238 242 255);
}



</style>