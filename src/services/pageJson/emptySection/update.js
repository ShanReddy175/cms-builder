import { showEmptySectionScreen } from "../../../redux/slices/emptySection";
import { store } from "../../../redux/store";


export async function dispatchEmptySection(obj){
    store.dispatch(showEmptySectionScreen({
        ...obj
    }))
}