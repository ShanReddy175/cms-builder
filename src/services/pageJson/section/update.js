import { setPageJson } from "../../../redux/slices/pageJson";
import { store } from "../../../redux/store";


export async function dispatchPageBodyJson(obj){
    const pageJson = store.getState().pageJson;

    store.dispatch(setPageJson({
        ...pageJson,
        page:{
            ...pageJson.page,
            body:{...obj}
        }
    }))
}