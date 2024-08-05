import { createDynamicID } from "../../helpers/createdynamicID";


export async function newSectionObject(){
    let obj = {};
    obj.id = await createDynamicID('section', 5);
    obj.uniqueKey = obj?.id?.replaceAll('-','');
    obj = await gridElementCSS(obj);
    // obj.styles.minHeight = '400px';
    // obj.styles.minHeight = 'auto';
    obj.responsiveBehaviour = await ResponsiveBehaviourItems('item', 0);
    return obj;
}

export async function ResponsiveBehaviourItems(type="all", index = 0){
    const listArr = [
        'Proportional Scaling',
        'Fixed Height',
        'Fit To Screen'
    ]

    if(type === 'all') return [...listArr];
    else if(type === 'item') return [...listArr][index];
    else if(type === 'index') return [...listArr].findIndex(ele => ele === index);
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