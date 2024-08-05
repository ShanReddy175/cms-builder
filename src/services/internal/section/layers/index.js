import { sectionAttributesObj } from "../../../attributes_Library";


export function layerComponent(section){
    if(section && section !== null){
        const isAciveEle = Boolean(section.getAttribute(sectionAttributesObj.layer.key));
        if(isAciveEle) return;
        
    }
}