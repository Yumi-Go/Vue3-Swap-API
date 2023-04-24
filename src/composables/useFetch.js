import { ref } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });
const getLoadedPages = useLocalStorage("planets", null, { serializer: StorageSerializers.object });
const currentPageNo = ref(1);
const newlyLoadedPageData = ref([]);

export function useFetchUsers() {

    const userItems = ['name', 'height', 'mass', 'created', 'edited', 'planet name'];

    async function singlePageUsers(pageNum) {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${pageNum}`);
            const jsonData = await response.json();
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

    async function refineUsersDB(pageNum) {
        try {
            const pageUsersRefinedData = [];
            const usersRawData = await singlePageUsers(pageNum);
            usersRawData.forEach(user => {
                const userRefinedData = {};
                for (const [key, value] of Object.entries(user)) {
                    if (userItems.includes(key)) {
                        userRefinedData[key] = value;                    
                    }
                    if (key === "homeworld") {
                        getPlanetName(value)
                        .then(planet => {
                            userRefinedData[key] = planet; // this push is working but planet name is not shown in local storage
                        });
                    }
                }
                pageUsersRefinedData.push(userRefinedData);
            });
            return pageUsersRefinedData;
        } catch (error) {
            console.error(error);
        }
    }

    async function saveUsersToStorage(pageNum) {
        try {
            if (getAllUsers.value.length < 1 || !(Object.keys(Object.values(getAllUsers.value)).includes(pageNum))) {
                const users = [];
                Object.values(await refineUsersDB(pageNum)).forEach(user => {
                    users.push(user);
                });
                saveUsers.value.push({[pageNum]: users});
                newlyLoadedPageData.value = {[pageNum]: users};
            }

        } catch (error) {
            console.error(error);
        }
    }

    async function getPageNums() {

    }



    return { currentPageNo, newlyLoadedPageData, userItems, saveUsersToStorage, getPageNums }
}


export function useFetchPlanets() {

    const planetItems = ['name', 'diameter', 'climate', 'population'];

    async function singlePagePlanets(pageNum) {
        try {
            const response = await fetch(`https://swapi.dev/api/planets/?page=${pageNum}`);
            const jsonData = await response.json();
            return jsonData.results;

        } catch (error) {
            console.error(error);
        }
    }

    async function refinePlanetsDB(pageNum) {
        try {
            const pagePlanetsRefinedData = [];
            const planetsRawData = await singlePagePlanets(pageNum);
            planetsRawData.forEach(planet => {
                const planetRefinedData = {};
                for (const [key, value] of Object.entries(planet)) {
                    if (planetItems.includes(key)) {
                        planetRefinedData[key] = value;                    
                    }
                }
                pagePlanetsRefinedData.push(planetRefinedData);
            });
            return pagePlanetsRefinedData;
        } catch (error) {
            console.error(error);
        }
    }

    async function savePlanetsToStorage(pageNum) {
        try {
            if (!Object.keys(savePlanets.value).includes(pageNum)) {
                Object.values(await refinePlanetsDB(pageNum)).forEach(planet => {
                    savePlanets.value.push(planet);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { planetItems, savePlanetsToStorage }
}