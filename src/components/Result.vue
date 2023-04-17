<script setup>
import axios from 'axios';

</script>


<template>

<div>


    <table class="">
        <thead class="">
            <tr class="bg-gray-500">
                <th>table head</th> <!-- dynamic column name rendering here -->
            </tr>
        </thead>
        <tbody class="">
            <tr>
                <td>table cell</td> <!-- dynamic value rendering here -->
            </tr>
        </tbody>
    </table>


</div>


</template>

<style scoped>
.list-group-item {
    border-radius: 0;
}
</style>