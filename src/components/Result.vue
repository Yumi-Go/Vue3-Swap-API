<script setup>

import { onBeforeMount, ref, watch } from 'vue';
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';
import { useSort } from '../composables/useSort';
import { useFormat } from '../composables/useFormat';
import PlanetPopup from './PlanetPopup.vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import Draggable from 'vuedraggable';

const { personItems, fetchData } = useFetchData();

const getData = useLocalStorage("all", null, { serializer: StorageSerializers.object });

const { searchResult, search, checkedColumns, filterByName } = useSearch();
const { sortResult, sortTable } = useSort();
const { convertColumnNames, convertDateFormat, convertPopulationFormat, convertDiameterFormat } = useFormat();


onBeforeMount(async () => {
    await fetchData();
    console.log("getData: ", getData.value);
    filterByName(getData.value);
});

const isModalOpened = ref(false);
const planetName = ref('');
const planetDiameter = ref('');
const planetClimate = ref('');
const planetPopulation = ref('');

watch(search, () => filterByName(getData.value));
watch(checkedColumns, () => filterByName(getData.value));

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

</script>

<template>

<div class="">

    <PlanetPopup v-if="isModalOpened"
    :planetName="planetName"
    :planetDiameter="planetDiameter"
    :planetClimate="planetClimate"
    :planetPopulation="planetPopulation"
    @closeModal="closeModal"/>

    <table class="w-[1000px] table-auto">
        <thead class="">
            <draggable v-model="personItems" tag="tr" :item-key="key => key"
                @end="filterByName(sortResult)" ghost-class="ghost">
                <template #item="{ element: column }">
                    <th scope="col"
                    class="cursor-move rder-solid border-2">
                        <span class="">{{ convertColumnNames(column) }}</span>
                        <span @click="sortTable(searchResult, column)" class="pl-2 cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-sort"/>
                        </span>
                    </th>
                </template>
            </draggable>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="(person, index) in sortResult" :key="index"
            class="border-solid border-2 bg-white shadow">
                <td v-for="column in personItems" class="border-solid border-2">
                    <span v-if="column === 'homeworld'" class="">
                        <button
                        @click="openModal(
                            person[column]['name'],
                            convertDiameterFormat(person[column]['diameter']),
                            person[column]['climate'],
                            convertPopulationFormat(person[column]['population']))"
                        class="cursor-pointer">
                            {{ person[column]['name'] }}
                        </button>
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

</div>

</template>


<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>