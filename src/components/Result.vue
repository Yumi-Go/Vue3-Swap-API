<script setup>
import { useFetchPeople } from '../composables/useFetch';
// const { allPeople, allPlanets, currentPageNo, planets, personItems, savePeople } = useFetchPeople();
const { fetchData } = useFetchPeople();

fetchData();

</script>

<template>


</template>

<style>

.btn_clicked {
  font-weight: bold;
  background: #FFF3E0;
  color: rgb(185 28 28);
}

</style>
