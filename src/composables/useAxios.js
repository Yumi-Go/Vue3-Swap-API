import { ref } from 'vue'
import axios from 'axios'
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

export function useAxiosUsers() {
    axios.get('https://swapi.dev/api/people/').then((response) => {
        // console.log(response.data.results);
        // user.value.push = response;
        if (getAllUsers.value.length == 0) {
            // saveUsers.value.push(response.data.results);
            response.data.results.forEach(user => saveUsers.value.push(user));
        }

    });
}

export function useAxiosPlanets() {
    axios.get('https://swapi.dev/api/planets/').then((response) => {
        // console.log(response.data.results);
        // planet.value.push = response;
        if (getAllPlanets.value.length == 0) {
            // savePlanets.value.push(response.data.results);
            response.data.results.forEach(planet => savePlanets.value.push(planet));

        }
    });
}
