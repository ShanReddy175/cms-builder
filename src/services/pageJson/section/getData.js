import { store } from "../../../redux/store";


export async function getPageBodyObject(){
    const pageJson = store.getState().pageJson;
    let obj = pageJson.page.body;

    return obj;
}