import { ref } from "vue";

const search = ref('');

export function useSearch() {
    
    function filterByName(allData) {
        const result = allData.filter(obj => obj['name'].toLowerCase().match(search.value.toLowerCase()));
        return result;
    }
    return { search, filterByName }
}