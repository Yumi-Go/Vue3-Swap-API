import { ref } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const saveUsers = useLocalStorage('users', []);
const savePlanets = useLocalStorage('planets', []);
const getAllUsers = useLocalStorage("users", null, { serializer: StorageSerializers.object });
const getAllPlanets = useLocalStorage("planets", null, { serializer: StorageSerializers.object });
const alreadyLoadedPages = ref([]);
const currentPage = ref([1]);
const currentPageData = ref([]);

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
            console.log("pageUsersRefinedData: ", pageUsersRefinedData);

            return pageUsersRefinedData;
        } catch (error) {
            console.error(error);
        }
    }

    async function saveUsersToStorage(pageNum) {
        try {
            currentPage.value = pageNum;
            if (!alreadyLoadedPages.value.includes(pageNum)) {
                const currentPageUsers = [];
                Object.values(await refineUsersDB(pageNum)).forEach(user => {
                    saveUsers.value.push(user);
                    currentPageUsers.push(user);
                    console.log("each user: ", user);
                });
                currentPageData.value = currentPageUsers;
                alreadyLoadedPages.value.push(pageNum);
                console.log("alreadyLoadedPages: ", alreadyLoadedPages.value);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { currentPage, currentPageData, userItems, saveUsersToStorage }
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
            currentPage.value = pageNum;
            if (!alreadyLoadedPages.value.includes(pageNum)) {
                Object.values(await refinePlanetsDB(pageNum)).forEach(planet => {
                    savePlanets.value.push(planet);
                });
                alreadyLoadedPages.value.push(pageNum);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { planetItems, savePlanetsToStorage }
}