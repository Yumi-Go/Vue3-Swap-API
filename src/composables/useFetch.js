import { ref } from 'vue';

const allPeople = ref([]);
const allPlanets = ref([]);
const currentPageNo = ref(1);
const planets = ref([]);

export function useFetchPeople() {

    const personItems = ['name', 'height', 'mass', 'created', 'edited', 'planet_name'];

    async function fetchData() {
        try {
            const peopleUrls = [];
            for (let i = 1; i < 84; i++) {
                const url = `https://swapi.dev/api/people/${i}`;
                peopleUrls.push(url);
            }
            const planetsUrls = [];
            for (let i = 1; i < 61; i++) {
                const url = `https://swapi.dev/api/planets/${i}`;
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


            const peopleData = await Promise.all(peoplePromises)
            .catch(error => {
                console.log("error", error);
            });
            console.log("peopleData: ", peopleData);

            const planetsData = await Promise.all(planetsPromises)
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





