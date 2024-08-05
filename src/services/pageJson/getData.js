import { store } from "../../redux/store";
import { sectionAttributesObj } from "../attributes_Library";


export async function getSectionObject(section){
    const pageJson = store.getState().pageJson;
    let pageObj = pageJson.page;
    let bodyObj = pageObj.body;
    const isLayerDrag = section.hasAttribute(sectionAttributesObj.layerSelector.key);
    const selector = isLayerDrag ? sectionAttributesObj.layerSelector.key : 'id';
    let sectionObj = Object.entries(bodyObj).find(([sectionKey, sectionValue], index)=>{
        return sectionValue.id === section.getAttribute(selector)
    })

    return sectionObj;
}