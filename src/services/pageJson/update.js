import { setPageJson } from "../../redux/slices/pageJson";
import { store } from "../../redux/store";


export async function dispatchPageJson(key, value){
    const pageJson = store.getState().pageJson;

    store.dispatch(setPageJson({
        ...pageJson,
        page:{
            ...pageJson.page,
            body:{
                ...pageJson?.page?.body,
                [key]:{
                    ...value
                }
            }
        }
    }))
}