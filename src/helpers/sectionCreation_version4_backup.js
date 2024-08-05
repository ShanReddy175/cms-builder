import { createDynamicID } from "./createdynamicID";

export async function sectionCreationV4(gridsValue, type="v4"){
    let obj = {};
    obj.id = await createDynamicID('section', 5);
    obj.uniqueKey = obj?.id?.replaceAll('-','');
    obj = await gridElementCSS(obj);
    if(type === 'v4'){
        obj = await createGridsV4(gridsValue, obj);
    }
    else if(type === "v3"){
        obj = await createGridsV3(gridsValue, obj);
    }
    else if(type === 'v5'){
        // obj = await createGridsV5(gridsValue, obj);
        obj = await createGridsV6(gridsValue, obj);
        console.log(obj)
        // obj = await createGrid(gridsValue[0], obj)
    }
    else if(type === 'v7'){
        obj = await createGridsV7(gridsValue, obj);
    }
    // obj = await createGridsV5(gridsValue, obj);
    // obj = await createGrids(obj, gridsValue);
    // obj = await createGridsV2(gridsValue, obj);
    // obj = await setGridTemplateColumns(obj);
    // obj = await setGridTemplateRows(obj);
    // obj.styles.minHeight = '400px';
    // obj = await createGridsV3(gridsValue, obj);
    // return obj;

    // gridLayoutNestedLoop('inline',gridsValue[0]);
}


