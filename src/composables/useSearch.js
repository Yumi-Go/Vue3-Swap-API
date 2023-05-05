import { ref } from "vue";

const search = ref('');
const checkedColumns = ref([]);
const searchResult = ref([]);

export function useSearch() {
    
    function filterByName(allData) {
        console.log("checkedColumns: ", checkedColumns.value);
        if (checkedColumns.value.legnth < 1) {
            searchResult.value = allData.filter(obj => obj['name'].toLowerCase().match(search.value.toLowerCase()));
        } else {
            searchResult.value = checkedColumns.value.map(column => {
                console.log("column: ", column);
                allData.filter(obj => {
                    console.log("obj[column]: ", obj[column]);
                    obj[column].toLowerCase().match(search.value.toLowerCase())
                });
            });
            console.log("searchResult: ", searchResult.value);

        }
    }
    return { search, checkedColumns, searchResult, filterByName }
}