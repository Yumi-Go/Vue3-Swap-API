import { ref } from 'vue';

const allPeople = ref([]);
const allPlanets = ref([]);
const currentPageNo = ref(1);
const planets = ref([]);

export function useFetchPeople() {

    const personItems = ['name', 'height', 'mass', 'created', 'edited', 'planet_name'];

    async function eachPagePeople(pageNum) {
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

    async function refinePeopleDB(pageNum) {
        try {
            const eachPagePeopleRefinedData = [];
            const eachPagePeopleRawData = await eachPagePeople(pageNum);
            eachPagePeopleRawData.forEach(person => {
                const personRefinedData = {};
                for (const [key, value] of Object.entries(person)) {
                    if (personItems.includes(key)) {
                        personRefinedData[key] = value;                    
                    }
                    if (key === "homeworld") {
                        getPlanetName(value)
                        .then(planet => {
                            personRefinedData['planet_name'] = planet;
                        });
                    }
                }
                eachPagePeopleRefinedData.push(personRefinedData);
            });
            return eachPagePeopleRefinedData;
        } catch (error) {
            console.error(error);
        }
    }

    async function savePeople(pageNum) {
        try {
            const people = [];
            Object.values(await refinePeopleDB(pageNum)).forEach(person => {
                people.push(person);
            });
            allPeople.value = people;
        } catch (error) {
            console.error(error);
        }
    }

    return { allPeople, allPlanets, currentPageNo, personItems, savePeople }
}


export function useFetchPlanets() {

    const planetItems = ['name', 'diameter', 'climate', 'population'];

    async function eachPlanet(planetNum) {
        try {
            const response = await fetch(`https://swapi.dev/api/planets/?page=${planetNum}`);
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

    async function savePlanets(pageNum) {
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

    return { planetItems, savePlanets }

}