async function createGridsV7(values, obj){
    if(values){
        Object.entries(values).forEach(([inlineKey, inlineValue], InlineIndex)=>{
            // let gridArr = [],
            // let cumulativeInlineSize = 0,
            //     cumulativeBlockSize = 0,
            //     rowCount = 1,
            //     colCount = 1;
            let currentInlineSize = inlineValue?.size;
            // console.log(currentInlineSize)
            Object.entries(inlineValue?.blocks).forEach(([blockKey, blockValue], blockIndex)=>{
                let currentBlockSize = blockValue?.size;
                let cumulativeInlineSize = 0,
                    cumulativeBlockSize = 0,
                    cumulativeInternalInlineSize = 0,
                    gridArr = [],
                    rowCount = blockIndex + 1,
                    colCount = 1,
                    addtionInlineWidth = true,
                    additionInternalInlineSize = false,
                    addtionBlockSize = true;
                if(blockValue?.children){
                    processGrid(
                        blockValue.children, 
                        currentInlineSize, 
                        currentBlockSize,
                        0,0,0,
                        [],
                        gridArr,
                        currentInlineSize
                    )
                }
                else{
                    let gridObj = {...GridObjectType};
                    gridObj ={
                        ...gridObj,
                        size: {
                            inline: currentInlineSize,
                            block: currentBlockSize
                        },
                        IsInlineChildEle: false,
                        InlineChildSize: currentInlineSize
                    }
                    gridArr.push(gridObj)
                }

                
                console.log(gridArr)
                if(gridArr.length){
                    for(let ga = 0; ga<gridArr.length; ga++){
                        // if(cumulativeBlockSize >= currentBlockSize){
                        //     cumulativeBlockSize = 0;
                        // }
                        // let gridEle = gridArr[ga],
                        //     currentChildInlineSize = gridEle?.size?.inline,
                        //     currentChildBlockSize = gridEle?.size?.block
                        // cumulativeBlockSize += currentChildBlockSize;
                        // cumulativeInlineSize = cumulativeInlineSize + currentChildInlineSize;
                        

                        // console.log(cumulativeInlineSize, cumulativeBlockSize)
                        /**
                         * First Step - Check Inline Size & Block Size
                         * Second Step - Check it is Block Grid OR Inline Grid
                         * Prepare GridObj Width Element
                         */


                        // It's Working - 90%
                        // let gridEle = gridArr[ga],
                        //     currentChildInlineSize = gridEle?.size?.inline,
                        //     currentChildBlockSize = gridEle?.size?.block;
                        //     // addtionInlineWidth = true;
                        // const checkItIsBlockEle = currentChildBlockSize < currentBlockSize;
                        // if(checkItIsBlockEle){
                        //     if((cumulativeBlockSize + currentChildBlockSize) > currentBlockSize){
                        //         cumulativeBlockSize = 0;
                        //         addtionInlineWidth = true;
                        //     }
                        //     // cumulativeBlockSize += currentChildBlockSize;
                        //     if(addtionInlineWidth) cumulativeInlineSize += currentChildInlineSize;
                        //     gridEle.type = 'block';
                        //     addtionInlineWidth = false;
                        // }
                        // else{
                        //     if((cumulativeBlockSize + currentChildBlockSize) >= currentBlockSize){
                        //         cumulativeBlockSize = 0;
                        //     }
                        //     addtionInlineWidth = true;
                        // }
                        // if(addtionInlineWidth) cumulativeInlineSize += currentChildInlineSize;
                        // cumulativeBlockSize += currentChildBlockSize;
                        // console.log(cumulativeInlineSize, cumulativeBlockSize)


                        // let gridEle = gridArr[ga],
                        //     currentChildInlineSize = gridEle?.size?.inline,
                        //     currentChildBlockSize = gridEle?.size?.block;
                        
                        // const parentArr = gridEle?.parentArr;
                        // let parentArrLastEle = undefined;
                        // if(parentArr){
                        //     parentArrLastEle = parentArr[parentArr.length - 1];
                        // }
                        
                        // if(parentArrLastEle){
                        //     if(
                        //         parentArrLastEle.inline !== currentInlineSize
                        //         && 
                        //         parentArrLastEle
                        //     ){
                        //         if(currentChildInlineSize <= parentArrLastEle.inline){
                        //             console.log(gridEle)
                        //         }
                        //     }
                        // }

                        //     // addtionInlineWidth = true;
                        // const checkItIsBlockEle = currentChildBlockSize < currentBlockSize;
                        

                        
                        // console.log(cumulativeInlineSize, cumulativeBlockSize)


                        // let gridEle = gridArr[ga],
                        //     currentChildInlineSize = gridEle?.size?.inline,
                        //     currentChildBlockSize = gridEle?.size?.block;
                        //     // addtionInlineWidth = true;
                        // const checkItIsBlockEle = currentChildBlockSize < currentBlockSize;
                        // // const checkItIsInlineEle = currentChildInlineSize < currentInlineSize;
                        // const checkItIsInlineEle = gridEle?.IsInlineChildEle;
                        // let internalInlineSize = 0;
                        // if(checkItIsInlineEle){
                        //     const checkItIsInlineEleSize = gridEle?.InlineChildSize;
                        //     // console.log(checkItIsInlineEle);
                        //     if(internalInlineSize + currentChildInlineSize > checkItIsInlineEleSize){
                        //         internalInlineSize = 0;
                        //         addtionInternalInlineWidth = true;
                        //     }
                        //     // const 
                        //     addtionInternalInlineWidth = false;
                        //     internalInlineSize += currentChildInlineSize;
                        // }
                        // // else{
                        // //     // addtionInternalInlineWidth = true;
                        // //     internalInlineSize = 0;
                        // // }


                        // // console.log(checkItIsInlineEle, currentInlineSize, currentChildInlineSize)
                        // if(checkItIsBlockEle){
                        //     if((cumulativeBlockSize + currentChildBlockSize) > currentBlockSize){
                        //         cumulativeBlockSize = 0;
                        //         addtionInlineWidth = true;
                        //     }
                        //     // cumulativeBlockSize += currentChildBlockSize;
                        //     if(addtionInlineWidth 
                        //         // && !addtionInternalInlineWidth
                        //     ) cumulativeInlineSize += (currentChildInlineSize); 
                        //     gridEle.type = 'block';
                        //     addtionInlineWidth = false;
                        // }
                        // else{
                        //     if((cumulativeBlockSize + currentChildBlockSize) >= currentBlockSize){
                        //         cumulativeBlockSize = 0;
                        //     }
                        //     addtionInlineWidth = true;
                        // }
                        // if(addtionInlineWidth 
                        //     // && !addtionInternalInlineWidth
                        // ) cumulativeInlineSize += (currentChildInlineSize) ;
                        // addtionInlineWidth = false;
                        // cumulativeBlockSize += currentChildBlockSize;
                        // console.log(cumulativeInlineSize, cumulativeBlockSize, checkItIsInlineEle, internalInlineSize)        
                        
                        

                        //  Version 2

                            // let gridEle1 = gridArr[ga],
                            //     currentChildInlineSize1 = gridEle1?.size?.inline,
                            //     currentChildBlockSize1= gridEle1?.size?.block,
                            //     additionInternalInlineSize = false;

                            // const checkItIsBlockEle1 = currentChildBlockSize1 < currentBlockSize;
                            // // const checkItIsInlineEle = currentChildInlineSize < currentInlineSize;
                            // const checkItIsInlineEle = gridEle1?.IsInlineChildEle;
                            // console.log(checkItIsInlineEle)
                            // if(checkItIsBlockEle1){
                            //     if((cumulativeBlockSize + currentChildBlockSize1) > currentBlockSize){
                            //         cumulativeBlockSize = 0;
                            //         addtionInlineWidth = true;
                            //     }
                            //     gridEle1.type = 'block';
                            // }
                            // else if(!checkItIsBlockEle1){
                            //     if((cumulativeBlockSize + currentChildBlockSize1) >= currentBlockSize){
                            //         cumulativeBlockSize = 0;
                            //     }
                            // }
                            // if(checkItIsInlineEle){
                            //     const parentInlineSize = gridEle1?.InlineChildSize;
                            //     if((cumulativeInternalInlineSize + currentChildInlineSize1) > parentInlineSize){
                            //         cumulativeInternalInlineSize = 0;
                            //         addtionBlockSize = true;
                            //     }
                            //     gridEle1.type = 'inline';
                            //     if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                            //     addtionBlockSize = false;
                            // }
                            // else if(!checkItIsInlineEle){
                            //     addtionBlockSize = true;
                            // }
                            // if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;

                            // console.log(cumulativeBlockSize, gridEle1)


                            // Version 3
                            // let gridEle1 = gridArr[ga],
                            //     currentChildInlineSize1 = gridEle1?.size?.inline,
                            //     currentChildBlockSize1= gridEle1?.size?.block,
                            //     additionInternalInlineSize = false;

                            // const checkItIsBlockEle1 = currentChildBlockSize1 < currentBlockSize;
                            // // const checkItIsInlineEle = currentChildInlineSize < currentInlineSize;
                            // const checkItIsInlineEle = gridEle1?.IsInlineChildEle;

                            // if(checkItIsBlockEle1 && !checkItIsInlineEle){
                            //     if(cumulativeBlockSize + currentChildBlockSize1 > currentBlockSize){
                            //         cumulativeBlockSize = 0;
                            //         addtionInlineWidth = true;
                            //     }

                            //     if(addtionInlineWidth) cumulativeInlineSize += currentChildInlineSize1;
                            //     gridEle1.type = 'block';
                            //     addtionInlineWidth = false;
                            // }
                            // else if(!checkItIsBlockEle1 && checkItIsInlineEle){
                            //     // console.log(gridEle1)
                            //     if(cumulativeInlineSize + currentChildInlineSize1 > currentInlineSize){
                            //         cumulativeInlineSize = 0;
                            //         addtionBlockSize = true;
                            //     }

                            //     if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                            //     gridEle1.type = 'inline';
                            //     addtionBlockSize = false;
                            // }
                            // else if(checkItIsBlockEle1 && checkItIsInlineEle){
                            //     const parentInlineSize = gridEle1?.InlineChildSize;
                            //     // addtionInlineWidth = false;
                            //     if(cumulativeInternalInlineSize + currentChildInlineSize1 >= parentInlineSize){
                            //         cumulativeInlineSize += (cumulativeInternalInlineSize + currentChildInlineSize1)
                            //         cumulativeInternalInlineSize = 0;
                            //         addtionBlockSize = true;
                            //     }
                            //     if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                            //     addtionBlockSize = false;
                            //     // if(cumulativeInlineSize + currentChildInlineSize1 > currentInlineSize){
                            //     //     cumulativeInlineSize = 0;
                            //     //     addtionBlockSize = true;
                            //     // }

                            //     if(cumulativeBlockSize + currentChildBlockSize1 > currentBlockSize){
                            //         cumulativeBlockSize = 0;
                            //         addtionInlineWidth = true;
                            //     }
                            //     // if(addtionInlineWidth) cumulativeInlineSize += currentChildInlineSize1;
                            //     cumulativeInternalInlineSize += currentChildInlineSize1;
                            //     addtionInlineWidth = false;
                            //     console.log(cumulativeInternalInlineSize, cumulativeBlockSize, cumulativeInlineSize);
                            // }
                            // else if(!checkItIsBlockEle1 && !checkItIsInlineEle){
                            //     if(cumulativeBlockSize + currentChildBlockSize1 >= currentBlockSize) cumulativeBlockSize = 0;
                            //     if(cumulativeInlineSize + currentChildInlineSize1 >= currentInlineSize) cumulativeInlineSize = 0;
                            //     addtionInlineWidth = true;
                            //     addtionBlockSize = true;
                            //     if(addtionInlineWidth) cumulativeInlineSize+= currentChildInlineSize1;
                            //     if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                            // }
                            // console.log(cumulativeInlineSize, cumulativeBlockSize)


                            // Version 4

                            let gridEle1 = gridArr[ga],
                                currentChildInlineSize1 = gridEle1?.size?.inline,
                                currentChildBlockSize1= gridEle1?.size?.block;
                                // additionInternalInlineSize = false;

                            const checkItIsBlockEle1 = currentChildBlockSize1 < currentBlockSize;
                            // const checkItIsInlineEle = currentChildInlineSize < currentInlineSize;
                            const checkItIsInlineEle = gridEle1?.IsInlineChildEle;
                            if(checkItIsBlockEle1 && !checkItIsInlineEle){
                                if((cumulativeBlockSize + currentChildBlockSize1) > currentBlockSize){
                                    cumulativeBlockSize = 0;
                                    addtionInlineWidth = true;
                                }

                                if(addtionInlineWidth && !additionInternalInlineSize) cumulativeInlineSize += currentChildInlineSize1;
                                gridEle1.type = 'block'
                                if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                                addtionInlineWidth = false;
                                console.log(cumulativeInternalInlineSize, cumulativeInlineSize)
                            }
                            else if(!checkItIsBlockEle1 && checkItIsInlineEle){
                                const parentInlineSize = gridEle1?.InlineChildSize;
                                if((cumulativeInternalInlineSize + currentChildInlineSize1) > parentInlineSize){
                                    cumulativeInternalInlineSize = 0;
                                    addtionBlockSize = true;
                                }
                                if((cumulativeInternalInlineSize + currentChildInlineSize1) >= parentInlineSize) additionInternalInlineSize = true;
                                cumulativeInternalInlineSize += currentChildInlineSize1;
                                // if(addtionInlineWidth && !additionInternalInlineSize) 
                                gridEle1.type = 'block'
                                if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                                addtionInlineWidth = false;

                                // console.log(cumulativeInternalInlineSize)
                            }
                            else if(checkItIsBlockEle1 && checkItIsInlineEle){
                                const parentInlineSize = gridEle1?.InlineChildSize;
                                if((cumulativeInternalInlineSize + currentChildInlineSize1) > parentInlineSize){
                                    cumulativeInternalInlineSize = 0;
                                    addtionBlockSize = true;
                                }
                                if((cumulativeInternalInlineSize + currentChildInlineSize1) >= parentInlineSize) {
                                    // cumulativeInlineSize += cumulativeInternalInlineSize;
                                    additionInternalInlineSize = true;
                                }
                                cumulativeInternalInlineSize += currentChildInlineSize1;
                                cumulativeInlineSize += currentChildInlineSize1;
                                // if(addtionInlineWidth && !additionInternalInlineSize) 
                                gridEle1.type = 'block'
                                if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                                addtionInlineWidth = false;
                                console.log(cumulativeInternalInlineSize, cumulativeInlineSize)
                            }
                            else if(!checkItIsBlockEle1 && !checkItIsInlineEle){
                                if((cumulativeBlockSize + currentChildBlockSize1) >= currentBlockSize){
                                    cumulativeBlockSize = 0;
                                }
                                if((cumulativeInlineSize + currentChildInlineSize1) >= currentInlineSize){
                                    cumulativeInlineSize = 0;
                                }
                                addtionInlineWidth = true;
                                addtionBlockSize = true;
                                if(!additionInternalInlineSize && addtionInlineWidth) cumulativeInlineSize += currentChildInlineSize1;
                                if(addtionBlockSize) cumulativeBlockSize += currentChildBlockSize1;
                                addtionBlockSize = false;
                                addtionInlineWidth = false;
                            }
                    }          

                    // for(let ga = 0; ga < gridArr.length; ga++){
                    //     // let gridEle = gridArr[ga];
                    //    let gridEle = gridArr[ga],
                    //         currentChildInlineSize = gridEle?.size?.inline,
                    //         currentChildBlockSize = gridEle?.size?.block;
                        
                    //     const parentArr = gridEle?.parentArr;
                    //     let parentArrLastEle = undefined;
                    //     if(parentArr){
                    //         parentArrLastEle = parentArr[parentArr.length - 1];
                    //     }
                        
                    //     // console.log(parentArrLastEle)
                    //     if(parentArrLastEle){
                    //         if(
                    //             parentArrLastEle.inline !== currentInlineSize
                    //             && 
                    //             parentArrLastEle.inline <= currentChildInlineSize
                    //         ){
                                
                    //             if(currentChildInlineSize >= parentArrLastEle.inline){
                    //                 cumulativeInlineSize = 0;
                    //             }
                    //             cumulativeInlineSize += currentChildInlineSize
                    //         }
                    //     }
                        
                    //     cumulativeInlineSize += currentChildInlineSize
                    //     console.log(cumulativeInlineSize, parentArrLastEle?.inline, currentChildInlineSize)
                    // }

                    

                    
                }
            })
        })
    }
    function processGrid(
        values, 
        parentInlineSize = 100, 
        parentBlockSize = 100, 
        currentRow = 0, 
        currentCol = 0, 
        cumulativeInlineSize = 0,
        parentArr = [],
        gridArr = [],
        mainParentInlineSize = 100
    ){
        if(values){
            Object.entries(values).forEach(([inlineKey, inlineValue], inlineIndex)=>{
                let currentInlineSize = parentInlineSize * (inlineValue?.size/100);
                // console.log(parentBlockSize, parentInlineSize)
                if(parentArr.length === 0){
                    parentArr.push({inline: parentInlineSize, block: parentBlockSize})
                }
                if(inlineValue?.blocks){
                    Object.entries(inlineValue.blocks).forEach(([blockKey, blockValue], blockIndex)=>{
                        // console.log(blockValue?.size, blockIndex1)
                        // console.log(blockKey, blockValue)
                        let currentBlockSize = parentBlockSize * (blockValue?.size/100);
                        if (cumulativeInlineSize + currentInlineSize > 100) {
                            currentRow += 1;
                            currentCol = 0;
                            cumulativeInlineSize = 0;
                        }
                        
                        cumulativeInlineSize += currentInlineSize;
                        if(blockValue?.children){
                            // console.log(blockKey, blockValue)
                            if(currentInlineSize !== parentInlineSize){
                                // console.log(currentInlineSize);
                                parentArr.push({
                                    inline: currentInlineSize,
                                    block: currentBlockSize
                                })
                            }
                            parentArr = [];
                            processGrid(
                                blockValue?.children, 
                                currentInlineSize, 
                                currentBlockSize,
                                // parentInlineSize,
                                // parentBlockSize, 
                                currentRow, 
                                currentCol, 
                                cumulativeInlineSize,
                                parentArr,
                                gridArr,
                                mainParentInlineSize
                            )
                            // parentArr = [];
                        }
                        else{
                            // console.log(currentInlineSize, currentBlockSize)
                            // console.log(blockKey, blockValue)
                            let gridObj = {...GridObjectType};
                            let IsInlineChildEle = false
                            const checkItIsInlineEle = (mainParentInlineSize !== parentInlineSize) && (currentInlineSize < parentInlineSize);
                            IsInlineChildEle = checkItIsInlineEle;
                            gridObj ={
                                ...gridObj,
                                size: {
                                    inline: currentInlineSize,
                                    block: currentBlockSize
                                },
                                // parentArr : {
                                //     inline: parentInlineSize,
                                //     block: parentBlockSize
                                // }
                                parentArr : [...parentArr],
                                IsInlineChildEle,
                                InlineChildSize: parentInlineSize,
                                // InlineChildSize: parentInlineSize
                            }

                            gridArr.push(gridObj);
                            // parentArr = [];
                        }
                        currentCol += 1;
                    })
                }
            })
        }
    }

    // console.log(gridArr)

    // if(values){
    //     processGrid(values)
    //     gridArr = await createRowsNCols(gridArr);
    // }
    return obj;
}


