import { setCustomElement } from "./index";



class GridToolbar extends HTMLElement{
    constructor(){
        super();
        this.callback = null;
        this.left = 0;
        this.top = 0;
        this.maxwidth = 0;
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        // shadow.innerHTML = '<div id="toolbar">hello</div>';

        // const styleSheet = new CSSStyleSheet();
        // shadow.styleSheets = 
        const toolBarData = {
            unique: {
                key: 'data-type',
                value: 'cms-grid-toolbar'
            }
        }
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "/styles/grid-toolbar.css");
        shadow.appendChild(linkElem);

        this.shadowRoot.host.setAttribute(toolBarData.unique.key, toolBarData.unique.value);
        this.shadowRoot.host.style.setProperty('--_cms-grid-toolbar-left', `${this.left}`);
        this.shadowRoot.host.style.setProperty('--_cms-grid-toolbar-top', this.top);
        this.shadowRoot.host.style.setProperty('--_cms-grid-toolbar-maxwidth', this.maxwidth);


        const divEle = document.createElement('div');
        // divEle.classList.add(styles.toolbar);
        divEle.setAttribute('id', 'grid-toolbar');
        // divEle.innerHTML = 'Hello';

        const listItems = [
            {
                icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M4 5.87c0-1.04.84-1.88 1.88-1.88h12.25c1.04 0 1.88.84 1.88 1.88v3.12h-2v-3H6v3H4V5.87Zm14 9.12h2v3.12c0 1.04-.84 1.88-1.88 1.88H5.88c-1.04 0-1.88-.84-1.88-1.88v-3.12h2v3h12v-3Zm-15-4h3v2H3v-2Zm8 0H8v2h3v-2Zm2 0h3v2h-3v-2Zm5 0h3v2h-3v-2Z"></path></svg>`,
                type: 'Horizontally'
            },
            {
                icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M18.13 4c1.04 0 1.88.84 1.88 1.88v12.25c0 1.04-.84 1.88-1.88 1.88h-3.12v-2h3v-12h-3v-2h3.12V4ZM9.01 18v2H5.89c-1.04 0-1.88-.84-1.88-1.88V5.87c0-1.04.84-1.88 1.88-1.88h3.12v2h-3v12h3V18Zm4-15v3h-2V3h2Zm0 8V8h-2v3h2Zm0 2v3h-2v-3h2Zm0 5v3h-2v-3h2Z"></path></svg>`,
                type: 'Vertically'
            }
        ]

        listItems.forEach((ele, index)=>{
            const element = document.createElement('div');
            element.setAttribute('data-label', `Split ${ele.type}`);
            element.setAttribute('data-index', index+1);
            element.setAttribute('data-type', 'toolbar-item');
            element.setAttribute('aria-label', ele.type)
            element.setAttribute('data-has-tooltip', 'true');
            element.setAttribute('data-title', `Split ${ele.type}`);
            element.innerHTML = ele.icon;

            divEle.appendChild(element)
        })



        shadow.appendChild(divEle)
        this.shadowRoot.getElementById('grid-toolbar').addEventListener('click',()=>{
            if(this.callback){
                this.callback();
                // this.shadowRoot.host.remove();
            }
        })
    }

    setCallback(callback){
        this.callback = callback;
    }
    setPosition(obj){
        this.left = obj.left;
        this.maxwidth = obj.maxwidth;
        this.top = obj.top;
    }
}

setCustomElement('grid-toolbar', GridToolbar);
// console.log('grid-toolbar registered');