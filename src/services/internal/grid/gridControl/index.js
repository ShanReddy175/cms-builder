import { store } from "../../../../redux/store";
import { createDynamicID } from "../../../../helpers/createdynamicID";
import { gridElementType } from "../../../../models/core";
import { setPageJson } from "../../../../redux/slices/pageJson";
import { removeElementEvent } from "../../../../helpers/removeEvent";
import { GridToolbarModel, convertDataGridsValuesFromPixelsToPercentage } from "./split/models/toolbar";
import { dispatchPageJson } from "../../../pageJson/update";
import { getSectionObject } from "../../../pageJson/getData";
import { GridResizerFunction } from "./resizer";
import { gridSwapFunction, setGridAreaFromArr } from "./swap";
import { gridSwapObj, sectionAttributesObj } from "../../../attributes_Library";
import { layerComponent } from "../../section/layers";
import { sectionClickEvent } from "../../section/events/click";
import { dispatchEmptySection } from "../../../pageJson/emptySection/update";
import { newSectionObject, ResponsiveBehaviourItems } from "../../../../models/section";
import { getPageBodyObject } from "../../../pageJson/section/getData";
import { dispatchPageBodyJson } from "../../../pageJson/section/update";
import setTimeoutAsync from "../../../../helpers/settimeout";

export function GridControlV2(){
    const playground = document.querySelector(`${process.env.REACT_APP_PAGEID}`);
    if(playground && playground !== null){
        const pageWrapper = playground.children
        if(pageWrapper[0] && pageWrapper[0] !== null){

            const pageSections = pageWrapper[0]?.querySelectorAll('section');
            // console.log(pageSections)
            pageSections.forEach(async(section, sectionIndex)=>{
                const grids = section?.querySelectorAll('[data-type="grid"]');
                const boom = getGridLines(section);
                sectionClickEvent(section)
                // layerComponent(section);
                updateButtonPositions(playground,section, grids, 'add', boom);
                grids.forEach((grid, gridIndex)=>{
                    // let gridToolbar = document.querySelector('grid-toolbar');
                    grid.addEventListener('click', function(e){
                        grids.forEach(gd => gd.removeAttribute('data-state'))
                        grid.setAttribute('data-state', 'active');
                        const gridArea = getGriArea(grid);
                        // gridToolbar = 
                        let gridTb = GridToolbarModel(grid, section);
                        let gridToolbar = document.querySelector('grid-toolbar');
                        
                        
                        // GridSwap Button Append
                        
                        let gridSwap = gridSwapFunction(grid, section, grids);
                        let gridSwapEle = grid.querySelector(`div[${gridSwapObj.id.key}="${gridSwapObj.id.value}"]`);
                        let allGridSwapEles = document.querySelectorAll(`div[${gridSwapObj.id.key}="${gridSwapObj.id.value}"]`);

                        const cleanup = removeElementEvent(
                            grid,
                            () => {
                                grid.removeAttribute('data-state');
                                gridToolbar?.remove();
                                gridTb?.remove();
                                allGridSwapEles.forEach(ele => ele.remove());
                                gridSwapEle?.remove();
                                gridSwap?.remove();
                                cleanup();
                                // gridToolbar = document.querySelector('grid-toolbar');
                            },
                            [
                                ...document.querySelectorAll('grid-toolbar'), 
                                gridTb,
                                gridSwap,
                                gridSwapEle
                            ],
                            'attr'
                            // [document.querySelector('grid-toolbar'), gridTb]
                        );
                    })


                })
            })
        }
    }
}




// Add Button HTML

