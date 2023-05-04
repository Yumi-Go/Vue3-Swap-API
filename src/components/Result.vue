<script setup>

import { onBeforeMount, ref, watch } from 'vue';
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';
import { useSort } from '../composables/useSort';
import PlanetPopup from './PlanetPopup.vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import Draggable from 'vuedraggable';

const { personItems, fetchData } = useFetchData();

const getData = useLocalStorage("all", null, { serializer: StorageSerializers.object });

const { searchResult, search, filterByName } = useSearch();
const { sortResult, sortTable } = useSort();

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
watch(search, () => filterByName(getData.value));

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

function convertColumnNames(name) {
    if (name === 'homeworld') {
        return 'Planet Name';
    }
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
            class="border-solid border-2 bg-white shadow cursor-move">
                <td v-for="column in personItems" class="border-solid border-2">
                    <span v-if="column !== 'homeworld'" class="">{{ person[column] }}</span>
                    <span v-else class="">
                        <button
                        @click="openModal(person[column]['name'], person[column]['diameter'], person[column]['climate'], person[column]['population'])"
                        class="cursor-pointer">
                            {{ person[column]['name'] }}
                        </button>
                    </span>
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