async function createRowsNCols(dataArr){
    if(dataArr.length){
        let updatedArr = [...dataArr];
        let currentRow = 1;
        let currentCol = 1;
        let cumulativeInlineSize = 0;
        let cumulativeBlockSize = 0;
        let gridArr = [];
        // console.log(updatedArr)
        let uniqueSize = {
            inline: 0,
            block: 0
        };
        updatedArr.forEach((item, gridIndex)=>{
            // console.log(grid)
            const parentInlineSize = item.parentArr.inline;
            const parentBlockSize = item.parentArr.block;

            // // Calculate the cumulative inline size and check if it exceeds 100%
            // if (cumulativeInlineSize + parentInlineSize > 100) {
            //     currentRow++;
            //     currentCol = 0;
            //     cumulativeInlineSize = 0;
            // }

            // // Update cumulative inline size
            
            // // Calculate the current block size based on parent block size
            // const currentInlineSize = parentInlineSize * (item.size.inline / 100);
            // const currentBlockSize = parentBlockSize * (item.size.block / 100);
            const currentInlineSize = item.size.inline;
            const currentBlockSize = item.size.block;
            cumulativeBlockSize += currentBlockSize;
            cumulativeInlineSize += currentInlineSize;
            // if(cumulativeBlockSize <= parentBlockSize){
            // }
            item = {
                ...item,
                uniqueSize: {
                    ...uniqueSize,
                     inline : cumulativeInlineSize,
                     block: cumulativeBlockSize
                },
                gtrroworder: currentRow,
                gtccolorder: currentCol
            }
            if(cumulativeInlineSize >= parentInlineSize){
                cumulativeInlineSize = 0;
                currentRow = currentRow + 1;
            }
            if(cumulativeBlockSize >= parentBlockSize){
                cumulativeBlockSize = 0;
                currentCol = currentCol + 1;
            }
            gridArr.push(item);
            currentCol++;
        })

        console.log(gridArr)
    }
}

