<script setup>

import { onBeforeMount, ref, watch } from 'vue';
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';
import { useSort } from '../composables/useSort';
import { useFormat } from '../composables/useFormat';
import PlanetPopup from './PlanetPopup.vue';
import Page from './Page.vue';
import { useLocalStorage } from '@vueuse/core';
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

const columnColors = {
    name: "bg-red-50",
    height: "bg-pink-50",
    mass: "bg-orange-50",
    created: "bg-lime-50",
    edited: "bg-teal-50",
    homeworld: "bg-violet-50"
};

function setColumnColors(column) {
    for(const [columnName, color] of Object.entries(columnColors)) {
        if (column === columnName) {
            return color;
        }
    }
}

const thColors = {
    name: "bg-red-200",
    height: "bg-pink-200",
    mass: "bg-orange-200",
    created: "bg-lime-200",
    edited: "bg-teal-200",
    homeworld: "bg-violet-200"
};

function setThColors(column) {
    for(const [columnName, color] of Object.entries(thColors)) {
        if (column === columnName) {
            return color;
        }
    }
}

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

    <table class="w-[1200px] table-fixed table-h tracking-wide">
        <colgroup v-for="column in personItems" class="z-10">
            <col :class=setColumnColors(column) class="">
        </colgroup>

        <thead class="">
            <draggable v-model="personItems" tag="tr" :item-key="key => key"
                @end="filterByColumns(sortResult)" ghost-class="ghost">
                <template #item="{ element: column }">
                    <th scope="col"
                    :class=setThColors(column)
                    class="cursor-move py-5 z-20">
                        <span class="">{{ convertColumnNames(column) }}</span>
                        <span @click="holdEntireSortResult(column)" class="pl-2 cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-sort" class="text-gray-500 opacity-50 hover:text-black"/>
                        </span>
                    </th>
                </template>
            </draggable>
        </thead>
        <tbody class="">
            <tr v-for="(person, index) in sortResult" :key="index"
            class="border-b-[1px] hover:bg-gray-100 hover:border-y-[2px]">
                <td v-for="column in personItems" class=" p-5">
                    <span v-if="column === 'homeworld'" class="">
                        <label for="my-modal-4" v-if="person[column]['name'] === 'unknown'" class="cursor-text">
                            {{ person[column]['name'] }}
                        </label>
                        <label for="my-modal-4" v-else class="cursor-pointer text-indigo-900"
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
</style>