<script setup>
import { ref } from 'vue';

const search = ref('');
</script>


<template>
    <input v-model="search" placeholder="Search"/>

    {{ search }}

    
</template>