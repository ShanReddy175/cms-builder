import { createDynamicID } from "./createdynamicID";

export async function sectionCreationV3(gridsValue){
    let obj = {};
    obj.id = await createDynamicID('section', 5);
    obj.uniqueKey = obj?.id?.replaceAll('-','');
    obj = await gridElementCSS(obj);
    // obj = await createGrids(obj, gridsValue);
    obj = await createGridsV2(gridsValue, obj);
    // obj = await setGridTemplateColumns(obj);
    // obj = await setGridTemplateRows(obj);
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
    10: {
        size: 100 / 10
    },
    25: {
        size: 100 / 4
    },
    33: {
        size: 100 / 3
    },
    50: {
        size: 100 / 2
    },
    66: {
        size: (2 * (100 / 3))
    },
    75: {
        size: 75
    },
    100: {
        size: 100
    }
}

// function containsAlphabet(str) {
//     return /[I]/.test(str);
// }

async function containsAlphabetNReturnType(str) {
    // return /[I]/.test(str);
    // console.log(str);
    // if(/[I]/.test(str)) return 'inline';
    // if(/[B]/.test(str)) return 'block';
    // if(/[BI]/.test(str)) return 'block-inline';
    // if(/[BIB]/.test(str)) return 'block-inline-block'; 
    if (/^BIB\d+$/.test(str)) return 'block-inline-block';
    if (/^BI\d+$/.test(str)) return 'block-inline';
    if (/^B\d+$/.test(str)) return 'block';
    if (/^I\d+$/.test(str)) return 'inline';
}

async function getGridSizeFromString(str){
    return gridTypes[parseInt(str.replace(/\D/g, ''), 10)];
}



// const createGrids = async(obj, value) => {
//     // 33, 50, 66, 100, c100, c50
//     // if(containsAlphabet(value)) return {};
//     const valueArr = value?.split('-');
//     let rowNumber = 1;
//     let colCount = 0;
//     let colWidth = 0;
//     let colStart = 0;
//     let colEnd  = 0;
//     let colObj = {};
//     let totalWidth = 100;
//     let maxColCuntRow = 0;
//     let rows = {};
//     let uniqueWidth = 0;
//     let finalGrids = {};
//     if(valueArr.length){
//         // if(containsAlphabet(grid)) return;
//         const seperationGrids = await seperateColumnsAndRows(valueArr);
//         const seperationGridsArr = Object.entries(seperationGrids);
        
//         // for(let i = 0; i< valueArr.length; i++){
//         for(let i = 0; i< seperationGridsArr.length; i++){
//             const grid = seperationGridsArr[i][1];
//             // const grid = gridTypes[valueArr[i]];
//             const gridSize = grid?.size;
//             // const inputWidth = valueArr[i];
//             // const calcWidth = (inputWidth / 100) * 100;
//             // const grid = {width: calcWidth};
//             let gridObj = {};
//             // colWidth -= (Math.floor(grid.width * 100) / 100).toFixed(2);
//             // if(Math.floor(colWidth) === 0){
//             //     colWidth = 100;
//             // }
//             colCount = 100 / gridSize;
//             // console.log(colWidth, rowNumber)
//             if((gridSize + colWidth) > 100){
//                 // console.log(colWidth)
//                 rowNumber = rowNumber + 1;
//                 colWidth = 0;
//             }
//             colWidth += gridSize;
//             // console.log(colWidth)
//             // console.l<og(colWidth, '66-33-33-33-33-33-66')
//             uniqueWidth += gridSize;
//             const uniqueWidthInRow = (uniqueWidth - ((rowNumber-1) * 100));
//             const rowKey = `row${rowNumber}`;
//             const gridKey = `grid${Math.floor(uniqueWidthInRow)}`;
//             gridObj.uniqueWidth = uniqueWidthInRow;
//             gridObj.rowNumber = rowNumber;
//             gridObj.width = gridSize;
//             gridObj = await gridElementCSS(gridObj);
//             gridObj.id = await createDynamicID('grid', 6);
//             // console.log(gridObj)
//             rows = {
//                 ...rows,
//                 [rowKey]: {
//                     ...rows[rowKey],
//                     number: rowNumber,
//                     grids: {
//                         ...rows[rowKey]?.grids,
//                         [gridKey] : {
//                             ...rows[rowKey]?.grids[gridKey],
//                             // uniqueWidth: uniqueWidthInRow,
//                             // width: grid.width
//                             ...gridObj
//                         }
//                     }
//                 }
//             }
//             // console.log(colWidth, rowNumber, 100 / grid.width)
//             // console.log(colWidth.toFixed(2))
//             // const rowNumber = colWidth.toFixed(2)
//         }
//         console.log(rows, seperationGrids)
//     }


//     let gtc = {};
//     // console.log(rows)

//     if(rows && Object.keys(rows).length > 0){
//         const rowsKeys = [...Object.keys(rows)];
//         for(let r = 0; r< rowsKeys.length; r++){
//             // Find Grid Template Columns
//             const rowKey = rowsKeys[r];
//             const row = rows[rowKey];
//             const otherRows = await getRowsWithoutCurrentRow(rows, rowKey);
            
//             // grids
//             const grids = row.grids;
//             const gridKeys = grids ? Object.keys(row?.grids) : [];

//             for(let g = 0; g<gridKeys.length; g++){
//                 const gridKey = gridKeys[g];
//                 let grid = grids[gridKey];
//                 grid.gtccolorder = g+1;
//                 const insideGridKey = `row${r+1}grid${g+1}`;


