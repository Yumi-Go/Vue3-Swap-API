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

    async function getPlanetForEachPerson(planetURL) {
        try {
            const response = await fetch(planetURL);
            const jsonData = await response.json();
            const planet = {};
            planet['name'] = jsonData.name;
            planet['diameter'] = jsonData.diameter;
            planet['climate'] = jsonData.climate;
            planet['population'] = jsonData.population;
            planets.value.push(planet);
            return planet;
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
                        // const planetNo = value.split("/planets/")[1].split("/")[0];
                        // planetUrls.value.push(value);
                        getPlanetForEachPerson(value)
                        .then(planet => {
                            personRefinedData['planet_name'] = planet.name;
                        });
                    }
                }
                console.log("planets: ", planets.value);

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
            console.log("allPeople: ", allPeople.value);
        } catch (error) {
            console.error(error);
        }
    }

    return { allPeople, allPlanets, currentPageNo, planets, personItems, savePeople }
}
