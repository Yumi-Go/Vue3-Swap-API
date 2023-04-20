import axios from 'axios'
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

export function useAxiosUsers() {

    const userItems = ['name', 'height', 'mass', 'created', 'edited', 'planet name'];

    async function getAllPagesUsers() {
        try {
            const responsesList = [];
            let pageCount = 1;
            let isNextPageExists = true;
            while (isNextPageExists) {
                const response = await axios.get(`https://swapi.dev/api/people/?page=${pageCount}`);
                responsesList.push(response);
                pageCount++;
                isNextPageExists = await response.data.next != null ? true : false;
            }
            return responsesList;
        } catch (error) {
            console.error(error);
        }
    }

    async function getPlanetName(planetURL) {
        try {
            const response = await axios.get(planetURL);
            return response.data.name;
        } catch (error) {
            console.error(error);
        }
    }

    async function refineUsersDB() {
        try {
            const allUsersRefinedData = [];
            const allUsersRawData = await getAllPagesUsers();
            allUsersRawData.forEach(rawUser => {
                Object.values(rawUser.data.results).forEach(user => {
                    const userRefinedData = [];
                    for (const [key, value] of Object.entries(user)) {
                        if (userItems.includes(key)) {
                            userRefinedData.push(value);
                        }
                        if (key === "homeworld") {
                            Promise.resolve(getPlanetName(value))
                            .then(pName => {
                                userRefinedData.push(pName); // this push is working but planet name is not shown in local storage
                            });
                        }
                    }
                    allUsersRefinedData.push(userRefinedData);
                });
            });
            return allUsersRefinedData;
        } catch (error) {
            console.error(error);
        }
    }

    async function saveUsersToStorage() {
        try {
            if (getAllUsers.value.length < 1) {
                Object.values(await refineUsersDB()).forEach(user => {
                    saveUsers.value.push(user);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { userItems, saveUsersToStorage }
}


export function useAxiosPlanets() {

    const planetItems = ['name', 'diameter', 'climate', 'population'];

    async function getAllPagesPlanets() {
        try {
            const responsesList = [];
            let pageCount = 1;
            let isNextPageExists = true;
            while (isNextPageExists) {
                const response = await axios.get(`https://swapi.dev/api/planets/?page=${pageCount}`);
                responsesList.push(response);
                pageCount++;
                isNextPageExists = await response.data.next != null ? true : false;
            }
            return responsesList;
        } catch (error) {
            console.error(error);
        }
    }

    async function refinePlanetsDB() {
        try {
            const allPlanetsRefinedData = [];            
            const allPlanetsRawData = await getAllPagesPlanets();
            allPlanetsRawData.forEach(rawPlanet => {
                Object.values(rawPlanet.data.results).forEach(planet => {
                    const planetRefinedData = [];
                    for (const [key, value] of Object.entries(planet)) {
                        if (planetItems.includes(key)) {
                            planetRefinedData.push(value);
                        }
                    }
                    allPlanetsRefinedData.push(planetRefinedData);
                });
            });
            return allPlanetsRefinedData;
        } catch (error) {
            console.error(error);
        }
    }

    async function savePlanetsToStorage() {
        try {
            if (getAllPlanets.value.length < 1) {
                Object.values(await refinePlanetsDB()).forEach(planet => {
                    savePlanets.value.push(planet);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { planetItems, savePlanetsToStorage }
}