//                 if(r === 0){
//                     gtc = {
//                         ...gtc,
//                         [insideGridKey]:{
//                             ...gtc[insideGridKey],
//                             ...grid
//                         }
//                     }
//                     // console.log(gtc)
//                 }
//                 else{
//                     const hasGridInFirstRow = await checkHasGridInOtherRows(grid, g, row, otherRows, gtc);
//                     if(!hasGridInFirstRow 
//                         && Math.round(grid.uniqueWidth) !== 100
//                     ){
//                         const gtcEntries = Object.entries(gtc);
//                         let hasGridInGtc = gtcEntries.some(([, grid1]) => (Math.floor(grid1.uniqueWidth * 100) / 100).toFixed(2) === (Math.floor(grid.uniqueWidth * 100) / 100).toFixed(2));
//                         if(!hasGridInGtc){
//                             gtc = await setColIndexNReorderObject(gtc, grid, r+1, g+1);
//                         }
//                     }
//                 }

//                 // Set GridArea

//                 // grid = await setGridArea(grid, gtc);

//                 finalGrids = {
//                     ...finalGrids,
//                     [insideGridKey]:{
//                         ...finalGrids[insideGridKey],
//                         ...grid
//                     }
//                 }
//             }
//         }
//     }

//     // Set GridArea for Grids
//     finalGrids = await setGridArea(finalGrids, gtc);
//     // console.log(finalGrids)
//     obj = {
//         ...obj,
//         grids:{
//             ...obj['grids'],
//             ...finalGrids
//         },
//         gtc: {
//             ...obj['gtc'],
//             ...gtc
//         }
//     }
//     return obj;
// }

const getRowsWithoutCurrentRow = async(rows, currentRow) => {
    let result= {};
    for(let key in rows){ if(key !== currentRow) result[key] = rows[key]};
    return result;
}

const checkHasGridInOtherRows = async(grid, colIndex, otherRows)=>{
    const firstRow = otherRows['row1'];
    if(firstRow){
        const ftGrids = firstRow.grids;
        const ftGridsKeys = [...Object.keys(ftGrids)];
        const ftIndexGrid = ftGrids[ftGridsKeys[colIndex]];
        const condition = !ftIndexGrid ? false : (grid?.width === ftIndexGrid.width);
        return condition;
    }
}

const checkHasGridInFirstRow = async(grid, colIndex, firstRow)=>{
    if(firstRow){
        // console.log(firstRow)
        const ftGrids = firstRow.grids;
        const ftGridsKeys = [...Object.keys(ftGrids)];
        // const firstRowGridArr = Object.entries(firstRow);
        // console.log(firstRow);
        // console.log(firstRowGridArr, colIndex)
        const ftIndexGrid = ftGrids[ftGridsKeys[colIndex-1]];
        // const ftIndexGrid = firstRowGridArr[colIndex-1][1];
        const condition = !ftIndexGrid ? false : (grid?.size?.inline === ftIndexGrid?.size?.inline);
        return condition;
    }
}

const checkHasGridInFirstCol = async(grid, rowIndex, firstCol)=>{
    if(firstCol){
        // console.log(firstRow)
        const ftGrids = firstCol.grids;
        const ftGridsKeys = [...Object.keys(ftGrids)];
        // const firstRowGridArr = Object.entries(firstRow);
        // console.log(firstRow);
        // console.log(firstRowGridArr, colIndex)
        const ftIndexGrid = ftGrids[ftGridsKeys[rowIndex-1]];
        // const ftIndexGrid = firstRowGridArr[colIndex-1][1];
        const condition = !ftIndexGrid ? false : (grid?.size?.block === ftIndexGrid?.size?.block);
        return condition;
    }
}