export async function AddButton(
    section, 
    grids, 
    type="column", 
    styles, 
    buttonVisible, 
    sectionEvent, 
    index,
    isFullFilled,
    gridSource,
    isSectionAdding={state: false, position:'inner'}
){
    const existingBtn = section?.querySelectorAll(`button[data-cms-tool="AddGrid"]`);
    // console.log(existingBtn)
    if(type === 'remove'){
        existingBtn.forEach(ele => ele.remove());
        // console.log(existingBtn)
        // section.removeEventListener('mousemove', sectionEvent);
        // section.setAttribute('data-nochildhover', 'true');
        return;
    };

    // const isFullFilledGrid = isFullFilled && Object.keys(isFullFilled).length > 0; 
    // const isFullFilledGrid = isFullFilled.condition;

    // if(!isFullFilledGrid){
    //     await createGridNAddAttribute(grids, isFullFilled.arr, index, type);
    // }
    // else{
    //     grids.forEach(grid => grid.removeAttribute('data-has-grid'));
    // }
    // existingBtn?.remove();
    const sameBtn = section?.querySelector(`button[data-type="Add ${type}"]`);
    sameBtn?.remove();
    const btn = document.createElement('button');
    btn.setAttribute('data-type', `Add ${type}`);
    btn.setAttribute('data-cms-tool', `AddGrid`);
    btn.style.setProperty('--_self-ab-height', styles.height);
    btn.style.setProperty('--_self-ab-width', styles.width);
    btn.setAttribute('data-has-fullyfilled', isFullFilled.condition);
    if(type === 'column'){
        btn.style.setProperty('--_self-ab-left', styles.x);
        btn.style.setProperty('--_self-ab-colcount', styles?.colCount);
    }
    if(type === 'row'){
        btn.style.setProperty('--_self-ab-top', styles.y);
        btn.style.setProperty('--_self-ab-rowcount', styles?.rowCount);
    }
    if(type === 'removeAdd'){
        btn.style.setProperty('--_self-ab-left', styles.x);
        btn.style.setProperty('--_self-ab-colcount', styles?.colCount);
    }
    if(isFullFilled.condition){
        btn.innerHTML = `<span role="button" data-type="addgridspan" data-title="ADD ${type.toUpperCase()}">+</span>`;
    }
    btn.innerHTML += `<span role="button" data-type="resizerspan" data-grid-type="${type}" data-has-fullfilled="${isFullFilled.condition}"></span>`;
    const spanEle = btn.querySelector('span[data-type="addgridspan"]');
    const resizerSpanEle = btn.querySelector('span[data-type="resizerspan"]');
    if(spanEle && spanEle !== null){
        spanEle.setAttribute('data-issection-btn', isSectionAdding.state);
        if(isSectionAdding.state){
            spanEle.innerHTML = '<span data-type="section-add-span">Add Section</span>';
        }
        spanEle.addEventListener('click', async(e)=>{
            // e.preventDefault();
            existingBtn.forEach(ele => ele.remove());
            btn?.remove();
            // section.removeEventListener('mousemove', sectionEvent);
            if(isSectionAdding.state){
                let obj = await newSectionObject();
                // obj.responsiveBehaviour = await ResponsiveBehaviourItems('item', 1);
                const [currentSectionStartRow, ,currentSectionEndRow,] = getGriArea(section);
                await updateSectionsGridArea(section, isSectionAdding.position);
                obj.styles.gridArea = 
                    isSectionAdding.position === 'top' ? 
                    setGridAreaFromArr([currentSectionStartRow, 1, currentSectionEndRow, 2])
                    :
                    setGridAreaFromArr([currentSectionEndRow, 1, currentSectionEndRow + 1, 2]);
                obj.grids = {};
                // await dispatchEmptySection({
                //     show: true,
                //     currentSection: section.id,
                //     position: isSectionAdding.position,
                //     obj: {...obj}
                // })

                await dispatchPageJson(obj.uniqueKey, obj);
                await setTimeoutAsync(200);
                await sectionLayersUpdateNClick(obj.id);

                // await setTimeoutAsync(100);
                const newSectionEle = document.querySelector(`#${obj.id}`);
                if(newSectionEle && newSectionEle !== null){
                    newSectionEle.scrollIntoView({block: 'center', behavior:'smooth'});
                }
                
            }
            else{
                let resultObj = await AddRowORColumnV1(section, grids, type, index, sectionEvent);
                setTimeout(()=>{
                    const newEle = document.getElementById(`${resultObj.id}`);
                    if(newEle && newEle !== null){
                        const event = new Event('click');
                        // newEle.setAttribute('data-newitem', 'true');
                        // // newEle.scrollIntoView({});
                        // newEle.removeAttribute('data-newitem');
    
                        // setTimeout(()=>{
                        //     // section.addEventListener('mousemove', sectionEvent);
                        // }, 100)
                        // newEle.dispatchEvent(event);
                        // newEle.removeEventListener('click', ()=> {});
                    }
                    // GridControlV2();
                },100)
            }
            // section.addEventListener('mousemove', sectionEvent);
            // section.removeEventListener('mousemove', sectionEvent)
            // btn.removeEventListener('mouseenter', sectionEvent);
        })
    }

    if(resizerSpanEle && resizerSpanEle !== null){
        if(!isFullFilled.condition){
            resizerSpanEle.style.setProperty('--_self-grid-size', type === 'row' ? gridSource.columns.join(' ') : gridSource.rows.join(' '));
            const html = await getResizerChildElements(isFullFilled.arr, gridSource, type, section);
            resizerSpanEle.innerHTML = html;
        }
        await GridResizerFunction(
            resizerSpanEle, 
            type, 
            section, 
            index, 
            btn, 
            sectionEvent, 
            isSectionAdding
        )
    }

    btn.addEventListener('mouseenter', ()=>{
        section.removeEventListener('mousemove', sectionEvent);
        // console.log(section)
        return true;
    })
    btn.addEventListener('mouseleave', ()=>{
        section.addEventListener('mousemove', sectionEvent);
        return false;
    })
    // console.log(btn.outerHTML)
    section?.appendChild(btn);
}

