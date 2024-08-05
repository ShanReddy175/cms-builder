import { getGridLines, prepareGridTemplateRowsNewVersion } from "..";
import { sectionAttributesObj } from "../../../../attributes_Library";
import { getSectionObject } from "../../../../pageJson/getData";
import { dispatchPageJson } from "../../../../pageJson/update";
import { toolTipComponent } from "../../../../tools/tooltip";
import { convertDataGridsValuesFromPixelsToPercentage, roundTo } from "../split/models/toolbar";

const RETURN_VALUE = 20;
const SECTION_RETURN_VALUE = 100;
const DECIMALS = 2;
export async function GridResizerFunction(resizer, type, section, index, btn, sectionEvent, sectionAddingObj){
    const $body = document.body;
    const isBlockElement  = type === 'row';
    let isDragging = true;

    const playground = document.querySelector(process.env.REACT_APP_PAGEID);



    let sectionObj;
    let dataGrids;
    let changedStyleKey;
    let initialChangedValue;
    const cursorType = isBlockElement ? 's-resize' : 'w-resize';
    const onMouseMove = async(e)=>{
        if(!isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        const xValue = e.clientX;
        const yValue = e.clientY;
        const value = isBlockElement ? yValue : xValue;
        if(playground 
            && playground !== null 
            && (playground.parentElement.scrollTop > 0
            || (playground.getBoundingClientRect().height > playground.parentElement.getBoundingClientRect().height))
        ){
            playground.style.setProperty('--_playground-min-height', (playground.getBoundingClientRect().height));
        }
        let {updateDataGrids, updateCondtion} =  
            !sectionAddingObj.state ? 
            await onResizerDrag(isBlockElement, value, section, index, btn, resizer) : 
            await onSectionHeightResizeDrag(yValue, section, btn, resizer, e);
        dataGrids = [...updateDataGrids];
        initialChangedValue = updateCondtion;
    }

    const onMouseUp = async() =>{
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseleave', onMouseUp);

        
        
        if(sectionObj?.length && initialChangedValue 
            // && !sectionAddingObj.state
        ){
            if(!isBlockElement){
                dataGrids = convertDataGridsToFr(dataGrids);
            }
            var sectionKey = sectionObj[0];
            var sectionValue = sectionObj[1];
            sectionValue = {
                ...sectionValue,
                styles:{
                    ...sectionValue.styles,
                    [changedStyleKey]: dataGrids.join(' ')
                }
            }
            if(isBlockElement) sectionValue = await prepareGridTemplateRowsNewVersion(sectionValue);

            section.setAttribute('data-nochildhover', 'true');
            await dispatchPageJson(sectionKey, sectionValue);

            
        }
        setTimeout(()=>{
            if(!section.hasAttribute(sectionAttributesObj.layerSelector.key)){
                section.removeAttribute('style');
            }
            else{
                const sectionEle = document.querySelector(`#${section.getAttribute(sectionAttributesObj.layerSelector.key)}`)
                if(sectionEle && sectionEle !== null){
                    sectionEle.removeAttribute('style');
                }
            }
        }, 50)
        setTimeout(()=>{
            section.addEventListener('mousemove', sectionEvent);
        }, 100)
        section.removeAttribute('data-nochildhover-resizer');
        section.removeAttribute('data-nochildhover-resizer-type');
        $body.style.cursor = 'auto';
        btn.style.cursor = 'auto';
        toolTipComponent(0,0,0,'remove');
        if(playground && playground !== null){
            playground.style.removeProperty('--_playground-min-height');
        }
    }

    resizer.addEventListener('mousedown', async(e) => {
        e.preventDefault();
        isDragging = true;
        sectionObj = await getSectionObject(section);
        changedStyleKey = isBlockElement ? 'gridTemplateRows' : 'gridTemplateColumns';
        initialChangedValue = false;

        section.setAttribute('data-nochildhover-resizer', 'true');
        section.setAttribute('data-nochildhover-resizer-type', type);
        section.removeEventListener('mousemove', sectionEvent);
        btn.removeEventListener('mouseenter', null);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseUp);
        $body.style.cursor = cursorType;
        btn.style.cursor = cursorType;
    });

}
 async function onResizerDrag(isBlockElement, value, section, index, btn, resizer){
    // value = value;
    const {width, height, top, left} = section.getBoundingClientRect();
    const resizerRect = resizer.getBoundingClientRect();
    // value = Math.round(value);
    // let changedValue = isBlockElement ? (value - top) : (value - left);
    let changedValue = isBlockElement ? ((value - top) - (resizerRect.height * .25)) : ((value - left) - (resizerRect.width * .25));
    changedValue = Math.round(changedValue);
    const {rows, columns} = getGridLines(section);
    let dataGrids = isBlockElement ? [...rows] : [...columns];

    const nextGrid = parseFloat(dataGrids[index]);
    const currentGrid = parseFloat(dataGrids[index-1]);

    let updateCondtion = false;

    let currentGridTotalValue = dataGrids.reduce((acc, currentValue, currentIndex)=>{
        if(currentIndex < index){
            acc += Math.round(parseFloat(currentValue))
        }
        return acc;
    }, 0);


    
    let updatedNextGrid = nextGrid;
    let updatedCurrentGrid = currentGrid;

    // console.log(nextGrid + currentGrid)
    
    const newValue = Math.round(currentGridTotalValue - changedValue);
    updatedCurrentGrid = Math.round(updatedCurrentGrid - newValue);
    // console.assert(roundTo(updatedCurrentGrid, 2) === roundTo(currentGrid, 2))

    
    updatedNextGrid = Math.round(updatedNextGrid + newValue);
    // console.log(updatedCurrentGrid + updatedNextGrid, nextGrid + currentGrid, width)

    const condition1 = updatedCurrentGrid <= RETURN_VALUE;
    const condition2 = updatedNextGrid <= RETURN_VALUE;
    const changedStyleKey = isBlockElement ? 'gridTemplateRows' : 'gridTemplateColumns';
    
    let gridPositionValue = (changedValue / (isBlockElement ? height : width)) * 100;
    if(!condition1 && !condition2){
        btn.style.setProperty(`--_self-ab-${isBlockElement ? 'top' : 'left'}`, gridPositionValue);
        const currentValue = isBlockElement ? (updatedCurrentGrid + 'px') : (((updatedCurrentGrid / width) * 100) + '%');
        const nextValue = isBlockElement ? (updatedNextGrid + 'px') : (((updatedNextGrid / width) * 100) + '%');
        dataGrids[index-1] = currentValue;
        dataGrids[index] = nextValue;
        // getNSetSectionTotalWidthAfterResizerEvent(section, dataGrids);
        if(!isBlockElement) dataGrids = await convertDataGridsValuesFromPixelsToPercentage(dataGrids, width);
        // console.log(dataGrids)
        section.style[changedStyleKey] = dataGrids.join(' ');
        updateCondtion = true;
    }

    return {
        updateDataGrids : [...dataGrids],
        updateCondtion
    }
}

