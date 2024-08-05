import { createDynamicID } from "./createdynamicID";

export async function sectionCreation(gridsValue){
    let obj = {};
    obj.id = await createDynamicID('section', 5);
    obj.uniqueKey = obj?.id?.replaceAll('-','');
    obj = await gridElementCSS(obj);
    obj = await createGrids(obj, gridsValue);
    obj = await setGridTemplateColumns(obj);
    // obj.styles.minHeight = '400px';
    return obj;
}

const gridElementCSS = async(obj1) => {
    let obj = {
        minHeight: '0px',
        height: 'auto',
        minWidth: '0px',
        maxWidth: '99999px',
        maxHeight: '99999px',
        gridArea: '1/1/2/2',
        display: 'grid',
        boxSizing: 'border-box',
        rowGap: '0px',
        columnGap: '0px',
        gridTemplateRows: 'auto',
        gridTemplateColumns: 'auto',
    }

    obj1 = {...obj1, styles: {...obj}};
    return obj1;
}

const gridTypes = {
    25: {
        width: 100 / 4
    },
    33: {
        width: 100 / 3
    },
    50: {
        width: 100 / 2
    },
    66: {
        width: (2 * (100 / 3))
    },
    100: {
        width: 100
    },
    c100: {
        width: 50,
        height: 100
    },
    c50: {
        width: 50,
        height: 50
    }
}

function containsAlphabet(str) {
    return /[a-zA-Z]/.test(str);
}


const createGrids = async(obj, value) => {
    // 33, 50, 66, 100, c100, c50
    if(containsAlphabet(value)) return {};
    const valueArr = value?.split('-');
    let rowNumber = 1;
    let colCount = 0;
    let colWidth = 0;
    let colStart = 0;
    let colEnd  = 0;
    let colObj = {};
    let totalWidth = 100;
    let maxColCuntRow = 0;
    let rows = {};
    let uniqueWidth = 0;
    let finalGrids = {};
    if(valueArr.length){
        // if(containsAlphabet(grid)) return;
        for(let i = 0; i< valueArr.length; i++){
            const grid = gridTypes[valueArr[i]];
            let gridObj = {};
            // colWidth -= (Math.floor(grid.width * 100) / 100).toFixed(2);
            // if(Math.floor(colWidth) === 0){
            //     colWidth = 100;
            // }
            colCount = 100 / grid.width;
            // console.log(colWidth, rowNumber)
            if((grid.width + colWidth) > 100){
                // console.log(colWidth)
                rowNumber = rowNumber + 1;
                colWidth = 0;
            }
            colWidth += grid.width;
            // console.log(colWidth)
            // console.l<og(colWidth, '66-33-33-33-33-33-66')
            uniqueWidth += grid?.width;
            const uniqueWidthInRow = (uniqueWidth - ((rowNumber-1) * 100));
            const rowKey = `row${rowNumber}`;
            const gridKey = `grid${Math.floor(uniqueWidthInRow)}`;
            gridObj.uniqueWidth = uniqueWidthInRow;
            gridObj.rowNumber = rowNumber;
            gridObj.width = grid.width;
            gridObj = await gridElementCSS(gridObj);
            gridObj.id = await createDynamicID('grid', 6);
            // console.log(gridObj)
            rows = {
                ...rows,
                [rowKey]: {
                    ...rows[rowKey],
                    number: rowNumber,
                    grids: {
                        ...rows[rowKey]?.grids,
                        [gridKey] : {
                            ...rows[rowKey]?.grids[gridKey],
                            // uniqueWidth: uniqueWidthInRow,
                            // width: grid.width
                            ...gridObj
                        }
                    }
                }
            }
            // console.log(colWidth, rowNumber, 100 / grid.width)
            // console.log(colWidth.toFixed(2))
            // const rowNumber = colWidth.toFixed(2)
        }
    }

    let gtc = {};
    // console.log(rows)

    if(rows && Object.keys(rows).length > 0){
        const rowsKeys = [...Object.keys(rows)];
        for(let r = 0; r< rowsKeys.length; r++){
            // Find Grid Template Columns
            const rowKey = rowsKeys[r];
            const row = rows[rowKey];
            const otherRows = await getRowsWithoutCurrentRow(rows, rowKey);
            
            // grids
            const grids = row.grids;
            const gridKeys = grids ? Object.keys(row?.grids) : [];

            for(let g = 0; g<gridKeys.length; g++){
                const gridKey = gridKeys[g];
                let grid = grids[gridKey];
                grid.gtccolorder = g+1;
                const insideGridKey = `row${r+1}grid${g+1}`;


                if(r === 0){
                    gtc = {
                        ...gtc,
                        [insideGridKey]:{
                            ...gtc[insideGridKey],
                            ...grid
                        }
                    }
                    // console.log(gtc)
                }
                else{
                    const hasGridInFirstRow = await checkHasGridInOtherRows(grid, g, row, otherRows, gtc);
                    if(!hasGridInFirstRow 
                        && Math.round(grid.uniqueWidth) !== 100
                    ){
                        const gtcEntries = Object.entries(gtc);
                        let hasGridInGtc = gtcEntries.some(([, grid1]) => (Math.floor(grid1.uniqueWidth * 100) / 100).toFixed(2) === (Math.floor(grid.uniqueWidth * 100) / 100).toFixed(2));
                        if(!hasGridInGtc){
                            gtc = await setColIndexNReorderObject(gtc, grid, r+1, g+1);
                        }
                    }
                }

                // Set GridArea

                // grid = await setGridArea(grid, gtc);

                finalGrids = {
                    ...finalGrids,
                    [insideGridKey]:{
                        ...finalGrids[insideGridKey],
                        ...grid
                    }
                }
            }
        }
    }

    // Set GridArea for Grids
    finalGrids = await setGridArea(finalGrids, gtc);
    // console.log(finalGrids)
    obj = {
        ...obj,
        grids:{
            ...obj['grids'],
            ...finalGrids
        },
        gtc: {
            ...obj['gtc'],
            ...gtc
        }
    }
    return obj;
}

