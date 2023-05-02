import { ref } from 'vue';

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
            console.log("peopleUrls: ", peopleUrls);

            const planetsUrls = [];
            for (let pageNum = 1; pageNum < 7; pageNum++) {
                const url = `https://swapi.dev/api/planets/?page=${pageNum}`;
                planetsUrls.push(url);
            }
            console.log("planetsUrls: ", planetsUrls);


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
            console.log("peoplePromises: ", peoplePromises);

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
            console.log("planetsPromises: ", planetsPromises);

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

            console.log("peopleData: ", peopleData.value);

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
            console.log("planetsData: ", planetsData.value);


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
            console.log("refinedData: ", refinedData);

            return refinedData;

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

    return { personItems, fetchData }

}





