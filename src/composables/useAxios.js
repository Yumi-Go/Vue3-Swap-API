import { ref } from 'vue'
import axios from 'axios'
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });


export async function useAxiosUsers() {
    
    const responsesList = [];
    for (let userCount = 1; userCount < 100; userCount++) {
        try {
            const response = await axios.get(`https://swapi.dev/api/people/${userCount}`);
            if (response.status) {
                responsesList.push(response);
            }
        } catch (error) {
            console.error(error);
        }   
    }
    responsesList.forEach(res => console.log(res));
    console.log("users length: ", responsesList.length);
    return responsesList;

}

export async function useAxiosPlanets() {
    const responsesList = [];
    for (let planetCount = 1; planetCount < 100; planetCount++) {
        try {
            const response = await axios.get(`https://swapi.dev/api/planets/${planetCount}`);
            if (response.status) {
                responsesList.push(response);
            }
        } catch (error) {
            console.error(error);
        }   
    }
    responsesList.forEach(res => console.log(res));
    console.log("planets length: ", responsesList.length);
    return responsesList;
}





// export function useAxiosPlanets() {
//     axios.get('https://swapi.dev/api/planets/').then((response) => {
//         if (getAllPlanets.value.length == 0) {
//             response.data.results.forEach(planet => savePlanets.value.push(planet));

//         }
//     });
// }
