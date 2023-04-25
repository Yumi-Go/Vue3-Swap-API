import { ref } from 'vue';

const allUsers = ref([]);
const allPlanets = ref([]);
const currentPageNo = ref(1);

export function useFetchUsers() {

    const userItems = ['name', 'height', 'mass', 'created', 'edited', 'planet_name'];

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
            console.log("jsonData.name: ", jsonData.name);
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
                            userRefinedData['planet_name'] = planet;
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
            const users = [];
            Object.values(await refineUsersDB(pageNum)).forEach(user => {
                users.push(user);
            });
            allUsers.value = users;
            console.log("allUsers in saveUsersToStorage: ", Object.values(allUsers.value));

        } catch (error) {
            console.error(error);
        }
    }

    async function getPageNums() {

    }

    return { allUsers, allPlanets, currentPageNo, userItems, saveUsersToStorage, getPageNums }
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

}