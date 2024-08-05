

// Grid Creation

async function  AddRowORColumnV1(section, grids, type, index, sectionEvent, existingBtn){
    const pageJson = store.getState().pageJson;
    let pageObj = pageJson.page;
    let bodyObj = pageObj.body;
    let sectionObj = Object.entries(bodyObj).find(([sectionKey, sectionValue], index)=>{
        return sectionValue.id === section.getAttribute('id')
    })
    const newGrid = await gridElementType({});
    newGrid.id = await createDynamicID('grid', 10);
    
    if(sectionObj.length){
        var sectionKey = sectionObj[0];
        var sectionValue = sectionObj[1];
        var sectionGrids = sectionValue.grids;
        var {rows, columns, rowCount, columnCount} = getGridLines(section);
        if(sectionGrids){
            // if(type === 'row') return AddRowV1();
            // else return AddColumnV1();
            const isRowGrid = type === 'row';
            const newGridArea = isRowGrid ? `${index+1}/1/${index+1+1}/${columnCount+1}` : `1/${index+1}/${rowCount+1}/${index+1+1}`;
            newGrid.styles.gridArea = newGridArea;
            let sectionGridsArr = Object.entries(sectionGrids);
            sectionGridsArr.forEach((gridArr, gridIndex)=>{
                let updatedGrid = {...gridArr[1]};
                let [startRow, startCol, endRow, endCol] = getGriArea(updatedGrid, 'object');
                const condtion = isRowGrid ? (startRow > index) : (startCol > index);
                if(condtion){
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
            const sectionMinHeight = sectionValue?.styles.minHeight;
            let dataGrids = isRowGrid ? [...rows] : [...columns];
            const newColWidth = 100 / (columnCount + 1);
            if(!isRowGrid){
                const { top, left, width, height } = section?.getBoundingClientRect();
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
    async function AddRowV1(){        
        newGrid.styles.gridArea = `${index+1}/1/${index+1+1}/${columnCount+1}`;
        let sectionGridsArr = Object.entries(sectionGrids);
        sectionGridsArr.forEach((gridArr, gridIndex)=>{
            let updatedGrid = {...gridArr[1]};
            let [startRow, startCol, endRow, endCol] = getGriArea(updatedGrid, 'object')
            if(startRow > index){
                startRow = startRow + 1;
                endRow = endRow + 1;
                updatedGrid = {
                    ...updatedGrid,
                    styles:{
                        ...updatedGrid.styles,
                        gridArea: `${startRow}/${startCol}/${endRow}/${endCol}`
                    }
                }

                gridArr[1] = {...updatedGrid}
                // gridArr[1].styles.gridArea = `${startRow}/${startCol}/${endRow}/${endCol}`
            }
        })
        let updatedGrids = Object.fromEntries(sectionGridsArr);
        const timestamp = Date.now();
        const newGridKey = `addedgrid${rowCount+1}${timestamp}`;
        newGrid.uniqueKey = newGridKey;
        const sectionMinHeight = sectionValue?.styles.minHeight;
        let dataRows = [...rows];
        const newRowMinHeight = '100px';
        dataRows.splice(index,0,newRowMinHeight);
        // console.log(dataRows)
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
                gridTemplateRows: dataRows.join(' ')
            },
        }
        // await dispatchPageJson(sectionKey, sectionValue);
        return {id: newGrid?.id};
    }
    
    async function AddColumnV1(){
        newGrid.styles.gridArea = `1/${index+1}/${rowCount+1}/${index+1+1}`;
        let sectionGridsArr = Object.entries(sectionGrids);
        sectionGridsArr.forEach((gridArr, gridIndex)=>{
            let updatedGrid = {...gridArr[1]};
            let [startRow, startCol, endRow, endCol] = getGriArea(updatedGrid, 'object');
            if(startCol > index){
                startCol = startCol + 1;
                endCol = endCol + 1;
                updatedGrid = {
                    ...updatedGrid,
                    styles: {
                        ...updatedGrid.styles,
                        gridArea: `${startRow}/${startCol}/${endRow}/${endCol}`
                    }
                }

                gridArr[1] = {...updatedGrid}
            }
        })

        let updatedGrids = Object.fromEntries(sectionGridsArr);
        const timestamp = Date.now();
        const newGridKey = `addedgrid${columnCount+1}${timestamp}`;
        newGrid.uniqueKey = newGridKey;
        let dataCols = [...columns];
        const newColWidth = 100 / (columnCount + 1);
        const { top, left, width, height } = section?.getBoundingClientRect();
        dataCols.forEach((colWidth, colIndex)=>{
            let cellWidth = colWidth;
            cellWidth = (parseFloat(cellWidth) / width) * 100;
            let substractWidth = cellWidth * (newColWidth / 100);
            cellWidth = cellWidth - substractWidth;
            dataCols[colIndex] = cellWidth + '%'
        })
        const newColMinWidth = newColWidth + '%';
        dataCols.splice(index,0,newColMinWidth);
        // console.log(dataCols)
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
                gridTemplateColumns: dataCols.join(' ')
            },
        }
        // existingBtn?.remove();
        // existingBtn.removeEventListener('mouseenter', sectionEvent);
        section.setAttribute('data-nochildhover', 'true');
        // await dispatchPageJson(sectionKey, sectionValue);   

        return {id: newGrid?.id} ;
    }
}





// Split vertically 

// if(condition && false){
                //     if(isRowGrid){
                //         startRow = startRow + 1;
                //         endRow = endRow + 1;
                //     }
                //     else{
                //         startCol = startCol + 1;
                //         endCol = endCol + 1;
                //     }
                // }

                // if(!isExistingGrid){
                //     const condition = isRowGrid ? false : (endCol >= currentEndCol);
                //     const currentGrid = isRowGrid ? false : (grid.id === updatedGrid.id);
                //     console.log(currentGrid, endCol)
                //     if(condition){
                //         if(isRowGrid){

                //         }
                //         else{
                //             // startCol = startCol + 1;
                //             endCol = endCol + 1;
                //         }
                //     }
                //     if(currentGrid){
                //         if(isRowGrid){

                //         }
                //         else{
                //             endCol = endCol - 1;
                //         }
                //     }
                // }
                // else if(isExistingGrid){
                //     const condition = isRowGrid ? false : (startRow === curentStartRow && endRow === currentEndRow);
                //     if(condition){
                //         const condition1 = isRowGrid ? false : (endCol > currentEndCol);
                //         const currentGrid = isRowGrid ? false : (grid.id === updatedGrid.id);
                //         console.log(currentGrid)
                //         if(condition1){
                //             if(isRowGrid){
    
                //             }
                //             else{
                //                 startCol = startCol + 1;
                //                 endCol = endCol + 1;
                //             }
                //         }
                //         if(currentGrid){
                //             if(isRowGrid){
    
                //             }
                //             else{
                //                 console.log(updatedGrid, endCol)
                //                 endCol = currentEndCol - 1;
                //                 console.log(updatedGrid, endCol)
                //             }
                //         }
                //     }
                // }

