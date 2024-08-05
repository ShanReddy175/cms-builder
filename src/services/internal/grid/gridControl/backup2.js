import { store } from "../../../../redux/store";
import { createDynamicID } from "../../../../helpers/createdynamicID";
import { gridElementType } from "../../../../models/core";
import { setPageJson } from "../../../../redux/slices/pageJson";
import { removeElementEvent } from "../../../../helpers/removeEvent";
import { GridToolbarModel, convertDataGridsValuesFromPixelsToPercentage } from "./split/models/toolbar";
import { dispatchPageJson } from "../../../pageJson/update";
import { getSectionObject } from "../../../pageJson/getData";
import { GridResizerFunction } from "./resizer";

export function GridControlV2(){
    const playground = document.querySelector(`${process.env.REACT_APP_PAGEID}`);
    if(playground && playground !== null){
        const pageWrapper = playground.children
        if(pageWrapper[0] && pageWrapper[0] !== null){
            const pageSections = pageWrapper[0]?.querySelectorAll('section');
            // console.log(pageSections)
            pageSections.forEach(async(section, sectionIndex)=>{
                const grids = section?.querySelectorAll('[data-type="grid"]');
                // const rows = getComputedStyle(section)?.gridTemplateRows.split(' ').length;
                // const columns = getComputedStyle(section)?.gridTemplateColumns.split(' ').length;
                
                // Add Button Show
                // console.log(grids.length)
                // section.removeEventListener('mousemove', null);
                // console.log('hitting')
                const boom = getGridLines(section);
                updateButtonPositions(playground,section, grids, 'add', boom);
                // await AddRowORColumnV1(section, grids, 'column', -1, ()=>{});
                // window.addEventListener('resize', updateButtonPositions(playground, section, grids));



                grids.forEach((grid, gridIndex)=>{
                    // let gridToolbar = document.querySelector('grid-toolbar');
                    grid.addEventListener('click', function(e){
                        grids.forEach(gd => gd.removeAttribute('data-state'))
                        grid.setAttribute('data-state', 'active');
                        const gridArea = getGriArea(grid);
                        // gridToolbar = 
                        let gridTb = GridToolbarModel(grid, section);
                        let gridToolbar = document.querySelector('grid-toolbar');
                        const cleanup = removeElementEvent(
                            grid,
                            () => {
                                grid.removeAttribute('data-state');
                                gridToolbar?.remove();
                                gridTb?.remove();
                                cleanup();
                                // gridToolbar = document.querySelector('grid-toolbar');
                            },
                            [...document.querySelectorAll('grid-toolbar'), gridTb],
                            'attr'
                            // [document.querySelector('grid-toolbar'), gridTb]
                        );
                    })


                })
            })
        }
    }
}


// window.addEventListener('resize', GridControlV2);


// Add Button HTML

