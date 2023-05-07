import { ref } from "vue";
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import { useSort } from './useSort';

const getData = useLocalStorage("all", null, { serializer: StorageSerializers.object });


const search = ref('');
const checkedColumns = ref([]);
const searchResult = ref([]);
const { sortResult, sortTable } = useSort();


export function useSearch() {

    function filterByColumns(allData) {
        
        if (checkedColumns.value.length < 1) {
            // console.log("getData before filterByName:", getData.value);
            filterByName(allData);
            // console.log("searchResult after filterByName: ", searchResult.value);

        } else {
            const allColumnsResult = [];
            checkedColumns.value.forEach(column => {
                console.log("column: ", column);
                let eachColumnResult = [];
                if (column === 'name') {
                    eachColumnResult = filterByName(allData);
                } else if (column === 'height') {
                    eachColumnResult = filterByHeight(allData);
                } else if (column === 'mass') {
                    eachColumnResult = filterByMass(allData);
                } else if (column === 'created') {
                    eachColumnResult = filterByCreated(allData);
                } else if (column === 'edited') {
                    eachColumnResult = filterByEdited(allData);
                } else {
                    // eachColumnResult = filterByPlanet(allData);
                }
                allColumnsResult.push(eachColumnResult);
            });
            searchResult.value = allColumnsResult;

            console.log("allColumnsResult in filterByColumns: ", allColumnsResult);
        }
        sortResult.value = searchResult.value;

    }

    function filterByName(allData) {
        const result = allData.filter(obj => obj['name'].toLowerCase().match(search.value.toLowerCase()));
        searchResult.value = result;
        console.log("searchResult after filterByName: ", searchResult.value);
        return result;
    }

    function filterByHeight(allData) {
        const result = allData.filter(obj => obj['height']?.match(search.value));
        searchResult.value = result;
        console.log("searchResult after filterByHeight: ", searchResult.value);
        return result;
    }

    function filterByMass(allData) {
        const result = allData.filter(obj => obj['mass']?.match(search.value));
        searchResult.value = result;
        console.log("searchResult after filterByMass: ", searchResult.value);
        return result;
    }

    function filterByCreated(allData) {
        const result = allData.filter(obj => obj['created']?.toLowerCase().match(search.value));
        searchResult.value = result;
        console.log("searchResult after filterByMass: ", searchResult.value);
        return result;
    }

    function filterByEdited(allData) {
        const result = allData.filter(obj => obj['edited']?.toLowerCase().match(search.value));
        searchResult.value = result;
        console.log("searchResult after filterByMass: ", searchResult.value);
        return result;
    }

    // function filterByPlanet(allData) {
    //     const result = allData.filter(obj => obj['homeworld']?.toLowerCase().match(search.value.toLowerCase()));
    //     searchResult.value = result;
    //     console.log("searchResult after filterByPlanet: ", searchResult.value);
    //     return result;
    // }


    return { search, checkedColumns, searchResult, filterByColumns }
}