<script setup>

import { onBeforeMount, onMounted, ref } from 'vue'
import { useFetchData } from '../composables/useFetch';
import PlanetPopup from './PlanetPopup.vue';

const { personItems, fetchData } = useFetchData();
const allData = ref([]);
const columnNames = ['Name', 'Height', 'Mass', 'Created', 'Edited', 'Planet Name'];

const isModalOpened = ref(false);
const planetName = ref('');
const planetDiameter = ref('');
const planetClimate = ref('');
const planetPopulation = ref('');

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

// function sortTable(column) {
//     console.log("column: ", column);
//     if (column !== prevColumn) {
//         let num = allData.value.filter((el) => typeof el[column] === "number").sort((a, b) => a[column] - b[column]);
//         let str = allData.value.filter((el) => typeof el[column] === "string").sort();
//         return num.concat(str);
//     } else {
//         allData.value.reverse();
//     }
//     prevColumn = column;
// }

function changeUnknown(value){
    if (value === 'unknown') return 0;
    else return value;
}

function sortTable(column) {
    console.log("column: ", column);
    if (column !== prevColumn) {
        allData.value.sort((a, b) => {
            console.log("a[column]: ", a[column]);
            console.log("b[column]: ", b[column]);
            return changeUnknown(a[column]) - changeUnknown(b[column]);
        });
    } else {
        allData.value.reverse();
    }
    prevColumn = column;
}



// function sortTable(column) {
//     console.log("column: ", column);
//     if (column !== prevColumn) {
//         allData.value.sort((a, b) => {
//             console.log("a[column]: ", a[column]);
//             console.log("b[column]: ", b[column]);
//             if (typeof a[column] === 'number' && typeof b[column] === 'number') {
//                 return a[column] - b[column];
//             }
//             if (typeof a[column] === 'number' && typeof b[column] === 'string') {
//                 return -1;
//             }
//             if (typeof a[column] === 'string' && typeof b[column] === 'string') {
//                 return (a[column] < b[column]) ? -1 : 1;
//             }
//             return 0;
//         });
//     } else {
//         allData.value.reverse();
//     }
//     prevColumn = column;
// }

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
                {{ column }}
            </th>
            </tr>
        </thead>
        <tbody class="border-solid border-2">
            <tr v-for="(person, index) in allData" :key="index" class="border-solid border-2">
                <!-- <td class="border-solid border-2">{{ index + 1 }}</td> -->
                <td class="border-solid border-2">{{ person.name }}</td>
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
