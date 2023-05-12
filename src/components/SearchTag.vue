<script setup>
import { useSearch } from '../composables/useSearch';
import { useFetchData } from '../composables/useFetch';
import { useFormat } from '../composables/useFormat';

const { checkedColumns } = useSearch();
const { personItems } = useFetchData();
const { convertColumnNames } = useFormat();

function getColor(column) {
    const checked = checkedColumns.value.includes(column);
    const colors = {
        name: checked ? 'text-white bg-red-500' : 'text-red-700 bg-red-100',
        height: checked ? 'text-white bg-pink-500' : 'text-pink-700 bg-pink-100',
        mass: checked ? 'text-white bg-orange-500' : 'text-orange-700 bg-orange-100',
        created: checked ? 'text-white bg-lime-500' : 'text-lime-700 bg-lime-100',
        edited: checked ? 'text-white bg-teal-500' : 'text-teal-700 bg-teal-100',
        homeworld: checked ? 'text-white bg-violet-500' : 'text-violet-700 bg-violet-100',
    };
    return `rounded-full ${colors[column]} cursor-pointer`
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
    <div class="flex flex-row justify-center p-3 mt-5">
        <label
            v-for="(column, index) in personItems"
            :key="index"
            class="rounded-full cursor-pointer mx-2 p-2"
            :class="getColor(column)"
        >
            <input
                type="checkbox"
                class="hidden"
                :id="column"
                :name="column"
                :value="column"
                v-model="checkedColumns"
            >
                <span>
                    <font-awesome-icon
                        :icon="checkedColumns.includes(column) ? 'fa-solid fa-xmark' : 'fa-solid fa-check'"
                        class="w-4"
                    />
                </span>
                <span class="pl-2 mr-5 text-sm">
                    {{ convertColumnNames(column) }}
                </span>
        </label>
    </div>
    <div class="flex flex-row justify-center p-1 mb-10">
        <div class="flex justify-between">
            <div class="mr-5">
                <button class="btn btn-ghost btn-xs"
                    @click="selectAll()"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-check"
                        class="mr-2"
                    />
                    Select All
                </button>
            </div>
            <div class="ml-5">
                <button
                    class="btn btn-ghost btn-xs"
                    @click="deSelectAll()"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-xmark"
                        class="mr-2"
                    />
                    Deselect All
                </button>
            </div>
        </div>
    </div>
</template>