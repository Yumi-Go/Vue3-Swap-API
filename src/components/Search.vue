<script setup>
import Result from './Result.vue'
import { useSearch } from '../composables/useSearch';

const { search } = useSearch();

</script>


<template>
    
    <div class="flex flex-row bg-indigo-900">
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
    <Result/>
</template>

<style>



</style>