export function getGriArea(element, type="element"){
    let gridArea = [];
    if(type === 'element') {
        gridArea = getComputedStyle(element)?.gridArea?.split('/');
    }
    else if(type === 'object'){
        gridArea = element?.styles?.gridArea?.split('/');
    }
    return gridArea.map(value => parseInt(value.trim()));
}


// Check Row FullFilled
export function isRowFullyFilled(section, grids, rowIndex){
    const {columnCount} = getGridLines(section);
    const columnsOccupied = new Array(columnCount).fill(false);
    grids = section.querySelectorAll('[data-type="grid"]');
    // console.log(grids);
    [...grids].forEach(item => {
        const [startRow, startCol, endRow, endCol] = getGriArea(item);
        if(startRow <= rowIndex && endRow === rowIndex + 1){
            for(let col = startCol; col< endCol; col++){
                columnsOccupied[col - 1] = true;
            }
        }
    });
    // console.log(columnsOccupied)
    return {arr : columnsOccupied, condition: columnsOccupied.every(occupied => occupied)};
}
// Check Column FullFilled
function isColumnFullyFilled(section, grids, colIndex){
    const {rowCount} = getGridLines(section);
    const rowsOccupied = new Array(rowCount).fill(false);
    // console.log(colIndex, grids);
    [...grids].forEach(item => {
        const [startRow, startCol, endRow, endCol] = getGriArea(item);
        if(startCol <= colIndex && endCol === colIndex + 1){
            for(let row = startRow; row< endRow; row++){
                rowsOccupied[row - 1] = true;
            }
        }
    });
    // console.log(rowsOccupied)
    // return rowsOccupied.every(occupied => occupied);
    return {arr : rowsOccupied, condition: rowsOccupied.every(occupied => occupied)}
}

export function getGridLines(section, type="element"){
    let styles = {};
    if(type === 'element'){
        styles = getComputedStyle(section);
    }
    else if(type === 'object'){
        styles = section.styles;
    }
    const rows = styles.gridTemplateRows.split(' ').map(value => value.trim());
    const columns = styles.gridTemplateColumns.split(' ').map(value => value.trim());
  
    return {
      rows,
      columns,
      rowCount: rows.length,
      columnCount: columns.length,
    };

}

