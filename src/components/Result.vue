<script setup>

import { onBeforeMount, ref } from 'vue';
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';
import { useSort } from '../composables/useSort';
import PlanetPopup from './PlanetPopup.vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
// import Draggable from 'vue3-draggable';
import draggable from 'vuedraggable';

const { personItems, fetchData } = useFetchData();
const { result, filterByName } = useSearch();
const { sortTable } = useSort();


const getData = useLocalStorage("all", null, { serializer: StorageSerializers.object });
console.log("getData: ", getData.value);

onBeforeMount(async () => {
    await fetchData();
    filterByName(getData.value);
    console.log("result inside onBeforeMount: ", result.value);
})

console.log("result outside onBeforeMount: ", result.value);

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

    <table class="w-[1000px] table-auto">
        <thead class="">
            <tr class="border-solid border-2">
                <th
                v-for="column in personItems"
                @click="sortTable(getData, column)"
                class="cursor-pointer">
                {{ capitalizeColumnNames(column) }}
            </th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <draggable v-model="result" tag="tr">
                <template #item="{ person }">

            <!-- <tr v-for="person in filterByName(getData)" :key="index"
            id="draggableRow"
            class="border-solid border-2 bg-white shadow cursor-move"
            draggable="true"> -->
                <td class="">{{ person.name }}</td>
                <td class="">{{ person.height }}</td>
                <td class="">{{ person.mass }}</td>
                <td class="">{{ person.created }}</td>
                <td class="">{{ person.edited }}</td>
                <td class="">
                    <button
                    @click="openModal(person.homeworld.name, person.homeworld.diameter, person.homeworld.climate, person.homeworld.population)"
                    class="cursor-pointer">
                        {{ person.homeworld.name }}
                    </button>
                </td>

            <!-- </tr> -->
            </template>
        </draggable>
        </tbody>
    </table>
</div>

<div class="flex flex-row">

</div>

</template>
