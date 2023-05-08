<script setup>
import { useFetchData } from '../composables/useFetch';
const { currentPageNo, isPrevPageExist, isNextPageExist } = useFetchData();

const props = defineProps({

});

const emit = defineEmits([
    'pageButtonClick'
]);

function prevPageButtonClick() {
    currentPageNo.value--;
    emit('pageButtonClick', currentPageNo.value);
}

function nextPageButtonClick() {
    currentPageNo.value++;
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

</template>