async function onSectionHeightResizeDrag(value, section, btn, resizer, e){
    const {top, height} = section.getBoundingClientRect();
    const layoutWrapper = document.querySelector('div[data-cms-tool-id="playground_wrapper"]');
    const resizerRect = resizer.getBoundingClientRect();
    const layoutWrapperScrollTop = layoutWrapper.scrollTop;
    let changedValue = Math.round((value - top) - (resizerRect.height * .25));
    const {rows} = getGridLines(section);
    let dataGrids = [...rows];
    const changedStyleKey = 'gridTemplateRows';
    
    let updateCondtion = false;
    const newValue = Math.round(height - changedValue);
    let updatedHeight = height - newValue;
    // console.log(updatedHeight, layoutWrapperScrollTop);

    // updatedHeight -= (layoutWrapperScrollTop - top);
    const condition = updatedHeight <= SECTION_RETURN_VALUE;
    if(!condition){
        toolTipComponent(e.clientX, e.clientY, updatedHeight);
        let gridPositionValue = (changedValue / height) * 100;
        btn.style.setProperty(`--_self-ab-top`, gridPositionValue);
        dataGrids.forEach((row, rowIndex)=>{
            let updatedRow = parseFloat(row);
            updatedRow = (updatedRow / height) * 100;
            updatedRow = updatedHeight * (updatedRow / 100);
            dataGrids[rowIndex] = updatedRow + 'px';
        })
        if(section.hasAttribute(sectionAttributesObj.layerSelector.key)){
            const sectionEle = document.querySelector(`#${section.getAttribute(sectionAttributesObj.layerSelector.key)}`)
            if(sectionEle && sectionEle !== null){
                sectionEle.style[changedStyleKey] = dataGrids.join(' ');
                sectionEle.style.setProperty('--_self-resizing-minHeight', updatedHeight);
            }
        }
        section.style[changedStyleKey] = dataGrids.join(' ');
        section.style.setProperty('--_self-resizing-minHeight', updatedHeight);
        updateCondtion = true;
    }
    else{
        if(section.hasAttribute(sectionAttributesObj.layerSelector.key)){
            const sectionEle = document.querySelector(`#${section.getAttribute(sectionAttributesObj.layerSelector.key)}`)

            if(sectionEle && sectionEle !== null){
                const sectionArr = await getSectionObject(sectionEle);
                // console.log(sectionArr,section, sectionArr[1].styles[changedStyleKey])
                section.style[changedStyleKey] = sectionArr[1].styles[changedStyleKey];
            }
        }
    }
    return {updateDataGrids : [...dataGrids], updateCondtion}
}


function getNSetSectionTotalWidthAfterResizerEvent(section, dataGrids){
    const {width, height} = section.getBoundingClientRect();
    const totalDifference = dataGrids.reduce((acc, value, index)=>{
        // let valueInPercenatge = (parseFloat(value) / width) * 100;
        let valueInPercenatge = parseFloat(value);
        acc.sum += valueInPercenatge;
        if(index === dataGrids.length - 1){
            acc.difference = 100 - acc.sum;
        }
        return acc;
    }, {sum: 0, difference: 0});
    if(totalDifference.difference > 0){
        console.log(totalDifference, dataGrids)
    }
}



function convertDataGridsToFr(dataGrids){
    let updatedGrids = [...dataGrids];
    const gridLength = updatedGrids.length;
    updatedGrids.forEach((grid, index)=>{
        let updatedGrid = parseFloat(grid);
        updatedGrid = ((updatedGrid / (100 / gridLength)) * 100) / 100;
        updatedGrids[index] = updatedGrid + 'fr';
    })
    dataGrids = [...updatedGrids];
    return dataGrids;
}