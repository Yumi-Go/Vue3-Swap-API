export function useFormat() {
    
    function convertColumnNames(name) {
        if (name === 'homeworld') {
            return 'Planet Name';
        }
        const firstLetter = name[0].toUpperCase();
        const rest = name.slice(1);
        return firstLetter + rest;
    }
    
    function convertDateFormat(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
    
    function convertPopulationFormat(population) {
        if (isNaN(population)) {
            return '-';
        }
        return Number(population).toLocaleString();
    }
    
    function convertDiameterFormat(diameter) {
        if (isNaN(diameter)) {
            return '-';
        }
        return Number(diameter).toLocaleString()+' km';
    }

    return { convertColumnNames, convertDateFormat, convertPopulationFormat, convertDiameterFormat }
}