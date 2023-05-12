<script setup>
import { useSearch } from '../composables/useSearch';
const { search } = useSearch();
</script>

<template>
    <div class="flex flex-row justify-center p-3 my-5">
        <div class="flex w-[1000px]">
            <label class="relative w-full">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <div class="p-2">
                        <font-awesome-icon
                            icon="fa-magnifying-glass"
                            size="lg"
                        />
                    </div>
                </span>
                <input
                    class="placeholder:italic placeholder:text-slate-400 flex
                    bg-white w-full border border-slate-300 rounded-md py-3 pl-12 pr-3
                    shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500
                    focus:ring-1 sm:text-sm"
                    placeholder="Type to search..."
                    type="text"
                    name="search"
                    v-model="search"
                    id="searchInput"
                />
            </label>
        </div>
    </div>
</template>