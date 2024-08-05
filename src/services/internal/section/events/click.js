import { sectionAttributesObj } from "../../../attributes_Library";


export function sectionClickEvent(section){
    section.addEventListener('click', function(){
        const isAciveEle = Boolean(section.getAttribute(sectionAttributesObj.layer.key));
        if(isAciveEle) return;
        section.setAttribute(sectionAttributesObj.layer.key, 'true');
    })
}