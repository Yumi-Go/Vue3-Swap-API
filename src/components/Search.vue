<script setup>
import { useSearch } from '../composables/useSearch';
import { useFetchData } from '../composables/useFetch';
import { useFormat } from '../composables/useFormat';

const { search, checkedColumns } = useSearch();
const { personItems } = useFetchData();
const { convertColumnNames } = useFormat();

function searchTagBtn(column) {
    if (column === "name") {
        if (checkedColumns.value.includes(column)) {
            return "rounded-full text-white bg-red-500 cursor-pointer";
        } else {
            return "rounded-full text-red-700 bg-red-100 cursor-pointer";
        }
    }
    else if (column === "height") {
        if (checkedColumns.value.includes(column)) {
            return "rounded-full text-white bg-pink-500 cursor-pointer";
        } else {
            return "rounded-full text-pink-700 bg-pink-100 cursor-pointer";
        }
    }
    else if (column === "mass") {
        if (checkedColumns.value.includes(column)) {
            return "rounded-full text-white bg-orange-500 cursor-pointer";
        } else {
            return "rounded-full text-orange-700 bg-orange-100 cursor-pointer";
        }
    }
    else if (column === "created") {
        if (checkedColumns.value.includes(column)) {
            return "rounded-full text-white bg-lime-500 cursor-pointer";
        } else {
            return "rounded-full text-lime-700 bg-lime-100 cursor-pointer";
        }
    }
    else if (column === "edited") {
        if (checkedColumns.value.includes(column)) {
            return "rounded-full text-white bg-teal-500 cursor-pointer";
        } else {
            return "rounded-full text-teal-700 bg-teal-100 cursor-pointer";
        }
    }
    else if (column === "homeworld") {
        if (checkedColumns.value.includes(column)) {
            return "rounded-full text-white bg-violet-500 cursor-pointer";
        } else {
            return "rounded-full text-violet-700 bg-violet-100 cursor-pointer";
        }
    }
}

function selectAll() {
    personItems.forEach(column => {
        if (!(checkedColumns.value.includes(column))) {
            checkedColumns.value.push(column);
        }
    })
}
function deSelectAll() {
    checkedColumns.value = [];
}

</script>


<template>

<div class="flex flex-row justify-center p-3 my-5">
    <div class="flex w-[1000px]">
        <label class="relative w-full">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <div class="p-2">
                    <font-awesome-icon icon="fa-magnifying-glass" size="lg" class=""/>
                </div>
            </span>
            <input
            class="placeholder:italic placeholder:text-slate-400 flex
            bg-white w-full border border-slate-300 rounded-md py-3 pl-12 pr-3
            shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500
            focus:ring-1 sm:text-sm"
            placeholder="Type to search..." type="text" name="search"
            v-model="search" id="searchInput"/>
        </label>
    </div>
</div>

<div class="flex flex-row justify-center p-3 mt-5">
    <label v-for="(column, index) in personItems" :key="index"
    class="mx-2 p-2"
    :class="searchTagBtn(column)">
        <input type="checkbox" class="hidden" :id="column" :name="column" :value="column" v-model="checkedColumns">
            <span v-if="checkedColumns.includes(column)">
                <font-awesome-icon icon="fa-solid fa-xmark"/>
            </span>
            <span v-else>
                <font-awesome-icon icon="fa-solid fa-check"/>
            </span>
            <span class="pl-2 mr-5 text-sm">
                {{ convertColumnNames(column) }}
            </span>
    </label>
</div>

<div class="flex flex-row justify-center p-1 mb-10">
    <div class="flex justify-between">
        <div class="mr-5">
            <button class="btn btn-ghost btn-xs" @click="selectAll()">
                <font-awesome-icon icon="fa-solid fa-check" class="mr-2"/>
                Select All
            </button>
        </div>
        <div class="ml-5">
            <button class="btn btn-ghost btn-xs" @click="deSelectAll()">
                <font-awesome-icon icon="fa-solid fa-xmark" class="mr-2"/>
                Deselect All
            </button>
        </div>
    </div>
</div>

</template>
