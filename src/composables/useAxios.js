import { ref } from 'vue'
import axios from 'axios'
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });


export function useAxiosUsers() {
    
    const responsesList = [];
    for (let userCount = 1; userCount < 100; userCount++) {
        const response = axios.get(`https://swapi.dev/api/people/${userCount}`);
            responsesList.push(response);
    }

    responsesList.forEach(res => console.log(res));
    console.log("length: ", responsesList.length);
    return responsesList;











}


export function useAxiosPlanets() {
    axios.get('https://swapi.dev/api/planets/').then((response) => {
        if (getAllPlanets.value.length == 0) {
            response.data.results.forEach(planet => savePlanets.value.push(planet));

        }
    });
}