function updateButtonPositions(playground, section, grids1, type="add", boom){
    let buttonVisible = false;
    const grids = section?.querySelectorAll('[data-type="grid"]');
    if(type === "remove"){
        section.removeEventListener('mousemove', handleShowButton);
        return;
    }
    section.addEventListener('mousemove', handleShowButton);
    section.addEventListener('mouseleave', function(e){
        // if(!buttonVisible){
            // console.log('Mouse Leave');
            // const {rows, columns, rowCount, columnCount} = getGridLines(section);
            AddButton(section, grids, 'remove', {}, buttonVisible, handleShowButton, 0,{}, {});
            grids.forEach(grid => grid.removeAttribute('data-has-grid'));
            // setTimeout(()=>{
            // }, 1000)
        // }
    })

    const excludeValue = 3;
    function handleShowButton(event){
        // layerComponent(section);
        const { top, left, width, height } = section.getBoundingClientRect();
        const {rows, columns, rowCount, columnCount} = getGridLines(section);
        const grids = section?.querySelectorAll('[data-type="grid"]');
        const {x, y} = event;
        section.removeAttribute('data-nochildhover');
        // grids.forEach(grid => grid.removeAttribute('data-has-grid'));

        const rowIndex = getIndexV1(((y-top) - (2 * excludeValue)), rows);
        const colIndex = getIndexV1(((x-left)- (2 * excludeValue)), columns);
        const isOnRowLine = rows.reduce((acc, currentValue, currentIndex)=>{
            if(acc.found) return acc;
            acc.sum += parseFloat(currentValue);
            if(Math.floor(acc.sum) >= (y-top-excludeValue) && (Math.floor(acc.sum) <= (y-top + excludeValue))){
                acc.found = true;
            }
            return acc;
        }, {sum: 0, found : false}).found;
        const isOnColumnLine = columns.reduce((acc, currentValue, currentIndex)=>{
            if(acc.found) return acc;
            acc.sum += parseFloat(currentValue);
            if(Math.floor(acc.sum) >= (x-left-excludeValue) && Math.floor(acc.sum) <= (x-left+excludeValue)){
                acc.found = true;
            }
            return acc;
        }, {sum: 0, found : false}).found;

        const isSectionTopLine = (y >= (top - excludeValue)) && (y <= (top + excludeValue));
        const pageWrapper = playground.children;
        const allSections = pageWrapper[0]?.querySelectorAll('section[data-div-type="section"]');
        const sectionIndex = [...allSections].findIndex(ele => ele.getAttribute('id') === section.getAttribute('id'));

        // console.log(sectionIndex)

        if(
            isOnRowLine && 
            rowIndex < rowCount 
            // && 
            // isRowFullyFilled(section, grids, rowIndex)
        ){
            let rowTopValue = rows.slice(0, (rowIndex)).reduce((sum, gridHeight)=>{
                return sum += parseFloat(gridHeight);
            },0);
            const isFullFilled = isRowFullyFilled(section, grids, rowIndex);
            // console.log(isFullFilled);
            rowTopValue = (rowTopValue / height) * 100;
            const btnStyles = {
                height,
                width: excludeValue,
                x: x-left,
                y: rowTopValue,
                rowCount : rowCount
            }
            AddButton(
                section, 
                grids, 
                'row', 
                btnStyles, 
                buttonVisible, 
                handleShowButton, 
                rowIndex,
                isFullFilled,
                {columns, rows}
            );
            buttonVisible = true;

            if(!isFullFilled.condition){
                createGridNAddAttribute(grids, isFullFilled.arr, rowIndex, 'row');
            }
            else{
                // grids.forEach(grid => grid.removeAttribute('data-has-grid'));
                createGridNAddAttribute(grids, isFullFilled.arr, rowIndex, 'row');
            }
        }
        if(
            isOnColumnLine && 
            colIndex < columnCount 
            // && 
            // isColumnFullyFilled(section, grids, colIndex).condition
        ){
            const isFullFilled = isColumnFullyFilled(section, grids, colIndex);
            const columnLeftValue = columns.slice(0, (colIndex)).reduce((sum, gridWidth)=>{
                return sum += parseFloat(gridWidth);
            },0);
            const btnStyles = {
                height,
                width: excludeValue,

                x: (columnLeftValue / width) * 100,
                y: y-top,
                colCount: columnCount
            }
            AddButton(
                section, 
                grids,
                'column', 
                btnStyles, 
                buttonVisible, 
                handleShowButton, 
                colIndex,
                isFullFilled,
                {columns, rows}
            );
            buttonVisible = true;

            if(!isFullFilled.condition){
                createGridNAddAttribute(grids, isFullFilled.arr, colIndex, 'column');
            }
            else{
                // grids.forEach(grid => grid.removeAttribute('data-has-grid'));
                createGridNAddAttribute(grids, isFullFilled.arr, colIndex, 'column');
            }
        }

        else if(
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
                buttonVisible, 
                handleShowButton, 
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
                buttonVisible, 
                handleShowButton, 
                rowIndex,
                isFullFilled,
                {columns, rows},
                {state:true, position:'top'}
            );
        }


        else if(!(isOnRowLine && rowIndex < rowCount && 
            isRowFullyFilled(section, grids, rowIndex)).condition && !(isOnColumnLine && 
                colIndex < columnCount && 
                isColumnFullyFilled(section, grids, colIndex).condition)){
            const rowTopValue = rows.slice(0, (rowIndex)).reduce((sum, height)=>{
                return sum += parseInt(height);
            },0);
            const columnLeftValue = columns.slice(0, (colIndex)).reduce((sum, gridWidth)=>{
                return sum += parseFloat(gridWidth);
            },0);
            const btnStyles = {
                height,
                width: excludeValue,
                x: (columnLeftValue / width) * 100,
                // y: y-top
                y: rowTopValue,
                colCount: columnCount
                // y: rows[rowIndex-1-1]
            }

            // if(!isFullFilled.condition){
            //     createGridNAddAttribute(grids, isFullFilled.arr, colIndex, 'column');
            // }
            // else{
            //     // grids.forEach(grid => grid.removeAttribute('data-has-grid'));
            //     createGridNAddAttribute(grids, isFullFilled.arr, colIndex, 'column');
            // }
            // grids.forEach(grid => grid.removeAttribute('data-has-grid'));
            AddButton(section, grids,'remove', btnStyles, buttonVisible, handleShowButton, colIndex)
            // setTimeout(()=>{
            // }, 1000)
        }
    }
    
}


