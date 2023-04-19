import axios from 'axios'
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });


export function useAxiosUsers() {

    const userItems = ['name', 'height', 'mass', 'created', 'edited', 'planet name'];

    async function getValidUsers() {
        const responsesList = [];
        for (let userCount = 1; userCount < 100; userCount++) {
            try {
                const response = await axios
                .get(`https://swapi.dev/api/people/${userCount}`);
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
        let result = "";
        await axios
        .get(planetURL)
        .then((response) => {
            result = response.data.name;
        });
        return result;
    }

    async function refineUsersDB() {
        const allUsersRefinedData = [];
        const usersPromise = Promise.resolve(getValidUsers());
        await usersPromise
        .then((user) => {
            const userRawData = Object.values(user);
            userRawData.forEach(el => {
                const userRefinedData = [];
                for (const [key, value] of Object.entries(el.data)) {
                    if (userItems.includes(key)) {
                        userRefinedData.push(value);
                    }
                    if (key === "homeworld") {
                        getPlanetName(value);
                        const planetNamesPromise = Promise.resolve(getPlanetName(value));
                        planetNamesPromise.then((planetName) => {
                            userRefinedData.push(planetName);
                        });
                    }
                }
                allUsersRefinedData.push(userRefinedData);
            });
        });
        return allUsersRefinedData;
    }

    async function saveUsersToStorage() {
        if (getAllUsers.value.length < 1) {
            Object.values(await refineUsersDB()).forEach(user => {
                saveUsers.value.push(user);
            });
            saveUsers.value.push(await refineUsersDB());
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
                const response = await axios
                .get(`https://swapi.dev/api/planets/${planetCount}`);
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
        const allPlanetsRefinedData = [];
        const planetsPromise = Promise.resolve(getValidPlanets());
        await planetsPromise
        .then((planet) => {
            const planetRawData = Object.values(planet);
            planetRawData.forEach(el => {
                const planetRefinedData = [];
                for (const [key, value] of Object.entries(el.data)) {
                    if (planetItems.includes(key)) {
                        planetRefinedData.push(value);
                    }
                }
                allPlanetsRefinedData.push(planetRefinedData);
            });
        });
        return allPlanetsRefinedData;
    }

    async function savePlanetsToStorage() {
        
        if (getAllPlanets.value.length < 1) {
            Object.values(await refinePlanetsDB()).forEach(planet => {
                savePlanets.value.push(planet);
            });
        }
    }
    return { planetItems, savePlanetsToStorage }
}