async function createGridsV3(values, obj){
    if(values.length){
        let gridArr = [];
        let rowStart = 0;
        values.forEach((sourceGrid, sourceIndex)=>{
            const size = sourceGrid.size;
            const blocks = sourceGrid?.blocks;
            let blockSize = 0,
                uniqueSize = {
                    inline: 0,
                    block: 0
                };
            if(blocks){
                const blockEntries = Object.entries(blocks);
                blockEntries.forEach((sourceBlock, sourceBlockInex)=>{
                    const sourceBlockSize = sourceBlock[1]?.size;
                    blockSize += sourceBlockSize;
                    uniqueSize = {
                        inline: 0,
                        block: 0
                    }
                    if(sourceBlockSize >=100){
                        let gridObj = {...GridObjectType};
                        gridObj = {
                            ...gridObj,
                            size: {
                                inline: size,
                                block: sourceBlockSize
                            },
                            uniqueSize:{
                                inline: size,
                                block : blockSize
                            }
                        }
                        gridArr.push(gridObj)
                    }


                    else{
                        let childEles = sourceBlock[1]?.children;
                        if(childEles){
                            const childElesArr = Object.entries(childEles);
                            childElesArr.forEach((childInlineGrids, childIndex)=>{
                                const childKey = childInlineGrids[0];
                                let childValues = childInlineGrids[1];
                                const childInlineSize = childValues.size;
                                const childBlocks = childValues?.blocks;
                                uniqueSize = {
                                    inline: uniqueSize.inline,
                                    block: 0
                                }
                                if(childInlineSize < 100){
                                    uniqueSize = {
                                        ...uniqueSize,
                                        // inline: ((childInlineSize / 100) * size) + uniqueSize.inline
                                        inline: childInlineSize + uniqueSize.inline
                                    }
                                }

                                if(childBlocks){
                                    const childBlockEntries = Object.entries(childBlocks);
                                    childBlockEntries.forEach((childBlockArr, childBlockIndex)=>{
                                        const childBlockKey = childBlockArr[0];
                                        const childBlockValue = childBlockArr[1];
                                        const childBlockSize = childBlockValue.size;
                                        uniqueSize = {
                                            ...uniqueSize,
                                            // block: ((childBlockSize / 100) * sourceBlockSize) + uniqueSize.block
                                            block: childBlockSize + uniqueSize.block
                                        }
                                        if(!childBlockValue?.children){
                                            let gridObj = {
                                                ...GridObjectType
                                            }
                                            gridObj = {
                                                ...gridObj,
                                                size: {
                                                    inline: childInlineSize,
                                                    block: childBlockSize
                                                },
                                                uniqueSize: {
                                                    ...uniqueSize
                                                }
                                            }
                                            gridArr.push(gridObj)
                                        }
                                    })
                                }
                            })
                        }
                        else{
                            if(Math.round(blockSize) <= 100){
                                let gridObj = {
                                    ...GridObjectType
                                }
                                gridObj = {
                                    ...gridObj,
                                    size: {
                                        inline: size,
                                        block: sourceBlockSize
                                    },
                                    uniqueSize: {
                                        inline: size,
                                        block: blockSize
                                    }
                                }

                                gridArr.push(gridObj)
                            }
                        }
                    }
                })
            }
        })

        console.log(gridArr)
    }
    return obj;
}

