import { getGriArea, getGridLines } from "../..";
import { createDynamicID } from "../../../../../../helpers/createdynamicID";
import { removeElementEvent } from "../../../../../../helpers/removeEvent";
import { gridElementType } from "../../../../../../models/core";
import { getSectionObject } from "../../../../../pageJson/getData";
import { dispatchPageJson } from "../../../../../pageJson/update";


export function GridToolbarModel(sourceElement, parentElement){
    const toolBarData = {
        unique: {
            key: 'data-type',
            value: 'cms-grid-toolbar'
        }
    }
    const existingElement = document.querySelectorAll(`[${toolBarData.unique.key}="${toolBarData.unique.value}"]`);
    existingElement.forEach(ele => ele.remove());
    const divEle = document.createElement('div');
    const {top, left, width, height} = sourceElement?.getBoundingClientRect();
    const parentRect = parentElement?.getBoundingClientRect();
    
    const leftValue = ((left - parentRect.left) / parentRect.width) * 100;
    const topValue = ((top - parentRect.top) / parentRect.height) * 100;
    const widthValue = ((width / parentRect.width) * 100);
    
    divEle.setAttribute(toolBarData.unique.key, toolBarData.unique.value);
    divEle.style.setProperty('--_cms-grid-toolbar-left', `${leftValue}`);
    divEle.style.setProperty('--_cms-grid-toolbar-top', topValue);
    divEle.style.setProperty('--_cms-grid-toolbar-maxwidth', widthValue);

    // const gridToolbar = document.createElement('grid-toolbar');
    
    // gridToolbar.setCallback(()=>{console.log('hello')});
    // gridToolbar.setPosition(
    //     {
    //         left: leftValue,
    //         top: topValue,
    //         maxwidth: widthValue
    //     }
    // )
    // parentElement.appendChild(gridToolbar)

    // divEle.appendChild(gridToolbar)

    // parentElement.appendChild(divEle);

    // const cleanup = removeElementEvent(
    //     gridToolbar,
    //     () => {
    //         existingElement.forEach(ele => ele.remove());
    //         cleanup();
    //     },
    //     [sourceElement]
    // );

    // return gridToolbar;



    const divEle1 = document.createElement('div');
    // divEle.classList.add(styles.toolbar);
    divEle1.setAttribute('id', 'grid-toolbar');
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

        divEle1.appendChild(element)
    })

    divEle.appendChild(divEle1);
    const allSplitItems = divEle1.querySelectorAll('[data-type="toolbar-item"]');
    allSplitItems.forEach((item, index)=>{
        item.addEventListener('click', function(){
            const type = item.getAttribute('aria-label');
            splitElementsClick(type, sourceElement, parentElement)
        })
    })
    parentElement.appendChild(divEle);
    return divEle;
}

