import { ref } from 'vue'
import axios from 'axios'

export function useAxios() {

    function getData() {
        axios.get('https://swapi.dev/api/').then((response) => {
            console.log(response);
        });
        return response;
    }

}

export function useAxiosUsers() {
    const user = ref([]);
    axios.get('https://swapi.dev/api/people/').then((response) => {
        console.log(response);
        user.value.push = response;
    });
    return user;
}

export function useAxiosPlanets() {
    const planet = ref([]);
    axios.get('https://swapi.dev/api/planets/').then((response) => {
        console.log(response);
        planet.value.push = response;
    });
    return planet;
}
