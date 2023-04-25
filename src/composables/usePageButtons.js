import { ref } from "vue";


const currentPageBtn = ref(true);  

const pageStatus = { // need to be dynamically
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
 };

export function useButtons() {

    function saveBtnStatus() {

    }

    function btnToggle() {

        saveBtnStatus();
    }



    return { currentPageBtn, pageStatus }

}