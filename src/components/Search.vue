<script setup>
import { ref } from 'vue';

const search = ref('');
</script>


<template>
    
    <div class="flex flex-row bg-indigo-900">
        <div class="flex justify-center items-center p-2"><font-awesome-icon icon="fa-magnifying-glass" size="lg" /></div>
        <div>
            <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-gray-500"
            placeholder="Type to search..."
            type="text"
            id="searchInput"
            name="search"/>
        </div>
    </div>

    {{ search }}

</template>

<style>



</style>