function getTwoDecimalValue(value){
    const result = (Math.floor(value * 100) / 100).toFixed(2);
    // console.log(result);
    return result;
}


// Add Row or Column Functionality

async function  AddRowORColumnV1(section, grids, type, index, sectionEvent){
    // const pageJson = store.getState().pageJson;
    // let pageObj = pageJson.page;
    // let bodyObj = pageObj.body;
    // let sectionObj = Object.entries(bodyObj).find(([sectionKey, sectionValue], index)=>{
    //     return sectionValue.id === section.getAttribute('id')
    // })
    let sectionObj = await getSectionObject(section);
    const newGrid = await gridElementType({});
    newGrid.id = await createDynamicID('grid', 10);
    
    if(sectionObj.length){
        var sectionKey = sectionObj[0];
        var sectionValue = sectionObj[1];
        var sectionGrids = sectionValue.grids;
        var {rows, columns, rowCount, columnCount} = getGridLines(section);
        if(sectionGrids){
            const isRowGrid = (type === 'row');
            const newGridArea = isRowGrid ? `${index+1}/1/${index+1+1}/${columnCount+1}` : `1/${index+1}/${rowCount+1}/${index+1+1}`;
            newGrid.styles.gridArea = newGridArea;
            let sectionGridsArr = Object.entries(sectionGrids);
            sectionGridsArr.forEach((gridArr, gridIndex)=>{
                let updatedGrid = {...gridArr[1]};
                let [startRow, startCol, endRow, endCol] = getGriArea(updatedGrid, 'object');
                const condition = isRowGrid ? (startRow > index) : (startCol > index);
                if(condition){
                    if(isRowGrid){
                        startRow = startRow + 1;
                        endRow = endRow + 1;
                    }
                    else{
                        startCol = startCol + 1;
                        endCol = endCol + 1;
                    }
                    updatedGrid = {
                        ...updatedGrid,
                        styles:{
                            ...updatedGrid.styles,
                            gridArea: `${startRow}/${startCol}/${endRow}/${endCol}`
                        }
                    }
    
                    gridArr[1] = {...updatedGrid}
                }
            });

            let updatedGrids = Object.fromEntries(sectionGridsArr);
            const timestamp = Date.now();
            const newGridKey = `addedgrid${(isRowGrid ? rowCount : columnCount)+1}${timestamp}`;
            newGrid.uniqueKey = newGridKey;
            let dataGrids = isRowGrid ? [...rows] : [...columns];
            const newColWidth = 100 / (columnCount + 1);
            const { width, height} = section?.getBoundingClientRect();
            if(!isRowGrid){
                dataGrids.forEach((colWidth, colIndex)=>{
                    let cellWidth = colWidth;
                    cellWidth = (parseFloat(cellWidth) / width) * 100;
                    let substractWidth = cellWidth * (newColWidth / 100);
                    cellWidth = cellWidth - substractWidth;
                    dataGrids[colIndex] = cellWidth + '%'
                })
            }
            const newGridMinSize = isRowGrid ? '100px' : (newColWidth + '%');
            dataGrids.splice(index,0,newGridMinSize);
            const changedStyleKey = isRowGrid ? 'gridTemplateRows' : 'gridTemplateColumns';
            // console.log(dataGrids);
            if(type === 'column'){
                dataGrids = await convertDataGridsValuesFromPixelsToPercentage(dataGrids, isRowGrid ? height : width);
            }
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
            if(type === 'row'){
                // sectionValue.responsiveBehaviour = await ResponsiveBehaviourItems('item', 1);
                sectionValue = await prepareGridTemplateRowsNewVersion(sectionValue);
            }
            section.setAttribute('data-nochildhover', 'true');
            await dispatchPageJson(sectionKey, sectionValue);
            return {id: newGrid?.id};
        }
    }
}