const getRowsWithoutCurrentRow = async(rows, currentRow) => {
    let result= {};
    for(let key in rows){ if(key !== currentRow) result[key] = rows[key]};
    return result;
}

const checkHasGridInOtherRows = async(grid, colIndex, reference, otherRows)=>{
    const firstRow = otherRows['row1'];
    if(firstRow){
        const ftGrids = firstRow.grids;
        const ftGridsKeys = [...Object.keys(ftGrids)];
        const ftIndexGrid = ftGrids[ftGridsKeys[colIndex]];
        const condition = !ftIndexGrid ? false : (grid?.width === ftIndexGrid.width);
        return condition;
    }
}

const setColIndexNReorderObject = async(obj, grid, rowNumber, colNumber)=>{
    const objKeys = [...Object.keys(obj)];
    let changedObj = {};
    for(let i = 0; i<objKeys.length; i++){
        const gridObj = obj[objKeys[i]];
        if(grid.width < gridObj.width){
            const newGridKey = `row${rowNumber}grid${colNumber}`;
            const newcolorder = i+1;
            grid.gtccolorder = newcolorder;
            changedObj = {
                ...changedObj,
                [newGridKey]: {
                    // ...changedObj?.grids[newGridKey],
                    ...grid
                }
            }
            changedObj= {
                ...changedObj,
                ...obj
            }
            // console.log('before', changedObj)
            changedObj = await reorderObjectByWidth(changedObj);
            // console.log('after', changedObj);
            break;
        }
    }
    return changedObj;
}


const reorderObjectByWidth =  async(obj)=>{
    let gridArray = Object.entries(obj);
    // gridArray.sort((a,b)=> (a[1].width) - (b[1].width));
    gridArray.sort((a,b)=> a[1].uniqueWidth.toFixed(2) - b[1].uniqueWidth.toFixed(2));

    gridArray.forEach((entry, index)=>{
        // console.log('in-loop-before',entry, index, gridArray.length)
        entry[1] = {
            ...entry[1],
            gtccolorder: index + 1
        }
        // console.log('in-loop-after',entry, index, gridArray.length)
    })

    // console.log('afterorder-gridarea', gridArray)
    // console.log(gridArray)

    // const updatedObj = Object.fromEntries(gridArray);
    const updatedObj = gridArray.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
    // console.log('afterorder', updatedObj)
    return updatedObj;
}

