import { newSectionObject } from "../models/section";
import { sectionAttributesObj } from "../services/attributes_Library";
import { prepareGridTemplateRowsNewVersion } from "../services/internal/grid/gridControl";
import { createDynamicID } from "./createdynamicID";

export async function sectionCreationVersion2(gridsValue, sectionObj){
    let obj = {...sectionObj};
    if(sectionObj && Object.keys(sectionObj)?.length === 0){
        // obj.id = await createDynamicID('section', 5);
        // obj.uniqueKey = obj?.id?.replaceAll('-','');
        // obj = await gridElementCSS(obj);
        // obj.styles.minHeight = '400px';
        obj = await newSectionObject();
        obj.styles.gridArea = '2/1/3/2';
    }
    obj = await createGrids(obj, gridsValue);
    obj = await setGridTemplateColumns(obj);
    obj = await setGridTemplateRows(obj);

    // Set Grid Template Rows by using Responsive Behaviour
    obj = await prepareGridTemplateRowsNewVersion(obj);

    obj = await createSectionAttributes(obj);
    // console.log(obj)
    return obj;
}

async function createSectionAttributes(obj){
    const attributes = [
        {
            ...sectionAttributesObj.layer
        }
    ]

    obj.attributes = attributes;
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
    15: {
        size: 15
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

async function containsAlphabetNReturnType(str) { 
    if (/^BIB\d+$/.test(str)) return 'block-inline-block';
    if (/^BI\d+$/.test(str)) return 'block-inline';
    if (/^B\d+$/.test(str)) return 'block';
    if (/^I\d+$/.test(str)) return 'inline';
}



const checkHasGridInFirstRow = async(grid, colIndex, firstRow)=>{
    if(firstRow){
        const ftGrids = firstRow.grids;
        const ftGridsKeys = [...Object.keys(ftGrids)];
        const ftIndexGrid = ftGrids[ftGridsKeys[colIndex-1]];
        const condition = !ftIndexGrid ? false : (grid?.size?.inline === ftIndexGrid?.size?.inline);
        return condition;
    }
}

const checkHasGridInFirstCol = async(grid, rowIndex, firstCol)=>{
    if(firstCol){
        const ftGrids = firstCol.grids;
        const ftGridsKeys = [...Object.keys(ftGrids)];
        const ftIndexGrid = ftGrids[ftGridsKeys[rowIndex-1]];
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
    gtcEntries.forEach(([,grid], index)=>{
        const gridWidthInPerc = grid.uniqueSize.inline - totalWidth;
        const gridWidthInFr = ((gridWidthInPerc / actualWidthColWidth) * 100) / 100;
        let space = ' ';
        if(index === 0){
            space = '';
        }
        gridTemplateColumns += `${space}${gridWidthInPerc}%`;
        // gridTemplateColumns += ` ${gridWidthInFr}fr`;
        totalWidth = grid.uniqueSize.inline;
    })

    // console.log(gridTemplateColumns, obj.gtc)
    // obj.styles.gridTemplateColumns = gridTemplateColumns;
    obj = {
        ...obj,
        styles: {
            ...obj.styles,
            gridTemplateColumns : gridTemplateColumns
        }
    }

    return obj;
}

const setGridTemplateRows = async(obj) => {
    if(!obj?.gtr) return;
    if(Object.keys(obj.gtr).length === 0){
        let gtr = Array(obj.highestGrid-1).fill('1fr').join(' ');
        obj.styles.gridTemplateRows = gtr;
        return obj;
    }
    let gtcEntries = Object?.entries(obj?.gtr);
    gtcEntries.sort((a,b)=>a[1].gtrroworder - b[1].gtrroworder);
    let gridTemplateRows = '';
    let totalHeight = 0;
    const rowLength = gtcEntries.length;
    const actualHeightColHeight = 100 / gtcEntries.length;
    const {width} = document.querySelector(process.env.REACT_APP_PAGEID)?.getBoundingClientRect();
    const ScrollWidth = 15;
    let totalHeightInPx = 0;
    const takePercValue = 37.777;
    gtcEntries.forEach(([,grid], index)=>{
        const gridHeightInPerc = grid.uniqueSize.block - totalHeight;
        const gridHeightInFr = ((gridHeightInPerc / actualHeightColHeight) * 100) / 100;
        // gridTemplateColumns += ` ${gridWidthInPerc}%`;
        let space = ' ';
        if(index === 0){
            space = '';
        }
        gridTemplateRows += `${space}${gridHeightInFr}fr`;
        
        // const gridHeightInPerc = grid.uniqueSize.block - totalHeight;
        // let percValue = ((width) * (takePercValue / 100)) * (gridHeightInPerc / 100);
        // // percValue = 
        // totalHeightInPx += percValue;
        // console.log(percValue, totalHeightInPx)
        totalHeight = grid.uniqueSize.block;
    })

    // console.log(gridTemplateColumns, obj.gtc)
    obj.styles.gridTemplateRows = gridTemplateRows;

    return obj;
}

const setGridAreaV2 = async(grids, gtc, gtr, obj)=>{
    let gridsEntries = Object.entries(grids),
        currentRow = 1,
        currentColumn = 1,
        rowStart = 1,
        rowEnd = 1,
        colStart = 1,
        colEnd = 1;
        let gridHighestRow = 1;
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
            
            grid[1] = {...changedObj};

            if(gridHighestRow < rowEnd){
                gridHighestRow = rowEnd;
            }
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
            if(gridHighestRow < rowEnd){
                gridHighestRow = rowEnd;
            }
            grid[1] = {...changedObj}                
        }
    })


    
    // const gridWidth 
    const updatedGrids = Object.fromEntries(gridsEntries);
    obj = {
        ...obj,
        highestGrid: gridHighestRow
    }
    return {updatedGrids, obj};
}


// Seperate All Columns and their internal rows

const seperateColumnsAndRows = async(gridArr) =>{
    // ['I33', 'B66', 'B33', 'I33', 'B25', 'B25', 'B50', 'I33', 'B33', 'B33', 'B33']
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
    const valueArr = value?.split('-');
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
    if(valueArr.length){
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

                    // console.log(finalGrids, gtc, gtr)
                    // Seperate Inline & Block methods and rewrite all functions
                }
            }

            // console.log(visibleInlineGrids, inlineGrids, visibleBlockGrids, blockGrids)
            // console.log(gtc, gtr, finalGrids)
            const resultGrids = await setGridAreaV2(finalGrids, gtc, gtr, obj);
            finalGrids = {...resultGrids.updatedGrids};
            obj = {...resultGrids.obj};
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
    gtrroworder : 0
}