async function splitElementsClick(type, grid, section){
    const isRowGrid = (type === 'Horizontally');
    let sectionObj = await getSectionObject(section);

    const newGrid = await gridElementType({});
    newGrid.id = await createDynamicID('grid', 10);
    let [curentStartRow, currentStartCol, currentEndRow, currentEndCol] = getGriArea(grid);

    if(sectionObj.length){
        var sectionKey = sectionObj[0];
        var sectionValue = sectionObj[1];
        var sectionGrids = sectionValue.grids;
        var {rows, columns, rowCount, columnCount} = getGridLines(section);
        if(sectionGrids){
            let sectionGridsArr = Object.entries(sectionGrids);
            let dataGrids = isRowGrid ? [...rows] : [...columns];
            // console.log(dataGrids, currentStartCol)
            let newColWidthV1 = 0;
            const {width, height} = section?.getBoundingClientRect();

            let currentGridObj = dataGrids.reduce((acc, currentValue, currentIndex)=>{
                const startGrid = isRowGrid ? curentStartRow : currentStartCol;
                const endGrid = isRowGrid ? currentEndRow : currentEndCol;
                if((currentIndex >= (startGrid - 1)) && ((currentIndex < (endGrid - 1)))){
                    acc.gridWidth += parseFloat(currentValue);
                    acc.gridPoints.push(currentIndex);
                }
                if(currentIndex < (startGrid - 1)){
                    acc.beforeWidth += parseFloat(currentValue);
                }
                return acc;
            },{beforeWidth: 0, gridPoints:[], gridWidth: 0});
            const TOLERANCE = 0.01;
            const DECIMALS = 1; 
            const isExistingGrid = dataGrids.reduce((acc, currentValue, currentIndex)=>{
                if(acc.found) return acc;
                const parentSize = isRowGrid ? height : width;
                const breakPoint = ((parseFloat(currentGridObj.gridWidth) * .5) + parseFloat(currentGridObj.beforeWidth));
                currentValue = convertValueToPixels(currentValue, parentSize);
                acc.sum += parseFloat(currentValue);
                if(roundTo(acc.sum, DECIMALS) === roundTo(breakPoint, DECIMALS)){
                    acc.found = true;
                    acc.breakPointIndex = currentIndex;
                }
                return acc;
            },{sum:0, found: false, breakPointIndex : 0});

            if(!isRowGrid){
                let newColWidth = dataGrids.reduce((acc, currentValue, currentIndex)=>{
                    if((currentIndex >= (currentStartCol - 1)) && ((currentIndex < (currentEndCol - 1)))){
                        acc.breakPoint += parseFloat(currentValue);
                        acc.gridPoints.push(currentIndex);
                    }
                    return acc;
                },{breakPoint: 0, gridPoints:[]});

                dataGrids.forEach((colWidth, colIndex)=>{
                    const isCurrentIndex = (colIndex === (currentStartCol - 1));
                    let cellWidth = isCurrentIndex && !isExistingGrid.found ? newColWidth.breakPoint : colWidth;
                    // console.log(isCurrentIndex, cellWidth, newColWidth)
                    cellWidth = (parseFloat(cellWidth) / width) * 100;
                    let substractWidth = cellWidth * (currentGridObj.gridWidth / 100);
                    if(isCurrentIndex && !isExistingGrid.found){
                        cellWidth = cellWidth * .5;
                        newColWidthV1 = cellWidth;
                    }
                    // cellWidth = cellWidth;
                    dataGrids[colIndex] = cellWidth + '%'
                })

            }
            const newGridMinSize = isRowGrid ? '100px' : (newColWidthV1 + '%');

            let newGridArea = ``;
            if(!isExistingGrid.found){
                dataGrids.splice(currentStartCol,0,newGridMinSize);
                newGridArea = isRowGrid ? `${curentStartRow+1}/${currentStartCol}/${curentStartRow+1+1}/${currentEndCol}` : `${curentStartRow}/${currentEndCol}/${currentEndRow}/${currentEndCol+1}`;
            }
            else{
                newGridArea = isRowGrid ? `${curentStartRow+1}/${currentStartCol}/${curentStartRow+1+1}/${currentEndCol}` : `${curentStartRow}/${isExistingGrid.breakPointIndex + 1 + 1}/${currentEndRow}/${currentEndCol}`;
            }
            newGrid.styles.gridArea = newGridArea;

            sectionGridsArr.forEach((gridArr, gridIndex)=>{
                let updatedGrid = {...gridArr[1]};
                let [startRow, startCol, endRow, endCol] = getGriArea(updatedGrid, 'object');
                const targetGrid = (grid.id === updatedGrid.id);
                const sameGridArea = isRowGrid ? false : (startCol === currentStartCol && endCol === currentEndCol);
                const aboveEndGridArea = isRowGrid ? false: (endCol > currentEndCol);
                const isLastGrid = isRowGrid ? false : (endCol === currentEndCol);

                if(isExistingGrid.found){
                    if(isRowGrid){}
                    else{
                        if(targetGrid){
                            endCol = isExistingGrid.breakPointIndex + 1 + 1;
                        }
                    }
                }
                else{
                    if(isRowGrid){}
                    else{
                        if(targetGrid){
                            endCol = endCol - 1 + 1;
                        }
                        else if(sameGridArea){
                            endCol = endCol + 1;
                        }
                        else if(aboveEndGridArea || isLastGrid){
                            if(startCol > currentStartCol){
                                startCol = startCol + 1;
                            }
                            endCol = endCol + 1;
                        }
                    }
                }


                
                updatedGrid = {
                    ...updatedGrid,
                    styles:{
                        ...updatedGrid.styles,
                        gridArea: `${startRow}/${startCol}/${endRow}/${endCol}`
                    }
                }
                gridArr[1] = {...updatedGrid}
                // [startRow, startCol, endRow, endCol] = getGriArea(updatedGrid, 'object');
            })
            let updatedGrids = Object.fromEntries(sectionGridsArr);
            const timestamp = Date.now();
            const newGridKey = `addedgrid${(isRowGrid ? rowCount : columnCount)+1}${timestamp}`;
            newGrid.uniqueKey = newGridKey;


            // let dataGrids = isRowGrid ? [...rows] : [...columns];
            // // console.log(dataGrids, currentStartCol)
            // let newColWidthV1 = 0;
            // const {width} = section?.getBoundingClientRect();
            // if(!isRowGrid){
            //     // console.log(currentStartCol, currentEndCol)
            //     let newColWidth = dataGrids.reduce((acc, currentValue, currentIndex)=>{
            //         if((currentIndex >= (currentStartCol - 1)) && ((currentIndex < (currentEndCol - 1)))){
            //             acc += parseFloat(currentValue);
            //         }
            //         return acc;
            //     },0);
            //     dataGrids.forEach((colWidth, colIndex)=>{
            //         const isCurrentIndex = (colIndex === (currentStartCol - 1));
            //         let cellWidth = isCurrentIndex ? newColWidth : colWidth;
            //         // console.log(isCurrentIndex, cellWidth, newColWidth)
            //         cellWidth = (parseFloat(cellWidth) / width) * 100;
            //         // let substractWidth = cellWidth * (newColWidthV2 / 100);
            //         if(isCurrentIndex){
            //             cellWidth = cellWidth * .5;
            //             newColWidthV1 = cellWidth;
            //         }
            //         // cellWidth = cellWidth;
            //         dataGrids[colIndex] = cellWidth + '%'
            //     })

            //     console.log(dataGrids)
            //     // console.log(newColWidth)
            //     // let cellWidth = newColWidth;
            //     // cellWidth = (parseFloat(cellWidth) / width) * 100;
            //     // let substractWidth = cellWidth * .5;
            //     // cellWidth = cellWidth - substractWidth;
            //     // newColWidth = cellWidth;
            //     // dataGrids[currentStartCol-1] = cellWidth + '%';

            //     // dataGrids.forEach()
            // }
            // const newGridMinSize = isRowGrid ? '100px' : (newColWidthV1 + '%');
            // if(dataGrids[currentStartCol] !== newGridMinSize){
            //     dataGrids.splice(currentStartCol,0,newGridMinSize);
            // }
            // console.log(dataGrids, newColWidthV1)


            const changedStyleKey = isRowGrid ? 'gridTemplateRows' : 'gridTemplateColumns';
            console.log(dataGrids)
            sectionValue = {
                ...sectionValue,
                grids: {
                    ...updatedGrids,
                    [newGridKey]:{
                        ...newGrid
                    }
                },
                styles:{
                    ...sectionValue.styles,
                    [changedStyleKey]: dataGrids.join(' ')
                },
            }

            console.log(sectionValue)
            // section.setAttribute('data-nochildhover', 'true');
            await dispatchPageJson(sectionKey, sectionValue);
            const event = new Event('click');
            // grid.removeEventListener('click', null);
            grid.dispatchEvent(event);
            // const condition = isRowGrid ? (startRow > index) : (startCol > index);
        }
    }

}



function convertValueToPixels(value, width){
    let type = 'pixels';
    if (/%/.test(value)) type = 'percentage';
    // console.log(value, width, type)
    if(type === 'percentage') return width * (parseFloat(value) / 100);
    return value;
}

function convertValueToPercentage(value, width){
    // console.log(isNaN(value))
    let type = 'percentage';
    if (/px/.test(value)) type = 'pixels';
    console.log((parseFloat(value) / width) * 100)
    if(type === 'pixels' || !isNaN(value)) return ((parseFloat(value) / width) * 100);
    
    return value;
}

const roundTo = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};