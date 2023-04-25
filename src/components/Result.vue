<script setup>
import { useFetchPeople } from '../composables/useFetch';
const { allPeople, allPlanets, currentPageNo, planets, personItems, savePeople } = useFetchPeople();

const pageNums = [1,2,3,4,5,6,7,8,9]; // this should be removed later

savePeople(currentPageNo.value);

function pageButtonClick(pageNum) {
    currentPageNo.value = pageNum;
    savePeople(currentPageNo.value);
}

function planetNameClick(personIndex) {
    planets.value.forEach(url => {

        
    });


}

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
            <tr v-for="(person, index) in allPeople" :key="index" class="border-solid border-2">
                <td class="border-solid border-2">{{ person.name }}</td>
                <td class="border-solid border-2">{{ person.height }}</td>
                <td class="border-solid border-2">{{ person.mass }}</td>
                <td class="border-solid border-2">{{ person.created }}</td>
                <td class="border-solid border-2">{{ person.edited }}</td>
                <td class="border-solid border-2"><span @click="planetNameClick(index)">{{ person.planet_name }}</span></td>
            </tr>
        </tbody>
    </table>
</div>

<div class="flex flex-row">
    <div v-for="pNum in pageNums">
        <button
        @click="pageButtonClick(pNum)"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none 
        bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700
        focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
        dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
            {{ pNum }}
        </button>
    </div>
</div>

</template>

<style>

.btn_clicked {
  font-weight: bold;
  background: #FFF3E0;
  color: rgb(185 28 28);
}

</style>
