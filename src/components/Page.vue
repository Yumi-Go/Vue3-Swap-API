<script setup>
import { useFetchData } from '../composables/useFetch';
const { currentPageNo, isPrevPageExist, isNextPageExist, lastPageNo } = useFetchData();

const emit = defineEmits([
    'pageButtonClick'
]);

function prevPageButtonClick() {
    if (currentPageNo.value > 0) {
        currentPageNo.value--;
        emit('pageButtonClick', currentPageNo.value);
    }
}

function nextPageButtonClick() {
    if (lastPageNo.value === null || currentPageNo.value !== lastPageNo.value ) {
        currentPageNo.value++;
        emit('pageButtonClick', currentPageNo.value);
    }
}
</script>

<template>
    <div class="flex justify-center w-full py-10">
        <div class="btn-group">
            <button v-if="isPrevPageExist"
            @click="prevPageButtonClick()"
            class="btn btn-ghost">
                <font-awesome-icon icon="fa-solid fa-arrow-left"/>
            </button>
            <button
            class="btn btn-ghost">
                Page {{ currentPageNo }}
            </button>
            <button v-if="isNextPageExist"
            @click="nextPageButtonClick()"
            class="btn btn-ghost">
                <font-awesome-icon icon="fa-solid fa-arrow-right"/>
            </button>
        </div>
    </div>
</template>