// async function dispatchPageJson(key, value){
//     const pageJson = store.getState().pageJson;

//     store.dispatch(setPageJson({
//         ...pageJson,
//         page:{
//             ...pageJson.page,
//             body:{
//                 ...pageJson?.page?.body,
//                 [key]:{
//                     ...value
//                 }
//             }
//         }
//     }))
// }




export function getIndexV1(value, arr){
    const index = arr.map(value => parseFloat(value.trim()))
        .reduce((acc, currentValue, currentIndex)=>{
        if(acc.found) return acc;
        acc.sum += Math.ceil(currentValue);
        if(Math.ceil(acc.sum) >= value){
            acc.index = currentIndex + 1;
            acc.found = true
        }
        // console.log(acc)
        return acc;
        }, {sum:0, index: -1, found: false}).index;
    return index;
}



async function createGridNAddAttribute(grids, arr, gridIndex, type){
    const trueIndeces = arr.reduce((acc, value, index)=>{
        if(value){
            acc.push(index+1)
        }
        return acc;
    }, []);
    grids.forEach((grid, index)=>{
        const [startRow, startCol,endRow, endCol] = getGriArea(grid);
        let isInTrueIndices = false;
        if(type === 'row'){
            if(startRow <= gridIndex && endRow === gridIndex + 1){
                for(let i=startCol; i < endCol;i++){
                    if(trueIndeces.some(ele => ele === i)){
                        isInTrueIndices = true
                    }
                }
            }
        }
        else{
            if(startCol <= gridIndex && endCol === gridIndex + 1){
                for(let i=startRow; i < endRow;i++){
                    if(trueIndeces.some(ele => ele === i)){
                        isInTrueIndices = true
                    }
                }
            }
        }

        grid.setAttribute('data-has-grid', isInTrueIndices);
    })
}

async function getResizerChildElements(arr, gridSource, type, section){
    const isRowGrid = type === 'row';
    const {width, height} = section.getBoundingClientRect();
    const {columns, rows} = gridSource;
    const dataGrids = !isRowGrid ? [...rows] : [...columns];
    let html = '';
    dataGrids.forEach((gridSize, gridIndex)=>{
        const isAciveEle = arr[gridIndex];
        let eleSize = !isRowGrid ? parseFloat(gridSize) : (parseFloat(gridSize) / (isRowGrid ? height : width)) * 100;
        // console.log(eleSize, dataGrids, width)
        const startIndex = gridIndex + 1;
        if(isAciveEle){
            html += `<span 
                style="
                    --_self-ele-size: ${eleSize};
                    --_self-ele-start: ${startIndex};
                    --_self-ele-end: ${startIndex + 1}
                " 
                data-state="${isAciveEle}"
            ></span>`;
        }
    })
    return html;
}


