import { useEffect, useRef } from "react";
import GridElement from "../Grid/index.component";
import { stylesToString } from "../../../helpers/convertStylesToString";
import { loadNAppendStyleTag } from "../../../helpers/loadNAppendStyleTag";
import EmptyPage from "../../EmptyPage/index.component";

export default function SectionComponent(props){
    const {section} = props;
    const grids = section?.grids;
    const gridEntries = Object.entries(grids);
    const sectionRef= useRef(null);

    useEffect(()=>{
        if(sectionRef && sectionRef.current){
            // sectionRef.current.addEventListener('contextmenu', (e)=>{
            //     e.preventDefault();
            //     alert('Custom Popup is under progress');
            // })
        }
    },[])
    useEffect(()=>{
        if(section){
            const styleEle = document.createElement('style');
            styleEle.setAttribute('data-style-id', section?.id);
            styleEle.innerHTML = `#${section?.id}{${stylesToString(section?.styles)}}`;
            loadNAppendStyleTag(styleEle, section?.id)
        }

    }, [section])
    return <section
        data-div-type="section"
        id={section?.id}
        // style={section?.styles}
        ref={sectionRef}
        data-has-nochilds={`${gridEntries.length === 0}`}
    >
        <div data-type="wrapper-layer"></div>
        {/* {section?.grids} */}
        {
            gridEntries && gridEntries.length > 0 ? <>
                {
                    gridEntries.map(([, grid], index)=>{
                        return <GridElement grid={grid} key={index}/>
                    })
                }
            </> : <>
                <EmptyPage showGrid={1} isInnerSection obj={section}/>
            </>
        }
    </section>
}