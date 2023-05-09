<script setup>

import { useSearch } from '../composables/useSearch';
import { useFetchData } from '../composables/useFetch';
import { useFormat } from '../composables/useFormat';

const { search, checkedColumns } = useSearch();
const { personItems } = useFetchData();
const { convertColumnNames } = useFormat();

</script>


<template>
    
<div class="flex flex-row justify-center bg-indigo-900">
    <div class="w-[1000px] flex justify-between">
        <div class="p-2"><font-awesome-icon icon="fa-magnifying-glass" size="lg"/></div>
        <div class="w-full">
            <input
            class="my-2 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-gray-500"
            placeholder="Type to search..."
            type="text"
            v-model="search"
            id="searchInput"
            name="search"/>
        </div>
    </div>
</div>

<div class="flex flex-row justify-center">
    <fieldset class="p-3 my-5 border-solid border-2 border-indigo-200">
        <legend>Check the columns to be searched.</legend>
        <label v-for="(column, index) in personItems" :key="index">
            <input type="checkbox" :id="column" :name="column" :value="column" v-model="checkedColumns">
            <span class="pl-2 mr-5">{{ convertColumnNames(column) }}</span>
        </label>
        <!-- <Button color="default" outline>search</Button> -->
    </fieldset>
</div>
</template>
