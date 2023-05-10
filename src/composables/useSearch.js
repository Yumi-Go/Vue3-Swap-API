import { ref } from "vue";
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import { useSort } from './useSort';
import { useFormat } from './useFormat';

const { convertDateFormat } = useFormat();


const search = ref('');
const checkedColumns = ref([]);
const searchResult = ref([]);
const uniqueIndex = ref([]);
const { sortResult } = useSort();


export function useSearch() {

    function filterByColumns(allData) {

        uniqueIndex.value = [];
        
        if (checkedColumns.value.length < 1) {
            filterByName(allData);
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
                    eachColumnResult = filterByPlanet(allData);
                }
                eachColumnResult.forEach(person => allColumnsResult.push(person));
            });
            console.log("allColumnsResult in filterByColumns: ", allColumnsResult);
            searchResult.value = allColumnsResult;
        }
        sortResult.value = searchResult.value;
        console.log("searchResult after filter: ", searchResult.value);
        console.log("sortResult after filter: ", sortResult.value);
        // return searchResult.value;

    }

    function filterByName(allData) {
        const result = allData.filter((obj, index) => {
            if (obj['name'].toLowerCase().match(search.value.toLowerCase())) {
                if (!(uniqueIndex.value.includes(index))) {
                    uniqueIndex.value.push(index);
                    return obj['name'].toLowerCase().match(search.value.toLowerCase());
                }
            }
        });
        searchResult.value = result;
        console.log("searchResult after filterByName: ", searchResult.value);
        console.log("unique index of person: ", uniqueIndex.value);
        return result;
    }

    function filterByHeight(allData) {
        const result = allData.filter((obj, index) => {
            if (obj['height'].match(search.value)) {
                if (!(uniqueIndex.value.includes(index))) {
                    uniqueIndex.value.push(index);
                    return obj['height'].match(search.value);
                }
            }
        });
        searchResult.value = result;
        console.log("searchResult after filterByHeight: ", searchResult.value);
        console.log("unique index of person: ", uniqueIndex.value);
        return result;
    }

    function filterByMass(allData) {
        const result = allData.filter((obj, index) => {
            if (obj['mass'].match(search.value)) {
                if (!(uniqueIndex.value.includes(index))) {
                    uniqueIndex.value.push(index);
                    return obj['mass'].match(search.value);
                }
            }
        });
        searchResult.value = result;
        console.log("searchResult after filterByMass: ", searchResult.value);
        console.log("unique index of person: ", uniqueIndex.value);
        return result;
    }

    function filterByCreated(allData) {
        const result = allData.filter((obj, index) => {
            if (convertDateFormat(obj['created']).toLowerCase().match(search.value.toLowerCase())) {
                if (!(uniqueIndex.value.includes(index))) {
                    uniqueIndex.value.push(index);
                    return obj['created'].toLowerCase().match(search.value.toLowerCase());
                }
            }
        });
        searchResult.value = result;
        console.log("searchResult after filterByMass: ", searchResult.value);
        console.log("unique index of person: ", uniqueIndex.value);
        return result;
    }

    function filterByEdited(allData) {
        const result = allData.filter((obj, index) => {
            if (convertDateFormat(obj['edited']).toLowerCase().match(search.value.toLowerCase())) {
                if (!(uniqueIndex.value.includes(index))) {
                    uniqueIndex.value.push(index);
                    return obj['edited'].toLowerCase().match(search.value.toLowerCase());
                }
            }
        });
        searchResult.value = result;
        console.log("searchResult after filterByMass: ", searchResult.value);
        console.log("unique index of person: ", uniqueIndex.value);
        return result;
    }

    function filterByPlanet(allData) {
        const result = allData.filter((obj, index) => {
            if (obj['homeworld']['name'].toLowerCase().match(search.value.toLowerCase())) {
                if (!(uniqueIndex.value.includes(index))) {
                    uniqueIndex.value.push(index);
                    return obj['homeworld']['name'].toLowerCase().match(search.value.toLowerCase());
                }
            }
        });
        searchResult.value = result;
        console.log("searchResult after filterByPlanet: ", searchResult.value);
        console.log("unique index of person: ", uniqueIndex.value);
        return result;
    }


    return { search, checkedColumns, searchResult, filterByColumns }
}