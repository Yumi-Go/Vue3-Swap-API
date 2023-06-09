<script setup>

import { onBeforeMount, ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useFetchData } from '../composables/useFetch'
import { useSearch } from '../composables/useSearch'
import { useSort } from '../composables/useSort'
import { useFormat } from '../composables/useFormat'
import PlanetPopup from './PlanetPopup.vue'
import Page from './Page.vue'
import draggable from 'vuedraggable'

const allData = useLocalStorage('all', []);
const { personItems, numberOfItemsPerPage, totalNumberOfPages, fetchData } = useFetchData();
const { searchResult, search, checkedColumns, filterByColumns } = useSearch();
const { sortResult, sortTable } = useSort();
const { convertColumnNames, convertDateFormat } = useFormat();

const currentPage = ref(1);
const entireSortResult = ref([]);
const eachPageSortResult = ref([]);
const startIndexInPage = ref([]);
const endIndexInPage = ref([]);

onBeforeMount(async () => {
    await fetchData();
    filterByColumns(allData.value);
    entireSortResult.value = allData.value;
    pageButtonClick(1);
});

function getColumnColor(column) {
    return {
        name: "bg-red-50",
        height: "bg-pink-50",
        mass: "bg-orange-50",
        created: "bg-lime-50",
        edited: "bg-teal-50",
        homeworld: "bg-violet-50"
    }[column]
}

function getThColor(column) {
    return {
        name: "bg-red-200",
        height: "bg-pink-200",
        mass: "bg-orange-200",
        created: "bg-lime-200",
        edited: "bg-teal-200",
        homeworld: "bg-violet-200"
    }[column]
}

const isModalOpened = ref(false);
const personName = ref('');
const planet = ref({});

watch(search, () => {
    pageButtonClick(currentPage.value);
    filterByColumns(eachPageSortResult.value);
    eachPageSortResult.value = searchResult.value;
});
watch(checkedColumns, () => {
    eachPageSortResult.value = entireSortResult.value.slice(startIndexInPage.value - 1, endIndexInPage.value);
    filterByColumns(eachPageSortResult.value);
    eachPageSortResult.value = searchResult.value;
});

function holdLatestSortResult(column) {
    sortTable(allData.value, column);
    entireSortResult.value = sortResult.value;
    eachPageSortResult.value = sortResult.value.slice(startIndexInPage.value - 1, endIndexInPage.value);
}

function closeModal() {
    isModalOpened.value = false;
}
function openModal(person_name, planetObj) {
    personName.value = person_name;
    planet.value = planetObj;
    isModalOpened.value = true;
}

function setPageData(page) {
    startIndexInPage.value = (page * numberOfItemsPerPage) - (numberOfItemsPerPage - 1);
    endIndexInPage.value = Math.min(startIndexInPage.value + numberOfItemsPerPage - 1, allData.value.length);
}

function pageButtonClick(page) {
    currentPage.value = page;
    setPageData(page);
    eachPageSortResult.value = entireSortResult.value.slice(startIndexInPage.value - 1, endIndexInPage.value);
}

function dragNdrop() {
    filterByColumns(entireSortResult.value);
    eachPageSortResult.value = entireSortResult.value.slice(startIndexInPage.value - 1, endIndexInPage.value);
}

</script>

<template>
    <PlanetPopup
        v-if="isModalOpened"
        :personName="personName"
        :planet="planet"
        @closeModal="closeModal"
    />
    <div class="flex flex-row justify-center overflow-x-auto">
        <table class="w-[90%] table-fixed tracking-wide">
            <colgroup v-for="column in personItems">
                <col :class=getColumnColor(column)>
            </colgroup>
            <thead>
                <draggable
                    :list="personItems"
                    tag="tr"
                    @end="dragNdrop()"
                    :item-key="(key) => key"
                    ghost-class="ghost"
                >
                    <template #item="{ element: item }">
                        <th
                        scope="col"
                        :class=getThColor(item)
                        class="cursor-move py-5">
                            <span class="">{{ convertColumnNames(item) }}</span>
                            <span @click="holdLatestSortResult(item)" class="pl-2 cursor-pointer">
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
                    v-for="(person, index) in eachPageSortResult"
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
                                        person[column]
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
    <div class="flex flex-row justify-center mt-5">
        <Page :currentPage="currentPage" @pageButtonClick="pageButtonClick"/>
    </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: black;
}
</style>