<script setup>
import axios from 'axios';

</script>


<template>

<div>


    <table class="table table-striped">
        <thead>
            <tr>
                <th>table head</th> <!-- dynamic column name rendering here -->
            </tr>
        </thead>
        <tbody>
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