async function createGridsV4(dataValues, obj) {
    function processGrid(values, gridArr, parentSize = { }, parentArr=[]) {
        values.forEach((sourceGrid) => {
            const size = sourceGrid.size;
            const blocks = sourceGrid?.blocks;
            let blockSize = 0;
            let parentObj = {
                inline: sourceGrid.inline
            }

            // parentArr.push(parentObj);

            // console.log(globalSize)

            if (blocks) {
                Object.entries(blocks).forEach(([_, sourceBlock]) => {
                    const sourceBlockSize = sourceBlock.size;
                    blockSize += sourceBlockSize;
                    let uniqueSize = { ...parentSize };
                    if (sourceBlockSize >= 100) {
                        let gridObj = {
                            ...GridObjectType,
                            size: { inline: size, block: sourceBlockSize },
                            uniqueSize: { inline: size, block: blockSize }
                        };
                        parentObj = {
                            ...parentObj,
                            block: sourceBlockSize
                        }
                        parentArr.push(parentObj);
                        gridObj.parentArr = parentArr;
                        gridArr.push(gridObj);
                        parentObj = {
                            inline: 0,
                            block: 0
                        };
                    } else {
                        let childEles = sourceBlock?.children;
                        if (childEles) {
                            uniqueSize.inline += size;
                            // Recursively process children
                            Object.entries(childEles).forEach(([_, childValues]) => {
                                processGrid([childValues], gridArr, uniqueSize, parentArr);
                            });
                        } else {
                            if (Math.round(blockSize) <= 100) {
                                let gridObj = {
                                    ...GridObjectType,
                                    size: { inline: size, block: sourceBlockSize },
                                    uniqueSize: { inline: size, block: blockSize }
                                };
                                parentObj = {
                                    inline: size,
                                    block: sourceBlockSize
                                };
                                // gridArr.push(gridObj);
                                parentArr.push(parentObj);
                                gridObj.parentArr = parentArr;
                                gridArr.push(gridObj);
                                parentObj = {
                                    inline: 0,
                                    block: 0
                                };
                            }
                        }
                    }
                });
            }

            console.log(gridArr)
        });
    }

    if (dataValues.length) {
        let gridArr = [];
        processGrid(dataValues, gridArr);
    }

    return obj;
}



async function createGridsV5(dataValues, obj){
    if(dataValues.length){
        let gridArr = [];
        let inlineParents = [];
        let blockParents = [];

        function processGrid(values, clientSize = {inline: 0, block: 0}, number= {inline: 0, block: 0}){
            for(let i = 0; i < values.length; i++){
                const mainInlineEle = values[i];
                const mainInlineBlocks = mainInlineEle?.blocks;
                let blockSize = 0,
                    uniqueSize = {
                        inline: 0,
                        block: 0
                    };
                    uniqueSize = {
                        ...uniqueSize,
                        inline : mainInlineEle?.size 
                    };
                // if(clientSize.inline >= 100){
                //     number = {
                //         ...number,
                //         inline: number.inline + 1
                //     }
                //     clientSize.inline = 0;
                // }
                inlineParents.push(mainInlineEle);
                if(mainInlineBlocks){
                    const mainBlocksArr = Object.entries(mainInlineBlocks);
                    for(let j=0; j<mainBlocksArr.length; j++){
                        const mainBlockGrid = mainBlocksArr[j][1];
                        // blockSize += mainBlockGrid?.size;
                        // uniqueSize = {
                        //     ...uniqueSize,
                        //     block: mainBlockGrid?.size
                        // }

                        
                        const mainBlockInlines = mainBlockGrid?.children;
                        if(mainBlockInlines){
                            // clientSize.inline += mainInlineEle?.size;
                            blockParents.push(mainBlockGrid);
                            const mainBlockInlinesArr = Object.entries(mainBlockInlines);
                            for(let k=0; k<mainBlockInlinesArr.length; k++){
                                const mainBlockInlineGrid = mainBlockInlinesArr[k][1];
                                // const mainBlockInlineGridArr = Object.entries(mainBlockInlineGrid);
                                // inlineParents.push(mainBlockInlineGridArr);
                                // console.log(mainBlockInlineGrid)
                                // inlineParents.push(mainBlockInlineGrid)
                                processGrid([mainBlockInlineGrid], clientSize, number)
                            }
                        }
                        else{
                            if(clientSize.inline >= 100){
                                number = {
                                    ...number,
                                    inline: number.inline + 1
                                }
                                clientSize.inline = 0;
                            }
                            clientSize.inline += mainInlineEle?.size;
                            mainBlockGrid.parents = {
                                inline: inlineParents,
                                block: blockParents
                            }
                            number = {
                                ...number,
                                block: number.block + 1
                            }
                            mainBlockGrid.newSize={
                                inline: mainInlineEle.size,
                                block: mainBlockGrid.size
                            }
                            clientSize = {
                                ...clientSize,
                                block : mainBlockGrid.size + clientSize.block,
                            }
                            mainBlockGrid.number = {...number};
                            mainBlockGrid.clientSize = {...clientSize}
                            gridArr.push(mainBlockGrid);
                        }
                    }
                }
            }
            console.log(gridArr)
        }
        processGrid(dataValues);
        console.log(
            `inlineParents`,inlineParents,
            `blockParents` ,blockParents, 
            `gridArr`, gridArr
        )
        return obj;
    }
}

