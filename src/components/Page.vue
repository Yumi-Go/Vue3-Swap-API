<script setup>
import { useFetchData } from '../composables/useFetch';
const { currentPageNo, isPrevPageExist, isNextPageExist } = useFetchData();

const props = defineProps({

});

const emit = defineEmits([
    'pageButtonClick'
]);
const pageNums = 9;

function generateButtons(prev, next) {

}

function goPreviousPage(current) {
    currentPageNo.value--;
}

function goNextPage(current) {
    currentPageNo.value++;

}

// function pageButtonClick(pNum) {
//     emit('pageButtonClick', pNum);
// }

function prevPageButtonClick() {
    currentPageNo.value--;
    console.log("current: ", currentPageNo.value);
    console.log("prev: ", currentPageNo.value-1);
    emit('pageButtonClick', currentPageNo.value);
}

function nextPageButtonClick() {
    currentPageNo.value++;
    console.log("current: ", currentPageNo.value);
    console.log("next: ", currentPageNo.value+1);
    emit('pageButtonClick', currentPageNo.value);
}

</script>



<template>

<div class="flex flex-row justify-center">
    <div class="btn-group">
        <button v-if="isPrevPageExist" @click="prevPageButtonClick()" class="btn">«</button>
        <button class="btn">Page {{ currentPageNo }}</button>
        <button v-if="isNextPageExist" @click="nextPageButtonClick()" class="btn">»</button>
    </div>
</div>

<!-- <div class="flex flex-row justify-center">
    <div v-for="pNum in pageNums" class="">
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
</div> -->


</template>



