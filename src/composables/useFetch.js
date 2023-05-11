import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const allData = useLocalStorage('all', []);
const personItems = ['name', 'height', 'mass', 'created', 'edited', 'homeworld'];
const currentPageNo = ref();
const isPrevPageExist = ref(false);
const isNextPageExist = ref(false);

export function useFetchData() {
    const peopleData = ref([]);
    const planetsData = ref([]);
    const refinedData = ref([]);

    async function fetchSinglePagePeople(pageNum) {
        try {
            peopleData.value = [];
            const url = `https://swapi.dev/api/people/?page=${pageNum}`;
            let singlePagePeoplePromise = [];
            await fetch(url)
            .then(res => {
                if (res.status !== 404) {
                    singlePagePeoplePromise = res.json();
                }
            });

            await Promise.resolve(singlePagePeoplePromise)
            .then(singlePageData => {
                if (singlePageData.previous !== null) {
                    isPrevPageExist.value = true;
                } else {
                    isPrevPageExist.value = false;
                }
                if (singlePageData.next !== null) {
                    isNextPageExist.value = true;
                } else {
                    isNextPageExist.value = false;
                }
                currentPageNo.value = pageNum;
                singlePageData.results.forEach(person => {
                    peopleData.value.push(person);
                });
            })
            .catch(error => {
                console.log("error", error);
            });
            return peopleData.value;
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchAllPlanets() {
        try {
            const planetsUrls = [];
            for (let pageNum = 1; pageNum < 7; pageNum++) {
                const url = `https://swapi.dev/api/planets/?page=${pageNum}`;
                planetsUrls.push(url);
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

            await Promise.all(planetsPromises)
            .then(allPagePlanets => {
                allPagePlanets.forEach(singlePagePlanets => {
                    singlePagePlanets.results.forEach(planet => {
                        planetsData.value.push(planet);
                    });
                });
            })
            .catch(error => {
                console.log("error", error);
            });
            return planetsData.value;
        } catch (error) {
            console.log(error);
        }
    }

    async function refineData(pageNum) {
        try {
            await fetchSinglePagePeople(pageNum);
            if (planetsData.value.length < 1) {
                await fetchAllPlanets();
            }
            refinedData.value = [];
            const singlePageRefinedData = [];
            peopleData.value.forEach(person => {
                const personRefinedData = {};
                for (const [key, value] of Object.entries(person)) {
                    if (personItems.includes(key)) {
                        if (key === "homeworld") {
                            personRefinedData[key] = getHomeworld(value);
                        } else {
                            personRefinedData[key] = value;
                        }
                    }
                }
                singlePageRefinedData.push(personRefinedData);
            });
            refinedData.value = singlePageRefinedData;
        } catch (error) {
            console.log(error);
        }
    }

    function getHomeworld(planetURL) {
        try {
            const homeworld = {};
            planetsData.value.forEach(planet => {
                if (planet.url === planetURL) {
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

    async function saveData(pageNum) {
        try {
            currentPageNo.value = pageNum;
            allData.value = [];
            const people = [];
            await refineData(pageNum);
            refinedData.value.forEach(person => {
                people.push(person);
            });
            allData.value = people;
        } catch (error) {
            console.error(error);
        }
    }

    return { currentPageNo, isPrevPageExist, isNextPageExist, personItems, saveData }

}