async function createGridsV6(dataValues, obj){
    let gridArr = [];
    let parentArr = [];
    let newParentArr =[];
    let number = {
        inline: 0,
        block: 0
    }
    let internalParentArr = [];
    async function processGrid(values){
        if(values.length){
            values.forEach((mainInline, mainInlineIndex)=>{
                const mainBlocks = mainInline?.blocks;
                let parentObj = mainInline?.parentObj;
                // console.log(mainInline, 'marginInline')
                if(mainBlocks){
                    Object.entries(mainBlocks).forEach(([,mainBlock], mainIndex)=>{
                        const mainBlockChildrens = mainBlock?.children;
                        if(mainBlockChildrens){
                            // parentArr = [];
                            internalParentArr= [];

                            // mainBlock.inlineSize = mainInline?.size;
                            let mainBlockChildrensArr = Object.entries(mainBlockChildrens);
                            const hasChildren = mainBlockChildrensArr.some(
                                ele => {
                                    const blocksArr = Object.entries(ele[1]?.blocks);
                                    const condition = blocksArr.some(ele1 => {
                                        const condition2 = ele1[1]?.children !== undefined;
                                        return condition2
                                    })
                                    return condition
                                });
                            // if(!hasChildren){
                            //     if(parentObj){
                            //         mainBlock.parentObj = parentObj
                            //     }
                            // }
                            // console.log(mainBlock)
                            parentArr.push(mainBlock)
                            internalParentArr.push(mainBlock);
                            // parentArr.push({
                            //     inline: mainInline?.size,
                            //     block: mainBlock?.size
                            // })
                            // parentArr.push(mainBlock)
                            Object.entries(mainBlockChildrens).forEach(([,mainBlockInline], index)=>{
                                mainBlockInline.parentObj = {
                                    inline: mainInline?.size,
                                    block: mainBlock?.size
                                }
                                processGrid([mainBlockInline])
                            })
                        }
                        else{
                            // console.log(mainBlock)
                            // mainBlock.inlineSize = mainInline?.size;
                            // parentArr.push(mainBlock)
                            if(parentObj){
                                // console.log(parentObj)
                                // parentObj.inlineSize = mainInline?.size;
                                // parentObj.blockSize = mainBlock?.size;
                                // parentObj.uniqueIndex = `${mainInlineIndex}-${mainIndex}`
                                parentObj = {
                                    ...parentObj,
                                    inlineSize : mainInline?.size,
                                    blockSize: mainBlock?.size,
                                    uniqueIndex : `${mainInlineIndex}-${mainIndex}`
                                }
                                // mainBlock.parentObj1 = parentObj;
                                newParentArr.push(parentObj);
                            }
                            mainBlock = {
                                ...mainBlock,
                                newSize: {
                                    inline: mainInline?.size,
                                    block: mainBlock?.size
                                },
                                parentArr: [...internalParentArr],
                                parentObj1 : parentObj
                            }
                            number = {
                                ...number,
                                 block: mainBlock?.parentArr[0] !== null ? (number?.block >= mainBlock?.parentArr[0]?.size) ? 0 : number.block : 0
                            }
                            // number = {
                            //     ...number,
                            //     inline: mainInline?.size + number.inline,
                            //     block: mainBlock?.size + number.block
                            // }
                            // number.block += mainBlock?.size;
                            // // console.log(number, mainBlock?.parentArr[0]?.size, number.block === mainBlock?.parentArr[0]?.size)
                            // if(number.block === mainBlock?.parentArr[0]?.size){
                            //     number.inline += mainInline?.size;
                            //     // number.block = 0;
                            // }
                            let blockUniqueSize = number.block + mainBlock?.size;
                            number = {
                                ...number, 
                                block: blockUniqueSize
                            }
                            if(number.block < mainBlock?.parentArr[0]?.size){
                                number = {
                                    ...number,
                                    inline: number.inline + mainInline?.size,
                                    // block: 0
                                }
                            }
                            if(number.block >= mainBlock?.parentArr[0]?.size){
                                // number = {
                                //     ...number,
                                //     inline: number.inline + mainInline?.size,
                                //     // block: 0
                                // }
                            }
                            // console.log(blockUniqueSize, mainBlock?.size, number)

                            // if(number.block >= mainBlock?.parentArr[0]?.size){
                            //     number = {
                            //         ...number,
                            //         // inline: number.inline + mainInline?.size,
                            //         block: mainBlock?.size
                            //     }
                            // }
                            // if(
                            //     Math.round(number.inline) > 100 
                            //     // && number.block <= mainBlock?.parentArr[0]?.size
                            // ){
                            //     number = {
                            //         ...number,
                            //         inline : mainInline?.size
                            //     }
                            // }
                            mainBlock.number = {...number};
                            // if(number)
                            // parentArr = [];
                            gridArr.push(mainBlock);
                        }
                    })
                }
            })
        }
    }

    processGrid(dataValues);
    obj.rawGrids = [...gridArr];
    obj.gridParentArr = [...parentArr];
    obj.newParentArr = [...newParentArr]
    // console.log(newParentArr, obj)

    // obj = await createRowsV1(obj);
    // obj = await createRowsV2(obj);
    obj = await createRowsV3(obj);
    return obj;
}

