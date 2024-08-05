import { setPageJson } from "../../redux/slices/pageJson";
import { store } from "../../redux/store";

export async function dispatchDeletePageJson(key) {
    const confirmDelete = window.confirm('Are you sure you want to delete this section?');
    if(!confirmDelete) return;
    const pageJson = store.getState().pageJson;

    // Create a new object without the key to be deleted
    const { [key]: _, ...newBody } = pageJson?.page?.body || {};

    store.dispatch(setPageJson({
        ...pageJson,
        page: {
            ...pageJson.page,
            body: newBody
        }
    }));
}
