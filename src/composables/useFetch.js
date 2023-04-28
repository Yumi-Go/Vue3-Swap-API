import { ref } from 'vue';

export function useFetchData() {

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


            let peopleData = [];
            await Promise.all(peoplePromises)
            .then(allPageData => {
                allPageData.forEach(eachPageData => {
                    eachPageData.results.forEach(personData => {
                        peopleData.push(personData);
                        console.log("el: ", personData);
                    });
                });
            })
            .catch(error => {
                console.log("error", error);
            });
            console.log("peopleData: ", peopleData);

            let planetsData = [];
            await Promise.all(planetsPromises)
            .then(allPageData => {
                allPageData.forEach(eachPageData => {
                    eachPageData.results.forEach(planetData => {
                        planetsData.push(planetData);
                        console.log("el: ", planetData);
                    });
                });
            })
            .catch(error => {
                console.log("error", error);
            });
            console.log("planetsData: ", planetsData);


            //  const allData = [...peopleData, ...planetsData];
            const allData = {}
            allData["people"] = peopleData;
            allData["planets"] = planetsData;
            console.log("allData: ", allData);

            return allData;

        } catch (error) {
            console.log(error);
        }
    }
    
    return { fetchData }

}





