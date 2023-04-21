import { ref } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });
const alreadyLoadedPages = ref([]);
const currentPage = ref([1]);

export function useFetchUsers() {

    const userItems = ['name', 'height', 'mass', 'created', 'edited', 'planet name'];

    async function singlePageUsers(pNum) {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${pNum}`);
            const jsonData = await response.json();
            console.log("jsonData.results: ", jsonData.results);
            return jsonData.results;

        } catch (error) {
            console.error(error);
        }
    }

    async function getPlanetName(planetURL) {
        try {
            const response = await fetch(planetURL);
            const jsonData = await response.json();
            return jsonData.name;
        } catch (error) {
            console.error(error);
        }
    }

    async function refineUsersDB(pNum) {
        try {
            const pageUsersRefinedData = [];
            const usersRawData = await singlePageUsers(pNum);
            console.log("usersRawData", usersRawData);

            usersRawData.forEach(user => {
                const userRefinedData = {};
                for (const [key, value] of Object.entries(user)) {
                    if (userItems.includes(key)) {
                        userRefinedData[key] = value;                    
                    }
                    if (key === "homeworld") {
                        getPlanetName(value)
                        .then(planet => {
                            console.log("planet: ", planet);
                            console.log("type of planet: ", typeof planet);
                            userRefinedData[key] = planet; // this push is working but planet name is not shown in local storage
                        });
                    }
                }
                console.log("userRefinedData: ", userRefinedData);
                pageUsersRefinedData.push(userRefinedData);
                console.log("pageUsersRefinedData: ", pageUsersRefinedData);
            });
            return pageUsersRefinedData;
        } catch (error) {
            console.error(error);
        }
    }

    async function saveUsersToStorage(pNum) {
        try {
            if (!alreadyLoadedPages.includes(pNum)) {
                Object.values(await refineUsersDB(pNum)).forEach(user => {
                    saveUsers.value.push(user);
                });
                alreadyLoadedPages.push(pNum);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { userItems, saveUsersToStorage }
}


export function useFetchPlanets() {

    const planetItems = ['name', 'diameter', 'climate', 'population'];

    async function singlePagePlanets(pNum) {
        try {
            const response = await fetch(`https://swapi.dev/api/planets/?page=${pNum}`);
            const jsonData = await response.json();
            console.log("jsonData.results: ", jsonData.results);
            return jsonData.results;

        } catch (error) {
            console.error(error);
        }
    }

    async function refinePlanetsDB(pNum) {
        try {
            const pagePlanetsRefinedData = [];
            const planetsRawData = await singlePagePlanets(pNum);
            console.log("planetsRawData", planetsRawData);

            planetsRawData.forEach(planet => {
                const planetRefinedData = {};
                console.log("planet: ", planet);
                for (const [key, value] of Object.entries(planet)) {
                    if (planetItems.includes(key)) {
                        planetRefinedData[key] = value;                    
                    }
                }
                console.log("planetRefinedData: ", planetRefinedData);
                pagePlanetsRefinedData.push(planetRefinedData);
                console.log("pageUsersRefinedData: ", pagePlanetsRefinedData);
            });
            return pagePlanetsRefinedData;
        } catch (error) {
            console.error(error);
        }
    }


    async function savePlanetsToStorage(pNum) {
        try {
            if (!alreadyLoadedPages.includes(pNum)) {
                Object.values(await refinePlanetsDB(pNum)).forEach(planet => {
                    savePlanets.value.push(planet);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { planetItems, savePlanetsToStorage }
}