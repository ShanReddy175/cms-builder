import html2canvas from "html2canvas";
import { gridAddButtonObj, gridSwapContentObj, gridSwapObj, gridToolbarObj } from "../../../../attributes_Library";
import { dragOverColumn } from "../../../../../helpers/dragovercolumn";
import { getGriArea } from "..";
import { getSectionObject } from "../../../../pageJson/getData";
import { dispatchPageJson } from "../../../../pageJson/update";

export function gridSwapFunction(grid, section, grids) {
    const swapObj = gridSwapObj;
    const currentGridArea = getGriArea(grid);

    // Deleting Existing Element
    const existingElement = document.querySelectorAll(`div[${swapObj.id.key}="${swapObj.id.value}"]`);
    existingElement.forEach(ele => ele.remove());
    let duplicateEle = document.createElement('div');

    // Creating New Element
    const swapEle = document.createElement('div');
    swapEle.setAttribute(swapObj.id.key, swapObj.id.value);
    swapEle.draggable = true;
    swapEle.innerHTML = '<svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" data-hook="drag-handle"><path d="M3 7v2H1V7h2Zm6 0v2H7V7h2ZM3 1v2H1V1h2Zm6 0v2H7V1h2Z" fill="#000" fill-rule="evenodd"></path></svg>';
    
    // Swap Element Drag Events
    const onGridDragStart = async (e) => {
        e.stopPropagation();
        const dragEle = e.target;
        if (!dragEle.draggable) return;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';

        e.dataTransfer.setData('gridEle', grid.id);

        // Create a blank image for drag image
        const blankImage = new Image();
        blankImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // 1x1 transparent pixel
        e.dataTransfer.setDragImage(blankImage, 0, 0);
        const gridStyles = getComputedStyle(grid);
        const {height} = grid.getBoundingClientRect();
        for (const property of gridStyles) {
            duplicateEle.style[property] = gridStyles.getPropertyValue(property);
        }
        duplicateEle.style.minHeight = height;
        
        // Ensure cursor is always set to move
        activeAll();

        [...document.querySelectorAll(`div[${gridToolbarObj.id.key}="${gridToolbarObj.id.value}"]`)].forEach(ele => ele.remove());
    };

    const onGridDragEnd = (e) => {
        e.stopPropagation();
        clearAll();
    };

    swapEle.ondragstart = onGridDragStart;
    swapEle.ondragend = onGridDragEnd;

    // Section Drop Events
    const onSectionDragOver = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let x = e.clientX;
        let y = e.clientY;
        section.appendChild(duplicateEle)
        const { width, height, left, top, right, bottom } = section.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();
        const outsideCondition = x >= left && x <= right && y >= top && y <= bottom;

        const playgroundWrapper = document.querySelector('div[data-cms-tool-id="playground_wrapper"]');
        const wrapperRect = playgroundWrapper.getBoundingClientRect();

        // Auto-scroll logic
        const scrollThreshold = 50; // Pixels from edge to start scrolling
        const scrollSpeed = 5; // Pixels per step

        if (y - wrapperRect.top < scrollThreshold) {
            playgroundWrapper.scrollTop -= scrollSpeed; // Scroll up
        } else if (wrapperRect.bottom - y < scrollThreshold) {
            playgroundWrapper.scrollTop += scrollSpeed; // Scroll down
        }

        if (!outsideCondition) {
            swapEle.removeEventListener('dragstart', onGridDragStart);
            swapEle.removeEventListener('dragend', onGridDragEnd);
            return;
        }
        activeAll();
        e.dataTransfer.dropEffect = 'move';

        const swapEleRect = swapEle.getBoundingClientRect();
        grid.style.position = 'absolute';
        grid.style.zIndex = '99999';
        grid.style.width = gridRect.width + 'px';
        grid.style.height = gridRect.height + 'px';
        e.dataTransfer.setData('gridArea', currentGridArea.join(' '));
        grid.style.gridArea = 'none';

        const leftValue = (x - left) - (swapEleRect.width * 0.5);
        const topValue = (y - top) - (swapEleRect.height * 0.5);
        grid.style.left = `${leftValue}px`;
        grid.style.top = `${topValue}px`;

        const newTargetEle = await dragOverColumn(x, y, section);
        const existingSwapContentElements = document.querySelectorAll(`div[${gridSwapContentObj.id.key}="${gridSwapContentObj.id.value}"]`);
        
        if (newTargetEle && newTargetEle.id !== grid.id) {
            const swapContentEle = document.createElement('div');
            swapContentEle.setAttribute(gridSwapContentObj.id.key, gridSwapContentObj.id.value);
            swapContentEle.innerHTML = 'Swap Content';
            existingSwapContentElements.forEach(ele => ele.remove());
            grids.forEach(ele => ele.removeAttribute('data-swap-over'));
            const existingElement = document.querySelector(`div[${gridSwapContentObj.id.key}="${gridSwapContentObj.id.value}"]`);
            if (!existingElement) {
                newTargetEle.setAttribute('data-swap-over', 'true');
                newTargetEle.appendChild(swapContentEle);
            }
        } else {
            existingSwapContentElements.forEach(ele => ele.remove());
            grids.forEach(ele => ele.removeAttribute('data-swap-over'));
        }
    };

    const onSectionDrop = async (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        clearAll();

        const id = e.dataTransfer.getData('gridEle');
        let x = e.clientX;
        let y = e.clientY;
        const newTargetEle = await dragOverColumn(x, y, section, true);
        if (newTargetEle && newTargetEle.id !== grid.id) {

            const targetEleGa = setGridAreaFromArr(getGriArea(newTargetEle));
            const currentEleGa = setGridAreaFromArr(getGriArea(grid));

            grid.style.opacity = 0;

            const sectionObj = await getSectionObject(section);
            if (sectionObj.length) {
                let sectionKey = sectionObj[0];
                let sectionValue = sectionObj[1];
                let sectionGrids = sectionValue.grids;

                if (sectionGrids) {
                    let sectionGridsArr = Object.entries(sectionGrids);

                    sectionGridsArr.forEach(async (gridArr) => {
                        let updatedGrid = { ...gridArr[1] };
                        let gridAreaArr = getGriArea(updatedGrid, 'object');
                        let updatedGridArea = setGridAreaFromArr(gridAreaArr);
                        if (updatedGrid.id === grid.id) {
                            updatedGridArea = targetEleGa;
                        }
                        if (updatedGrid.id === newTargetEle.id) {
                            updatedGridArea = currentEleGa;
                        }

                        updatedGrid = {
                            ...updatedGrid,
                            styles: {
                                ...updatedGrid.styles,
                                gridArea: updatedGridArea
                            }
                        };
                        gridArr[1] = { ...updatedGrid };
                    });

                    let updatedGrids = Object.fromEntries(sectionGridsArr);

                    sectionValue = {
                        ...sectionValue,
                        grids: {
                            ...updatedGrids
                        }
                    };

                    section.setAttribute('data-nochildhover', 'true');
                    await dispatchPageJson(sectionKey, sectionValue);
                }
            }
        }
    };

    section.ondragover = onSectionDragOver;
    section.ondrop = onSectionDrop;

    grid.appendChild(swapEle);

    return swapEle;

    function clearAll() {
        grid.removeAttribute('style');
        document.body.style.cursor = 'auto';
        section.removeAttribute('style');
        grids.forEach(ele => ele.removeAttribute('data-swap-over'));
        section.removeAttribute('data-grid-dragging');
        const existingSwapContentElements = document.querySelectorAll(`div[${gridSwapContentObj.id.key}="${gridSwapContentObj.id.value}"]`);
        existingSwapContentElements.forEach(ele => ele.remove());
        duplicateEle.remove();
    }

    function activeAll() {
        document.body.style.cursor = 'move';
        grid.style.cursor = 'move';
        section.style.cursor = 'move';
        section.setAttribute('data-grid-dragging', 'true');
        const gridAddBtnEles = section.querySelectorAll(`button[${gridAddButtonObj.id.key}="${gridAddButtonObj.id.value}"]`);

        gridAddBtnEles.forEach(ele => ele.remove());
    }
}

export function setGridAreaFromArr(arr) {
    return arr.join('/');
}
