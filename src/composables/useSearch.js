import { ref } from "vue";

const search = ref('');

export function useSearch() {
    
    function filterByName(objects) {
        const result = Object.values(objects).filter(obj => 
            obj['name'].toLowerCase().match(search.value.toLowerCase())
        );
        console.log("reslut: ", result);
        return result;
    }
    return { search, filterByName }
}