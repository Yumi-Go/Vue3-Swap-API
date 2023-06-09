import { ref } from "vue";

const sortResult = ref([]);

export function useSort() {
    
    let prevColumn = "nothing";

    function standardizeToCompare(value){
        if (value === 'unknown') return -1;
        if (value.includes(',')) {
            return value.replace(",", "");
        }
        else return value;
    }
    
    function sortTable(objects, column) {
        if (column !== prevColumn) {
            objects.sort((a, b) => {
                if (column === 'homeworld') {
                    let planetNameA = a[column].name.toLowerCase();
                    let planetNameB = b[column].name.toLowerCase();
                    if (planetNameA === 'unknown') {
                        planetNameA = 'zzzzzzzzzz'
                    }
                    if (planetNameB === 'unknown') {
                        planetNameB = 'zzzzzzzzzz'
                    }
                    return (planetNameA < planetNameB) ? -1 : 1;
                } else if (column === 'height' || column === 'mass') {
                    return standardizeToCompare(a[column]) - standardizeToCompare(b[column]);
                } else {
                    return (standardizeToCompare(a[column]) < standardizeToCompare(b[column])) ? -1 : 1;
                }
            });
        } else {
            objects.reverse();
        }
        prevColumn = column;
        sortResult.value = objects;
    }
    return { sortResult, sortTable }
}