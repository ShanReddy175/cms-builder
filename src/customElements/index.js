import './custom-toolbar';

export function setCustomElement(tag, method){
    customElements.define(tag, method);
    // console.log(`${tag} registered in CustomElementRegistry`);
}