const setGridTemplateColumns = async(obj) => {
    if(!obj.gtc) return;
    let gtcEntries = Object?.entries(obj?.gtc);
    gtcEntries.sort((a,b)=>a[1].gtccolorder - b[1].gtccolorder);
    let gridTemplateColumns = '';
    let totalWidth = 0;
    const colLength = gtcEntries.length;
    const actualWidthColWidth = 100 / gtcEntries.length;
    gtcEntries.forEach(([,grid])=>{
        const gridWidthInPerc = grid.uniqueWidth - totalWidth;
        const gridWidthInFr = ((gridWidthInPerc / actualWidthColWidth) * 100) / 100;
        // gridTemplateColumns += ` ${gridWidthInPerc}%`;
        gridTemplateColumns += ` ${gridWidthInFr}fr`;
        totalWidth = grid.uniqueWidth;
    })

    // console.log(gridTemplateColumns, obj.gtc)
    obj.styles.gridTemplateColumns = gridTemplateColumns;

    return obj;
}

const setGridArea = async(grids, reference)=>{
    let gridsEntries = Object.entries(grids);
    let currentRow = 1;
    let curentColumn = 1;
    gridsEntries.forEach((grid, index)=>{
        let changedObj = {...grid[1]};
        const rowStart = changedObj.rowNumber;
        const rowEnd = changedObj.rowNumber+1;
        if(currentRow !== rowStart){
            curentColumn = 1; 
        }
        let getColOrder = Object.entries(reference)
            .filter(([, grid1])=>{
                const conditon1 = (Math.floor(grid1.uniqueWidth * 100) / 100).toFixed(2) === (Math.floor(changedObj.uniqueWidth * 100) / 100).toFixed(2);
                return conditon1;
            })[0][1]?.gtccolorder;
        // console.log(getColOrder[0][1])
        const colStart = curentColumn;
        const colEnd = getColOrder+1;

        currentRow = rowStart;
        curentColumn = colEnd;
        changedObj = {
            ...changedObj,
            styles:{
                ...changedObj.styles,
                gridArea : `${rowStart}/${colStart}/${rowEnd}/${colEnd}`
            }
        }
        // console.log(changedObj)
        // grid[1] = {
        //     ...grid[1],
        //     styles:{
        //         ...grid[1].styles,
        //         gridArea : `${rowStart}/${colStart}/${rowEnd}/${colEnd}`
        //     }   
        // }
        grid[1] = {...changedObj}
    })
    
    // const gridWidth 
    const updatedGrids = Object.fromEntries(gridsEntries);
    return updatedGrids;
}




// Version 1
// const createGrids = async(obj, value) => {
//     // 33, 50, 66, 100, c100, c50
//     if(containsAlphabet(value)) return {};
//     const valueArr = value?.split('-');
//     let rowCount = 0;
//     let colCount = 0;
//     let colWidth = 0;
//     let colStart = 0;
//     let colEnd  = 0;
//     let colObj = {};
//     let totalWidth = 100;
//     let maxColCuntRow = 0;
//     if(valueArr.length){
//         valueArr.forEach((grid, index)=>{
//             if(containsAlphabet(grid)) return;
//             colWidth += gridTypes[grid]?.width;
//             rowCount = Math.ceil(colWidth / 100);
//             // const value = colWidth / 100;
//             colObj = {...colObj, [`col${index}`]: {width: colWidth, actualWidth: gridTypes[grid]?.width}} 
//             // if(value > rowCount && value <= rowCount + 1){
//             //     rowCount = rowCount + 1
//             // }
//             // else{
//             //     rowCount = rowCount + 2
//             // }
//             if(value <= 1){
//                 rowCount = 1;
//             }
//             else if(value > 1 && value <= 2){
//                 rowCount = 2;
//             }
//             else if(value > 2 && value <= 3){
//                 rowCount = 3
//             }
//             // console.log(value, rowCount)





