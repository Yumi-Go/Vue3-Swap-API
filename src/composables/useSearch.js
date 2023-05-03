import { ref } from "vue";

const search = ref('');
const searchResult = ref([]);

export function useSearch() {
    
    function filterByName(allData) {
        searchResult.value = allData.filter(obj => obj['name'].toLowerCase().match(search.value.toLowerCase()));
        // return searchResult;
    }
    return { search, searchResult, filterByName }
}