<script setup>
import { Modal } from 'flowbite-vue'

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

<Modal :size="size" @close="$emit('closeModal')">
    <template #header>
        <div class="flex items-center text-lg">
          Homeworld
        </div>
    </template>
    <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Planet Name: {{ planetName }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Planet Diameter: {{ planetDiameter }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Planet Climate: {{ planetClimate }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Planet Population: {{ planetPopulation }}
        </p>
    </template>
    <template #footer>
        <div class="flex justify-between">
            <button @click="$emit('closeModal')" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Close
            </button>
        </div>
    </template>
</Modal>

</template>