const setColIndexNReorderObject = async(obj, grid, rowNumber, colNumber)=>{
    const objKeys = [...Object.keys(obj)];
    let changedObj = {};
    for(let i = 0; i<objKeys.length; i++){
        const gridObj = obj[objKeys[i]];
        if((grid.size.inline < gridObj.size.inline)){
            const newGridKey = `row${rowNumber}inline${colNumber}`;
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

const setRowIndexNReorderObject = async(obj, grid, colNumber, rowNumber)=>{
    const objKeys = [...Object.keys(obj)];
    let changedObj = {};
    for(let i = 0; i<objKeys.length; i++){
        const gridObj = obj[objKeys[i]];
        if((grid.size.block < gridObj.size.block)){
            const newGridKey = `col${colNumber}block${rowNumber}`;
            const newroworder = i+1;
            grid.gtrroworder = newroworder;
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
            changedObj = await reorderObjectByHeight(changedObj);
            // console.log('after', changedObj);
            break;
        }
    }
    return changedObj;
}



const reorderObjectByWidth =  async(obj)=>{
    let gridArray = Object.entries(obj);
    // gridArray.sort((a,b)=> (a[1].width) - (b[1].width));
    gridArray.sort((a,b)=> a[1].uniqueSize.inline.toFixed(2) - b[1].uniqueSize.inline.toFixed(2));

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

const reorderObjectByHeight =  async(obj)=>{
    let gridArray = Object.entries(obj);
    // gridArray.sort((a,b)=> (a[1].width) - (b[1].width));
    gridArray.sort((a,b)=> a[1].uniqueSize.block.toFixed(2) - b[1].uniqueSize.block.toFixed(2));

    gridArray.forEach((entry, index)=>{
        // console.log('in-loop-before',entry, index, gridArray.length)
        entry[1] = {
            ...entry[1],
            gtrroworder: index + 1
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
    if(!obj?.gtc) return;
    let gtcEntries = Object?.entries(obj?.gtc);
    gtcEntries.sort((a,b)=>a[1].gtccolorder - b[1].gtccolorder);
    let gridTemplateColumns = '';
    let totalWidth = 0;
    const colLength = gtcEntries.length;
    const actualWidthColWidth = 100 / gtcEntries.length;
    gtcEntries.forEach(([,grid])=>{
        const gridWidthInPerc = grid.uniqueSize.inline - totalWidth;
        const gridWidthInFr = ((gridWidthInPerc / actualWidthColWidth) * 100) / 100;
        // gridTemplateColumns += ` ${gridWidthInPerc}%`;
        gridTemplateColumns += ` ${gridWidthInFr}fr`;
        totalWidth = grid.uniqueSize.inline;
    })

    // console.log(gridTemplateColumns, obj.gtc)
    obj.styles.gridTemplateColumns = gridTemplateColumns;

    return obj;
}

const setGridTemplateRows = async(obj) => {
    if(!obj?.gtr) return;
    let gtcEntries = Object?.entries(obj?.gtr);
    gtcEntries.sort((a,b)=>a[1].gtrroworder - b[1].gtrroworder);
    let gridTemplateRows = '';
    let totalHeight = 0;
    const rowLength = gtcEntries.length;
    const actualHeightColHeight = 100 / gtcEntries.length;
    gtcEntries.forEach(([,grid])=>{
        const gridHeightInPerc = grid.uniqueSize.block - totalHeight;
        const gridHeightInFr = ((gridHeightInPerc / actualHeightColHeight) * 100) / 100;
        // gridTemplateColumns += ` ${gridWidthInPerc}%`;
        gridTemplateRows += ` ${gridHeightInFr}fr`;
        totalHeight = grid.uniqueSize.block;
    })

    // console.log(gridTemplateColumns, obj.gtc)
    obj.styles.gridTemplateRows = gridTemplateRows;

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
        // let gtccolorderArr
        let getColOrderArr = Object.entries(reference)
            .filter(([, grid1])=>{
                const conditon1 = (Math.floor(grid1.uniqueWidth * 100) / 100).toFixed(2) === (Math.floor(changedObj.uniqueWidth * 100) / 100).toFixed(2);
                return conditon1;
            })[0];
        let getColOrder = getColOrderArr ? getColOrderArr[1]?.gtccolorder : 1;
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
    console.log(updatedGrids);
    return updatedGrids;
}

const setGridAreaV2 = async(grids, gtc, gtr)=>{
    let gridsEntries = Object.entries(grids),
        currentRow = 1,
        currentColumn = 1,
        rowStart = 1,
        rowEnd = 1,
        colStart = 1,
        colEnd = 1;
        // console.log(gtr, gtc)
    gridsEntries.forEach((grid, index)=>{
        let changedObj = {...grid[1]};
        const isInline = changedObj.type === 'inline';
        const isVisibleFalse = !changedObj.visible;
        if(isInline){
            rowStart = changedObj.number.block;
            rowEnd = changedObj.number.block + 1;
            if(isVisibleFalse){
                // console.log(currentColumn, gtr)
            }
            if(currentRow !== rowStart){
                currentColumn = 1;
            }

            let getColOrderArr = Object.entries(gtc)
                .filter(([, grid1])=>{
                    const conditon1 = (Math.floor(grid1.uniqueSize.inline * 100) / 100).toFixed(2) === (Math.floor(changedObj.uniqueSize.inline * 100) / 100).toFixed(2);
                    return conditon1;
                })[0];
            let getColOrder = getColOrderArr ? getColOrderArr[1]?.gtccolorder : 1;
            colStart = currentColumn;
            colEnd = getColOrder + 1;
            currentRow = rowStart;
            currentColumn = colEnd;

            changedObj = {
                ...changedObj,
                styles: {
                    ...changedObj.styles,
                    gridArea: `${rowStart}/${colStart}/${rowEnd}/${colEnd}`
                }
            }
            
            grid[1] = {...changedObj}
            // console.log(grid, changedObj)
        }

        else{
            colStart = changedObj.number.inline;
            colEnd = changedObj.number.inline + 1;
            if(currentColumn !== colStart){
                currentRow = 1;
            }
            let getRowOrderArr = Object.entries(gtr)
                .filter(([, grid1])=>{
                    const conditon1 = (Math.floor(grid1.uniqueSize.block * 100) / 100).toFixed(2) === (Math.floor(changedObj.uniqueSize.block * 100) / 100).toFixed(2);
                    return conditon1;
                })[0];
            let getRowOrder = getRowOrderArr ? getRowOrderArr[1]?.gtrroworder : 1;
            rowStart = currentRow;
            rowEnd = getRowOrder + 1;
            currentColumn = colStart;
            currentRow = rowEnd;

            changedObj = {
                ...changedObj,
                styles: {
                    ...changedObj.styles,
                    gridArea: `${rowStart}/${colStart}/${rowEnd}/${colEnd}`
                }
            }
            
            grid[1] = {...changedObj}                
        }
    })
    
    // const gridWidth 
    const updatedGrids = Object.fromEntries(gridsEntries);
    return updatedGrids;
}


// Seperate All Columns and their internal rows

const seperateColumnsAndRows = async(gridArr) =>{
    // ['I33', 'B66', 'B33', 'I33', 'B25', 'B25', 'B50', 'I33', 'B33', 'B33', 'B33']
    // console.log(gridArr)
    let outputObj = {};
    let currentInlineIndex = 0;
    let blockNumber = 0;
    let blockInlineCount = 0;
    let blockInlineBlockCount = 0;
    let relGridKey = '';
    for(let g = 0; g<gridArr.length; g++){
        const value = gridArr[g];
        let obj = {};
        // const prevValue = gridArr[g-1];
        const gridType = await containsAlphabetNReturnType(value);
        const IsBlockGrid = gridType === 'block';
        if(gridType === 'inline') currentInlineIndex = currentInlineIndex + 1;
        const gridKey = `inline${currentInlineIndex}`;
        const gridSize = gridTypes[parseInt(value.replace(/\D/g, ''), 10)];
        if(gridType === 'inline'){
            obj = {
                ...obj,
                [gridKey]:{
                    ...obj[gridKey],
                    size: gridSize?.size,
                    type: gridType
                }
            }
            blockNumber = 0;
            blockInlineCount = 0;
            blockInlineBlockCount = 0;
            relGridKey= '';
        }
        else{
            
            // console.log(blockNumber)
            // blockNumber = blockNumber + 1;
            // currentInlineIndex = (currentInlineIndex === g) ? currentInlineIndex : g+1;
            // if(currentInlineIndex === g){
            //     // currentInlineIndex = currentInlineIndex;
            //     blockNumber = 1;
            // }
            // else{
            //     blockNumber = blockNumber + 1;
            //     currentInlineIndex = currentInlineIndex + 1;
            // }
            
            // const rowKey = `block${blockNumber}`;
            // obj = {
            //     ...obj,
            //     [gridKey]:{
            //         ...obj[gridKey],
            //         blocks: {
            //             ...obj[gridKey]?.blocks,
            //             [rowKey]: {
            //                 ...obj[gridKey]?.blocks[rowKey],
            //                 size: gridSize?.size,
            //                 type: gridType
            //             }
            //         }
            //     }
            // }

            // I100-B66-BI50-BI50-BIB50-BIB50-B33-BI100

            if(gridType === 'block'){
                blockNumber = blockNumber + 1;
                blockInlineCount = 0;
                blockInlineBlockCount = 0;
                relGridKey = '';
                const blockKey = `block${blockNumber}`;
                obj= {
                    ...outputObj,
                    [gridKey]:{
                        ...outputObj[gridKey],
                        blocks: {
                            ...outputObj[gridKey]?.blocks,
                            [blockKey]: {
                                size: gridSize?.size,
                                type: gridType
                            }
                        }
                    }
                }
            }

            else{
                const splitValues = gridType.split('-');
                let relatedGrids = {};
                let relatedGrids2 = {};
                if(gridType === 'block-inline'){
                    blockInlineCount = blockInlineCount + 1;
                    blockInlineBlockCount = 0;
                    relGridKey = `relatedgrid${gridType.replace(/\-/g, '')}${blockInlineCount}`;
                    relatedGrids = {
                        ...relatedGrids,
                        [relGridKey]: {
                            ...relatedGrids[relGridKey],
                            type: gridType,
                            size: gridSize?.size
                        }
                    }
                }

                if(gridType === 'block-inline-block'){
                    blockInlineBlockCount= blockInlineBlockCount + 1;
                    const blockKey = `block${blockNumber}`;
                    const relGridKey2 = `bib${gridType.replace(/\-/g, '')}${blockInlineBlockCount}`;
                    relatedGrids = {...outputObj[gridKey]?.blocks[blockKey]?.relatedGrids};
                    relatedGrids = {
                        ...relatedGrids,
                        [relGridKey]: {
                            ...relatedGrids[relGridKey],
                            relatedGrids2: {
                                ...relatedGrids[relGridKey]?.relatedGrids2,
                                [relGridKey2]: {
                                    type: gridType,
                                     size: gridSize?.size
                                }
                            }
                        }
                    }
                    // relatedGrids2= {
                    //     ...relatedGrids2,
                    //     [relGridKey2]: {
                    //         type: gridType,
                    //          size: gridSize?.size
                    //     }
                    // }
                }
                // splitValues.forEach((splitGrid, splitIndex)=>{
                //     const relGridKey = `relatedGrid${splitGrid}${splitIndex+1}`;
                //     const gridSize1 = gridTypes[parseInt(value.replace(/\D/g, ''), 10)];
                //     relatedGrids = {
                //         ...relatedGrids,
                //         [relGridKey]: {
                //             ...relatedGrids[relGridKey],
                //             type: splitGrid,
                //             size: gridSize1?.size
                //         }
                //     }
                // })
                const blockKey = `block${blockNumber}`;

                obj = {
                    ...outputObj,
                    [gridKey]: {
                        ...outputObj[gridKey],
                        blocks: {
                            ...outputObj[gridKey]?.blocks,
                            [blockKey]: {
                                ...outputObj[gridKey]?.blocks[blockKey],
                                relatedGrids: {
                                    ...outputObj[gridKey]?.blocks[blockKey]?.relatedGrids,
                                    ...relatedGrids,
                                }
                            }
                        }
                    }
                }
            }
        }
        outputObj  = {
            ...outputObj,
            ...obj
        }


    }
    // console.log(outputObj);
    return outputObj;
}



const createGrids = async(obj, value) => {
    // 33, 50, 66, 100, c100, c50
    // if(containsAlphabet(value)) return {};
    // const valueArr = value?.split('-');
    const valueArr = value;
    let rowNumber = 1,
        colNumber = 1,
        rowHeight = 0,
        colCount = 0,
        colWidth = 0,
        colStart = 0,
        colEnd  = 0,
        colObj = {},
        totalWidth = 100,
        maxColCuntRow = 0,
        rows = {},
        cols = {},
        uniqueWidth = 0,
        uniqueHeight = 0,
        finalGrids = {},
        ids = [],
        AllGrids = {};
    if(valueArr.length && false){
        // if(containsAlphabet(grid)) return;
        const seperationGrids = await seperateColumnsAndRows(valueArr);
        const seperationGridsArr = Object.entries(seperationGrids);



        /*
            1 - Split & Create inline and block grids with their props.
            2 - Get unique Rows & Columns count.
            3 - Set GTC & GTR values for parent element.
            4 - Set GridArea for all grids.
        */

        // Split & Create inline and block grids with their props

        for(let i = 0; i< seperationGridsArr.length; i++){
            const inlineGrid = seperationGridsArr[i][1];
            const inlineGridSize = inlineGrid?.size;
            const blockGrids = inlineGrid?.blocks;
            const hasBlockGrid = blockGrids ? true: false;
            let gridObj = {...GridObjectType};
            // const styles = await gridElementCSS(gridObj);
            gridObj = await gridElementCSS(gridObj);
            if((inlineGridSize + colWidth) > 100){
                rowNumber = rowNumber + 1;
                colWidth = 0;
            }
            colWidth += inlineGridSize;
            uniqueWidth += inlineGridSize;
            const uniqueWidthInRow = (uniqueWidth - ((rowNumber - 1) * 100));
            let gridId = await createDynamicID('grid', 10);
            if(ids.some(id => id === gridId)){
                gridId = await createDynamicID('grid', 10)
            }

            gridObj = {
                ...gridObj,
                size: {
                    ...gridObj.size,
                    inline: inlineGridSize
                },
                uniqueSize: {
                    ...gridObj.uniqueSize,
                    inline: uniqueWidthInRow
                },
                number: {
                    ...gridObj.number,
                    block: rowNumber
                },
                id : gridId,
                visible : !hasBlockGrid,
                type : inlineGrid?.type,
            }

            AllGrids = {
                ...AllGrids,
                inline: {
                    ...AllGrids?.inline,
                    [`row${rowNumber}inline${i+1}`]: {...gridObj}
                }
            }

            

            if(blockGrids){
                const blockGridEntries = Object.entries(blockGrids);
                for(let j = 0; j < blockGridEntries.length; j++){
                    const blockGrid = blockGridEntries[j][1];
                    const blockGridSize = blockGrid.size;
                    let blockGridObj = {...GridObjectType};
                    blockGridObj = await gridElementCSS(blockGridObj);
                    if((blockGridSize + rowHeight) > 100){
                        colNumber = colNumber + 1;
                        rowHeight = 0;
                    }
                    rowHeight += blockGridSize;
                    uniqueHeight += blockGridSize;
                    const uniqueHeightInRow = (uniqueHeight - ((colNumber - 1) * 100));
                    let gridId1 = await createDynamicID('grid', 10);
                    if(ids.some(id => id === gridId)){
                        gridId1 = await createDynamicID('grid', 10)
                    };

                    const relatedGrids = blockGrid?.relatedGrids;
                    const hasRelatedGrids = relatedGrids ? true : false;

                    // blockGrid.visible = !hasRelatedGrids;

                    // if(hasRelatedGrids){
                    //     const relatedGrisArr = Object.entries(relatedGrids);
                    //     for(let rg = 0; rg < relatedGrisArr.length; rg++){
                    //         const rGrid = relatedGrisArr[rg][1];
                    //         let rGridObj = {...GridObjectType};
                    //         const rGridObjSize = rGrid?.size;
                    //         rGridObj = await gridElementCSS(rGridObj);
                    //         const rGridType = rGrid?.type?.split('-')[rGrid?.type?.split('-')?.length - 1];
                    //         if(rGridType === 'inline'){

                    //         }

                    //     }
                    // }

                    blockGridObj = {
                        ...blockGridObj,
                        size: {
                            ...blockGridObj.size,
                            inline: inlineGridSize,
                            block: blockGridSize
                        },
                        uniqueSize: {
                            ...blockGridObj.uniqueSize,
                            inline: uniqueWidthInRow,
                            block: uniqueHeightInRow
                        },
                        number: {
                            ...blockGridObj.number,
                            block: rowNumber,
                            inline: colNumber
                        },
                        id : gridId1,
                        visible : !hasRelatedGrids,
                        type : blockGrid?.type,
                    }

                    AllGrids = {
                        ...AllGrids,
                        block:{
                            ...AllGrids?.block,
                            [`col${colNumber}block${Math.floor(uniqueHeightInRow)}`]: {...blockGridObj}
                        }
                    }
                }
            }

        }
        
        // Get Unique Rows & Columns count
        if(AllGrids){
            const allGridsArr = Object.entries(AllGrids);
            let visibleInlineGrids = {};
            let inlineGrids = {};
            let visibleBlockGrids = {};
            let blockGrids = {};
            let gtc = {};
            let gtr = {};
            for(let all = 0; all < allGridsArr.length; all++){
                const key = allGridsArr[all][0];
                const value = allGridsArr[all][1];
                const gridsArr = Object.entries(value);
                const isInline = (key === 'inline');
                let gtcCount = 0;
                let gtrCount = 0;
                let firstRow = {};
                let gridIndexInRow = 0;
                let presentRowNumber = 0;

                let firstCol = {};
                let gridIndexInCol = 0;
                let presentColNumber = 0;
                for(let g = 0; g < gridsArr.length; g++){
                    const gridKey = gridsArr[g][0];
                    const gridValue = gridsArr[g][1];
                    const isVisible = gridValue.visible;
                    // gridIndexInRow = g; 
                    if(isInline){
                        gtcCount = gtcCount + 1;
                        gridValue.gtccolorder = gtcCount;
                        inlineGrids = {
                            ...inlineGrids,
                            [gridKey]: {
                                ...gridValue
                            }
                        }
                        // if(isVisible){
                        //     visibleInlineGrids = {
                        //         ...visibleInlineGrids,
                        //         [gridKey]: {
                        //             ...gridValue
                        //         }
                        //     }
                        // }

                        if(presentRowNumber !== gridValue.number.block){
                            presentRowNumber = gridValue.number.block;
                            gridIndexInRow = 0;
                        }

                        if(presentRowNumber === gridValue.number.block){
                            gridIndexInRow = gridIndexInRow + 1;
                        }


                        if(presentRowNumber === 1){
                            gtc = {
                                ...gtc,
                                [gridKey]: {
                                    ...gtc[gridKey],
                                    ...gridValue
                                }
                            }
                            firstRow = {
                                ...firstRow,
                                number: presentRowNumber,
                                grids: {
                                    ...firstRow?.grids,
                                    [gridKey]: {
                                        // ...firstRow?.grids[gridKey],
                                        ...gridValue
                                    }
                                    
                                }
                            }
                        }
                        else if(presentRowNumber !== 1){
                            const hasGridInFirstRow = await checkHasGridInFirstRow(gridValue, gridIndexInRow, firstRow);
                            // console.log(hasGridInFirstRow, gridValue)
                            if(!hasGridInFirstRow
                                && Math.round(gridValue.uniqueSize.inline) !== 100
                            ){
                                const gtcEntries = Object.entries(gtc);
                                let hasGridInGtc = gtcEntries.some(([, grid1]) => (Math.floor(grid1.uniqueSize.inline * 100) / 100).toFixed(2) === (Math.floor(gridValue.uniqueSize.inline * 100) / 100).toFixed(2));
                                if(!hasGridInGtc){
                                    gtc = await setColIndexNReorderObject(gtc, gridValue, presentRowNumber, gridIndexInRow);
                                }
                            }
                        }
                    }
                    else{
                        gtrCount = gtrCount + 1;
                        gridValue.gtrroworder = gtrCount;
                        blockGrids = {
                            ...blockGrids,
                            [gridKey]: {
                                ...gridValue
                            }
                        }

                        // if(isVisible){
                        //     visibleBlockGrids = {
                        //         ...visibleBlockGrids,
                        //         [gridKey]: {
                        //             ...gridValue
                        //         }
                        //     }
                        // }

                        if(presentColNumber !== gridValue.number.inline){
                            presentColNumber = gridValue.number.inline;
                            gridIndexInCol = 0;
                        }
                        if(presentColNumber === gridValue.number.inline){
                            gridIndexInCol = gridIndexInCol + 1;
                        }

                        if(presentColNumber === 1){
                            gtr = {
                                ...gtr,
                                [gridKey]: {
                                    ...gtr[gridKey],
                                    ...gridValue
                                }
                            }

                            firstCol = {
                                ...firstCol,
                                number: presentColNumber,
                                grids: {
                                    ...firstCol?.grids,
                                    [gridKey]: {
                                        ...gridValue
                                    }
                                }
                            }
                        }

                        else if(presentColNumber !== 1){
                            const hasGridInFirstCol = await checkHasGridInFirstCol(gridValue, gridIndexInCol, firstCol);
                            if(!hasGridInFirstCol
                                && Math.round(gridValue.uniqueSize.block) !== 100
                            ){
                                const gtrEntries = Object.entries(gtr);
                                let hasGridInGtr = gtrEntries.some(([, grid1]) => (Math.floor(grid1.uniqueSize.block * 100) / 100).toFixed(2) === (Math.floor(gridValue.uniqueSize.block * 100) / 100).toFixed(2));
                                if(!hasGridInGtr){
                                    gtr = await setRowIndexNReorderObject(gtr, gridValue, presentColNumber, gridIndexInCol);
                                }
                            }
                        }
                    }

                    finalGrids = {
                        ...finalGrids,
                        [gridKey]: {
                            ...finalGrids[gridKey],
                            ...gridValue
                        }
                    }
                    // Seperate Inline & Block methods and rewrite all functions
                }
            }

            // console.log(visibleInlineGrids, inlineGrids, visibleBlockGrids, blockGrids)
            // console.log(gtc, gtr, finalGrids)
            finalGrids = await setGridAreaV2(finalGrids, gtc, gtr);
            let filteredGridsArr = Object.entries(finalGrids);
            filteredGridsArr = filteredGridsArr.filter(([, grid], index)=>{
                const condition = grid.visible;
                return condition;
            })
            finalGrids = Object.fromEntries(filteredGridsArr);

            obj = {
                ...obj,
                grids:{
                    ...obj['grids'],
                    ...finalGrids
                },
                gtc: {
                    ...obj['gtc'],
                    ...gtc
                },
                gtr: {
                    ...obj['gtr'],
                    ...gtr
                }
            }

            return obj;
            // console.log(finalGrids);
        }
    }
}

const GridObjectType = {
    size: {
        inline: 0,
        block: 0,
    },
    uniqueSize: {
        inline: 0,
        block: 0,
    },
    number: {
        inline: 0,
        block: 0,
    },
    id: '',
    visible: true,
    type: 'inline',
    styles: {},
    gtccolorder : 0,
    gtrroworder : 0,
    chidrens: {}
}

/*
    Object,
    Styles,
    Properties,


    Image

        src
        alt
        styles
    
    Paragraph

        styles
        content
        dataAttributes

    Embla


*/


async function MakeGridObj(obj, type, colWidth){
    const grid = {...obj};
    const gridSize = grid?.size;
    const hasBlockGrid = grid?.blocks ? true : false;
    let gridObj = {...GridObjectType};
    gridObj = await gridElementCSS(gridObj);
    if((gridSize + colWidth) > 100){

    }
}



/*
    1 - 100/1 - 100
    2 - 100/2 - 50
    3 - 100/3 - 33.33
    4 - 100/4 - 25
    5 - 100/5 - 20
    6 - 100/6 - 16.666666666666668
    7 - 100/7 - 
    8 - 100/8 - 
    9 - 100/9 - 
    10 - 100/10 - 
    11 - 100/11 - 
    12 - 100/12 - 


    I1.5-I3-I4-I2-I2-I100

    1 - Get Rows and with thier columns
*/


export const gridValuesPresetArr = (string) => {
    const arr = string.split(',');
    let outputArr = [];
    arr.forEach(async(str, index)=>{
        const strArr = str.split('-');
        const type = await getGridTypeV2(strArr[0].trim());
        const sizeStr = strArr[1].trim();
        const size = await getSizeValueFromString(sizeStr);
        // const sizeObj = await getSpecialCharacter(sizeArr);
        const obj = await gridValueTypeObj(size, index+1, type)
        // console.log(obj)
        outputArr.push(obj);
    })
    return outputArr;
}
export const gridValueTypeObj = async(size, index, type) =>{
    const obj = {
        size, index, type
    }
    return obj;
}

const getGridTypeV2 = async(str) =>{
    const obj = {
        I : 'inline',
        B : 'block'
    }
    return obj[str] ? obj[str] : str;
}

const getSpecialCharacter = async(str) => {
    let specialCharPattern = /[/*]/g;
    const hasChar = specialCharPattern.test(str);
    let specialChar = str.match(specialCharPattern);
    return {hasChar, char: specialChar}
}

const getSizeValueFromString = async(str) =>{
    // console.log(str)
    const sizeObj = await getSpecialCharacter(str);
    let size = 0;
    if(sizeObj.hasChar){
        const operator = sizeObj.char[0];
        const splitArr = str.split(`${operator}`);
        const firstValue = splitArr[0];
        const secondValue = splitArr[1];
        if(operator === '/'){
            size = firstValue / secondValue
        }
        else{
            size = firstValue * secondValue
        }
    }
    else{
        size = parseFloat(str)
    }

    return size;
}


async function createGridsV2(valueArr, obj){
    if(valueArr.length){
        // const blockElements = valueArr.filter(grid => grid.type === 'block');
        let inlineGrids = {},
            inlineIndex = 0,
            blockIndex = 0;
        valueArr.forEach(async(grid, index)=>{
            if(index === 0){
                const gridObj = await prepareGridObj(grid, valueArr);
                // const blockEle = valueArr[index + 1];
                // if(blockEle.size < 100){
                //     const inlineEle = valueArr[blockEle.index];
                //     if(inlineEle.size < 100){
                //         const inlineBlockEle = valueArr[inlineEle.index];
                //         console.log(inlineBlockEle)
                //     }
                // }
            }
        })
    }
    return obj;
}

async function prepareGridObj(grid, dataSource){
    // let gridObj = {...GridObjectType};
    let arr = [];
    let nextIndex = 1;
    let nestedSize = 0;
    let dynamicVariable = {};
    const nextEleVar = 'nextEle';
    const makeNextGridKey = (index) => `${nextEleVar}${index}`;
    let uniqueSize = {
        inline: 0,
        block: 0
    }
    if(grid){ //I100
        // const gridType = grid.type;
        // dynamicVariable[`${makeNextGridKey(nextIndex)}`] = dataSource[grid.index]; //B66
        // let prevEle = grid;
        // let activeEle = dataSource[prevEle.index];
        // let activeEle = dynamicVariable[`${makeNextGridKey(nextIndex)}`];
        // console.log(nextEle, dataSource[gridType.index])
        // if(nextEle.type !== gridType){
        //     if(nextEle.size < 100){
        //         nextIndex = nextIndex + 1;
        //         dynamicVariable[`${makeNextGridKey(nextIndex)}`] = dataSource[nextEle.index]; //I50
        //         let nextEle2 =  dynamicVariable[`${makeNextGridKey(nextIndex)}`];
        //         if(nextEle.type !== nextEle2.type){
        //             if(nextEle2.size < 100){
        //                 nextIndex = nextIndex + 1;
        //                 dynamicVariable[`${makeNextGridKey(nextIndex)}`] = dataSource[nextEle2.index]; //B100
        //                 let nextEle3 =  dynamicVariable[`${makeNextGridKey(nextIndex)}`];
        //                 if(nextEle2.type !== nextEle3.type){
        //                     if(nextEle3.size < 100){
        //                         nextIndex = nextIndex + 1;
        //                         dynamicVariable[`${makeNextGridKey(nextIndex)}`] = dataSource[nextEle3.index]; //B100
        //                         let nextEle4 =  dynamicVariable[`${makeNextGridKey(nextIndex)}`];
        //                     }
        //                     else{
        //                         arr.push(nextEle3)
        //                     }
        //                 }
        //             }
        //             else{
        //                 arr.push(nextEle2)
        //             }
        //         }
        //     }
        //     else{
        //         arr.push(nextEle)
        //     }
        // }
        /*
            0 - Inline
            1 - Block 66
            2 - Inline 100

            0 - Inline - 33
            0B - Block - 100
            1 - Inline - 33
            1B - Block - 100
            2 - Inline - 33
            2B - Block - 100
        */

        // const gridType = grid.type;
        // dynamicVariable[`${makeNextGridKey(nextIndex)}`] = dataSource[grid.index]; //B66
        // let prevEle = grid,
        //     activeEle = dataSource[prevEle.index],
        //     mainInline = {
        //         inline: prevEle.size,
        //         block: activeEle.size
        //     },
        //     uniqueInline = {
        //         inline: 0,
        //         block: 0
        //     },
        //     internalInline = {
        //         inline: 0,
        //         block: 0,
        //     }
        
        // while(activeEle){
        //     if(activeEle.type === 'block' 
        //         && 
        //         // ((activeEle.size + internalInline.block) / 100)  >= 100
        //         // internalInline.inline > 0 && internalInline.block > 0
        //         internalInline.inline > 0 && activeEle.size > 0
        //     ){
        //         uniqueInline = {
        //             ...uniqueInline,
        //             // inline: (mainInline.inline * prevEle.size) / 100,
        //             // block: (mainInline.block * activeEle.size) / 100
        //             inline: (uniqueInline.inline + internalInline.inline),
        //             // block: uniqueInline.block + ((internalInline.block / mainInline.block) * 100)
        //             block: (uniqueInline.block + internalInline.block)
        //         }
        //         activeEle = {
        //             ...activeEle,
        //             unique: {
        //                 inline: uniqueInline.inline,
        //                 block: uniqueInline.block
        //             }
        //         }
        //         // if((uniqueInline.inline + internalInline.inline) === mainInline.inline 
        //         //     && (uniqueInline.block + internalInline.block) === mainInline.block 
        //         // )
        //         if( true || (uniqueInline.inline === mainInline.inline
        //             && 
        //             uniqueInline.block === mainInline.block)
        //         )
        //         {
        //             internalInline = {
        //                 inline: 0,
        //                 block: 0
        //             }
        //         }
        //         arr.push(activeEle);
        //         prevEle = activeEle;
        //         activeEle = dataSource[prevEle.index];
        //     }
        //     else{
        //         if(activeEle.type !== prevEle.type){
        //             // let internalSize = activeEle?.type
        //             internalInline = {
        //                 ...internalInline,
        //                 [activeEle.type] : ((activeEle.size / mainInline[activeEle.type]) * mainInline[activeEle.type])
        //             }
        //             activeEle = {
        //                 ...activeEle,
        //                 unique: {
        //                     ...activeEle?.unique,
        //                     ...uniqueInline
        //                 }
        //             }
        //             prevEle = activeEle;
        //             activeEle = dataSource[prevEle.index];
        //         }
        //         else{
        //             console.log(prevEle, activeEle, uniqueInline, internalInline);
        //             activeEle = undefined;
        //         }
        //     }

        // }
        // if(prevEle.type !== nextEle.type){
        //     if(nextEle.size < 100){
        //         nextIndex += 1;
        //         dynamicVariable[`${makeNextGridKey(nextIndex)}`] = dataSource[nextEle.index];
        //         prevEle = nextEle;
        //         nextEle = dynamicVariable[`${makeNextGridKey(nextIndex)}`];
        //     }
        //     else{
        //         arr.push(nextEle);
        //         break;
        //     }
        // }
        // else{
        //     if(nextEle.size < 100){

        //     }
        //     else{
                
        //         break;
        //     }
        // }



        // ActiveGrid
        let prevEle = grid,
            activeEle = dataSource[prevEle.index],
            globalGridSize = {
                inline: grid.size,
                block: activeEle.size,
            },
            uniqueSize= {
                inline: 0,
                block: 0,
            },
            rowCount = 0,
            colCount = 0;
        while(activeEle){
            if(globalGridSize.inline >= 100 && globalGridSize.block >= 100){
                rowCount = rowCount + 1;
                let obj = {
                    ...activeEle,
                    uniqueSize:{
                        ...globalGridSize
                    },
                    rowCount
                }
                arr.push(obj)
                prevEle = dataSource[activeEle.index]; //Inline Element
                activeEle = dataSource[activeEle.index+1]; //Block Element
                globalGridSize = {
                    inline: prevEle?.size || 0,
                    block: activeEle?.size || 0
                }
            }
            else if(globalGridSize.inline >= 100 && globalGridSize.block <= 100){
                // globalGridSize = {
                //     ...globalGridSize,
                //     block : globalGridSize + globalGridSize + activeEle.size
                // }
                prevEle = activeEle;
                activeEle = dataSource[prevEle.index];
                globalGridSize = {
                    ...globalGridSize,
                    block: globalGridSize.block + activeEle.size
                }
                break;
            }
            else{
                break;
            }
        }

        console.log(arr)
    }
}

async function gridNestedLoop(grid, datasource){
    let arr = [];
    let nextIndex = 1;
    let dynamicVariable = {};
    const nextEleVar = 'nextEle';
    const makeNextGridKey = (index) => `${nextEleVar}${index}`;
}







/*
    I - Inline - width 
    B - Block - Height
*/