//             // console.log(totalWidth)
//             // totalWidth -= Math.floor(gridTypes[grid]?.width);
//             // if(totalWidth >= 0){
//             //     colStart = colStart + 1;
//             //     colEnd = colStart + 1;
//             //     // console.log(totalWidth, colStart, colEnd, gridTypes[grid]?.width)
//             // }
//             // else{
//             //     colStart = 0;
//             //     colEnd = 0;
//             //     colStart = colStart + 1;
//             //     colEnd = colStart + 1;
//             //     // console.log(totalWidth + 100)
//             // }
//             // console.log(totalWidth, colStart, colEnd, gridTypes[grid]?.width)
//         })
        
//         colCount = valueArr.length;
//         let rows = {};
//         for(let i = 1; i <= [...Object.keys(colObj)].length; i++){
//             const key = Object.keys(colObj)[i-1];
//             const colWidth = colObj[key]?.width;

//             let row = {};
//             const rowNumber = Math.ceil(colWidth / 100);
//             // console.log(rowNumber, colObj[key]?.width)
//             const rowKey = `row${rowNumber}`;
//             const gridKey = `grid${Math.floor(colWidth)}`;
//             // const gridKey = `grid${i - ()}`
//             // row.number = rowNumber;

//             rows = {
//                     ...rows, 
//                     [rowKey]: {
//                         ...rows[rowKey],
//                         number: rowNumber,
//                         childrens: {
//                             ...rows[rowKey]?.childrens,
//                             [gridKey]: {
//                                 ...colObj[key],
//                                 ['width']: (colObj[key]?.width - ((rowNumber - 1) * 100))
//                             }
//                         }
//                     }, 
//                 }

//                 console.log(rows);



//             // row.number = Math.ceil(colWidth / 100);
//             // row.children = {...row.children, [`width${Math.floor(colWidth)}`] : colObj[key]};
//             // rows[`row${row.number}`] = {...rows[`row${row.number}`], ...row};
//             // console.log(colWidth, colObj[key], row)





//             let obj1 = {};
//             let id = await createDynamicID('grid',6);
//             obj1.id = id;
//             id = id.replaceAll('-','')
//             obj1.children='';
//             obj1 = await gridElementCSS(obj1);
//             /*
//                 1 - 1/1/2/2
//                 2 - 1/2/2/3
//                 3 - 1/3/2/4
//                 4 - 2/1/3/2
//                 5 - 2/2/3/4
//             */ 
//             obj1.styles.gridArea = `2/2/3/4`;
//             obj = {...obj, children:{...obj?.children, [id]: {...obj1}}}
//             await getGridArea(colWidth)
//         }

//         maxColCuntRow = Object.values(rows)
//             .map(row => row.childrens ? Object.keys(row.childrens).length : 0)
//             .reduce((max, length)=> {
//                 return Math.max(max, length)
//             }, 0);
        

//         for(let i = 0; i<[...Object.keys(rows)].length; i++){
//             const row = rows[[...Object.keys(rows)][i]];
//             const childrens = row?.childrens;
//             const childrensKeys = [...Object.keys(childrens)];
//                 // if(maxColCuntRow < childrensKeys.length){
//                 //     maxColCuntRow = childrensKeys.length;
//                 // }
//             let prevEle = null;
//             let childWidth = 0;
//             let colStart = 0;
//             let colEnd = 1;

//             for(let j = 0; j < childrensKeys.length; j++){
//                 const children = childrens[childrensKeys[j]];
//                 childWidth += children.actualWidth;
//                 // totalWidth = (children.actualWidth / 100) * 100;
//                 colStart = colStart + 1;
//                 colEnd = colEnd + 1; 
//                 if(100 <= childWidth){
//                     colEnd = childrensKeys.length + 1;
//                 }


//                 // console.log(100 <= childWidth, childWidth)
//                 // if(prevEle !== null){
//                 //     // if(100 <= (children.actualWidth + prevEle.actualWidth)){
//                 //     // }
//                 // }
//                 prevEle = children;

//                 // console.log(`gridArea: ${row.number}/${colStart}/${row.number + 1}/${colEnd}, colWidth: ${children.actualWidth}`);
//             }
//         }

//         // console.log(rows)
//         // console.log(obj);
//         obj = await gridElementCSS(obj);
//     }
//     return obj;
// }
