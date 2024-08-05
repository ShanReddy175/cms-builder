import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { sectionAttributesObj } from '../../../../services/attributes_Library';
import { AddButton, getGridLines, getIndexV1, isRowFullyFilled, sectionLayersUpdateNClick } from '../../../../services/internal/grid/gridControl';
import { stylesToString } from '../../../../helpers/convertStylesToString';
import { loadNAppendStyleTag } from '../../../../helpers/loadNAppendStyleTag';

export default function LayersReactComponent(props){
    const sections = props.sections;
    const [items, setItems] = useState([]);
    const wrapperRef = useRef();
    useEffect(()=>{
        if(sections && Object.entries(sections).length > 0){
            setItems(Object.entries(sections));
        }

        if(wrapperRef.current){
            const sections1 = wrapperRef.current.children;
            [...sections1].forEach((section, index)=>{
                section.addEventListener('mousemove', onSectionMouseMove);

                section.addEventListener('mouseleave', function(e){
                    // AddButton(section, grids,'remove', {}, false, onSectionMouseMove, 0)
                    AddButton(section, [], 'remove', {}, false, onSectionMouseMove, 0,{}, {});
                })
            })
        }
    },[sections]);


    // useEffect(()=>{
    //     if(items && items.length > 0){
    //         items.forEach(([key, value], index)=>{
    //             const section = {...value};
    //             const styleEle = document.createElement('style');
    //             styleEle.setAttribute('data-layer-style-id', section?.id);
    //             styleEle.innerHTML = `[${sectionAttributesObj.layerSelector.key}=${section?.id}]{${stylesToString(section?.styles)}}`;
    //             loadNAppendStyleTag(styleEle, section?.id, wrapperRef.current)
    //         })
    //     }

    // }, [items])




    const handleSectionClick = (e) =>{
        const ele = e.target;
        const targetID = ele.getAttribute('data-cms-target');
        // ele.style.opacity = 0;
        // ele.style.visibility = 'hidden';
        
        // const targetSection = document.querySelector(`#${targetID}`);
        // targetSection?.setAttribute(sectionAttributesObj.layer.key, 'true');
        // ele?.setAttribute(sectionAttributesObj.layer.key, 'true');
        sectionLayersUpdateNClick(targetID);
    }

    const onSectionMouseMove = (e) => {
        // console.log(e.nativeEvent.srcElement)
        const section = e.target;
        const sectionTag = section.tagName;
        const isClicked = section.getAttribute(sectionAttributesObj.layer.key) === 'true';
        if(isClicked || sectionTag !== 'DIV') return;
        // const targetSection = document.querySelector(targetID);

        const sectionIndex = [...wrapperRef.current.children].findIndex(ele => ele.getAttribute('data-cms-target') === section.getAttribute('data-cms-target'));
        const excludeValue = 3;
        const x = e.clientX;
        const y = e.clientY;
        // console.log(e)
        if(section && section !== null){
            const { top, left, width, height } = section.getBoundingClientRect();
            const {rows, columns, rowCount, columnCount} = getGridLines(section);
            const grids = section?.children;

            const rowIndex = getIndexV1(((y-top) - (2 * excludeValue)), rows);
            const isOnRowLine = rows.reduce((acc, currentValue, currentIndex)=>{
                if(acc.found) return acc;
                acc.sum += parseFloat(currentValue);
                if(Math.floor(acc.sum) >= (y-top-excludeValue) && (Math.floor(acc.sum) <= (y-top + excludeValue))){
                    acc.found = true;
                }
                return acc;
            }, {sum: 0, found : false}).found;


            const isSectionTopLine = (y >= (top - excludeValue)) && (y <= (top + excludeValue));

            if(
                isOnRowLine && 
                rowIndex === rowCount
            ){
                let rowTopValue = rows.slice(0, (rowIndex)).reduce((sum, gridHeight)=>{
                    return sum += parseFloat(gridHeight);
                },0);
    
                rowTopValue = (rowTopValue / height) * 100;
                const btnStyles = {
                    height,
                    width: excludeValue,
                    x: x-left,
                    y: rowTopValue,
                    rowCount : rowCount
                }
                const isFullFilled = isRowFullyFilled(section, grids, rowIndex);
                AddButton(
                    section, 
                    grids, 
                    'row', 
                    btnStyles, 
                    false, 
                    onSectionMouseMove, 
                    rowIndex,
                    {condition: true, arr:[]},
                    {columns, rows},
                    {state:true,position:'bottom'}
                );
            }
    
            else if(isSectionTopLine && sectionIndex === 0){
                const btnStyles = {
                    height,
                    width: excludeValue,
                    x: x-left,
                    y: 0,
                    rowCount : rowCount
                }
                const isFullFilled = {condition: true, arr:[]};
                AddButton(
                    section, 
                    grids, 
                    'row', 
                    btnStyles, 
                    false, 
                    onSectionMouseMove, 
                    rowIndex,
                    {condition: true, arr:[]},
                    {columns, rows},
                    {state:true, position:'top'}
                );
            }

            else{
                AddButton(section, grids,'remove', {}, false, onSectionMouseMove, 0)
            }
        }
    }

    return <>
        <div data-cms-tool="CMS Layers" className={styles.layers__parent}>
            <div 
                className={styles.wrapper__layer}
                ref={wrapperRef}
            >
                {
                    items.map(function([layersParentKey, layersParent], layerIndex){
                        const layerGrids = layersParent.grids;
                        const layerGridsArr = Object.entries(layerGrids);
                        return <Fragment key={layersParentKey + layerIndex}>
                            <div 
                                className={styles.section__layer}
                                data-cms-target={layersParent.id}
                                onClick={handleSectionClick}
                                style={layersParent.styles}
                                onMouseMove={onSectionMouseMove}
                                data-has-nochilds={`${layerGridsArr.length === 0}`}
                            >
                                <div className={styles.wrapper__layer}></div>
                                {/* <div 
                                    className={styles.section__layer__wrapper}
                                    // style={layersParent.styles}
                                > */}
                                {
                                    layerGridsArr.map(function([gridKey, grid], gridIndex){
                                        return <Fragment key={gridKey + grid}>
                                            <div
                                                className={styles.grid__layer}
                                                data-cms-target={grid.id}
                                                style={grid?.styles}
                                            >
                                                <div className={styles.grid__layer__wrapper}></div>
                                            </div>
                                        </Fragment>
                                    })
                                }
                                {/* </div> */}
                            </div>
                        </Fragment>
                    })
                }
            </div>
        </div>
    </>
}