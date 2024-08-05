import { useEffect } from "react";
import { stylesToString } from "../../../helpers/convertStylesToString";
import { loadNAppendStyleTag } from "../../../helpers/loadNAppendStyleTag";

export default function GridElement(props){
    const {grid} = props;

    useEffect(()=>{
        if(grid){
            const styleEle = document.createElement('style');
            styleEle.setAttribute('data-style-id', grid?.id);
            styleEle.innerHTML = `#${grid?.id}{${stylesToString(grid?.styles)}}`;
            loadNAppendStyleTag(styleEle, grid?.id)
        }

    }, [grid])
    return <>
        <div id={grid.id} 
            data-type="grid"
            // style={grid?.styles}
        >
            <div data-type="wrapper-layer"></div>
            {/* Grid */}
        </div>
    </>
}