async function createRowsV2(obj){
    const newParentArr = obj?.newParentArr;
    let rawGrids = obj?.rawGrids;
    let uniqueSize = {
        inline: 0,
        block: 0
    };
    let colCount = 1;
    let rowCount = 1;
    if(newParentArr && rawGrids){
        for(let np = 0; np < newParentArr?.length; np++){
            const uniqueEle = newParentArr[np];
            let filteredGrid = rawGrids.filter(grid => {
                return grid.parentObj1 === uniqueEle
            })
            
            
            // rawGrids.forEach((filteredGrid, filteredGridIndex)=>{
            //     let newUniqueSize = {...uniqueEle};
            //     if(uniqueEle.block < 100 || uniqueEle.inline < 100){
            //         const parentArr = filteredGrid?.parentArr;
            //         if(parentArr){
            //             let parentArrEle = parentArr;
            //             if(parentArrEle?.children){
            //                 const value = Object.values(parentArrEle?.children).reduce((acc, item)=>{
            //                     return acc + item.size;
            //                 }, 0);
            //                 // parentArrEle = {
            //                 //     ...parentArrEle,
            //                 //     newInlineSize: 
            //                 // }
            //                 // console.log(value, parentArrEle)
            //             }
            //             newUniqueSize = {
            //                 inline: parentArr[0]?.inline,
            //                 block : parentArr[0]?.size
            //             }
            //         }
            //     }
            //     if(uniqueSize.block >= newUniqueSize.block){
            //         uniqueSize.block = 0; 
            //         colCount = colCount +1;  
            //         // if(uniqueSize.inline >= newUniqueSize.inline){
            //         //     uniqueSize.inline = 0;   
            //         // }
            //     }
            //     if(uniqueSize.inline >= 100){
            //         uniqueSize.inline = 0;
            //         rowCount = rowCount+1;
            //     }
            //     // console.log(filteredGrid[0]?.newSize?.block)
            //     // uniqueSize = {
            //     //     ...uniqueSize,
            //     //     block: uniqueSize.block + filteredGrid[0]?.newSize?.block
            //     // }
            //     uniqueSize.block += filteredGrid[0]?.newSize?.block;
            //     if(uniqueSize.block >= newUniqueSize.block){
            //         let inlineCommonInlineSize = filteredGrid[0]?.newSize?.inline;
            //         // uniqueSize = {
            //         //     ...uniqueSize,
            //         //     inline: inlineCommonInlineSize + uniqueSize.inline
            //         // };
            //         uniqueSize.inline += inlineCommonInlineSize;
            //         // let prevEleIndex = np-1;
            //         // let prevEle = rawGrids.filter(grid => {
            //         //     return grid.parentObj1 === newParentArr[prevEleIndex];
            //         // }) 
            //         // let prevEleRawIndex = rawGrids.findIndex(ele => ele === prevEle[0]);
            //         // while(prevEle.length !== 0){
            //         //     if(
            //         //         prevEle[0]?.uniqueSize1?.block < newUniqueSize.block
            //         //         &&
            //         //         colCount === prevEle[0]?.colCount
            //         //         && rowCount === prevEle[0]?.rowCount
            //         //     ){
            //         //         prevEle[0] = {
            //         //             ...prevEle[0],
            //         //             uniqueSize1 : {
            //         //                 ...prevEle[0]?.uniqueSize1,
            //         //                 inline: inlineCommonInlineSize
            //         //             }
            //         //         }
            //         //         if(prevEleRawIndex !== -1){
            //         //             rawGrids[prevEleRawIndex] = prevEle[0];
            //         //         }
            //         //         prevEle = rawGrids.filter(grid => {
            //         //             return grid.parentObj1 === newParentArr[prevEleIndex-1];
            //         //         }) 
            //         //     }
            //         //     else{
            //         //         break;
            //         //     }

            //         // }
            //     }
            // })

            if(filteredGrid.length){
                let filteredGridIndex = rawGrids.findIndex(ele => ele === filteredGrid[0]);
                let newUniqueSize = {...uniqueEle};
                if(uniqueEle.block < 100 || uniqueEle.inline < 100){
                    const parentArr = filteredGrid[0]?.parentArr;
                    if(parentArr){
                        let parentArrEle = parentArr[0];
                        if(parentArrEle?.children){
                            const value = Object.values(parentArrEle?.children).reduce((acc, item)=>{
                                return acc + item.size;
                            }, 0);
                            // parentArrEle = {
                            //     ...parentArrEle,
                            //     newInlineSize: 
                            // }
                            // console.log(value, parentArrEle)
                        }
                        newUniqueSize = {
                            inline: parentArr[0]?.inline,
                            block : parentArr[0]?.size
                        }
                    }
                }
                if(uniqueSize.block >= newUniqueSize.block){
                    uniqueSize.block = 0; 
                    colCount = colCount +1;  
                    // if(uniqueSize.inline >= newUniqueSize.inline){
                    //     uniqueSize.inline = 0;   
                    // }
                }
                if(uniqueSize.inline >= 100){
                    uniqueSize.inline = 0;
                    rowCount = rowCount+1;
                }
                // console.log(filteredGrid[0]?.newSize?.block)
                // uniqueSize = {
                //     ...uniqueSize,
                //     block: uniqueSize.block + filteredGrid[0]?.newSize?.block
                // }
                uniqueSize.block += filteredGrid[0]?.newSize?.block;
                if(uniqueSize.block >= newUniqueSize.block){
                    let inlineCommonInlineSize = filteredGrid[0]?.newSize?.inline;
                    // uniqueSize = {
                    //     ...uniqueSize,
                    //     inline: inlineCommonInlineSize + uniqueSize.inline
                    // };
                    uniqueSize.inline += inlineCommonInlineSize;
                    // let prevEleIndex = np-1;
                    // let prevEle = rawGrids.filter(grid => {
                    //     return grid.parentObj1 === newParentArr[prevEleIndex];
                    // }) 
                    // let prevEleRawIndex = rawGrids.findIndex(ele => ele === prevEle[0]);
                    // while(prevEle.length !== 0){
                    //     if(
                    //         prevEle[0]?.uniqueSize1?.block < newUniqueSize.block
                    //         &&
                    //         colCount === prevEle[0]?.colCount
                    //         && rowCount === prevEle[0]?.rowCount
                    //     ){
                    //         prevEle[0] = {
                    //             ...prevEle[0],
                    //             uniqueSize1 : {
                    //                 ...prevEle[0]?.uniqueSize1,
                    //                 inline: inlineCommonInlineSize
                    //             }
                    //         }
                    //         if(prevEleRawIndex !== -1){
                    //             rawGrids[prevEleRawIndex] = prevEle[0];
                    //         }
                    //         prevEle = rawGrids.filter(grid => {
                    //             return grid.parentObj1 === newParentArr[prevEleIndex-1];
                    //         }) 
                    //     }
                    //     else{
                    //         break;
                    //     }

                    // }
                }

                
                

                // uniqueSize = {
                //     ...uniqueSize,
                //     inline : uniqueSize.inline + filteredGrid[0]?.newSize?.inline,
                //     block: uniqueSize.block + filteredGrid[0]?.newSize?.block
                // }
                
                // console.log(uniqueSize, uniqueEle)

                filteredGrid[0] = {
                    ...filteredGrid[0],
                    uniqueSize1: uniqueSize,
                    colCount,
                    rowCount
                }

                if(filteredGridIndex !== -1){
                    rawGrids[filteredGridIndex] = filteredGrid[0];
                }
            }
            console.log(rawGrids, uniqueSize)
            console.log(uniqueSize)

        }
    }
}

async function createRowsV3(obj){
    const newParentArr = obj?.newParentArr;
    let rawGrids = obj?.rawGrids;
    let uniqueSize = {
        inline: 0,
        block: 0
    };
    let colCount = 1;
    let rowCount = 1;
    if(newParentArr && rawGrids){
        newParentArr.forEach((uniqueEle, uniqueIndex)=>{
            // rawGrids.forEach(())
        })
    }
}

async function createRowsV1(obj){
    const rawGrids = obj?.rawGrids;
    const gridParentArr = obj?.gridParentArr;
    console.log(gridParentArr)
    if(rawGrids && gridParentArr){
        for(let pArr = 0; pArr < gridParentArr.length; pArr++){
            let mainBlockEle = gridParentArr[pArr];
            let filteredEles = rawGrids.filter(grid => {
                const condition = grid.parentArr[0] === mainBlockEle
                return condition;
            })
            // console.log(filteredEles)
            let rows = 1;
            let clientWidth = 0;
            for(let fArr = 0 ; fArr < filteredEles.length; fArr++){
                const grid = filteredEles[fArr];
            }
            // console.log(filteredEles, mainBlockEle)
        }
    }
    return obj;
}

// const GridObjectTypeV2 = {
//     size: { inline: 0, block: 0 },
//     uniqueSize: { inline: 0, block: 0 },
//     gridArea: ''
// };

// async function createGridsV5(values, obj) {
//     function processGrid(values, gridArr, parentSize = { inline: 0, block: 0 }, parentArea = '', rowStart = 1, colStart = 1) {
//         values.forEach((sourceGrid, index) => {
//             const size = sourceGrid.size;
//             const blocks = sourceGrid?.blocks;
//             let blockSize = 0;
//             let rowPos = rowStart;
//             let colPos = colStart;
//             let maxColPos = colPos;
//             let maxRowPos = rowPos;

//             if (blocks) {
//                 Object.entries(blocks).forEach(([blockKey, sourceBlock], blockIndex) => {
//                     const sourceBlockSize = sourceBlock.size;
//                     blockSize += sourceBlockSize;
//                     let uniqueSize = { ...parentSize };

//                     // Calculate grid area for the current block
//                     const rowSpan = Math.ceil(sourceBlockSize / 100);
//                     const colSpan = Math.ceil(sourceBlockSize / 100);

