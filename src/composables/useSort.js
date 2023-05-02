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
        console.log("column: ", column);
        if (column !== prevColumn) {
            objects.sort((a, b) => {
                if (column === 'planet_name') {
                    let planetNameA = a['homeworld'].name.toLowerCase();
                    let planetNameB = b['homeworld'].name.toLowerCase();
                    if (planetNameA === 'unknown') {
                        planetNameA = 'zzzzzzzzzz'
                    }
                    if (planetNameB === 'unknown') {
                        planetNameB = 'zzzzzzzzzz'
                    }
                    return (planetNameA < planetNameB) ? -1 : 1;
                } else {
                    return standardizeToCompare(a[column]) - standardizeToCompare(b[column]);
                }
            });
        } else {
            objects.reverse();
        }
        prevColumn = column;
    }

    return { sortTable }
}