import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const allData = useLocalStorage('all', []);
const personItems = ['name', 'height', 'mass', 'created', 'edited', 'homeworld'];
const numberOfItemsPerPage = 10;
const totalNumberOfPages = ref(0);

function setTotalNumberOfPages() {
    if (allData.value.length > 0) {
        totalNumberOfPages.value = Math.ceil(allData.value.length / numberOfItemsPerPage);
    }
}

export function useFetchData() {
    const peopleData = ref([]);
    const planetsData = ref([]);

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

            await Promise.all(peoplePromises)
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

            await Promise.all(planetsPromises)
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
                        if (key === "homeworld") {
                            personRefinedData[key] = getHomeworld(value);
                        } else {
                            personRefinedData[key] = value;
                        }                    
                    }
                }
                refinedData.push(personRefinedData);
            });
            storeAllPeopleData(refinedData);
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

    function storeAllPeopleData(refinedData) {
        if (allData.value.length < 1) {
            refinedData.forEach(data => allData.value.push(data));
        }
        setTotalNumberOfPages();
    }

    return { personItems, numberOfItemsPerPage, totalNumberOfPages, fetchData }
}