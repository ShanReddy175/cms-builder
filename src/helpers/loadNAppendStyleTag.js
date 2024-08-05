export const loadNAppendStyleTag= (styleEle, id, parentEle = null)=>{
    const editorEle = document.querySelector('[data-id="cms__template__editor"');
    if(editorEle && editorEle !== null){
        let hasEle = editorEle.querySelector(`[data-style-id="${id}"]`);
        if(parentEle !== null){
            hasEle = parentEle.querySelector(`[data-layer-style-id="${id}"]`);
        }
        if(hasEle && hasEle !== null){
            hasEle.remove();
        }
        (parentEle === null) ? editorEle.appendChild(styleEle) : parentEle.appendChild(styleEle);
    }
}