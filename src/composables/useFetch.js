import { ref } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

const storeData = useLocalStorage('all', []);
const getData = useLocalStorage("all", null, { serializer: StorageSerializers.object });


export function useFetchData() {

    const peopleData = ref([]);
    const planetsData = ref([]);

    const personItems = ['name', 'height', 'mass', 'created', 'edited', 'planet_name'];

    async function fetchData() {
        try {
            const peopleUrls = [];
            for (let pageNum = 1; pageNum < 10; pageNum++) {
                const url = `https://swapi.dev/api/people/?page=${pageNum}`;
                peopleUrls.push(url);
            }

            const planetsUrls = [];
            for (let pageNum = 1; pageNum < 7; pageNum++) {
                const url = `https://swapi.dev/api/planets/?page=${pageNum}`;
                planetsUrls.push(url);
            }


            const peoplePromises = [];
            for (let i = 0; i < peopleUrls.length; i++) {
                var promise = [];
                await fetch(peopleUrls[i])
                .then(res => {
                    if (res.status !== 404) {
                        promise = res.json();
                        peoplePromises.push(promise);
                    }
                });
            }

            const planetsPromises = [];
            for (let i = 0; i < planetsUrls.length; i++) {
                var promise = [];
                await fetch(planetsUrls[i])
                .then(res => {
                    if (res.status !== 404) {
                        promise = res.json();
                        planetsPromises.push(promise);
                    }
                });
            }

            await Promise.all(peoplePromises) // Question: I think I need to use Promise.all instead of Promise because peoplePromises contains multiple promises already
            .then(allPageData => {
                allPageData.forEach(eachPageData => {
                    eachPageData.results.forEach(personData => {
                        peopleData.value.push(personData);
                    });
                });
            })
            .catch(error => {
                console.log("error", error);
            });


            await Promise.all(planetsPromises) // Question: I think I need to use Promise.all instead of Promise because planetsPromises contains multiple promises already
            .then(allPageData => {
                allPageData.forEach(eachPageData => {
                    eachPageData.results.forEach(planetData => {
                        planetsData.value.push(planetData);
                    });
                });
            })
            .catch(error => {
                console.log("error", error);
            });


            const refinedData = [];
            peopleData.value.forEach(person => {
                const personRefinedData = {};
                for (const [key, value] of Object.entries(person)) {
                    if (personItems.includes(key)) {
                        personRefinedData[key] = value;                    
                    }
                    if (key === "homeworld") {
                        personRefinedData[key] = getHomeworld(value);
                    }
                }
                refinedData.push(personRefinedData);
            });
            storeAllPeopleData(refinedData);
            // return refinedData;

        } catch (error) {
            console.log(error);
        }
    }


    function getHomeworld(planetUrl) {
        try {
            const homeworld = {};
            planetsData.value.forEach(planet => {
                if (planet.url === planetUrl) {
                    homeworld['name'] = planet.name;
                    homeworld['diameter'] = planet.diameter;
                    homeworld['climate'] = planet.climate;
                    homeworld['population'] = planet.population;
                }
            });
            return homeworld;
        } catch (error) {
            console.error(error);
        }

    }

    function storeAllPeopleData(data) {
        if (getData.value.length < 1) {
            data.forEach(e => storeData.value.push(e));
        }
    }


    return { personItems, fetchData }

}
