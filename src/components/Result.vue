<script setup>

import { onBeforeMount, ref, watch } from 'vue';
import { useFetchData } from '../composables/useFetch';
import { useSearch } from '../composables/useSearch';
import { useSort } from '../composables/useSort';
import { useFormat } from '../composables/useFormat';
import PlanetPopup from './PlanetPopup.vue';
import Page from './Page.vue';
import { useLocalStorage } from '@vueuse/core';
import draggable from 'vuedraggable';

const { personItems, saveData } = useFetchData();

const allData = useLocalStorage('all', []);

const { searchResult, search, checkedColumns, filterByColumns } = useSearch();
const { sortResult, sortTable } = useSort();
const { convertColumnNames, convertDateFormat, convertPopulationFormat, convertDiameterFormat } = useFormat();

const entireSortResult = ref([]);

onBeforeMount(async () => {
    await saveData(1);
    filterByColumns(allData.value);
    entireSortResult.value = allData.value;
});

function getColor(item, saturation = 50) {
    return {
        name: `bg-red-${saturation}`,
        height: `bg-pink-${saturation}`,
        mass: `bg-orange-${saturation}`,
        created: `bg-lime-${saturation}`,
        edited: `bg-teal-${saturation}`,
        homeworld: `bg-violet-${saturation}`
    }[item]
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
    sortTable(allData.value, column);
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
    filterByColumns(allData.value);
    entireSortResult.value = allData.value;
}
</script>

<template>
  <PlanetPopup
    v-if="isModalOpened"
    :personName="personName"
    :planetName="planetName"
    :planetDiameter="planetDiameter"
    :planetClimate="planetClimate"
    :planetPopulation="planetPopulation"
    @closeModal="closeModal"
  />

  <div class="flex flex-row justify-center overflow-x-auto">
    <table class="w-[90%] table-fixed tracking-wide">
      <colgroup v-for="column in personItems" class="z-10">
        <col :class="getColor(column, 50)" />
      </colgroup>
      <thead>
        <draggable
          v-model="personItems"
          tag="tr"
          :item-key="(key) => key"
          @end="filterByColumns(sortResult)"
          ghost-class="ghost"
        >
          <template #item="{ element: column }">
            <th
              scope="col"
              :class="getColor(column, 200)"
              class="cursor-move py-5 z-20"
            >
              <span>{{ convertColumnNames(column) }}</span>
              <span
                @click="holdEntireSortResult(column)"
                class="pl-2 cursor-pointer"
              >
                <font-awesome-icon
                  icon="fa-solid fa-sort"
                  class="text-gray-500 opacity-50 hover:text-black"
                />
              </span>
            </th>
          </template>
        </draggable>
      </thead>
      <tbody>
        <tr
          v-for="(person, index) in sortResult"
          :key="index"
          class="border-b-[1px] hover:bg-gray-100"
        >
          <td v-for="column in personItems" class="p-5">
            <span v-if="column === 'homeworld'">
              <label
                for="my-modal-4"
                v-if="person[column]['name'] === 'unknown'"
                class="cursor-text"
              >
                {{ person[column]["name"] }}
              </label>
              <label
                for="my-modal-4"
                v-else
                class="cursor-pointer text-indigo-900"
                @click="
                  openModal(
                    person['name'],
                    person[column]['name'],
                    convertDiameterFormat(person[column]['diameter']),
                    person[column]['climate'],
                    convertPopulationFormat(person[column]['population'])
                  )
                "
              >
                <font-awesome-icon
                  icon="fa-solid fa-arrow-up-right-from-square"
                  size="2xs"
                  class="pr-2"
                />
                {{ person[column]["name"] }}
              </label>
            </span>
            <span v-else-if="column === 'created' || column === 'edited'">
              {{ convertDateFormat(person[column]) }}
            </span>
            <span v-else>
              {{ person[column] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-row">
    <Page @pageButtonClick="pageButtonClick" />
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: black;
}
</style>
