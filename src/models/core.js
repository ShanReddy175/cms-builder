

const gridElementCSS = async() => {
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

    // obj1 = {...obj1, styles: {...obj}};
    return obj;
}

export const gridElementType = async()=>{
    const obj = {
        styles: {...await gridElementCSS()},
        id:'',
        visible: true,
        size: {inline:0, block: 0},
        uniqueSize: {inline:0, block: 0},
        number: {inline:0, block: 0},
        type:'',
        gtccolorder: 0,
        gtrroworder: 0
    }

    return obj;
}