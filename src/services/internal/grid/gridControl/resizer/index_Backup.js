import { getGridLines } from "..";
import { store } from "../../../../../redux/store";
import { getSectionObject } from "../../../../pageJson/getData";
import { dispatchPageJson } from "../../../../pageJson/update";
import { roundTo } from "../split/models/toolbar";

const RETURN_VALUE = 20;
const DECIMALS = 1; 
export async function GridResizerFunction(resizer, type, section, index, btn, sectionEvent){
    const $body = document.body;
    const isBlockElement  = type === 'row';
    let isDragging = true;

    const cursorType = isBlockElement ? 's-resize' : 'w-resize';

    // const onMouseMove = throttle(async(e)=>{
    //     if(!isDragging) return;
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const xValue = e.clientX;
    //     const yValue = e.clientY;

    //     if (isBlockElement) {
    //         await onBlockDrag(yValue, section, index, btn);
    //     } else {
    //         onInlineDrag(xValue, section, index);
    //     }
    // }, 10);

    const onMouseMove = async(e)=>{
        if(!isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        const xValue = e.clientX;
        const yValue = e.clientY;

        if (isBlockElement) {
            await onBlockDrag(yValue, section, index, btn);
        } else {
            onInlineDrag(xValue, section, index);
        }
    }

    const onMouseUp = () =>{
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseleave', onMouseUp);
        setTimeout(()=>{
            section.addEventListener('mousemove', sectionEvent);
        }, 1000)
        section.removeAttribute('data-nochildhover-resizer');
        section.removeAttribute('data-nochildhover-resizer-type');
        $body.style.cursor = 'auto';
        btn.style.cursor = 'auto';
    }

    resizer.addEventListener('mousedown', () => {
        isDragging = true;
        section.setAttribute('data-nochildhover-resizer', 'true');
        section.setAttribute('data-nochildhover-resizer-type', type);
        section.removeEventListener('mousemove', sectionEvent);
        btn.removeEventListener('mouseenter', null);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseUp);
        $body.style.cursor = cursorType;
        btn.style.cursor = cursorType;
    });

    // document.addEventListener('mousemove', async(e)=>{
    //     if(!isDragging) return;
    //     if(isDragging){
    //         e.preventDefault();
    //         e.stopPropagation();
    //         let xValue = e.clientX;
    //         let yValue = e.clientY;

    //         if(isblockele){
    //             // isDragging = await onBlockDrag(yValue, section, index, btn);
    //             await onBlockDrag(yValue, section, index, btn);
    //         }
    //         else if(!isblockele){
    //             onInlineDrag(xValue, section, index);
    //         }
    //     }
    // })

    // document.addEventListener('mouseup', function(){
    //     isDragging = false;

    //     resizer.removeEventListener('mousedown', null)
    // })

    // document.addEventListener('mouseleave', function(){
    //     isDragging = false;
    //     resizer.removeEventListener('mousedown', null)
    // })

}
async function onBlockDrag(value, section, index, btn){
    const {height, top} = section.getBoundingClientRect();
    const changedValue = value - top;
    const sectionObj = await getSectionObject(section);
    const {rows} = getGridLines(section);
    const nextRow = parseFloat(rows[index]);
    const currentRow = parseFloat(rows[index-1]);

    let dataGrids = [...rows];



    let currentRowTotalValue = dataGrids.reduce((acc, currentValue, currentIndex)=>{
        if(currentIndex < index){
            acc += parseFloat(currentValue);
        }
        return acc;
    }, 0);

    let nextRowTotalValue = dataGrids.reduce((acc, currentValue, currentIndex)=>{
        if(currentIndex < index+1){
            acc += parseFloat(currentValue);
        }
        return acc;
    }, 0);

    // console.log(currentRowTotalValue, nextRowTotalValue)
    let updatedNextRow = nextRow;
    let updatedCurrentRow = currentRow;

    const newValue = currentRowTotalValue - changedValue;
    updatedCurrentRow -= newValue;
    updatedNextRow += newValue;
    let rowTopValue = (changedValue / height) * 100;
    // console.log(updatedCurrentRow, currentRowTotalValue, rowTopValue, changedValue)
    // // // console.log(newValue, changedValue, updatedCurrentRow, rowTopValue)
    // btn.style.setProperty('--_self-ab-top', rowTopValue);
    const condition1 = (updatedCurrentRow <= RETURN_VALUE);
    const condition2 = (updatedNextRow <= RETURN_VALUE);
    // console.log(updatedCurrentRow, updatedNextRow, condition2, condition1, rowTopValue, newValue)
    // console.log(condition1, condition2)
    
    // if(
    //     // false
    //     condition1 
    //     || condition2
    // ) return false;
    // else return true;

    const changedStyleKey = true ? 'gridTemplateRows' : 'gridTemplateColumns';

    if(!condition1 && !condition2){
        // console.log(updatedCurrentRow, currentRowTotalValue, rowTopValue, changedValue)
        btn.style.setProperty('--_self-ab-top', rowTopValue);

        if(sectionObj.length){
            var sectionKey = sectionObj[0];
            var sectionValue = sectionObj[1];

            dataGrids[index-1] = updatedCurrentRow + 'px';
            dataGrids[index] = updatedNextRow + 'px';

            sectionValue = {
                ...sectionValue,
                styles:{
                    ...sectionValue.styles,
                    [changedStyleKey]: dataGrids.join(' ')
                }
            }

            section.setAttribute('data-nochildhover', 'true');
            await dispatchPageJson(sectionKey, sectionValue);
        }
        
    }

    // return true;
}

function onInlineDrag(value, section, index){
    console.log(value)
}

function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}


function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = (new Date()).getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func.apply(this, args);
    };
}