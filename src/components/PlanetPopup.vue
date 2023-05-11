<script setup>

const props = defineProps({
    personName: String,
    planetName: String,
    planetDiameter: String,
    planetClimate: String,
    planetPopulation: String,
});

const emit = defineEmits([
    'closeModal'
]);

const homeworldItems = {
    Name: props.planetName,
    Diameter: props.planetDiameter,
    Climate: props.planetClimate,
    Population: props.planetPopulation
};

</script>

<template>

<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative">
        <div class="w-full mt-5">
            <div class="flex justify-between pb-5">
                <div>
                    <h3 class="text-lg font-bold text-indigo-900">
                        <font-awesome-icon icon="fa-solid fa-earth-americas" class="pr-2"/>
                        Homeworld
                    </h3>
                </div>
                <div class="">
                    <h3 class="text-lg font-bold text-gray-400">
                        {{ personName }}
                    </h3>
                </div>
            </div>
        </div>
        <div class="card-body bg-gray-100 border-gray-500 border-solid border-y-[1px]">
            <table class="table table-compact table-zebra w-full text-indigo-900 shadow-md">
                <tbody>
                    <tr v-for="(value, key) in homeworldItems">
                        <th>{{ key }}</th>
                        <td>{{ value }}</td>
                    </tr>
               </tbody>
            </table>
        </div>
        <div class="modal-action">
            <label for="my-modal-4" class="btn btn-outline btn-sm">Close</label>
        </div>
    </label>
</label>

</template>



