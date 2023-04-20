import { ref } from 'vue';
import axios from 'axios'
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });

// request data for every user at once

export function useAxiosUsers() {

    const userItems = ['name', 'height', 'mass', 'created', 'edited', 'planet name'];

    async function getEachPageUsers() {
        const responsesList = [];
        for (let pageCount = 1; pageCount < 10; pageCount++) {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/?page=${pageCount}`);
                if (response.status) {
                    responsesList.push(response);
                }
            } catch (error) {
                console.error(error);
            }
        }
        return responsesList;
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
            const usersRawDataEachPage = await getEachPageUsers();
            usersRawDataEachPage.forEach(rawUser => {
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

    async function getValidPlanets() {
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
        return responsesList;
    }

    async function refinePlanetsDB() {
        try {
            const allPlanetsRefinedData = [];            
            const planetsRawData = await getValidPlanets();
            planetsRawData.forEach(planet => {
                const planetRefinedData = [];
                for (const [key, value] of Object.entries(planet.data)) {
                    if (planetItems.includes(key)) {
                        planetRefinedData.push(value);
                    }
                }
                allPlanetsRefinedData.push(planetRefinedData);
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