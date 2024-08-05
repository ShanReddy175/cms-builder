import { toolTipObj } from "../attributes_Library";

export async function toolTipComponent(pageX, pageY, value, type = "add"){
    const obj = toolTipObj;
    if(type === "remove") return removeAll();
    let element = document.querySelector(`[${obj.id.key}=${obj.id.value}]`);
    if(!element || element === null){
        element = document.createElement('div');
        element.setAttribute(obj.id.key, obj.id.value);
        document.body.appendChild(element);
    }
    element.style.setProperty(obj.css.top, pageY);
    element.style.setProperty(obj.css.left, pageX);
    element.innerHTML = Math.round(value);
    

    // Remove All Tooltips

    function removeAll(){
        const existingEles = document.querySelectorAll(`[${obj.id.key}=${obj.id.value}]`);
        existingEles.forEach(ele => ele.remove());
    }
}
