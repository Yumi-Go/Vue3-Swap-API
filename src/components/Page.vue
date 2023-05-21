<script setup>
import { useFetchData } from '../composables/useFetch'

const { totalNumberOfPages } = useFetchData();

const props = defineProps({
    currentPage: Number
});
const emit = defineEmits([
    'pageButtonClick'
]);

function pageButtonClick(pNum) {
    emit('pageButtonClick', pNum);
}
</script>
<template>
    <div class="flex flex-row">
        <div v-if="totalNumberOfPages > 0" v-for="pNum in totalNumberOfPages" class="">
            
            <div class="btn-group">
                <button
                    class="m-1"
                    :class="[currentPage === pNum ? 'btn' : 'btn btn-outline']"
                    @click="pageButtonClick(pNum)"
                >
                    {{ pNum }}
                </button>
            </div>
        </div>
    </div>
</template>
