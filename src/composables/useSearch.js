import { ref } from "vue";

const search = ref('');
const result = ref([]);

export function useSearch() {
    
    function filterByName(allData) {
        result.value = allData.filter(obj => obj['name'].toLowerCase().match(search.value.toLowerCase()));
        return result;
    }
    return { search, result, filterByName }
}