async function AddButton(playground, section, grids, type="column", styles, buttonVisible, sectionEvent, index){
    const existingBtn = section?.querySelectorAll(`button[data-cms-tool="AddGrid"]`);
    // console.log(existingBtn)
    if(type === 'remove'){
        existingBtn.forEach(ele => ele.remove());
        // console.log(existingBtn)
        // section.removeEventListener('mousemove', sectionEvent);
        // section.setAttribute('data-nochildhover', 'true');
        return;
    };
    // existingBtn?.remove();
    const sameBtn = section?.querySelector(`button[data-type="Add ${type}"]`);
    sameBtn?.remove();
    const btn = document.createElement('button');
    btn.setAttribute('data-type', `Add ${type}`);
    btn.setAttribute('data-cms-tool', `AddGrid`);
    btn.style.setProperty('--_self-ab-height', styles.height);
    btn.style.setProperty('--_self-ab-width', styles.width);
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
    btn.innerHTML = `<span role="button" data-type="addgridspan" data-title="ADD ${type.toUpperCase()}">+</span>`;
    btn.innerHTML += `<span role="button" data-type="resizerspan"></span>`;
    const spanEle = btn.querySelector('span[data-type="addgridspan"]');
    const resizerSpanEle = btn.querySelector('span[data-type="resizerspan"]');
    if(spanEle && spanEle !== null){
        spanEle.addEventListener('click', async(e)=>{
            // e.preventDefault();
            existingBtn.forEach(ele => ele.remove());
            btn?.remove();
            // section.removeEventListener('mousemove', sectionEvent);
            const resultObj = await AddRowORColumnV1(section, grids, type, index, sectionEvent);
            // section.addEventListener('mousemove', sectionEvent);
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
            // section.removeEventListener('mousemove', sectionEvent)
            // btn.removeEventListener('mouseenter', sectionEvent);
        })
    }

    if(resizerSpanEle && resizerSpanEle !== null){
        await GridResizerFunction(resizerSpanEle, type, section, index, btn, sectionEvent)
        // resizerSpanEle.addEventListener('mousedown', async function(e){
        //     e.preventDefault();
        //     const resizer = e.target;
        // })
    }

    btn.addEventListener('mouseenter', ()=>{
        section.removeEventListener('mousemove', sectionEvent)
        return true;
    })
    btn.addEventListener('mouseleave', ()=>{
        section.addEventListener('mousemove', sectionEvent);
        return false;
    })
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
function isRowFullyFilled(section, grids, rowIndex){
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
    return columnsOccupied.every(occupied => occupied);
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
    return rowsOccupied.every(occupied => occupied);
}

export function getGridLines(section){
    const styles = getComputedStyle(section);
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
    // console.log(boom)
    // const {rows, columns, rowCount, columnCount} = getGridLines(section);
    // const {rows, columns, rowCount, columnCount} = boom;
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
            AddButton(playground, section, grids, 'remove', {}, buttonVisible, handleShowButton, 0)
            // setTimeout(()=>{
            // }, 1000)
        // }
    })

    const excludeValue = 3;
    function handleShowButton(event){
        // console.log(rows)
        const { top, left, width, height } = section.getBoundingClientRect();
        const {rows, columns, rowCount, columnCount} = getGridLines(section);
        const grids = section?.querySelectorAll('[data-type="grid"]');
        // console.log(top, left, width, height, columns)
        const {x, y} = event;
        section.removeAttribute('data-nochildhover');
        // const rowIndex = Math.floor((((y - top) - (2 * excludeValue)) / height) * rowCount) + 1;
        // const colIndex = Math.floor((((x - left) - (2 * excludeValue)) / width) * columnCount) + 1;
        // const colIndex = Math.floor(((x - left) / width) * columnCount) + 1;

        const rowIndex = getIndexV1(((y-top) - (2 * excludeValue)), rows);
        const colIndex = getIndexV1(((x-left)- (2 * excludeValue)), columns);
        // console.log(rowIndex, colIndex, columns, x-left)
    
        // const isOnRowLine = (y - top) % height === 0;
        // const isOnColumnLine = (x - left) % width === 0;
        // const isOnColumnLine = columns.some(value => getTwoDecimalValue(value.trim()) === getTwoDecimalValue((x-left)));
        // console.log(rows, columns)
        // console.log(rows)
        // const isOnRowLine = rows.some((value, index) => getTwoDecimalValue((index + 1) * parseFloat(value.trim())) > ((y-top)) && getTwoDecimalValue((index + 1) * parseFloat(value.trim())) < ((y-top)));
        // const isOnRowLine = rows.some((value, index) =>{
        //     const value1 = Math.ceil((index + 1) * parseFloat(value.trim()));
        //     const value2 = Math.ceil(y-top);
        //     // const condition = Math.ceil((index + 1) * parseInt(value.trim())) === Math.ceil((y-top));
        //     const condition = value1 === value2;
        //     console.log(value1, value2, condition);
        //     return condition;
        // });
        // const isOnColumnLine = columns.some((value, index) => getTwoDecimalValue((index + 1) * parseFloat(value.trim())) > ((x-left) - excludeValue) && getTwoDecimalValue((index + 1) * parseFloat(value.trim())) < ((x-left) + excludeValue));
        // const isOnColumnLine = columns.some(
        //     (value, index) => {
        //         const value1 = Math.ceil((index+1) * parseFloat(value.trim()));
        //         const value2 = Math.ceil(x-left);
        //         const condition = value1 === value2;
        //         return condition;
        //         // getTwoDecimalValue((index + 1) * parseFloat(value.trim())) > ((x-left) - excludeValue) && getTwoDecimalValue((index + 1) * parseFloat(value.trim())) < ((x-left) + excludeValue)
        // });
            
        // console.log(rows, columns)
        const isOnRowLine = rows.reduce((acc, currentValue, currentIndex)=>{
            // console.log(acc?.sum, rows);
            if(acc.found) return acc;
            // acc.sum += Math.ceil(currentValue);
            acc.sum += parseFloat(currentValue);
            // if(acc.sum === Math.ceil(y-top)){
            if(Math.floor(acc.sum) >= (y-top-excludeValue) && (Math.floor(acc.sum) <= (y-top + excludeValue))){
                acc.found = true;
            }
            return acc;
        }, {sum: 0, found : false}).found;
        // console.log(isOnRowLine, y-top)
        const isOnColumnLine = columns.reduce((acc, currentValue, currentIndex)=>{
            // console.log(acc?.sum, columns, x-left)
            if(acc.found) return acc;
            // acc.sum += Math.ceil(currentValue);
            acc.sum += parseFloat(currentValue);
            // if(acc.sum === Math.ceil(x-left)){
            if(Math.floor(acc.sum) >= (x-left-excludeValue) && Math.floor(acc.sum) <= (x-left+excludeValue)){
                acc.found = true;
            }
            return acc;
        }, {sum: 0, found : false}).found;
        // console.log(isOnRowLine, isOnColumnLine)
        // console.log(isOnColumnLine)

        // const rowTopValue = rows.slice(0, (rowIndex - 1)).reduce((sum, height)=>{
        //     return sum += parseInt(height);
        // },0)
        // const btnStyles = {
        //     height,
        //     width: excludeValue,
        //     x: x-left,
        //     // y: y-top
        //     y: rowTopValue
        //     // y: rows[rowIndex-1-1]
        // }
        // console.log(x-left, y-top)
        // console.log(isOnRowLine, rowIndex, isRowFullyFilled(section, grids, rowIndex))
        if(
            isOnRowLine && 
            rowIndex < rowCount && 
            isRowFullyFilled(section, grids, rowIndex)
        ){
            // console.log(playground?.scrollTop)
            let rowTopValue = rows.slice(0, (rowIndex)).reduce((sum, gridHeight)=>{
                return sum += parseFloat(gridHeight);
            },0);

            rowTopValue = (rowTopValue / height) * 100;
            // console.log(rowIndex, rowTopValue)
            const btnStyles = {
                height,
                width: excludeValue,
                x: x-left,
                // y: y-top
                y: rowTopValue,
                rowCount : rowCount
                // y: rows[rowIndex-1-1]
            }
            // console.log(rowIndex, colIndex, isOnRowLine, isOnColumnLine, y-top, x-left)
            AddButton(playground, section, grids, 'row', btnStyles, buttonVisible, handleShowButton, rowIndex);
            buttonVisible = true;
        }
        // console.log(isOnColumnLine, isColumnFullyFilled(section, grids, colIndex))
        if(
            isOnColumnLine && 
            colIndex < columnCount && 
            isColumnFullyFilled(section, grids, colIndex)
        ){
            const columnLeftValue = columns.slice(0, (colIndex)).reduce((sum, gridWidth)=>{
                return sum += parseFloat(gridWidth);
            },0);
            // console.log(columnLeftValue, columns)
            const btnStyles = {
                height,
                width: excludeValue,
                // x: x-left,
                x: (columnLeftValue / width) * 100,
                // x: columnLeftValue,
                y: y-top,
                colCount: columnCount
                // y: rowTopValue
                // y: rows[rowIndex-1-1]
            }
            // console.log(width, (columnLeftValue / width) * 100)
            AddButton(playground, section, grids,'column', btnStyles, buttonVisible, handleShowButton, colIndex);
            buttonVisible = true;
        }
        
        else if(!(isOnRowLine && rowIndex < rowCount && 
            isRowFullyFilled(section, grids, rowIndex)) && !(isOnColumnLine && 
                colIndex < columnCount && 
                isColumnFullyFilled(section, grids, colIndex))){
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
            // AddButton(playground, section, grids,'removeAdd', btnStyles, buttonVisible, handleShowButton, colIndex)
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




function getIndexV1(value, arr){
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