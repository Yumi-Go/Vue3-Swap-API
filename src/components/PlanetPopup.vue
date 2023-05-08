<script setup>

const props = defineProps({
    planetName: String,
    planetDiameter: String,
    planetClimate: String,
    planetPopulation: String,
});

const emit = defineEmits([
    'closeModal'
]);

</script>

<template>

<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative" for="">

    <label for="my-modal-4" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

    <h3 class="text-lg font-bold py-5 divider">Homeworld</h3>
    <div class="card-body shadow-xl bg-gray-100">
        <p class="py-1">Planet Name: {{ planetName }}</p>
        <p class="py-1">Planet Diameter: {{ planetDiameter }}</p>
        <p class="py-1">Planet Climate: {{ planetClimate }}</p>
        <p class="py-1">Planet Population: {{ planetPopulation }}</p>
    </div>
  </label>
</label>

</template>