//                     const gridArea = `${rowPos} / ${colPos} / ${rowPos + rowSpan} / ${colPos + colSpan}`;
//                     maxColPos = Math.max(maxColPos, colPos + colSpan - 1);
//                     maxRowPos = Math.max(maxRowPos, rowPos + rowSpan - 1);

//                     if (sourceBlockSize >= 100) {
//                         let gridObj = {
//                             ...GridObjectTypeV2,
//                             size: { inline: size, block: sourceBlockSize },
//                             uniqueSize: { inline: size, block: blockSize },
//                             gridArea: gridArea
//                         };
//                         gridArr.push(gridObj);
//                     } else {
//                         let childEles = sourceBlock?.children;
//                         if (childEles) {
//                             uniqueSize.inline += size;

//                             // Recursively process children
//                             Object.entries(childEles).forEach(([childKey, childValues], childIndex) => {
//                                 const childArea = `${gridArea} > ${childKey}`;
//                                 processGrid([childValues], gridArr, uniqueSize, childArea, rowPos, colPos);

//                                 // Update row and column start positions for next child
//                                 colPos += colSpan;
//                                 if (colPos > 100) {  // Assuming 100 is the max columns width
//                                     colPos = 1;
//                                     rowPos += rowSpan;
//                                 }
//                             });
//                         } else {
//                             if (Math.round(blockSize) <= 100) {
//                                 let gridObj = {
//                                     ...GridObjectTypeV2,
//                                     size: { inline: size, block: sourceBlockSize },
//                                     uniqueSize: { inline: size, block: blockSize },
//                                     gridArea: gridArea
//                                 };
//                                 gridArr.push(gridObj);
//                             }
//                         }
//                     }
//                 });
//             }
//         });

//         console.log(gridArr)
//     }

//     if (values.length) {
//         let gridArr = [];
//         processGrid(values, gridArr);
//         return gridArr;
//     }

//     return obj;
// }

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
    // chidrens: {} 
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

async function gridNestedLoop(type, grid){
    if(type === 'block'){
        let childEles = grid?.children;
        while(childEles){
            let uniqueSize = {
                inline: 0,
                block: 0
            };
            const childElesArr = Object.entries(childEles);
            childElesArr.forEach(async(childInlineGrids, childIndex)=>{
                const childKey = childInlineGrids[0];
                let childValues = childInlineGrids[1];
                const childInlineSize = childValues.size;
                const childBlocks = childValues?.blocks;

                uniqueSize = {
                    inline: uniqueSize.inline,
                    block: 0
                }
                if(childInlineSize < 100){
                    uniqueSize = {
                        ...uniqueSize,
                        // inline: ((childInlineSize / 100) * size) + uniqueSize.inline
                        inline: childInlineSize + uniqueSize.inline
                    }
                }
                await inlineGridNestedLoop(childBlocks);
            })
        }
    }
}

async function inlineGridNestedLoop(grid){
    let blocks = grid?.blocks;
    while(blocks){
        const childBlockEntries = Object.entries(blocks);
        let uniqueSize = {
            inline: 0,
            block: 0
        };
        childBlockEntries.forEach((childBlockArr, childBlockIndex)=>{
            const childBlockKey = childBlockArr[0];
            const childBlockValue = childBlockArr[1];
            const childBlockSize = childBlockValue.size;
            uniqueSize = {
                ...uniqueSize,
                // block: ((childBlockSize / 100) * sourceBlockSize) + uniqueSize.block
                block: childBlockSize + uniqueSize.block
            }
            if(!childBlockValue?.children){
                let gridObj = {
                    ...GridObjectType
                }
                gridObj = {
                    ...gridObj,
                    size: {
                        inline: 100,
                        block: childBlockSize
                    },
                    uniqueSize: {
                        ...uniqueSize
                    }
                }
                // gridArr.push(gridObj)
            }
            else{
                gridNestedLoop('block', childBlockValue);
            }
        })
    }
}







/*
    I - Inline - width 
    B - Block - Height
*/

function gridLayoutNestedLoop(type, grid) {
    if (type === 'inline') {
        const size = grid?.size;
        let gridObj = { ...GridObjectType };
        let arr = [];
        var loopInline = grid;

        while (loopInline) {
            const blocks = loopInline?.blocks;
            if (!blocks) {
                // arr.push()
                break;
            }

            const blocksArr = Object.entries(blocks);
            let shouldContinue = false;

            blocksArr.forEach(([blockKey, blockValue]) => {
                const blockSize = blockValue.size;
                if (blockValue?.children) {
                    const blockChildrenArr = Object.entries(blockValue.children);
                    blockChildrenArr.forEach(([inlineEleKey, inlineEleValue]) => {
                        (function(currentInlineEle) {
                            loopInline = currentInlineEle;
                            shouldContinue = true;
                        })(inlineEleValue);
                    });
                }
                else{
                    arr.push(blockValue);
                    // break;
                }
            });

            if (!shouldContinue) break;
        }
    }
}







function createGrid(obj, dataObj) {
    let grids = [];
    let colNum = 0;
    let rowNum = 0;
    let colSize = 0;
    let rowSize = 0;

    function traverse(block, col, row, currentColSize, currentRowSize) {
        if (block.type === 'inline') {
            if (currentColSize + block.size >= 100) {
                col++;
                currentColSize = 0;
            }
            if (currentRowSize + block.size >= 100) {
                row++;
                currentRowSize = 0;
            }
            grids.push({ col, row, size: block.size, type: block.type });
            currentColSize += block.size;
            currentRowSize += block.size;
        }

        if (block.blocks) {
            for (let key in block.blocks) {
                traverse(block.blocks[key], col, row, currentColSize, currentRowSize);
            }
        }

        if (block.children) {
            for (let key in block.children) {
                traverse(block.children[key], col, row, currentColSize, currentRowSize);
            }
        }
    }

    traverse(obj, colNum, rowNum, colSize, rowSize);

    let gridTemplateColumns = '';
    let gridTemplateRows = '';

    let maxCol = Math.max(...grids.map(grid => grid.col)) + 1;
    let maxRow = Math.max(...grids.map(grid => grid.row)) + 1;

    for (let i = 0; i < maxCol; i++) {
        gridTemplateColumns += '100px ';
    }
    for (let i = 0; i < maxRow; i++) {
        gridTemplateRows += '100px ';
    }
    console.log({ grids, gridTemplateColumns: gridTemplateColumns.trim(), gridTemplateRows: gridTemplateRows.trim() })
    return { grids, gridTemplateColumns: gridTemplateColumns.trim(), gridTemplateRows: gridTemplateRows.trim() };
}