export async function updateSectionsGridArea(section, position = 'bottom', type="add"){
    let bodyObj = await getPageBodyObject();
    let sections = Object.entries(bodyObj);
    const isAddition = (type === 'add');
    const [currentSectionStartRow, ,currentSectionEndRow,] = getGriArea(section);
    if(sections.length){

        sections.forEach((sectionArr, sectionIndex)=>{
            let updatedSection = sectionArr[1];
            let [startRow, startCol, endRow, endCol] = getGriArea(updatedSection, 'object');
            const condition = position === 'top' ? (startRow >= currentSectionStartRow) : (startRow >= currentSectionEndRow);
            if(isAddition){
                if(condition){
                    startRow += 1;
                    endRow += 1;
                }
            }
            else{
                if(condition){
                    startRow -= 1;
                    endRow -= 1;
                }
            }

            updatedSection = {
                ...updatedSection,
                styles : {
                    ...updatedSection.styles,
                    gridArea : setGridAreaFromArr([startRow, startCol, endRow, endCol])
                }
            }
            sectionArr[1] = {...updatedSection}
        })

        
        bodyObj = Object.fromEntries(sections);

        await dispatchPageBodyJson({...bodyObj});
    }
}


export async function sectionLayersUpdateNClick(id, type="add"){
    const layersWrapper = document.querySelector('div[data-cms-tool="CMS Layers"] > div');
    if(layersWrapper && layersWrapper !== null){
        const childrenElements = [...layersWrapper.children]
        childrenElements.forEach(ele => {
            const isTargetEle = (type === 'add') ? (ele.getAttribute('data-cms-target') === id) : false;
            ele.setAttribute(sectionAttributesObj.layer.key, isTargetEle);
        })
    }

    const pageWrapper = document.querySelector('div[data-id="cms__template__editor"] > div[data-id="page-wrapper"]');
    // console.log(pageWrapper)
    if(pageWrapper && pageWrapper !== null){
        const childrenElements = pageWrapper.querySelectorAll('section[data-div-type="section"]');
        // console.log(childrenElements)
        childrenElements.forEach(ele => {
            const isTargetEle = (type === 'add') ? (ele.getAttribute('id') === id) : false;
            ele.setAttribute(sectionAttributesObj.layer.key, isTargetEle);
        })
    }
}



export async function prepareGridTemplateRowsNewVersion(section){
    const {rows, rowCount} = getGridLines(section, 'object');
    const scalingTypeIndex = await ResponsiveBehaviourItems('index', section.responsiveBehaviour);
    let gtr = '';
    // const minPercentage = 37.7777;
    const minPercentage = 26.7777;
    let totalValue = 0;
    if(scalingTypeIndex === 0) //PROPORTIONAL SCALING
    { 
        rows.forEach((ele, index) => {
            const valueInFr = (ele.includes('fr') && ele !== '');
            let value = valueInFr ? (minPercentage / rowCount) * parseFloat(ele) : convertToFr(ele);
            gtr += (getSpace(index) + makeGTRForElement(0, value));
        })
    }
    else if(scalingTypeIndex === 1){ // FIXED HEIGHT
        // section.styles.minHeight = 
        rows.forEach((ele, index)=>{
            let value = ele;
            gtr += (getSpace(index) + makeGTRForElement(1, value));
        })
    }
    else if(scalingTypeIndex === 2){ // FIT TO CONTENT

    }
    section.styles.gridTemplateRows = gtr;
    return section;
}

function makeGTRForElement(type, value){
    let gtr = ``;
    if(type === 0){ //Proportional Scaling
        gtr = `minmax(clamp(.5px, calc((${value} * var(--_cms-playground-unit)) - (${value / 100} * var(--_cms-scrollbar-width))), calc(${value / 100} * var(--_cms-section-max-width))), auto)`
    }
    else if(type === 1){
        gtr = `minmax(${value}, auto)`;
    }
    else if(type === 2){
        gtr = `minmax(max-content, ${value})`;
    }
    return gtr;
}

function convertToFr(value){
    if(value.includes('px')){
        let updatedValue = parseFloat(value);
        const {width} = document.querySelector(process.env.REACT_APP_ROOT)?.getBoundingClientRect();
        const oneCqw = width * .01;
        const scrollWidth = 15;
        value = (updatedValue / (oneCqw - (scrollWidth/100)));
    }
    return value;
}

function getSpace(index){
    return index !== 0 ? ' ' : '';
}



